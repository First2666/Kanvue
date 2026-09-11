<!-- คอมโพเนนต์: การ์ดแสดงข้อมูลสถานที่ (สถานที่ท่องเที่ยว/ร้านอาหาร/ที่พัก) -->
<template>
  <div @click="goToDetail" class="group cursor-pointer flex flex-col h-full">
    
    <!-- Image Container -->
    <div class="relative w-full aspect-[16/10] overflow-hidden rounded-2xl bg-gray-100">
      <img v-if="imageUrl" :src="imageUrl" alt="Place" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
      <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
        <svg class="w-12 h-12 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
      </div>
      
      <!-- Subtle gradient -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

      <!-- Top: Favorite -->
      <button @click.stop="toggleFavorite" class="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg" :class="isFavorite ? 'bg-red-500' : 'bg-white/80 backdrop-blur-sm hover:bg-white'">
        <HeartIcon :class="['w-[18px] h-[18px] transition-all', isFavorite ? 'text-white fill-white' : 'text-gray-500']" />
      </button>

      <!-- Bottom on image: Price -->
      <div class="absolute bottom-3 left-3">
        <span class="inline-block px-3 py-1.5 rounded-xl text-xs font-black shadow-lg" :class="priceText === 'ฟรี' ? 'bg-emerald-500 text-white' : 'bg-white text-gray-900'">
          {{ priceText }}
        </span>
      </div>
    </div>
    
    <!-- Text Content -->
    <div class="pt-3.5 pb-1 px-0.5">
      <h3 class="text-[15px] font-bold text-gray-900 leading-snug line-clamp-1 group-hover:text-blue-600 transition-colors">{{ title }}</h3>
      
      <div class="flex items-center justify-between mt-1.5">
        <p class="text-[12px] text-gray-400 flex items-center gap-1 font-medium">
          <svg class="w-3.5 h-3.5 shrink-0 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          {{ location }}
        </p>
        <div class="flex items-center gap-1">
          <StarIcon class="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          <span class="text-[12px] font-bold text-gray-600">{{ rating || '—' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { HeartIcon, StarIcon } from 'lucide-vue-next'
import { useTripStore } from '../stores/trip'
import { useFavoriteStore } from '../stores/favorite'
import { useToast } from '../composables/useNotify'

const props = defineProps({
  id: {
    type: [Number, String],
    required: true
  },
  title: String,
  location: String,
  rating: {
    type: Number,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  imageUrl: String,
  category: String,
  priceText: String,
  description: String
})

const router = useRouter()
const tripStore = useTripStore()
const favoriteStore = useFavoriteStore()
const toast = useToast()

const isFavorite = computed(() => favoriteStore.isFavorite(props.id))

const goToDetail = () => {
  router.push('/place/' + props.id)
}

const toggleFavorite = () => {
  favoriteStore.toggleFavorite(props.id)
}

const addToTrip = () => {
  tripStore.addItem({
    id: props.id,
    title: props.title,
    location: props.location,
    img: props.imageUrl
  })
  toast.success('เพิ่มลงทริปเรียบร้อย!')
}
</script>
