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

        <div class="hidden lg:flex items-center gap-1.5 xl:gap-2">
          <RouterLink 
            to="/" 
            class="group flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50/80 hover:-translate-y-0.5 active:scale-95 transition-all duration-200" 
            active-class="!bg-blue-50 !text-blue-600 !shadow-xs border border-blue-100/80"
          >
            <HomeIcon class="w-4 h-4 text-blue-500 transition-transform duration-300 group-hover:scale-110" />
            <span>หน้าแรก</span>
          </RouterLink>

          <RouterLink 
            to="/places" 
            class="group flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-bold text-gray-600 hover:text-emerald-600 hover:bg-emerald-50/80 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 relative" 
            active-class="!bg-emerald-50 !text-emerald-700 !shadow-xs border border-emerald-100/80"
          >
            <CompassIcon class="w-4 h-4 text-emerald-500 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-45" />
            <span>เที่ยวไหนดี</span>
            <span class="px-1.5 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded-md leading-none shadow-2xs">
              ฮิต
            </span>
          </RouterLink>

          <RouterLink 
            to="/restaurants" 
            class="group flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-bold text-gray-600 hover:text-orange-600 hover:bg-orange-50/80 hover:-translate-y-0.5 active:scale-95 transition-all duration-200" 
            active-class="!bg-orange-50 !text-orange-700 !shadow-xs border border-orange-100/80"
          >
            <UtensilsIcon class="w-4 h-4 text-orange-500 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12" />
            <span>กินอะไรดี</span>
          </RouterLink>

          <RouterLink 
            to="/hotels" 
            class="group flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-bold text-gray-600 hover:text-purple-600 hover:bg-purple-50/80 hover:-translate-y-0.5 active:scale-95 transition-all duration-200" 
            active-class="!bg-purple-50 !text-purple-700 !shadow-xs border border-purple-100/80"
          >
            <BedDoubleIcon class="w-4 h-4 text-purple-500 transition-transform duration-300 group-hover:scale-110" />
            <span>พักที่ไหน</span>
          </RouterLink>
        </div>
      </div>

      <!-- Right: Actions -->
      <div class="flex items-center gap-6">
        <RouterLink to="/planner" class="group hidden sm:flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-bold text-sm hover:bg-blue-100 hover:-translate-y-0.5 hover:shadow-md active:scale-95 transition-all duration-200 border border-blue-100">
          <svg class="w-4 h-4 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          <span>แผนเดินทาง</span>
          <span v-if="tripStore.tripItems.length > 0" class="bg-blue-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full ml-1 transition-transform duration-300 group-hover:scale-110">{{ tripStore.tripItems.length }}</span>
        </RouterLink>
        <RouterLink to="/favorites" class="heart-btn group hidden sm:flex items-center justify-center text-red-500 hover:text-red-600 transition">
          <HeartIcon class="heart-icon w-5 h-5 group-hover:fill-current" />
          <!-- <span>รายการโปรด</span> -->
        </RouterLink>
        
        <!-- Notification Bell & Popover -->
        <div class="relative" ref="notifRef">
          <button 
            @click="toggleNotifs" 
            class="bell-btn group flex items-center justify-center text-yellow-400 hover:text-yellow-500 transition cursor-pointer p-1.5 rounded-full hover:bg-yellow-50/60 relative"
            title="การแจ้งเตือน"
          >
            <BellIcon class="bell-icon w-5 h-5 group-hover:fill-current" />
            <span 
              v-if="notifStore.unreadCount > 0" 
              class="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center ring-2 ring-white shadow-sm animate-pulse"
            >
              {{ notifStore.unreadCount > 99 ? '99+' : notifStore.unreadCount }}
            </span>
          </button>

          <!-- Notification Dropdown Popover -->
          <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="transform scale-95 opacity-0 -translate-y-2"
            enter-to-class="transform scale-100 opacity-100 translate-y-0"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="transform scale-100 opacity-100 translate-y-0"
            leave-to-class="transform scale-95 opacity-0 -translate-y-2"
          >
            <div 
              v-if="showNotifs" 
              class="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
            >
              <!-- Header -->
              <div class="p-4 pb-3 border-b border-gray-100 bg-gradient-to-r from-blue-50/60 via-white to-indigo-50/40">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="font-extrabold text-gray-900 text-base">การแจ้งเตือน</span>
                    <span 
                      v-if="notifStore.unreadCount > 0" 
                      class="bg-red-50 text-red-600 border border-red-200/60 text-[11px] font-bold px-2 py-0.5 rounded-full"
                    >
                      {{ notifStore.unreadCount }} ใหม่
                    </span>
                  </div>
                  <button 
                    v-if="notifStore.unreadCount > 0" 
                    @click="handleMarkAllAsRead" 
                    class="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 transition py-1 px-2 rounded-lg hover:bg-blue-50 cursor-pointer"
                  >
                    <CheckCheckIcon class="w-3.5 h-3.5" />
                    <span>อ่านทั้งหมด</span>
                  </button>
                </div>

                <!-- Filter Tabs -->
                <div class="flex items-center gap-2 mt-3 pt-2 border-t border-gray-100">
                  <button 
                    @click="notifFilter = 'all'" 
                    class="px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer"
                    :class="notifFilter === 'all' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-100'"
                  >
                    ทั้งหมด ({{ notifStore.notifications.length }})
                  </button>
                  <button 
                    @click="notifFilter = 'unread'" 
                    class="px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer"
                    :class="notifFilter === 'unread' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-100'"
                  >
                    ยังไม่ได้อ่าน ({{ notifStore.unreadCount }})
                  </button>
                </div>
              </div>

              <!-- Body List -->
              <div class="max-h-[380px] overflow-y-auto divide-y divide-gray-50">
                <!-- Loading State -->
                <div v-if="notifStore.loading && notifStore.notifications.length === 0" class="p-8 text-center text-gray-400">
                  <div class="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                  <span class="text-xs">กำลังโหลดการแจ้งเตือน...</span>
                </div>

                <!-- Empty State -->
                <div v-else-if="filteredNotifications.length === 0" class="p-8 text-center">
                  <div class="w-12 h-12 rounded-2xl bg-yellow-50 text-yellow-500 flex items-center justify-center mx-auto mb-3 shadow-inner">
                    <BellIcon class="w-6 h-6" />
                  </div>
                  <p class="text-sm font-bold text-gray-800 mb-1">
                    {{ notifFilter === 'unread' ? 'ไม่มีข้อความที่ยังไม่ได้อ่าน' : 'ไม่มีการแจ้งเตือนในขณะนี้' }}
                  </p>
                  <p class="text-xs text-gray-400">
                    ระบบจะแจ้งเตือนเมื่อมีกิจกรรม อัปเดตทริป หรือข่าวสารใหม่ๆ
                  </p>
                </div>

                <!-- Notification Items -->
                <div 
                  v-for="notif in filteredNotifications" 
                  :key="notif.id"
                  @click="handleNotificationClick(notif)"
                  class="p-3.5 flex items-start gap-3 transition cursor-pointer group relative"
                  :class="notif.isRead ? 'bg-white hover:bg-gray-50/80' : 'bg-blue-50/40 hover:bg-blue-50/80'"
                >
                  <!-- Icon by Type -->
                  <div 
                    class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                    :class="getTypeConfig(notif.type).bgClass"
                  >
                    <component :is="getTypeConfig(notif.type).icon" class="w-4.5 h-4.5" />
                  </div>

                  <!-- Details -->
                  <div class="flex-1 min-w-0 pr-6">
                    <div class="flex items-center gap-1.5 mb-0.5">
                      <span class="text-xs font-extrabold text-gray-900 truncate">
                        {{ notif.title }}
                      </span>
                      <span 
                        v-if="!notif.isRead" 
                        class="w-2 h-2 rounded-full bg-blue-500 shrink-0 ring-2 ring-blue-200"
                      ></span>
                    </div>
                    <p class="text-xs text-gray-600 leading-relaxed line-clamp-2 mb-1.5">
                      {{ notif.message }}
                    </p>
                    <div class="flex items-center gap-2 text-[11px] text-gray-400">
                      <span class="px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 text-[10px] font-medium">
                        {{ getTypeConfig(notif.type).label }}
                      </span>
                      <span>•</span>
                      <span>{{ formatRelativeTime(notif.createdAt) }}</span>
                    </div>
                  </div>

                  <!-- Action: Delete -->
                  <button 
                    @click="(e) => handleDeleteNotif(e, notif.id)"
                    class="absolute right-3 top-3 p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition cursor-pointer"
                    title="ลบการแจ้งเตือน"
                  >
                    <Trash2Icon class="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <!-- Footer -->
              <div v-if="filteredNotifications.length > 0" class="p-2.5 bg-gray-50 border-t border-gray-100 text-center">
                <span class="text-[11px] text-gray-400">
                  คลิกที่การแจ้งเตือนเพื่อดูรายละเอียดทริปหรือสถานที่
                </span>
              </div>
            </div>
          </Transition>
        </div>
        
        <div class="w-px h-6 bg-gray-200 hidden sm:block mx-1"></div>
        
        <template v-if="authStore.user">
          <div class="relative" ref="dropdownRef">
            <div @click="showDropdown = !showDropdown" class="flex items-center gap-3 cursor-pointer group">
              <div class="w-9 h-9 rounded-full overflow-hidden bg-blue-100 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-sm">
                 <img v-if="authStore.user.avatarUrl" :src="authStore.user.avatarUrl" alt="Avatar" class="w-full h-full object-cover" />
                 <div v-else class="w-full h-full flex items-center justify-center text-blue-600 font-bold text-sm">{{ authStore.user.username.charAt(0).toUpperCase() }}</div>
              </div>
              <div class="hidden sm:flex items-center gap-1">
                 <span class="text-sm font-bold text-gray-700">สวัสดี, {{ authStore.user.username }}</span>
                 <ChevronDownIcon class="w-4 h-4 text-gray-400 group-hover:text-gray-700 transition" />
              </div>
            </div>
            
            <div v-if="showDropdown" class="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                
            <RouterLink 
              v-if="authStore.user?.role === 1" 
              to="/admin" 
              class="flex items-center gap-2 mx-2 mb-1 px-3 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded-lg transition font-bold border border-purple-200"
              @click="showDropdown = false"
            >
              <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              <span>ระบบแอดมิน</span>
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
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { 
  HeartIcon, 
  BellIcon, 
  ChevronDownIcon, 
  CheckCheckIcon, 
  Trash2Icon, 
  CalendarIcon, 
  AlertTriangleIcon, 
  SparklesIcon, 
  UsersIcon,
  HomeIcon,
  CompassIcon,
  UtensilsIcon,
  BedDoubleIcon
} from 'lucide-vue-next'
import { useAuthStore } from '../stores/auth'
import { useTripStore } from '../stores/trip'
import { useNotificationStore } from '../stores/notification'

