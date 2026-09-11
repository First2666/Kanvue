<!-- หน้าเว็บ: จัดการข้อมูลส่วนตัวผู้ใช้ -->
<template>
  <div class="bg-gray-50 min-h-screen pb-20 font-sans">
    
    <!-- Header -->
    <div class="bg-gradient-to-b from-blue-600 to-blue-800 pt-16 pb-24 px-6 relative overflow-hidden">
      <div class="max-w-[800px] mx-auto relative z-10 flex flex-col md:flex-row items-center md:items-end gap-6">
        
        <!-- Avatar -->
        <div class="w-32 h-32 rounded-full border-4 border-white bg-blue-100 shadow-xl overflow-hidden shrink-0 flex items-center justify-center text-5xl font-black text-blue-500">
          {{ authStore.user?.username?.charAt(0).toUpperCase() || 'U' }}
        </div>
        
        <!-- Info -->
        <div class="text-center md:text-left text-white flex-1">
          <h1 class="text-3xl font-black tracking-tight mb-2">สวัสดี 👋 {{ authStore.user?.username || 'นักเดินทาง' }}</h1>
          <p class="text-blue-100 font-medium opacity-90 flex items-center justify-center md:justify-start gap-2">
            <MailIcon class="w-4 h-4" /> {{ authStore.user?.email || 'สมาชิก KanG' }}
          </p>
        </div>
        
        <!-- Edit Btn -->
        <button class="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all border border-white/20 shadow-sm flex items-center gap-2">
          <SettingsIcon class="w-4 h-4" />
          ตั้งค่าบัญชี
        </button>
        
      </div>
      
      <!-- Decoration -->
      <div class="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white opacity-5 blur-3xl"></div>
      <div class="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 rounded-full bg-blue-400 opacity-20 blur-2xl"></div>
    </div>
    
    <!-- Content -->
    <div class="max-w-[800px] mx-auto px-4 -mt-10 relative z-20">
      
      <!-- Stats Board -->
      <div class="bg-white rounded-3xl shadow-lg p-6 mb-8 grid grid-cols-2 gap-4">
        
        <!-- Stat 1 -->
        <div class="text-center p-4 rounded-2xl bg-orange-50 border border-orange-100 flex flex-col items-center">
          <div class="w-12 h-12 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mb-3">
            <HeartIcon class="w-6 h-6" />
          </div>
          <div class="text-3xl font-black text-gray-900">{{ favoriteStore.favoritePlaceIds.length }}</div>
          <div class="text-sm font-bold text-gray-500 mt-1">สถานที่โปรด</div>
        </div>
        
        <!-- Stat 2 -->
        <div class="text-center p-4 rounded-2xl bg-blue-50 border border-blue-100 flex flex-col items-center">
          <div class="w-12 h-12 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mb-3">
            <MapIcon class="w-6 h-6" />
          </div>
          <div class="text-3xl font-black text-gray-900">{{ tripStore.tripPlans.length }}</div>
          <div class="text-sm font-bold text-gray-500 mt-1">ทริปเดินทาง</div>
        </div>
        
      </div>
      

      <!-- Minimalist Elegant Tabs -->
      <div class="flex gap-8 border-b border-gray-200 mb-8 mt-4">
        <button 
          @click="activeTab = 'trips'" 
          class="pb-4 text-base font-bold transition-all relative"
          :class="activeTab === 'trips' ? 'text-[#0F172A]' : 'text-gray-400 hover:text-gray-600'"
        >
          ทริปเดินทางของฉัน
          <div v-if="activeTab === 'trips'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0F172A] rounded-t-full"></div>
        </button>
        <button 
          @click="activeTab = 'favorites'" 
          class="pb-4 text-base font-bold transition-all relative"
          :class="activeTab === 'favorites' ? 'text-[#0F172A]' : 'text-gray-400 hover:text-gray-600'"
        >
          สถานที่ที่ถูกใจ
          <div v-if="activeTab === 'favorites'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0F172A] rounded-t-full"></div>
        </button>
      </div>

      <!-- Tab Content: Trips -->
      <div v-if="activeTab === 'trips'" class="space-y-4 mb-12">
        <div v-if="tripStore.tripPlans.length === 0" class="text-center py-12 bg-white rounded-3xl border border-dashed border-gray-200">
          <div class="w-16 h-16 bg-blue-50 text-blue-300 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapIcon class="w-8 h-8" />
          </div>
          <h3 class="text-lg font-bold text-gray-800 mb-1">ยังไม่มีทริปเดินทาง</h3>
          <p class="text-gray-500 text-sm mb-4">เริ่มต้นวางแผนการเดินทางของคุณได้เลย</p>
          <button @click="router.push('/plan')" class="bg-blue-600 text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-blue-700 transition shadow-sm">
            วางแผนทริปใหม่
          </button>
        </div>
        
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="plan in tripStore.tripPlans" :key="plan.id" @click="router.push('/plan')" class="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer flex flex-col">
            
            <!-- Image Header -->
            <div class="h-40 relative overflow-hidden">
               <img :src="getTripImage(plan.id)" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Trip Background" />
               <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
               
               <!-- Badge -->
               <div class="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                  <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span class="text-[10px] font-black tracking-wide text-gray-800 uppercase">กำลังจะมาถึง</span>
               </div>
            </div>

            <!-- Content -->
            <div class="p-5 flex-1 flex flex-col">
              <h3 class="text-lg font-extrabold text-[#0F172A] mb-2 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                {{ plan.name || 'ทริปกาญจนบุรี (ยังไม่ระบุชื่อ)' }}
              </h3>
              
              <div class="mt-auto pt-4 flex items-center justify-between border-t border-gray-50">
                 <div class="flex items-center gap-2 text-sm text-gray-500 font-medium">
                   <CalendarIcon class="w-4 h-4 text-gray-400" />
                   {{ plan.startDate ? new Date(plan.startDate).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' }) : 'ยังไม่ระบุวัน' }}
                 </div>
                 <div class="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                   <svg class="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab Content: Favorites -->
        <div v-if="activeTab === 'favorites'" class="space-y-4 mb-12">
          
          <div v-if="loadingFavorites" class="flex justify-center py-12">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
          
          <div v-else-if="filteredFavorites.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PlaceCard 
              v-for="place in filteredFavorites" 
              :key="place.id" 
              :id="place.id" 
              :title="place.name" 
              :description="place.description" 
              :location="place.location?.name || 'กาญจนบุรี'" 
              :category="place.category?.name || 'ยอดฮิต'" 
              :priceText="(place.entranceFee || place.pricePerNight || 0) > 0 ? (place.entranceFee || place.pricePerNight) + ' ฿' : 'ฟรี'" 
              :imageUrl="place.images?.[0]?.imageUrl || place.imageUrl" 
            />
          </div>

          <div v-else class="text-center py-12 bg-white rounded-3xl border border-dashed border-gray-200">
            <div class="w-16 h-16 bg-orange-50 text-orange-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <HeartIcon class="w-8 h-8" />
            </div>
            <h3 class="text-lg font-bold text-gray-800 mb-1">ยังไม่มีสถานที่โปรด</h3>
            <p class="text-gray-500 text-sm mb-4">คุณยังไม่ได้กดหัวใจให้สถานที่ใดเลย</p>
            <button @click="router.push('/places')" class="bg-orange-500 text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-orange-600 transition shadow-sm">
              ค้นหาสถานที่เพิ่ม
            </button>
          </div>
        </div>
        
        <!-- Logout Button -->
      <div class="mt-12 text-center">
        <button @click="logout" class="text-red-500 font-bold hover:bg-red-50 px-6 py-3 rounded-xl transition flex items-center gap-2 mx-auto">
          <LogOutIcon class="w-5 h-5" />
          ออกจากระบบ
        </button>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import PlaceCard from '../components/PlaceCard.vue'
import api from '../services/api'
import { useAuthStore } from '../stores/auth'
import { useFavoriteStore } from '../stores/favorite'
import { useTripStore } from '../stores/trip'
import { SettingsIcon, MailIcon, HeartIcon, MapIcon, LogOutIcon, CalendarIcon } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()
const favoriteStore = useFavoriteStore()
const tripStore = useTripStore()
const activeTab = ref('trips')
const allPlaces = ref([])
const loadingFavorites = ref(false)

const filteredFavorites = computed(() => {
  return allPlaces.value.filter(place => favoriteStore.isFavorite(place.id))
})

const tripImages = [
  'https://upload.wikimedia.org/wikipedia/commons/f/fe/Death_Railway%2C_River_Khwae.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/1/13/Erawan_Waterfall_Level_3_P1110151.JPG',
  'https://upload.wikimedia.org/wikipedia/commons/c/c0/Huai_Mae_Khamin_Waterfall_Floor_1.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/a/a0/Kanchanaburi_-_avenue.jpg'
]

const getTripImage = (id) => {
  return tripImages[id % tripImages.length]
}


onMounted(async () => {
  if (!authStore.user) {
    router.push('/login')
  } else {
    // Ensure stores are loaded
    if (favoriteStore.favoritePlaceIds.length === 0) await favoriteStore.loadFavorites()
    if (tripStore.tripPlans.length === 0) tripStore.loadTrip()
    
    // Load places for favorites tab
    loadingFavorites.value = true
    try {
      const [attRes, accRes, resRes] = await Promise.all([
        api.get('/Attractions').catch(()=>({data:[]})),
        api.get('/Accommodations').catch(()=>({data:[]})),
        api.get('/Restaurants').catch(()=>({data:[]}))
      ])
      allPlaces.value = [
        ...(attRes.data || []),
        ...(accRes.data || []),
        ...(resRes.data || [])
      ]
    } catch (err) {
      console.error('Failed to load places', err)
    } finally {
      loadingFavorites.value = false
    }
  }
})

const logout = () => {
  authStore.logout()
  router.push('/')
}
</script>
