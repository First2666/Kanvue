<!-- หน้าเว็บ: หน้า 404 (ไม่พบเพจที่ค้นหา) -->
<template>
  <div class="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 px-6 font-sans text-center">
    <div class="text-[120px] font-black text-blue-100 leading-none mb-4">404</div>
    <h1 class="text-3xl font-bold text-gray-900 mb-2">ไม่พบหน้าที่คุณค้นหา</h1>
    <p class="text-gray-500 mb-8 max-w-md">ขออภัย หน้าที่คุณพยายามเข้าถึงอาจถูกลบ ย้าย หรือไม่มีอยู่ตั้งแต่แรก</p>
    <RouterLink to="/" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all shadow-md shadow-blue-500/30">
      กลับสู่หน้าแรก
    </RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
