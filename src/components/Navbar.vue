<!-- คอมโพเนนต์: แถบเมนูนำทางด้านบน -->
<template>
  <nav class="bg-white/90 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100">
    <div class="max-w-[1500px] mx-auto px-6 h-20 flex items-center justify-between">
      
      <!-- Left: Logo & Main Links -->
      <div class="flex items-center gap-12">
        <RouterLink to="/" class="flex items-center gap-2 group">
          <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-600/30 group-hover:scale-105 transition-transform">
            K.
          </div>
          <span class="font-extrabold text-2xl tracking-tight text-gray-900">KanG</span>
        </RouterLink>

        <div class="hidden lg:flex items-center gap-2">
          <RouterLink to="/" class="px-4 py-2 rounded-full text-gray-600 font-bold hover:bg-gray-50 transition" active-class="!bg-blue-50 !text-blue-600">หน้าแรก</RouterLink>
          <RouterLink to="/places" class="px-4 py-2 rounded-full text-gray-600 font-bold hover:bg-gray-50 transition" active-class="!bg-blue-50 !text-blue-600">เที่ยวไหนดี</RouterLink>
          <RouterLink to="/restaurants" class="px-4 py-2 rounded-full text-gray-600 font-bold hover:bg-gray-50 transition" active-class="!bg-blue-50 !text-blue-600">กินอะไรดี</RouterLink>
          <RouterLink to="/hotels" class="px-4 py-2 rounded-full text-gray-600 font-bold hover:bg-gray-50 transition" active-class="!bg-blue-50 !text-blue-600">พักที่ไหน</RouterLink>
        </div>
      </div>

      <!-- Right: Actions -->
      <div class="flex items-center gap-6">
                <RouterLink to="/planner" class="hidden sm:flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-bold text-sm hover:bg-blue-100 transition shadow-sm border border-blue-100">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          <span>แผนเดินทาง</span>
          <span v-if="tripStore.tripItems.length > 0" class="bg-blue-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full ml-1">{{ tripStore.tripItems.length }}</span>
        </RouterLink>
        <RouterLink to="/favorites" class="hidden sm:flex items-center gap-2 text-gray-600 hover:text-gray-900 transition font-bold text-sm">
          <HeartIcon class="w-5 h-5" />
          <!-- <span>รายการโปรด</span> -->
        </RouterLink>
        
        <button class="hidden sm:flex items-center justify-center text-gray-600 hover:text-gray-900 transition">
          <BellIcon class="w-5 h-5" />
        </button>
        
        <div class="w-px h-6 bg-gray-200 hidden sm:block mx-1"></div>
        
                <template v-if="authStore.user">
          <div class="relative" ref="dropdownRef">
            <div @click="showDropdown = !showDropdown" class="flex items-center gap-3 cursor-pointer group">
              <div class="w-9 h-9 rounded-full overflow-hidden bg-blue-100 shrink-0">
                 <img v-if="authStore.user.avatarUrl" :src="authStore.user.avatarUrl" alt="Avatar" class="w-full h-full object-cover" />
                 <div v-else class="w-full h-full flex items-center justify-center text-blue-600 font-bold text-sm">{{ authStore.user.username.charAt(0).toUpperCase() }}</div>
              </div>
              <div class="hidden sm:flex items-center gap-1">
                 <span class="text-sm font-bold text-gray-700">สวัสดี, {{ authStore.user.username }}</span>
                 <ChevronDownIcon class="w-4 h-4 text-gray-400 group-hover:text-gray-700 transition" />
              </div>
            </div>
            
            <div v-if="showDropdown" class="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                
            <RouterLink v-if="authStore.user?.role === 1" to="/admin" class="flex items-center gap-2 px-4 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded-lg transition font-bold border border-purple-200">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              แอดมิน
            </RouterLink>
            <RouterLink to="/profile" class="block w-full text-left px-4 py-2 text-sm text-gray-700 font-bold hover:bg-gray-50 transition" @click="showDropdown = false">
                  โปรไฟล์ของฉัน
                </RouterLink>
              <button @click="logout" class="w-full text-left px-4 py-2 text-sm text-red-600 font-bold hover:bg-red-50 transition">
                ออกจากระบบ
              </button>
            </div>
          </div>
        </template>
        <template v-else>
          <RouterLink to="/login" class="bg-gray-900 text-white px-6 py-2.5 rounded-full font-bold hover:bg-black shadow-md transition">เข้าสู่ระบบ</RouterLink>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { HeartIcon, BellIcon, ChevronDownIcon } from 'lucide-vue-next'
import { useAuthStore } from '../stores/auth'

  
  import api from '../services/api'
  
  const showNotifs = ref(false)
  const notifications = ref([])
  const unreadCount = ref(0)
  
  onMounted(async () => {
    if (authStore.user) {
      try {
        const res = await api.get('/Notifications').catch(()=>({data:[]}))
        // Filter for user
        const userNotifs = res.data.filter(n => n.userId === authStore.user.id).sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt))
        notifications.value = userNotifs
        unreadCount.value = userNotifs.filter(n => !n.isRead).length
      } catch(e){}
    }
  })
  
  const toggleNotifs = () => {
    showNotifs.value = !showNotifs.value
    if (showNotifs.value && unreadCount.value > 0) {
      unreadCount.value = 0
      // Ideally mark as read in backend too
    }
  }

import { useTripStore } from '../stores/trip'

const authStore = useAuthStore()
const tripStore = useTripStore()
const router = useRouter()

const showDropdown = ref(false)
const dropdownRef = ref(null)

const logout = () => {
  authStore.logout()
  showDropdown.value = false
  router.push('/login')
}

const closeDropdown = (e) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    showDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})
</script>


