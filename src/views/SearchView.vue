<!-- หน้าเว็บ: ค้นหาสถานที่ -->
<template>
  <div class="bg-white min-h-screen pb-20">
    <!-- Header -->
    <div class="bg-[var(--color-bg-light)] pt-12 pb-8 border-b border-[var(--color-border-light)]">
      <div class="max-w-7xl mx-auto px-4">
        <h1 class="text-3xl font-bold text-[var(--color-text-dark)] mb-6">ค้นหาสถานที่</h1>
        
        <!-- Large Search Bar -->
        <div class="relative max-w-3xl">
          <input type="text" placeholder="ค้นหาชื่อสถานที่ ที่พัก ร้านอาหาร..." class="w-full pl-6 pr-14 py-4 bg-white border border-[var(--color-border-light)] rounded-2xl shadow-sm outline-none text-[var(--color-text-dark)] text-lg focus:border-[var(--color-primary)] transition-colors" value="กาญจนบุรี" />
          <button class="absolute right-3 top-1/2 -translate-y-1/2 bg-[var(--color-primary)] text-white p-2.5 rounded-xl hover:bg-[var(--color-primary-hover)] transition-colors">
            <SearchIcon class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 mt-8 flex flex-col md:flex-row gap-8">
      
      <!-- Left Sidebar (Filters) -->
      <div class="w-full md:w-64 flex-shrink-0">
        <div class="bg-white border border-[var(--color-border-light)] rounded-2xl p-6 shadow-sm sticky top-24">
          <h3 class="font-bold text-[var(--color-text-dark)] text-lg mb-4">ประเภท</h3>
          <div class="space-y-3 mb-8">
            <label class="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" checked class="w-5 h-5 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)] cursor-pointer" />
              <span class="text-[var(--color-text-medium)] group-hover:text-[var(--color-text-dark)] transition-colors">ธรรมชาติ</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" class="w-5 h-5 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)] cursor-pointer" />
              <span class="text-[var(--color-text-medium)] group-hover:text-[var(--color-text-dark)] transition-colors">วัฒนธรรม</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" class="w-5 h-5 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)] cursor-pointer" />
              <span class="text-[var(--color-text-medium)] group-hover:text-[var(--color-text-dark)] transition-colors">คาเฟ่</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" class="w-5 h-5 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)] cursor-pointer" />
              <span class="text-[var(--color-text-medium)] group-hover:text-[var(--color-text-dark)] transition-colors">ร้านอาหาร</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" class="w-5 h-5 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)] cursor-pointer" />
              <span class="text-[var(--color-text-medium)] group-hover:text-[var(--color-text-dark)] transition-colors">ที่พัก</span>
            </label>
          </div>

          <h3 class="font-bold text-[var(--color-text-dark)] text-lg mb-4">คะแนน</h3>
          <div class="space-y-3">
            <label class="flex items-center gap-3 cursor-pointer group">
              <input type="radio" name="rating" checked class="w-5 h-5 border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)] cursor-pointer" />
              <span class="text-[var(--color-text-medium)] flex items-center gap-1 group-hover:text-[var(--color-text-dark)]"><StarIcon class="w-4 h-4 fill-yellow-400 text-yellow-400"/> 4.5+</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer group">
              <input type="radio" name="rating" class="w-5 h-5 border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)] cursor-pointer" />
              <span class="text-[var(--color-text-medium)] flex items-center gap-1 group-hover:text-[var(--color-text-dark)]"><StarIcon class="w-4 h-4 fill-yellow-400 text-yellow-400"/> 4.0+</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer group">
              <input type="radio" name="rating" class="w-5 h-5 border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)] cursor-pointer" />
              <span class="text-[var(--color-text-medium)] flex items-center gap-1 group-hover:text-[var(--color-text-dark)]"><StarIcon class="w-4 h-4 fill-yellow-400 text-yellow-400"/> 3.5+</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Right Side (Results) -->
      <div class="flex-grow">
        <div class="mb-6 flex justify-between items-center">
          <h2 class="text-xl font-medium text-[var(--color-text-dark)]">พบ <span class="font-bold text-[var(--color-primary)]">24</span> สถานที่</h2>
          
          <select class="border border-[var(--color-border-light)] rounded-lg px-4 py-2 outline-none text-sm text-[var(--color-text-medium)]">
            <option>แนะนำสำหรับคุณ</option>
            <option>คะแนนสูงสุด</option>
            <option>ใกล้ฉันที่สุด</option>
          </select>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <PlaceCard v-for="place in results" :key="place.id" :id="place.id" :title="place.name" :location="place.location" :category="place.category" :imageUrl="place.img" />
        </div>
        
        <div class="mt-12 flex justify-center">
          <button class="px-6 py-3 border border-[var(--color-border-light)] rounded-full text-[var(--color-text-medium)] font-medium hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors cursor-pointer">
            โหลดเพิ่มเติม...
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SearchIcon, StarIcon } from 'lucide-vue-next'
import PlaceCard from '../components/PlaceCard.vue'

const results = ref([
  { id: 1, name: 'น้ำตกเอราวัณ', location: 'ศรีสวัสดิ์, กาญจนบุรี', category: 'ธรรมชาติ', img: 'https://images.unsplash.com/photo-1540956424564-9d5059d43527?q=80&w=800&auto=format&fit=crop' },
  { id: 2, name: 'ต้นไม้ยักษ์', location: 'ด่านมะขามเตี้ย, กาญจนบุรี', category: 'ธรรมชาติ', img: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=800&auto=format&fit=crop' },
  { id: 3, name: 'เขื่อนศรีนครินทร์', location: 'ศรีสวัสดิ์, กาญจนบุรี', category: 'ธรรมชาติ', img: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=800&auto=format&fit=crop' },
  { id: 4, name: 'น้ำตกไทรโยคใหญ่', location: 'ไทรโยค, กาญจนบุรี', category: 'ธรรมชาติ', img: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800&auto=format&fit=crop' },
  { id: 5, name: 'ช่องเขาขาด', location: 'ไทรโยค, กาญจนบุรี', category: 'ธรรมชาติ', img: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop' }
])
</script>
