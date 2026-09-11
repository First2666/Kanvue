<!-- คอมโพเนนต์: แถบเมนูนำทางด้านล่างสำหรับมือถือ -->
<template>
  <div class="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-100 pb-safe z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
    <div class="flex justify-around items-center h-16 px-2">
      <RouterLink to="/" active-class="text-blue-600" class="flex flex-col items-center justify-center w-16 text-gray-400 hover:text-blue-600 transition">
        <HomeIcon class="w-6 h-6 mb-1" />
        <span class="text-[10px] font-bold">หน้าแรก</span>
      </RouterLink>
      
      <RouterLink to="/places" active-class="text-blue-600" class="flex flex-col items-center justify-center w-16 text-gray-400 hover:text-blue-600 transition">
        <CompassIcon class="w-6 h-6 mb-1" />
        <span class="text-[10px] font-bold">สำรวจ</span>
      </RouterLink>
      
      <!-- Primary FAB (Floating Action Button) -->
      <RouterLink to="/trip-planner" class="relative -top-5 flex flex-col items-center justify-center w-14 h-14 bg-blue-600 text-white rounded-full shadow-[0_8px_20px_rgba(37,99,235,0.4)] hover:bg-blue-700 hover:scale-105 transition">
        <PlusIcon class="w-7 h-7" />
        <span v-if="tripStore.tripItems.length > 0" class="absolute 0 right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full ring-2 ring-white">
          {{ tripStore.tripItems.length }}
        </span>
      </RouterLink>
      
      <RouterLink to="/favorites" active-class="text-blue-600" class="flex flex-col items-center justify-center w-16 text-gray-400 hover:text-blue-600 transition">
        <HeartIcon class="w-6 h-6 mb-1" />
        <span class="text-[10px] font-bold">บันทึก</span>
      </RouterLink>
      
      <RouterLink to="/profile" active-class="text-blue-600" class="flex flex-col items-center justify-center w-16 text-gray-400 hover:text-blue-600 transition">
        <UserIcon class="w-6 h-6 mb-1" />
        <span class="text-[10px] font-bold">โปรไฟล์</span>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { HomeIcon, CompassIcon, PlusIcon, HeartIcon, UserIcon } from 'lucide-vue-next'
import { useTripStore } from '../stores/trip'

const tripStore = useTripStore()
</script>
