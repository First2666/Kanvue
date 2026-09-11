<!-- หน้าเว็บ: รายการสถานที่โปรดของผู้ใช้ -->
<template>
  <div class="bg-gray-50/50 min-h-screen pb-24 md:pb-16 pt-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold mb-2">
            <Heart class="w-3.5 h-3.5 fill-red-500 text-red-500" />
            <span>รายการโปรดของคุณ</span>
          </div>
          <h1 class="text-3xl font-black text-gray-900 tracking-tight">สถานที่ที่คุณบันทึกไว้</h1>
          <p class="text-gray-500 text-sm mt-1">รวมสถานที่ท่องเที่ยว ร้านอาหาร และที่พักที่คุณกดถูกใจไว้ทั้งหมด</p>
        </div>

        <div v-if="allFavorites.length > 0" class="flex items-center gap-2 text-xs font-bold text-gray-500 bg-white px-4 py-2 rounded-2xl border border-gray-200/80 shadow-xs">
          <span>บันทึกทั้งหมด</span>
          <span class="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-extrabold">{{ allFavorites.length }}</span>
          <span>รายการ</span>
        </div>
      </div>

      <!-- Category Filter Tabs (แยกหน้าตามหมวดหมู่: สถานที่ท่องเที่ยว / ที่พัก / ร้านอาหาร) -->
      <div class="flex items-center gap-2.5 overflow-x-auto pb-2 mb-8 scrollbar-none">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="selectTab(tab.id)"
          :class="[
            'px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition-all shrink-0 flex items-center gap-2 cursor-pointer shadow-xs',
            activeTab === tab.id
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20 scale-[1.02]'
              : 'bg-white text-gray-700 border border-gray-200/80 hover:bg-gray-50 hover:text-gray-900'
          ]"
        >
          <component 
            :is="tab.icon" 
            class="w-4 h-4 shrink-0 transition-colors"
            :class="activeTab === tab.id ? 'text-white' : tab.color"
          />
          <span>{{ tab.label }}</span>
          <span 
            :class="[
              'px-2 py-0.5 rounded-full text-[11px] font-extrabold',
              activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
            ]"
          >
            {{ tab.count }}
          </span>
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <!-- Cards Grid -->
      <div v-else-if="currentFilteredItems.length > 0">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="item in paginatedFavorites" 
            :key="item.id"
            @click="goToDetail(item.id)"
            class="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl border border-gray-100/80 transition-all duration-500 hover:-translate-y-1.5 flex flex-col cursor-pointer"
          >
            <!-- Card Image & Floating Badges -->
            <div class="relative h-56 overflow-hidden bg-gray-100">
              <img 
                :src="getImageUrl(item)" 
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>

              <!-- Top Left: Category Badge -->
              <div class="absolute top-4 left-4 z-20 pointer-events-none">
                <span 
                  class="px-3 py-1 rounded-full text-[11px] font-black shadow-sm flex items-center gap-1.5 border border-white/20 backdrop-blur-md"
                  :class="getTypeBadge(item).class"
                >
                  <component :is="getTypeBadge(item).icon" class="w-3.5 h-3.5" />
                  <span>{{ getTypeBadge(item).label }}</span>
                </span>
              </div>

              <!-- Top Right: Remove Favorite Button -->
              <button 
                @click.stop="toggleFav(item.id)" 
                class="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-red-500 text-white flex items-center justify-center transition-all duration-300 shadow-md hover:scale-110 cursor-pointer"
                title="ยกเลิกการบันทึก"
              >
                <Heart class="w-4 h-4 fill-white text-white" />
              </button>

              <!-- Bottom Right Price / Type Pill -->
              <div class="absolute bottom-3 right-4 z-20 pointer-events-none">
                <span class="px-3 py-1 rounded-full text-xs font-black shadow-md backdrop-blur-md bg-white/95 text-gray-900 border border-white/20">
                  {{ getPriceBadge(item) }}
                </span>
              </div>
            </div>
            
            <!-- Card Content Body -->
            <div class="p-6 flex flex-col flex-grow justify-between">
              <div>
                <div class="flex items-center justify-between gap-2 mb-2 text-xs">
                  <span class="text-gray-500 font-medium flex items-center gap-1 truncate">
                    <MapPin class="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span class="truncate">{{ item.location?.address ? item.location.address.split(' ')[1] || 'กาญจนบุรี' : 'กาญจนบุรี' }}</span>
                  </span>
                  <span class="text-amber-500 font-black flex items-center gap-1 shrink-0">
                    <Star class="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{{ item.rating || '4.8' }}</span>
                  </span>
                </div>

                <h3 class="font-extrabold text-gray-900 text-lg group-hover:text-blue-600 transition-colors line-clamp-1 mb-1.5">
                  {{ item.name }}
                </h3>

                <!-- Operating Hours Pill -->
                <div v-if="item.openingTime || item.closingTime" class="flex items-center gap-1.5 text-[11px] text-slate-600 font-medium mb-2.5 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                  <Clock class="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span>เวลาเปิด-ปิด: <strong class="text-slate-800 font-bold">{{ formatTimeStr(item.openingTime) }} - {{ formatTimeStr(item.closingTime) }} น.</strong></span>
                </div>
                <div v-else-if="item.placeType === 'Accommodation'" class="flex items-center gap-1.5 text-[11px] text-indigo-700 font-medium mb-2.5 bg-indigo-50/70 px-2.5 py-1 rounded-lg border border-indigo-100">
                  <Clock class="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  <span>เช็คอิน: <strong class="text-indigo-900 font-bold">14:00 น. (บริการ 24 ชม.)</strong></span>
                </div>

                <p class="text-gray-500 text-xs line-clamp-2 leading-relaxed font-normal mb-4">
                  {{ item.description || 'ค้นพบเสน่ห์ความงดงามและประสบการณ์สุดพิเศษในจังหวัดกาญจนบุรี' }}
                </p>
              </div>

              <div class="pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
                <button 
                  @click.stop="addToTrip(item)" 
                  class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  <Plus class="w-3.5 h-3.5" />
                  <span>จัดลงทริป</span>
                </button>

                <div 
                  class="px-3 py-1.5 rounded-xl text-xs font-bold text-gray-600 group-hover:text-blue-600 flex items-center gap-1 transition-all"
                >
                  <span>รายละเอียด</span>
                  <ArrowRight class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination Controls (Max 6 per page) -->
        <div v-if="totalPages > 1" class="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 p-5 bg-white rounded-3xl border border-gray-100 shadow-sm">
          <p class="text-xs text-gray-500 font-medium">
            แสดงหน้า <span class="font-bold text-gray-900">{{ currentPage }}</span> จากทั้งหมด <span class="font-bold text-gray-900">{{ totalPages }}</span> หน้า (พบ {{ currentFilteredItems.length }} รายการ)
          </p>

          <div class="flex items-center gap-2">
            <button 
              @click="currentPage = Math.max(1, currentPage - 1)" 
              :disabled="currentPage === 1"
              class="px-3.5 py-2 rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft class="w-4 h-4" />
              ก่อนหน้า
            </button>

            <div class="flex items-center gap-1">
              <button 
                v-for="p in totalPages" 
                :key="p"
                @click="currentPage = p"
                :class="[
                  'w-8 h-8 rounded-xl text-xs font-extrabold transition cursor-pointer',
                  currentPage === p 
                    ? 'bg-blue-600 text-white shadow-xs' 
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                ]"
              >
                {{ p }}
              </button>
            </div>

            <button 
              @click="currentPage = Math.min(totalPages, currentPage + 1)" 
              :disabled="currentPage === totalPages"
              class="px-3.5 py-2 rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1 cursor-pointer"
            >
              ถัดไป
              <ChevronRight class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State for Active Tab -->
      <div v-else class="text-center py-20 bg-white rounded-3xl border border-gray-100 mt-6 shadow-sm">
        <component :is="emptyStateInfo.icon" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 class="text-xl font-bold text-gray-900 mb-2">{{ emptyStateInfo.title }}</h3>
        <p class="text-gray-500 max-w-md mx-auto text-sm mb-6">{{ emptyStateInfo.desc }}</p>
        <RouterLink 
          :to="emptyStateInfo.link" 
          class="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 transition shadow-md hover:scale-105"
        >
          <span>{{ emptyStateInfo.btnText }}</span>
          <ArrowRight class="w-4 h-4" />
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { 
  Heart, MapPin, Star, Plus, ArrowRight, ChevronLeft, ChevronRight,
  Compass, Utensils, BedDouble, Sparkles, Clock
} from 'lucide-vue-next'
import { useFavoriteStore } from '../stores/favorite'
import { useTripStore } from '../stores/trip'
import { useToast } from '../composables/useNotify'
import api from '../services/api'

