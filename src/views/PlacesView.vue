<!-- หน้าเว็บ: หน้ารวมสถานที่ท่องเที่ยว -->
<template>
  <div class="bg-[#F8FAFC] min-h-screen pb-24 font-sans text-slate-800">
    
    <!-- Hero Header & Fast Search -->
    <div class="bg-gradient-to-b from-blue-100/40 via-emerald-50/20 to-transparent pt-12 pb-8 px-6">
      <div class="max-w-[1200px] mx-auto text-center md:text-left">
        <div class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold mb-3 border border-emerald-200/60 shadow-2xs">
          <Compass class="w-3.5 h-3.5 text-emerald-600" />
          <span>แลนด์มาร์ก & จุดหมายปลายทาง</span>
        </div>
        <h1 class="text-3xl md:text-5xl font-black text-[#003366] tracking-tight mb-2">เที่ยวไหนดีในกาญจนบุรี</h1>
        <p class="text-gray-600 text-sm md:text-base max-w-2xl font-normal">
          สำรวจน้ำตกมรกต ภูเขา ถ้ำประวัติศาสตร์ และเส้นทางรถไฟสายมรณะระดับโลก
        </p>
        
        <!-- Modern Fast Search Bar -->
        <div class="mt-8 max-w-3xl bg-white rounded-2xl shadow-lg shadow-blue-900/5 border border-gray-200/80 p-2 flex flex-col sm:flex-row items-center gap-2">
          <div class="flex items-center flex-1 px-4 py-2.5 w-full">
            <Search class="w-5 h-5 text-gray-400 shrink-0 mr-3" />
            <input 
              type="text" 
              placeholder="ค้นหาชื่อสถานที่ เช่น เอราวัณ, ถ้ำกระแซ, สะพาน..." 
              v-model="searchQuery" 
              class="w-full outline-none text-sm font-semibold text-gray-800 placeholder-gray-400 bg-transparent" 
            />
            <button v-if="searchQuery" @click="searchQuery = ''" class="text-gray-400 hover:text-gray-600 p-1 cursor-pointer">
              <X class="w-4 h-4" />
            </button>
          </div>

          <div class="flex items-center gap-2 w-full sm:w-auto px-2 sm:px-0">
            <!-- Price Filter Dropdown -->
            <CustomDropdown v-model="priceFilter" :options="priceOptions" />

            <!-- Sort Filter Dropdown -->
            <CustomDropdown v-model="sortFilter" :options="sortOptions" align="right" />
          </div>
        </div>
      </div>
    </div>

    <!-- Category Filter Pills -->
    <div class="max-w-[1200px] mx-auto px-6 py-4">
      <div class="flex items-center justify-between gap-4 flex-wrap">
        <div class="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button 
            @click="activeTag = 'ทั้งหมด'" 
            class="px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all shrink-0 cursor-pointer"
            :class="activeTag === 'ทั้งหมด' 
              ? 'bg-[#003366] text-white shadow-md shadow-blue-900/20 scale-[1.02]' 
              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'"
          >
            ทั้งหมด
          </button>
          
          <button 
            v-for="cat in categories" 
            :key="cat.name" 
            @click="activeTag = cat.name"
            class="px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer"
            :class="activeTag === cat.name 
              ? 'bg-[#003366] text-white shadow-md shadow-blue-900/20 scale-[1.02]' 
              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'"
          >
            <component :is="cat.icon" class="w-3.5 h-3.5" :class="activeTag === cat.name ? 'text-white' : cat.color" />
            <span>{{ cat.name }}</span>
          </button>
        </div>

        <span class="text-xs font-bold text-gray-400">
          พบ {{ filteredItems.length }} สถานที่
        </span>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="max-w-[1200px] mx-auto px-6 pt-4">
      
      <!-- Loading Skeleton -->
      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="i in 6" :key="i" class="bg-white rounded-3xl h-[380px] animate-pulse border border-gray-100"></div>
      </div>
      
      <!-- Empty State -->
      <div v-else-if="filteredItems.length === 0" class="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
        <div class="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Search class="w-8 h-8" />
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">ไม่พบสถานที่ที่ตรงกับเงื่อนไข</h3>
        <p class="text-gray-500 text-sm max-w-sm mx-auto mb-6">ลองเปลี่ยนคำค้นหา หรือรีเซ็ตตัวกรองเพื่อดูสถานที่ทั้งหมด</p>
        <button @click="resetFilters" class="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition shadow-sm cursor-pointer">
          ล้างตัวกรองทั้งหมด
        </button>
      </div>

      <!-- Modern Places Cards Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="item in paginatedItems" 
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
              <span class="px-3 py-1 rounded-full bg-white/25 backdrop-blur-md text-white text-[11px] font-black border border-white/20 shadow-sm flex items-center gap-1">
                <Compass class="w-3 h-3 text-emerald-300" />
                <span>{{ getItemTag(item) }}</span>
              </span>
            </div>

            <!-- Top Right: Favorite Button -->
            <button 
              @click.stop="toggleFav(item.id)" 
              class="absolute top-4 right-4 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer"
              :class="favoriteStore.isFavorite(item.id) ? 'bg-red-500 scale-110' : 'bg-black/35 backdrop-blur-md hover:bg-white text-white hover:text-red-500 border border-white/20'"
              title="บันทึกสถานที่ถูกใจ"
            >
              <HeartIcon class="w-4 h-4" :class="favoriteStore.isFavorite(item.id) ? 'text-white fill-white' : ''" />
            </button>

            <!-- Bottom Right Price Pill -->
            <div class="absolute bottom-3 right-4 z-20 pointer-events-none">
              <span 
                class="px-3 py-1 rounded-full text-xs font-black shadow-md backdrop-blur-md border border-white/20"
                :class="(item.entranceFee || 0) === 0 ? 'bg-emerald-500/90 text-white' : 'bg-white/95 text-gray-900'"
              >
                {{ (item.entranceFee || 0) === 0 ? 'เข้าชมฟรี' : `฿${item.entranceFee} / คน` }}
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
                  <StarIcon class="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{{ item.rating || '4.8' }}</span>
                </span>
              </div>

              <h3 class="text-gray-900 font-black text-lg leading-snug group-hover:text-blue-600 transition-colors line-clamp-1 mb-1.5">
                {{ item.name }}
              </h3>

              <!-- Operating Hours Pill -->
              <div v-if="item.openingTime || item.closingTime" class="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium mb-2.5 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                <Clock class="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>เวลาเปิด-ปิด: <strong class="text-slate-700 font-bold">{{ formatTimeStr(item.openingTime) }} - {{ formatTimeStr(item.closingTime) }} น.</strong></span>
              </div>

              <p class="text-gray-500 text-xs line-clamp-2 leading-relaxed mb-4">
                {{ item.description || 'สัมผัสประสบการณ์การท่องเที่ยวธรรมชาติและประวัติศาสตร์ในกาญจนบุรี' }}
              </p>
            </div>

            <!-- Card Actions Footer -->
            <div class="pt-4 border-t border-gray-100 flex items-center justify-between gap-2 mt-auto">
              <button 
                @click.stop="addToTrip(item)"
                class="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Plus class="w-3.5 h-3.5" />
                <span>จัดลงทริป</span>
              </button>

              <div 
                class="px-3.5 py-2 rounded-xl text-xs font-bold text-gray-600 group-hover:text-blue-600 group-hover:bg-blue-50 flex items-center gap-1.5 transition-all"
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
          แสดงหน้า <span class="font-bold text-gray-900">{{ currentPage }}</span> จากทั้งหมด <span class="font-bold text-gray-900">{{ totalPages }}</span> หน้า (พบ {{ filteredItems.length }} สถานที่)
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { 
  Search, X, MapPin, StarIcon, HeartIcon, Plus, ArrowRight, 
  Compass, Flame, Landmark, TreePine, ChevronLeft, ChevronRight, Clock 
} from 'lucide-vue-next'
import api from '../services/api'
import { useTripStore } from '../stores/trip'
import { useFavoriteStore } from '../stores/favorite'
import { useToast } from '../composables/useNotify'
import CustomDropdown from '../components/CustomDropdown.vue'