const authStore = useAuthStore()
const tripStore = useTripStore()
const notifStore = useNotificationStore()
const router = useRouter()

// Dropdowns
const showDropdown = ref(false)
const dropdownRef = ref(null)

const showNotifs = ref(false)
const notifRef = ref(null)
const notifFilter = ref('all') // 'all' or 'unread'

let pollInterval = null

// Filtered notifications
const filteredNotifications = computed(() => {
  if (notifFilter.value === 'unread') {
    return notifStore.notifications.filter(n => !n.isRead)
  }
  return notifStore.notifications
})

// Type config for UI styling
const getTypeConfig = (type) => {
  switch (type) {
    case 0: // TripReminder
      return {
        icon: CalendarIcon,
        bgClass: 'bg-blue-100 text-blue-600',
        label: 'ทริปเดินทาง'
      }
    case 1: // BudgetAlert
      return {
        icon: AlertTriangleIcon,
        bgClass: 'bg-amber-100 text-amber-600',
        label: 'งบประมาณ'
      }
    case 2: // NewEvent
      return {
        icon: SparklesIcon,
        bgClass: 'bg-purple-100 text-purple-600',
        label: 'กิจกรรมใหม่'
      }
    case 3: // CrowdAlert
      return {
        icon: UsersIcon,
        bgClass: 'bg-rose-100 text-rose-600',
        label: 'ความหนาแน่น'
      }
    default:
      return {
        icon: BellIcon,
        bgClass: 'bg-gray-100 text-gray-600',
        label: 'แจ้งเตือน'
      }
  }
}