const route = useRoute()
const router = useRouter()
const favoriteStore = useFavoriteStore()
const tripStore = useTripStore()
const toast = useToast()

const loading = ref(true)
const allPlaces = ref([])
const activeTab = ref(route.query.tab || 'all')

const selectTab = (tabId) => {
  activeTab.value = tabId
  router.replace({ query: { ...route.query, tab: tabId === 'all' ? undefined : tabId } })
}

const formatTimeStr = (t) => {
  if (!t) return ''
  return String(t).substring(0, 5)
}

// All user favorites from loaded places
const allFavorites = computed(() => {
  return allPlaces.value.filter(place => favoriteStore.isFavorite(place.id))
})

// Counts per category
const countByType = (type) => {
  return allFavorites.value.filter(p => p.placeType === type).length
}

// Category tabs
const tabs = computed(() => [
  { id: 'all', label: 'ทั้งหมด', icon: Sparkles, color: 'text-blue-500', count: allFavorites.value.length },
  { id: 'attraction', label: 'สถานที่ท่องเที่ยว', icon: Compass, color: 'text-emerald-500', count: countByType('Attraction') },
  { id: 'restaurant', label: 'ร้านอาหาร', icon: Utensils, color: 'text-amber-500', count: countByType('Restaurant') },
  { id: 'hotel', label: 'ที่พัก', icon: BedDouble, color: 'text-indigo-500', count: countByType('Accommodation') }
])