const route = useRoute()
const router = useRouter()
const tripStore = useTripStore()
const favoriteStore = useFavoriteStore()
const toast = useToast()

const goToDetail = (id) => {
  router.push('/place/' + id)
}

const priceOptions = [
  { label: 'ทุกราคา', value: 'all' },
  { label: 'เข้าชมฟรี', value: 'free' },
  { label: 'มีค่าเข้าชม', value: 'paid' }
]

const sortOptions = [
  { label: 'แนะนำ', value: 'recommend' },
  { label: 'ราคา: ต่ำ - สูง', value: 'price_asc' },
  { label: 'ราคา: สูง - ต่ำ', value: 'price_desc' }
]

const categories = [
  { name: 'ยอดฮิต', icon: Flame, color: 'text-amber-500' },
  { name: 'ธรรมชาติ', icon: TreePine, color: 'text-emerald-500' },
  { name: 'ประวัติศาสตร์', icon: Landmark, color: 'text-amber-600' }
]

const loading = ref(true)
const allPlaces = ref([])
const activeTag = ref(route.query.tag || 'ทั้งหมด')
const searchQuery = ref(route.query.q || '')
const priceFilter = ref('all')
const sortFilter = ref('recommend')

const getImageUrl = (item) => {
  if (item.images && item.images.length > 0) {
    const primary = item.images.find(img => img.isPrimary)
    return primary ? primary.imageUrl : item.images[0].imageUrl
  }
  return item.imageUrl || 'https://images.unsplash.com/photo-1543781255-a0bcabff3d35?w=500&q=80'
}

