<!-- คอมโพเนนต์: การ์ดแสดงข้อมูลกิจกรรมหรือเทศกาล -->
<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition duration-300 flex flex-col h-full group">
    <!-- Image -->
    <div class="relative h-48 overflow-hidden bg-gray-200">
      <img v-if="imageUrl" :src="imageUrl" alt="Event image" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
      <div v-else class="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
      
      <!-- Favorite Button -->
      <button @click.prevent="toggleFavorite" class="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-red-50 transition">
        <HeartIcon :class="['w-5 h-5', isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-500']" />
      </button>
    </div>
    
    <!-- Content -->
    <div class="p-5 flex flex-col flex-grow">
      <div class="flex items-center gap-2 mb-2 text-primary font-semibold text-sm bg-blue-50 px-3 py-1 rounded-lg w-max">
        <CalendarDaysIcon class="w-4 h-4" />
        {{ dateRange }}
      </div>
      
      <h3 class="text-lg font-bold text-gray-900 line-clamp-2 mb-2">{{ title }}</h3>
      
      <p class="text-sm text-gray-500 mb-3 flex items-center gap-1 line-clamp-1">
        <MapPinIcon class="w-4 h-4" />
        {{ location }}
      </p>
      
      <p class="text-sm text-gray-600 line-clamp-2 mb-4 flex-grow">{{ description }}</p>
      
      <!-- Footer / Actions -->
      <div class="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
        <div class="text-gray-900 font-medium">
          {{ priceText }}
        </div>
        <button class="text-primary text-sm font-medium hover:underline">
          ดูรายละเอียด &rarr;
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { HeartIcon, MapPinIcon, CalendarDaysIcon } from 'lucide-vue-next'

const props = defineProps({
  id: Number,
  title: String,
  description: String,
  imageUrl: String,
  dateRange: String,
  location: String,
  priceText: String
})

const isFavorite = ref(false)

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
}
</script>