// Filtered items based on active tab
const currentFilteredItems = computed(() => {
  if (activeTab.value === 'attraction') {
    return allFavorites.value.filter(p => p.placeType === 'Attraction')
  }
  if (activeTab.value === 'restaurant') {
    return allFavorites.value.filter(p => p.placeType === 'Restaurant')
  }
  if (activeTab.value === 'hotel') {
    return allFavorites.value.filter(p => p.placeType === 'Accommodation')
  }
  return allFavorites.value
})

// Pagination (Max 6 per page)
const currentPage = ref(1)
const itemsPerPage = 6

const totalPages = computed(() => Math.ceil(currentFilteredItems.value.length / itemsPerPage) || 1)

const paginatedFavorites = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return currentFilteredItems.value.slice(start, start + itemsPerPage)
})

watch(activeTab, () => {
  currentPage.value = 1
})

// Helpers
const goToDetail = (id) => {
  router.push('/place/' + id)
}

const toggleFav = (id) => {
  favoriteStore.toggleFavorite(id)
}

const addToTrip = (item) => {
  tripStore.addItem({
    id: item.id,
    title: item.name,
    location: item.location?.address || 'กาญจนบุรี',
    img: getImageUrl(item)
  })
  toast.success(`เพิ่ม "${item.name}" ลงในแผนเดินทางแล้ว!`)
}