const formatTimeStr = (t) => {
  if (!t) return ''
  return String(t).substring(0, 5)
}

const getItemTag = (item) => {
  if (item.name?.includes('น้ำตก') || item.name?.includes('อุทยาน') || item.name?.includes('เขื่อน')) return 'ธรรมชาติ'
  if (item.name?.includes('สะพาน') || item.name?.includes('ปราสาท') || item.name?.includes('ถ้ำกระแซ')) return 'ประวัติศาสตร์'
  return 'ไฮไลท์'
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

const resetFilters = () => {
  searchQuery.value = ''
  activeTag.value = 'ทั้งหมด'
  priceFilter.value = 'all'
  sortFilter.value = 'recommend'
}

const filteredItems = computed(() => {
  let filtered = [...allPlaces.value]
  
  // Tag Filter
  if (activeTag.value === 'ยอดฮิต') {
    filtered = filtered.slice(0, 4)
  } else if (activeTag.value === 'ประวัติศาสตร์') {
    const kw = ['ประวัติ', 'สงคราม', 'โบราณ', 'สิงห์', 'แคว', 'ถ้ำกระแซ', 'สะพาน']
    filtered = filtered.filter(p => (p.description && kw.some(k => p.description.includes(k))) || (p.name && kw.some(k => p.name.includes(k))))
  } else if (activeTag.value === 'ธรรมชาติ') {
    const kw = ['ธรรมชาติ', 'น้ำตก', 'เขื่อน', 'อุทยาน', 'เขา', 'ป่า', 'เอราวัณ', 'ไทรโยค']
    filtered = filtered.filter(p => (p.description && kw.some(k => p.description.includes(k))) || (p.name && kw.some(k => p.name.includes(k))))
  }

  // Text Search
  if (searchQuery.value) {
    const q = searchQuery.value.trim().toLowerCase()
    filtered = filtered.filter(p => 
      (p.name && p.name.toLowerCase().includes(q)) || 
      (p.description && p.description.toLowerCase().includes(q)) ||
      (p.location && p.location.address && p.location.address.toLowerCase().includes(q))
    )
  }

  // Price Filter
  if (priceFilter.value === 'free') {
    filtered = filtered.filter(p => p.entranceFee === 0 || p.entranceFee == null)
  } else if (priceFilter.value === 'paid') {
    filtered = filtered.filter(p => p.entranceFee > 0)
  }

  // Sort Filter
  if (sortFilter.value === 'price_asc') {
    filtered.sort((a, b) => (a.entranceFee || 0) - (b.entranceFee || 0))
  } else if (sortFilter.value === 'price_desc') {
    filtered.sort((a, b) => (b.entranceFee || 0) - (a.entranceFee || 0))
  }
  
  return filtered
})

// Pagination (Max 6 per page)
const currentPage = ref(1)
const itemsPerPage = 6

const totalPages = computed(() => Math.ceil(filteredItems.value.length / itemsPerPage) || 1)

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredItems.value.slice(start, start + itemsPerPage)
})

watch([searchQuery, activeTag, priceFilter, sortFilter], () => {
  currentPage.value = 1
})

onMounted(async () => {
  try {
    const res = await api.get('/Places').catch(() => ({ data: [] }))
    let places = (res.data || []).filter(p => p.placeType === 'Attraction')
    if (places.length === 0) {
      const aRes = await api.get('/Attractions').catch(() => ({ data: [] }))
      places = aRes.data || []
    }
    allPlaces.value = places.map(p => ({ ...p, type: 'Attraction' }))
  } catch (err) { 
    console.error(err) 
  } finally { 
    loading.value = false 
  }
})
</script>
