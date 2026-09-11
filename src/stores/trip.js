import { useToast } from '../composables/useNotify'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import api from '../services/api'
import { useAuthStore } from './auth'

export const useTripStore = defineStore('trip', () => {
  const tripPlans = ref([])
  const tripItems = ref([])
  const savedPlanId = localStorage.getItem('selected_trip_plan_id')
  const tripPlanId = ref(savedPlanId ? parseInt(savedPlanId, 10) : null)
  const isLoading = ref(false)
  const authStore = useAuthStore()
  const toast = useToast()

  // Fetch from Database
  async function loadTrip() {
    if (!authStore.user) {
      tripItems.value = []
      tripPlanId.value = null
      return
    }

    isLoading.value = true
    try {
      // Get the user's trip plans
      const planRes = await api.get(`/TripPlans/User/${authStore.user.id}`)
      if (planRes.data && planRes.data.length > 0) {
        tripPlans.value = planRes.data
        
        // Priority 1: Saved plan in localStorage if it exists in user's plans
        const currentSavedStr = localStorage.getItem('selected_trip_plan_id')
        const currentSavedId = currentSavedStr ? parseInt(currentSavedStr, 10) : null
        const savedPlan = currentSavedId ? tripPlans.value.find(p => p.id === currentSavedId) : null

        if (savedPlan) {
          tripPlanId.value = savedPlan.id
        } else {
          // Priority 2: Plan with items if available, otherwise default to first
          const planWithItems = tripPlans.value.find(p => p.items && p.items.length > 0)
          tripPlanId.value = planWithItems ? planWithItems.id : planRes.data[0].id
        }

        // Keep localStorage updated
        if (tripPlanId.value) {
          try {
            localStorage.setItem('selected_trip_plan_id', tripPlanId.value.toString())
          } catch (e) {}
        }
        
        // Fetch details of this plan
        const res = await api.get(`/TripPlans/${tripPlanId.value}`)
        if (res.data && res.data.items) {
          tripItems.value = res.data.items.map((item, index) => {
            const place = item.place
            const primaryImg = place?.images?.find(img => img.isPrimary)?.imageUrl || place?.images?.[0]?.imageUrl || ''
            
            // Robust place type detection from polymorphic ASP.NET JSON
            let detectedType = 'Attraction'
            const rawType = (place?.placeType || place?.$type || '').toLowerCase()
            if (rawType === 'restaurant' || place?.foodType != null) {
              detectedType = 'Restaurant'
            } else if (rawType === 'accommodation' || place?.accommodationType != null || place?.pricePerNight != null) {
              detectedType = 'Accommodation'
            }

            return {
              id: place.id,
              tripPlanItemId: item.id,
              title: place.name,
              location: place.location?.address || 'กาญจนบุรี',
              lat: place.location?.latitude || place.latitude || 14.0228,
              lng: place.location?.longitude || place.longitude || 99.5328,
              placeType: detectedType,
              img: primaryImg,
              startTime: item.startTime,
              endTime: item.endTime,
              openingTime: place.openingTime,
              closingTime: place.closingTime,
              estimatedCost: item.estimatedCost != null ? item.estimatedCost : (place.entranceFee || place.pricePerNight || 0)
            }
          })
        }
      } else {
        tripPlans.value = []
        tripPlanId.value = null
        tripItems.value = []
      }
    } catch (err) {
      console.error('Failed to load trip plan from DB:', err)
    } finally {
      isLoading.value = false
    }
  }
  
  async function addItem(placeItem) {
    if (!authStore.user) {
      window.location.href = '/login'
      return
    }

    if (!tripPlanId.value) {
      try {
        const res = await api.post('/TripPlans', {
          userId: authStore.user.id,
          planName: 'ทริปกาญจนบุรี (ค่าเริ่มต้น)',
          startDate: new Date().toISOString(),
          endDate: new Date().toISOString(),
          memberCount: 1,
          budgetAmount: 0
        })
        if (res.data) {
           tripPlanId.value = res.data.id
           tripPlans.value = [res.data]
        }
      } catch (e) {
        toast.error('ไม่สามารถสร้างแผนการเดินทางใหม่ได้')
        return
      }
    }

    if (tripItems.value.find(i => i.id === placeItem.id)) return

    try {
      const payload = {
        tripPlanId: tripPlanId.value,
        placeId: placeItem.id,
        dayNumber: 1,
        sequence: tripItems.value.length + 1
      }
      
      const res = await api.post('/TripPlanItems', payload)
      if (res.data) {
        await loadTrip()
      }
    } catch (err) {
      console.error('Failed to add trip item to DB:', err)
      toast.error('ไม่สามารถบันทึกข้อมูลได้')
    }
  }

  async function removeItem(placeId) {
    if (!authStore.user) return

    const itemToRemove = tripItems.value.find(i => i.id === placeId)
    if (!itemToRemove || !itemToRemove.tripPlanItemId) return

    try {
      await api.delete(`/TripPlanItems/${itemToRemove.tripPlanItemId}`)
      tripItems.value = tripItems.value.filter(i => i.id !== placeId)
    } catch (err) {
      console.error('Failed to delete trip item from DB:', err)
      toast.error('ไม่สามารถลบข้อมูลได้')
    }
  }

  // Reload trip when user logs in/out
  watch(() => authStore.user, () => {
    loadTrip()
  }, { immediate: true })

  async function updateItem(index, updates) {
    if (index >= 0 && index < tripItems.value.length) {
      const item = tripItems.value[index]
      Object.assign(item, updates)
      
      if (item.tripPlanItemId) {
        try {
           const payload = {
              id: item.tripPlanItemId,
              tripPlanId: tripPlanId.value,
              placeId: item.id,
              dayNumber: 1,
              sequence: index + 1,
              startTime: item.startTime,
              endTime: item.endTime,
              estimatedCost: item.estimatedCost
           }
           await api.put(`/TripPlanItems/${item.tripPlanItemId}`, payload)
        } catch (e) {
           console.error('Failed to sync item update', e)
        }
      }
    }
  }

  async function reorderItems(oldIndex, newIndex) {
     if (oldIndex === newIndex) return;
     
     const item = tripItems.value.splice(oldIndex, 1)[0];
     tripItems.value.splice(newIndex, 0, item);
     
     for(let i = 0; i < tripItems.value.length; i++) {
        const ti = tripItems.value[i];
        if (ti.tripPlanItemId) {
           const payload = {
              id: ti.tripPlanItemId,
              tripPlanId: tripPlanId.value,
              placeId: ti.id,
              dayNumber: 1,
              sequence: i + 1,
              startTime: ti.startTime,
              endTime: ti.endTime,
              estimatedCost: ti.estimatedCost
           }
           api.put(`/TripPlanItems/${ti.tripPlanItemId}`, payload).catch(e => console.error(e));
        }
     }
  }

  async function switchTrip(id) {
    tripPlanId.value = id
    try {
      localStorage.setItem('selected_trip_plan_id', id.toString())
    } catch (e) {}
    await loadTrip()
  }

  async function createTrip(name, startDate, endDate) {
    if (!authStore.user) return
    try {
      const res = await api.post('/TripPlans', {
        userId: authStore.user.id,
        planName: name,
        startDate: startDate,
        endDate: endDate,
        memberCount: 1,
        budgetAmount: 0
      })
      if (res.data) {
        tripPlanId.value = res.data.id
        try {
          localStorage.setItem('selected_trip_plan_id', res.data.id.toString())
        } catch (e) {}
        await loadTrip()
        toast.success('สร้างทริปใหม่เรียบร้อย!')
      }
    } catch (err) {
      console.error(err)
      toast.error('ไม่สามารถสร้างทริปได้')
    }
  }

  async function deleteTrip(id) {
    if (!authStore.user) return
    try {
      await api.delete(`/TripPlans/${id}`)
      toast.success('ลบทริปเรียบร้อยแล้ว')
      // If we deleted the current trip, switch to another one or null
      if (tripPlanId.value === id) {
         const remaining = tripPlans.value.filter(p => p.id !== id)
         if (remaining.length > 0) {
            tripPlanId.value = remaining[0].id
            try {
              localStorage.setItem('selected_trip_plan_id', remaining[0].id.toString())
            } catch (e) {}
         } else {
            tripPlanId.value = null
            try {
              localStorage.removeItem('selected_trip_plan_id')
            } catch (e) {}
         }
      }
      await loadTrip()
    } catch (err) {
      console.error(err)
      toast.error('ไม่สามารถลบทริปได้')
    }
  }

  return { 
    tripPlans,
    tripItems, 
    isLoading, 
    loadTrip, 
    addItem, 
    removeItem, 
    updateItem, 
    reorderItems,
    switchTrip,
    createTrip,
    deleteTrip,
    tripPlanId
  }
})