const getImageUrl = (item) => {
  if (item.images && item.images.length > 0) {
    const primary = item.images.find(img => img.isPrimary)
    return primary ? primary.imageUrl : item.images[0].imageUrl
  }
  return item.imageUrl || 'https://images.unsplash.com/photo-1543781255-a0bcabff3d35?w=500&q=80'
}

const getTypeBadge = (item) => {
  if (item.placeType === 'Restaurant') {
    return { label: 'ร้านอาหาร', icon: Utensils, class: 'bg-amber-500/90 text-white' }
  }
  if (item.placeType === 'Accommodation') {
    return { label: 'ที่พัก & รีสอร์ท', icon: BedDouble, class: 'bg-indigo-600/90 text-white' }
  }
  return { label: 'สถานที่เที่ยว', icon: Compass, class: 'bg-emerald-600/90 text-white' }
}

const getPriceBadge = (item) => {
  if (item.placeType === 'Restaurant') {
    return item.priceRange || '฿฿ ปานกลาง'
  }
  if (item.placeType === 'Accommodation') {
    const p = item.entranceFee || item.pricePerNight || 0
    return `฿${Number(p).toLocaleString()} / คืน`
  }
  if (item.entranceFee && item.entranceFee > 0) {
    return `฿${item.entranceFee} / คน`
  }
  return 'เข้าชมฟรี'
}

const emptyStateInfo = computed(() => {
  if (activeTab.value === 'attraction') {
    return {
      icon: Compass,
      title: 'ยังไม่มีสถานที่ท่องเที่ยวที่บันทึกไว้',
      desc: 'ค้นหาน้ำตก ปราสาทโบราณ จุดชมวิว และธรรมชาติเมืองกาญจน์แล้วกดหัวใจเพื่อบันทึก',
      link: '/places',
      btnText: 'สำรวจสถานที่ท่องเที่ยว'
    }
  }
  if (activeTab.value === 'restaurant') {
    return {
      icon: Utensils,
      title: 'ยังไม่มีร้านอาหารที่บันทึกไว้',
      desc: 'ค้นหาร้านอาหารริมน้ำ คาเฟ่สวย และของกินอร่อยๆ ในกาญจนบุรี',
      link: '/restaurants',
      btnText: 'สำรวจร้านอาหาร & คาเฟ่'
    }
  }
  if (activeTab.value === 'hotel') {
    return {
      icon: BedDouble,
      title: 'ยังไม่มีที่พักที่บันทึกไว้',
      desc: 'ค้นหาแพริมน้ำแม่น้ำแคว และรีสอร์ทสวยท่ามกลางขุนเขาสำหรับทริปนี้',
      link: '/hotels',
      btnText: 'สำรวจที่พัก & รีสอร์ท'
    }
  }
  return {
    icon: Heart,
    title: 'ยังไม่มีรายการที่บันทึกไว้',
    desc: 'ลองสำรวจสถานที่ ร้านอาหาร และที่พักใหม่ๆ ในกาญจนบุรี แล้วกดหัวใจเพื่อบันทึกเก็บไว้ดูภายหลัง',
    link: '/places',
    btnText: 'ไปสำรวจกันเลย'
  }
})

onMounted(async () => {
  try {
    const res = await api.get('/Places').catch(() => null)
    if (res && res.data && res.data.length > 0) {
      allPlaces.value = res.data
    } else {
      const [attRes, accRes, resRes] = await Promise.all([
        api.get('/Attractions'),
        api.get('/Accommodations'),
        api.get('/Restaurants')
      ])
      allPlaces.value = [
        ...(attRes.data || []).map(p => ({ ...p, placeType: 'Attraction' })),
        ...(accRes.data || []).map(p => ({ ...p, placeType: 'Accommodation' })),
        ...(resRes.data || []).map(p => ({ ...p, placeType: 'Restaurant' }))
      ]
    }
  } catch (err) {
    console.error('Failed to load places for favorites', err)
  } finally {
    loading.value = false
  }
})
</script>