// Relative time in Thai
const formatRelativeTime = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const now = new Date()
  const diffSec = Math.max(0, Math.floor((now - date) / 1000))

  if (diffSec < 60) return 'เมื่อสักครู่'
  const diffMin = Math.floor(diffSec / 60)
  if (diffMin < 60) return `${diffMin} นาทีที่แล้ว`
  const diffHour = Math.floor(diffMin / 60)
  if (diffHour < 24) return `${diffHour} ชั่วโมงที่แล้ว`
  const diffDay = Math.floor(diffHour / 24)
  if (diffDay === 1) return 'เมื่อวานนี้'
  if (diffDay < 7) return `${diffDay} วันที่แล้ว`
  return date.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })
}

// Notification Actions
const toggleNotifs = () => {
  if (!authStore.user) {
    router.push('/login')
    return
  }
  showNotifs.value = !showNotifs.value
  if (showNotifs.value) {
    showDropdown.value = false
    notifStore.fetchNotifications()
  }
}

const handleMarkAllAsRead = async () => {
  await notifStore.markAllAsRead()
}

const handleNotificationClick = async (notif) => {
  if (!notif.isRead) {
    await notifStore.markAsRead(notif.id)
  }
  showNotifs.value = false
  if (notif.relatedTripPlanId) {
    if (tripStore.switchTrip) {
      await tripStore.switchTrip(notif.relatedTripPlanId)
    }
    router.push('/planner')
  } else if (notif.relatedPlaceId) {
    router.push(`/place/${notif.relatedPlaceId}`)
  }
}

const handleDeleteNotif = async (e, notifId) => {
  e.stopPropagation()
  await notifStore.deleteNotification(notifId)
}

// Auth actions
const logout = () => {
  authStore.logout()
  notifStore.reset()
  showDropdown.value = false
  showNotifs.value = false
  router.push('/login')
}

// Click outside handler
const handleClickOutside = (e) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    showDropdown.value = false
  }
  if (notifRef.value && !notifRef.value.contains(e.target)) {
    showNotifs.value = false
  }
}

// Sync with auth status
watch(() => authStore.user, (newVal) => {
  if (newVal) {
    notifStore.fetchNotifications()
  } else {
    notifStore.reset()
  }
}, { immediate: true })

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  if (authStore.user) {
    notifStore.fetchNotifications()
    pollInterval = setInterval(() => {
      if (authStore.user) {
        notifStore.fetchUnreadCount()
      }
    }, 60000)
  }
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  if (pollInterval) {
    clearInterval(pollInterval)
  }
})
</script>
