<!-- คอมโพเนนต์: ส่วนท้ายของเว็บไซต์ (Footer) -->
<template>
  <footer class="bg-white border-t border-gray-100 pt-16 pb-8 mt-auto">
    <div class="max-w-[1200px] mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        
        <!-- Brand -->
        <div class="col-span-1 md:col-span-2">
          <RouterLink to="/" class="flex items-center gap-2 group mb-4 inline-flex">
            <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-600/30">
              K.
            </div>
            <span class="font-extrabold text-2xl tracking-tight text-gray-900">KanG</span>
          </RouterLink>
          <p class="text-gray-500 text-sm leading-relaxed max-w-sm">
            แพลตฟอร์มผู้ช่วยวางแผนการเดินทางจังหวัดกาญจนบุรี ค้นหาสถานที่ท่องเที่ยว ร้านอาหาร ที่พัก และจัดทริปของคุณได้ง่ายๆ ในที่เดียว
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="font-bold text-gray-900 mb-4">เมนูหลัก</h3>
          <ul class="space-y-3">
            <li><RouterLink to="/places" class="text-gray-500 hover:text-blue-600 transition text-sm">เที่ยวไหนดี</RouterLink></li>
            <li><RouterLink to="/restaurants" class="text-gray-500 hover:text-blue-600 transition text-sm">กินอะไรดี</RouterLink></li>
            <li><RouterLink to="/hotels" class="text-gray-500 hover:text-blue-600 transition text-sm">พักที่ไหน</RouterLink></li>
            <li><RouterLink to="/planner" class="text-gray-500 hover:text-blue-600 transition text-sm">แผนเดินทาง</RouterLink></li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="font-bold text-gray-900 mb-4">ติดต่อเรา</h3>
          <ul class="space-y-3">
            <li class="text-gray-500 text-sm flex items-center gap-2">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              contact@kang.com
            </li>
            <li class="text-gray-500 text-sm flex items-center gap-2">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              02-123-4567
            </li>
          </ul>
        </div>
        
      </div>

      <!-- Bottom -->
      <div class="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-gray-400 text-xs">
          &copy; {{ new Date().getFullYear() }} KanG. All rights reserved.
        </p>
        <div class="flex gap-4">
          <a href="#" class="text-gray-400 hover:text-gray-900 transition">
            <span class="sr-only">Facebook</span>
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" /></svg>
          </a>
          <a href="#" class="text-gray-400 hover:text-gray-900 transition">
            <span class="sr-only">Twitter</span>
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
