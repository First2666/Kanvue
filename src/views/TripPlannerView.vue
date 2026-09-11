<!-- หน้าเว็บ: วางแผนการเดินทาง (Trip Planner) -->
<template>
  <div class="bg-gray-50 min-h-screen pb-20">
    <!-- Header -->
    <div class="bg-white border-b border-gray-200 shadow-sm">
       <div class="max-w-[1200px] mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div class="flex flex-col gap-2">
             <div class="flex items-center gap-3">
               <h1 class="text-2xl font-black text-[#003366]">แผนการเดินทาง</h1>
               <!-- Trip Selector -->
               <!-- Custom Trip Selector -->
               <div class="relative trip-dropdown-container z-20" v-if="tripStore.tripPlans.length > 0">
                 <button 
                   @click="showTripDropdown = !showTripDropdown"
                   class="flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-900 rounded-xl px-4 py-2 hover:bg-blue-100 transition-colors shadow-sm font-extrabold text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                 >
                   <span class="truncate max-w-[200px] sm:max-w-[300px]">
                     {{ currentPlan ? currentPlan.planName : 'ทริปไม่มีชื่อ' }}
                   </span>
                   <svg class="w-4 h-4 text-blue-600 transition-transform duration-200" :class="{ 'rotate-180': showTripDropdown }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                 </button>

                 <!-- Dropdown Menu -->
                 <Transition
                    enter-active-class="transition duration-100 ease-out"
                    enter-from-class="transform scale-95 opacity-0"
                    enter-to-class="transform scale-100 opacity-100"
                    leave-active-class="transition duration-75 ease-in"
                    leave-from-class="transform scale-100 opacity-100"
                    leave-to-class="transform scale-95 opacity-0"
                  >
                   <div v-if="showTripDropdown" class="absolute left-0 top-full mt-2 w-[280px] sm:w-[320px] bg-white rounded-2xl shadow-xl border border-gray-100 py-2 overflow-hidden">
                     <div class="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">ทริปของคุณ</div>
                     <button 
                       v-for="plan in tripStore.tripPlans" 
                       :key="plan.id"
                       @click="tripStore.switchTrip(plan.id); showTripDropdown = false"
                       class="w-full text-left px-4 py-3 flex items-center justify-between hover:bg-blue-50 transition-colors"
                       :class="tripStore.tripPlanId === plan.id ? 'bg-blue-50' : ''"
                     >
                       <div>
                         <div class="font-bold text-gray-900 text-sm truncate max-w-[220px]" :class="{'text-blue-700': tripStore.tripPlanId === plan.id}">{{ plan.planName || 'ทริปไม่มีชื่อ' }}</div>
                         <div class="text-xs text-gray-500 mt-0.5">{{ formatDate(plan.startDate) }} - {{ formatDate(plan.endDate) }}</div>
                       </div>
                       <svg v-if="tripStore.tripPlanId === plan.id" class="w-5 h-5 text-blue-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                     </button>
                   </div>
                 </Transition>
               </div>
               <button v-if="tripStore.tripPlans.length > 0" @click="confirmDeleteTrip" class="text-xs bg-red-50 text-red-600 hover:bg-red-100 p-2 rounded-xl font-bold transition cursor-pointer border border-red-100" title="ลบทริปนี้">
                 <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
               </button>
               <button @click="openCreateModal" class="inline-flex items-center gap-1.5 text-xs bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-3.5 py-2 rounded-xl font-extrabold shadow-sm hover:shadow transition-all cursor-pointer">
                 <Plus class="w-3.5 h-3.5" />
                 <span>สร้างทริปใหม่</span>
               </button>
             </div>
             
             <!-- Trip Dates & Info -->
             <div class="flex items-center gap-3 text-sm text-gray-500" v-if="currentPlan">
               <div class="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md">
                 <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                 {{ formatDate(currentPlan.startDate) }} - {{ formatDate(currentPlan.endDate) }}
               </div>
               <span v-if="tripStore.tripItems.length > 0">
                 · {{ tripStore.tripItems.length }} สถานที่
               </span>
               <span v-if="totalDuration">
                 · ใช้เวลา {{ totalDuration }}
               </span>
             </div>
          </div>
          <div class="flex gap-3 shrink-0">
             <RouterLink to="/" class="px-4 py-2 rounded-xl font-bold bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition text-sm">
                ← กลับหน้าแรก
             </RouterLink>
             <button @click="clearAll" v-if="tripStore.tripItems.length > 0" class="px-4 py-2 rounded-xl font-bold bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 transition text-sm">
                ล้างทั้งหมด
             </button>
          </div>
       </div>
    </div>

    <!-- Create Trip Modal (Clean & Minimalist) -->
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 scale-98"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-98"
    >
      <div v-if="showCreateTripModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity" @click="showCreateTripModal = false"></div>

        <!-- Modal Box -->
        <div class="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 z-10 overflow-hidden">
          <!-- Header -->
          <div class="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100">
            <h2 class="text-lg font-bold text-gray-900">สร้างทริปใหม่</h2>
            <button 
              type="button"
              @click="showCreateTripModal = false"
              class="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              title="ปิด"
            >
              <X class="w-4 h-4" />
            </button>
          </div>

          <!-- Form Body -->
          <div class="p-6 space-y-4">
            <!-- Trip Name -->
            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">ชื่อทริป</label>
              <input 
                v-model="newTrip.name" 
                type="text" 
                class="w-full px-3.5 py-2.5 bg-gray-50/50 hover:bg-white focus:bg-white border border-gray-200 focus:border-blue-500 rounded-xl text-sm font-medium text-gray-900 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-gray-400" 
                placeholder="เช่น ทริปกาญจนบุรี 2 วัน 1 คืน"
                autofocus
              >
            </div>

            <!-- Date Range -->
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider">วันที่เดินทาง</label>
                <span v-if="tripDurationText && !tripDurationText.error" class="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                  {{ tripDurationText.text }}
                </span>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <span class="block text-[11px] text-gray-500 mb-1">วันเริ่มต้น</span>
                  <input 
                    v-model="newTrip.startDate" 
                    type="date" 
                    class="w-full px-3 py-2 bg-gray-50/50 hover:bg-white focus:bg-white border border-gray-200 focus:border-blue-500 rounded-xl text-xs sm:text-sm text-gray-900 focus:ring-2 focus:ring-blue-100 outline-none transition-all cursor-pointer"
                  />
                </div>
                <div>
                  <span class="block text-[11px] text-gray-500 mb-1">วันสิ้นสุด</span>
                  <input 
                    v-model="newTrip.endDate" 
                    type="date" 
                    :min="newTrip.startDate"
                    class="w-full px-3 py-2 bg-gray-50/50 hover:bg-white focus:bg-white border border-gray-200 focus:border-blue-500 rounded-xl text-xs sm:text-sm text-gray-900 focus:ring-2 focus:ring-blue-100 outline-none transition-all cursor-pointer"
                  />
                </div>
              </div>

              <p v-if="tripDurationText && tripDurationText.error" class="text-xs text-red-500 font-medium mt-1.5">
                {{ tripDurationText.error }}
              </p>
            </div>
          </div>

          <!-- Footer -->
          <div class="px-6 py-4 bg-gray-50/60 border-t border-gray-100 flex items-center justify-end gap-2.5">
            <button 
              type="button"
              @click="showCreateTripModal = false" 
              class="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
            >
              ยกเลิก
            </button>
            <button 
              type="button"
              @click="createNewTrip" 
              :disabled="isCreatingTrip || !newTrip.name || !newTrip.startDate || !newTrip.endDate || (tripDurationText && tripDurationText.error)" 
              class="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-xs disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span v-if="isCreatingTrip">กำลังสร้าง...</span>
              <span v-else>สร้างทริป</span>
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <div class="max-w-[1200px] mx-auto px-6 mt-8">
      <!-- Empty State -->
      <div v-if="tripStore.tripItems.length === 0" class="bg-white rounded-2xl p-16 text-center border border-gray-100">
         <div class="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
         </div>
         <h3 class="text-xl font-bold text-gray-900 mb-2">ยังไม่มีสถานที่ในแผน</h3>
         <p class="text-gray-500 mb-6 max-w-md mx-auto">ไปเลือกสถานที่ที่สนใจแล้วกด "จัดลงทริป" เพื่อเริ่มวางแผนการเดินทาง</p>
         <RouterLink to="/places" class="inline-block bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition">ค้นหาสถานที่</RouterLink>
      </div>

      <!-- Main Content -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Timeline (Left - 2 cols) -->
        <div class="lg:col-span-2">

          <!-- Minimalist Trip Completed Banner -->
          <div v-if="isTripCompleted" class="mb-6 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div class="flex items-center gap-3.5">
                <div class="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
                  <CheckCircle2 class="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <div class="flex items-center gap-2 mb-0.5">
                    <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-100">
                      จบทริปสมบูรณ์
                    </span>
                    <span class="text-xs text-slate-400">ครบทั้ง {{ tripStore.tripItems.length }} จุดหมาย</span>
                  </div>
                  <h3 class="text-base font-extrabold text-slate-800">เช็คอินครบทุกสถานที่ในทริปนี้แล้ว</h3>
                </div>
              </div>
              <button 
                @click="resetCheckIn" 
                class="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors shrink-0 cursor-pointer shadow-2xs"
              >
                <RotateCcw class="w-3.5 h-3.5 text-slate-500" />
                <span>เริ่มเดินทางใหม่ (รีเซ็ต)</span>
              </button>
            </div>
          </div>
          
          <!-- Start Settings & Smart Auto-Schedule -->
          <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4" v-if="tripStore.tripItems.length > 0">
            <div class="flex items-center gap-3 flex-wrap">
              <div class="flex items-center gap-2">
                <Clock class="w-5 h-5 text-blue-600" />
                <span class="font-bold text-gray-700 text-sm">เวลาเริ่มออกเดินทาง:</span>
                <input type="time" v-model="tripStartTime" class="border border-blue-200 rounded-xl px-2.5 py-1.5 font-black text-blue-700 outline-none focus:border-blue-500 bg-blue-50 text-sm shadow-2xs" />
              </div>
            </div>

            <div class="flex items-center gap-2 shrink-0">
              <!-- Check-in Progress Badge -->
              <div class="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/80 text-xs font-bold text-slate-700">
                <span class="w-2 h-2 rounded-full" :class="isTripCompleted ? 'bg-emerald-500' : 'bg-blue-500 animate-pulse'"></span>
                <span>เช็คอินแล้ว {{ Math.min(activeStep, tripStore.tripItems.length) }}/{{ tripStore.tripItems.length }}</span>
                <button v-if="activeStep > 0" @click="resetCheckIn" class="text-slate-400 hover:text-red-500 ml-1 text-xs underline cursor-pointer" title="รีเซ็ตการเช็คอิน">รีเซ็ต</button>
              </div>

              <button @click="toggleUserLocation" :class="userLocation ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'" class="flex items-center gap-2 px-3 py-1.5 rounded-lg border font-bold text-xs transition cursor-pointer">
                <MapPin class="w-3.5 h-3.5" :class="userLocation ? 'text-green-500' : 'text-gray-400'" />
                <span>{{ userLocation ? 'ใช้ตำแหน่งปัจจุบันแล้ว' : 'ใช้ GPS เริ่มต้น' }}</span>
              </button>
            </div>
          </div>

          <!-- Conflict / Reassurance Notification Banner -->
          <div v-if="timeConflicts.length > 0" class="bg-gradient-to-r from-rose-50 via-amber-50 to-orange-50 border border-rose-200 rounded-2xl p-4 mb-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div class="flex items-start gap-3">
              <div class="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 font-bold text-base shadow-2xs">
                <AlertTriangle class="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <h4 class="text-sm font-black text-rose-950 flex items-center gap-2">
                  <span>ตรวจพบ {{ timeConflicts.length }} สถานที่ที่อาจปิดก่อนไปถึง หรือไปถึงก่อนเวลาเปิด!</span>
                </h4>
                <p class="text-xs text-rose-800 mt-0.5">
                  {{ timeConflicts[0].operatingStatus.alertMessage }}
                </p>
              </div>
            </div>
            <button @click="autoOptimizeSchedule" class="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center gap-1.5 shrink-0 cursor-pointer self-start sm:self-auto">
              <Sparkles class="w-3.5 h-3.5" />
              <span>ปรับเวลาให้พอดีทันที</span>
            </button>
          </div>
          <div v-else-if="tripStore.tripItems.length > 0" class="bg-emerald-50/90 border border-emerald-200 rounded-2xl px-4 py-3 mb-6 shadow-2xs flex items-center justify-between gap-3 text-emerald-800 text-xs font-bold">
            <div class="flex items-center gap-2">
              <CheckCircle2 class="w-4 h-4 text-emerald-600 shrink-0" />
              <span>ตารางเวลาเปิด-ปิดลงตัวสมบูรณ์! ทุกสถานที่อยู่ในช่วงเวลาเปิดทำการ (เดินทางได้ราบรื่น ไม่ติดสถานที่ปิด)</span>
            </div>
          </div>

          <div class="relative pl-4 sm:pl-0">
            <!-- Vertical Line -->
            <div class="absolute left-4 sm:left-[23px] top-8 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-blue-200 hidden sm:block"></div>

            <div class="space-y-6 relative">
              
              <template v-for="(item, idx) in calculatedTimeline" :key="item.id + '-' + idx">
                <!-- Travel Route Info -->
                <div v-if="idx > 0 || (idx === 0 && userLocation)" class="pl-14 sm:pl-24 py-1 flex items-center gap-3 opacity-80" :class="{'mb-4 -mt-2': idx === 0}">
                   <div class="border-l-2 border-dashed border-gray-300 h-10 -ml-[2px] sm:hidden"></div>
                   <div class="bg-gray-100 rounded-full px-3 py-1 flex items-center gap-2 text-xs font-bold text-gray-500">
                     <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"/></svg>
                     เดินทางจาก{{ idx === 0 ? 'จุดเริ่มต้น' : 'จุดก่อนหน้า' }} {{ item.travelFromPrevMins }} นาที <span class="font-normal opacity-70">({{ item.travelFromPrevKm }} กม.)</span>
                   </div>
                </div>
                
                <div class="relative group">
                  <!-- Node dot with type color -->
                  <div :class="['absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-[0_0_0_4px_rgba(255,255,255,1)] z-10 flex items-center justify-center hidden sm:flex transition-transform group-hover:scale-110 border-4', 
                    idx < activeStep 
                      ? 'border-emerald-500 text-emerald-600' 
                      : (idx === activeStep && !isTripCompleted 
                        ? 'border-blue-500 text-blue-600 ring-2 ring-blue-300' 
                        : getTypeConfig(item).nodeBorder)
                  ]">
                    <svg v-if="idx < activeStep" class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
                    <span v-else class="text-xs font-black">{{ idx + 1 }}</span>
                  </div>
                  
                  <!-- Card -->
                  <div :class="['sm:ml-12 rounded-2xl border shadow-sm hover:shadow-md transition-all overflow-hidden', 
                    item.operatingStatus && item.operatingStatus.status === 'closed'
                      ? 'bg-rose-50/20 border-rose-300 ring-2 ring-rose-200' 
                      : (item.operatingStatus && (item.operatingStatus.status === 'warning' || item.operatingStatus.status === 'early')
                        ? 'bg-amber-50/15 border-amber-300 ring-2 ring-amber-100'
                        : (idx === activeStep && !isTripCompleted 
                          ? 'bg-blue-50/40 border-blue-400 ring-4 ring-blue-100' 
                          : (idx < activeStep 
                            ? 'bg-emerald-50/20 border-emerald-100' 
                            : 'bg-white border-gray-100')))
                  ]">
                    <!-- Top: Image + Info -->
                    <div class="flex">
                      <!-- Image -->
                      <RouterLink :to="`/place/${item.id}`" class="w-28 sm:w-36 shrink-0 bg-gray-100 relative group/img overflow-hidden">
                        <img v-if="item.img" :src="item.img" class="w-full h-full object-cover min-h-[140px] group-hover/img:scale-105 transition-transform duration-500" />
                        <div v-else class="w-full h-full min-h-[140px] flex items-center justify-center text-gray-300">
                          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                        </div>
                        <!-- Mini type badge on image (mobile) -->
                        <div class="absolute top-2 left-2 sm:hidden">
                          <span :class="['w-6 h-6 rounded-lg flex items-center justify-center text-white shadow-sm', getTypeConfig(item).colorClass]">
                            <component :is="getTypeConfig(item).icon" class="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </RouterLink>

                      <!-- Info -->
                      <div class="flex-grow p-4 flex flex-col justify-between">
                        <div class="flex justify-between items-start">
                          <div>
                            <div class="flex items-center gap-2 mb-1.5 flex-wrap">
                              <!-- Category Badge -->
                              <span :class="['text-[11px] font-black px-2.5 py-0.5 rounded-lg border flex items-center gap-1 shadow-2xs', getTypeConfig(item).badgeClass]">
                                <component :is="getTypeConfig(item).icon" class="w-3 h-3" />
                                <span>{{ getTypeConfig(item).categoryBadge }} (จุดที่ {{ idx + 1 }})</span>
                              </span>

                              <!-- Operating Hours & Status Badge -->
                              <span v-if="item.operatingStatus" :class="['text-[11px] px-2.5 py-0.5 rounded-lg border flex items-center gap-1 font-bold shadow-2xs', item.operatingStatus.badgeClass]">
                                <Clock class="w-3 h-3" :class="item.operatingStatus.iconClass" />
                                <span>{{ item.operatingStatus.badgeText }}</span>
                              </span>

                              <!-- Operating Hours of the place -->
                              <span v-if="item.openingTime && item.placeType !== 'Accommodation'" class="text-[11px] text-slate-500 font-medium bg-slate-100/80 px-2 py-0.5 rounded-md">
                                เวลาทำการ: {{ formatTimeStr(item.openingTime) }} - {{ formatTimeStr(item.closingTime) }} น.
                              </span>
                            </div>

                            <h3 class="text-base font-extrabold text-gray-900 line-clamp-1 hover:text-blue-600 transition-colors">
                              <RouterLink :to="`/place/${item.id}`">{{ item.title }}</RouterLink>
                            </h3>
                            <p class="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                              <MapPin class="w-3.5 h-3.5 shrink-0 text-gray-400" />
                              <span class="line-clamp-1">{{ item.location }}</span>
                            </p>

                            <!-- Operating Conflict Alert Banner inside card -->
                            <div v-if="item.operatingStatus && item.operatingStatus.alertMessage" :class="['my-2 p-2.5 rounded-xl border text-xs font-bold flex items-center justify-between gap-2 shadow-2xs', item.operatingStatus.status === 'closed' ? 'bg-rose-50 text-rose-900 border-rose-200' : 'bg-amber-50 text-amber-900 border-amber-200']">
                              <div class="flex items-center gap-1.5">
                                <AlertCircle v-if="item.operatingStatus.status === 'closed'" class="w-4 h-4 text-rose-600 shrink-0" />
                                <AlertTriangle v-else class="w-4 h-4 text-amber-600 shrink-0" />
                                <span>{{ item.operatingStatus.alertMessage }}</span>
                              </div>
                              <button @click="autoOptimizeSchedule" class="text-[11px] underline shrink-0 hover:opacity-80 cursor-pointer font-extrabold text-blue-700">
                                ปรับเวลาให้พอดี
                              </button>
                            </div>

                          </div>
                          <!-- Actions -->
                          <div class="flex items-center gap-1.5 shrink-0 ml-2">
                            <button @click="moveUp(idx)" :disabled="idx === 0" class="p-1.5 rounded-lg text-gray-500 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-30 transition cursor-pointer" title="เลื่อนขึ้น">
                               <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"/></svg>
                            </button>
                            <button @click="moveDown(idx)" :disabled="idx === tripStore.tripItems.length - 1" class="p-1.5 rounded-lg text-gray-500 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-30 transition cursor-pointer" title="เลื่อนลง">
                               <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/></svg>
                            </button>
                            <button @click="removeItem(item.id)" class="p-1.5 rounded-lg text-gray-500 bg-gray-50 hover:bg-red-50 hover:text-red-600 transition ml-1 cursor-pointer" title="ลบ">
                               <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
                            </button>
                          </div>
                        </div>

                        <!-- Auto Calculated Time + Cost Row -->
                        <div class="flex flex-wrap items-center gap-3 mt-3 pt-3 border-t border-gray-50">
                          <div class="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                            <Clock class="w-4 h-4 text-blue-500 shrink-0" />
                            <template v-if="item.placeType === 'Accommodation'">
                              <span class="text-xs text-gray-500 font-medium">เช็คอิน:</span>
                              <span class="text-sm font-bold text-gray-800">{{ item.calculatedArrive }} น.</span>
                              <span class="text-[10px] text-indigo-700 bg-indigo-50 border border-indigo-200/60 font-bold px-1.5 py-0.5 rounded">พักค้างคืน</span>
                            </template>
                            <template v-else>
                              <span class="text-sm font-bold text-gray-700">{{ item.calculatedArrive }}</span>
                              <span class="text-gray-400 text-xs px-1">→</span>
                              <span class="text-sm font-bold text-gray-700">{{ item.calculatedLeave }}</span>
                            </template>
                          </div>
                          
                          <div class="flex items-center gap-1.5 ml-auto" :title="item.placeType === 'Accommodation' ? 'ค่าที่พัก' : item.placeType === 'Restaurant' ? 'ค่าอาหารโดยประมาณ' : 'ค่าเข้าชม/กิจกรรม'">
                            <span class="text-[11px] text-gray-400 font-bold">
                              {{ item.placeType === 'Accommodation' ? 'ค่าที่พัก' : item.placeType === 'Restaurant' ? 'ค่าอาหาร' : 'ค่าเข้า' }}
                            </span>
                            <span class="text-xs text-gray-400 font-bold">฿</span>
                            <input type="number" :value="item.estimatedCost || 0" @change="e => updateField(idx, 'estimatedCost', parseFloat(e.target.value) || 0)" class="border-0 bg-gray-50 rounded-md px-2 py-1 text-xs font-bold text-gray-800 w-[70px] text-right focus:ring-1 focus:ring-blue-500 outline-none" />
                          </div>

                          <!-- Check In Button & Status -->
                          <button v-if="idx === activeStep && !isTripCompleted" @click="handleCheckIn(idx)" class="ml-2 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-blue-700 transition shadow-sm whitespace-nowrap cursor-pointer">✓ เช็คอินว่าถึงแล้ว</button>
                          <div v-else-if="idx < activeStep" class="ml-2 flex items-center gap-1.5 whitespace-nowrap">
                            <span class="text-emerald-700 bg-emerald-50 border border-emerald-200/80 rounded-lg text-xs font-bold px-2.5 py-1 flex items-center gap-1 shadow-2xs">
                              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg> 
                              ผ่านแล้ว
                            </span>
                            <button 
                              v-if="idx === activeStep - 1" 
                              @click="undoCheckIn" 
                              title="ย้อนกลับการเช็คอินจุดนี้" 
                              class="text-gray-400 hover:text-amber-600 p-1 rounded hover:bg-gray-100 transition cursor-pointer text-xs"
                            >
                              ↺ ย้อนกลับ
                            </button>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>

          <!-- Quick Add Category Cards -->
          <div class="mt-8 p-5 bg-white rounded-3xl border border-gray-200/80 shadow-xs">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h4 class="text-sm font-black text-gray-900 flex items-center gap-1.5">
                  <PlusCircle class="w-4 h-4 text-blue-600" />
                  <span>เพิ่มสถานที่ลงในทริปนี้</span>
                </h4>
                <p class="text-xs text-gray-400 mt-0.5">เลือกหมวดหมู่ที่ต้องการเพิ่มลงในแผนเดินทาง</p>
              </div>
              <span class="text-xs text-blue-600 font-bold bg-blue-50 px-2.5 py-1 rounded-xl w-fit">
                ปัจจุบัน {{ tripStore.tripItems.length }} รายการ
              </span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <!-- Add Attraction -->
              <RouterLink 
                to="/places" 
                class="group flex items-center justify-between p-3.5 rounded-2xl border border-emerald-200/80 bg-emerald-50/40 hover:bg-emerald-50 text-emerald-800 transition-all hover:scale-[1.02] shadow-2xs cursor-pointer"
              >
                <div class="flex items-center gap-2.5">
                  <div class="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    <Compass class="w-4 h-4" />
                  </div>
                  <div class="text-left">
                    <div class="text-xs font-black">ที่เที่ยว</div>
                    <div class="text-[10px] text-emerald-600">น้ำตก ภูเขา ประวัติศาสตร์</div>
                  </div>
                </div>
                <Plus class="w-4 h-4 text-emerald-600 group-hover:rotate-90 transition-transform" />
              </RouterLink>

              <!-- Add Restaurant -->
              <RouterLink 
                to="/restaurants" 
                class="group flex items-center justify-between p-3.5 rounded-2xl border border-amber-200/80 bg-amber-50/40 hover:bg-amber-50 text-amber-800 transition-all hover:scale-[1.02] shadow-2xs cursor-pointer"
              >
                <div class="flex items-center gap-2.5">
                  <div class="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                    <Utensils class="w-4 h-4" />
                  </div>
                  <div class="text-left">
                    <div class="text-xs font-black">ร้านอาหาร & คาเฟ่</div>
                    <div class="text-[10px] text-amber-600">ริมน้ำ อาหารไทย คาเฟ่</div>
                  </div>
                </div>
                <Plus class="w-4 h-4 text-amber-600 group-hover:rotate-90 transition-transform" />
              </RouterLink>

              <!-- Add Accommodation -->
              <RouterLink 
                to="/hotels" 
                class="group flex items-center justify-between p-3.5 rounded-2xl border border-indigo-200/80 bg-indigo-50/40 hover:bg-indigo-50 text-indigo-800 transition-all hover:scale-[1.02] shadow-2xs cursor-pointer"
              >
                <div class="flex items-center gap-2.5">
                  <div class="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    <BedDouble class="w-4 h-4" />
                  </div>
                  <div class="text-left">
                    <div class="text-xs font-black">ที่พัก & รีสอร์ท</div>
                    <div class="text-[10px] text-indigo-600">แพริมน้ำ โรงแรม พูลวิลล่า</div>
                  </div>
                </div>
                <Plus class="w-4 h-4 text-indigo-600 group-hover:rotate-90 transition-transform" />
              </RouterLink>
            </div>
          </div>
        </div>

        <!-- Sidebar (Right - 1 col) -->
        <div class="lg:col-span-1 flex flex-col gap-5">
          <!-- Mini Map -->
          <div class="bg-white rounded-2xl border border-gray-100 p-2 overflow-hidden shadow-sm h-[300px] relative z-10">
             <iframe 
                v-if="googleMapsUrl"
                :src="googleMapsUrl" 
                class="w-full h-full rounded-xl z-0 bg-gray-100" 
                frameborder="0" 
                style="border:0;" 
                allowfullscreen="" 
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade">
             </iframe>
             <div v-else class="w-full h-full rounded-xl z-0 bg-gray-100 flex flex-col items-center justify-center text-gray-400">
                <MapIcon class="w-10 h-10 mb-2 opacity-50" />
                <span class="text-sm font-bold">ยังไม่มีเส้นทาง</span>
             </div>
          </div>

          <!-- Cost Summary with Categorized Breakdown -->
          <div class="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs">
             <div class="flex items-center justify-between mb-4">
               <h3 class="text-sm font-bold text-gray-900">สรุปค่าใช้จ่าย</h3>
               <span class="text-xs text-blue-600 font-bold bg-blue-50 px-2.5 py-0.5 rounded-full">
                 {{ tripStore.tripItems.length }} รายการ
               </span>
             </div>
             
             <!-- Category Breakdown Cards -->
             <div class="grid grid-cols-3 gap-2 mb-4 p-2.5 bg-gray-50 rounded-xl border border-gray-100 text-center">
               <div class="p-1">
                 <div class="text-[10px] font-bold text-emerald-600 flex items-center justify-center gap-1">
                   <Compass class="w-3 h-3" />
                   <span>ค่าเข้าชม</span>
                 </div>
                 <div class="text-xs font-black text-gray-800 mt-0.5">฿{{ attractionCosts.toLocaleString() }}</div>
               </div>
               <div class="p-1 border-x border-gray-200">
                 <div class="text-[10px] font-bold text-amber-600 flex items-center justify-center gap-1">
                   <Utensils class="w-3 h-3" />
                   <span>ค่าอาหาร</span>
                 </div>
                 <div class="text-xs font-black text-gray-800 mt-0.5">฿{{ restaurantCosts.toLocaleString() }}</div>
               </div>
               <div class="p-1">
                 <div class="text-[10px] font-bold text-indigo-600 flex items-center justify-center gap-1">
                   <BedDouble class="w-3 h-3" />
                   <span>ค่าที่พัก</span>
                 </div>
                 <div class="text-xs font-black text-gray-800 mt-0.5">฿{{ hotelCosts.toLocaleString() }}</div>
               </div>
             </div>

             <!-- Detailed Items List -->
             <div class="space-y-2 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
               <div v-for="(item, idx) in tripStore.tripItems" :key="'cost-'+idx" class="flex justify-between items-center py-1.5 border-b border-gray-50 last:border-0">
                  <div class="flex items-center gap-1.5 min-w-0 flex-1">
                    <component :is="getTypeConfig(item).icon" :class="['w-3.5 h-3.5 shrink-0', getTypeConfig(item).textClass]" />
                    <span class="text-xs text-gray-600 line-clamp-1">{{ item.title }}</span>
                  </div>
                  <span class="text-xs font-bold text-gray-900 ml-2 shrink-0">฿{{ (item.estimatedCost || 0).toLocaleString() }}</span>
               </div>
             </div>

             <!-- Total Row -->
             <div class="mt-4 pt-3 border-t-2 border-gray-900 flex justify-between items-center">
                <span class="text-sm font-bold text-gray-900">รวมทั้งหมด</span>
                <span class="text-xl font-black text-[#003366]">฿{{ totalCost.toLocaleString() }}</span>
             </div>
          </div>

          <!-- Schedule Overview (Timeline Sidebar) -->
          <div class="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs">
             <div class="flex items-center justify-between mb-4">
               <h3 class="text-sm font-bold text-gray-900">ไทม์ไลน์</h3>
               <span class="text-xs font-bold px-2.5 py-0.5 rounded-full" :class="isTripCompleted ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-50 text-blue-600'">
                 {{ isTripCompleted ? '✓ ครบทุกจุดแล้ว' : `ถึงจุดที่ ${Math.min(activeStep + 1, tripStore.tripItems.length)}/${tripStore.tripItems.length}` }}
               </span>
             </div>
             
              <div v-for="(item, idx) in calculatedTimeline" :key="'time-'+idx" class="flex items-start gap-3 py-2.5 border-b border-gray-50 last:border-0">
                 <div 
                   class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 transition-colors"
                   :class="idx < activeStep 
                     ? 'bg-emerald-500 text-white shadow-xs' 
                     : (idx === activeStep && !isTripCompleted 
                       ? 'bg-blue-600 text-white ring-2 ring-blue-200 animate-pulse' 
                       : (item.operatingStatus && item.operatingStatus.status === 'closed' ? 'bg-rose-100 text-rose-700' : 'bg-gray-100 text-gray-500'))"
                 >
                   <svg v-if="idx < activeStep" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                   <span v-else>{{ idx + 1 }}</span>
                 </div>
                 <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between gap-1">
                      <div class="flex items-center gap-1.5 min-w-0 flex-1">
                        <component :is="getTypeConfig(item).icon" :class="['w-3.5 h-3.5 shrink-0', getTypeConfig(item).textClass]" />
                        <p class="text-xs font-bold text-gray-800 line-clamp-1" :class="{'line-through text-gray-400': idx < activeStep}">{{ item.title }}</p>
                      </div>
                      <span v-if="idx < activeStep" class="text-[10px] font-bold text-emerald-600 shrink-0">✓ ผ่านแล้ว</span>
                      <span v-else-if="item.operatingStatus && item.operatingStatus.status === 'closed'" class="text-[10px] font-bold text-rose-600 shrink-0 inline-flex items-center gap-1">
                        <AlertCircle class="w-3 h-3" />
                        <span>เสี่ยงปิด</span>
                      </span>
                      <span v-else-if="idx === activeStep && !isTripCompleted" class="text-[10px] font-bold text-blue-600 shrink-0 inline-flex items-center gap-1">
                        <MapPin class="w-3 h-3" />
                        <span>กำลังเดินทาง</span>
                      </span>
                    </div>
                    <div class="flex items-center justify-between text-[11px] text-gray-500 mt-0.5">
                      <span>{{ item.calculatedArrive }} - {{ item.calculatedLeave }}</span>
                      <span v-if="item.openingTime && item.placeType !== 'Accommodation'" class="text-[10px] text-gray-400">
                        (เปิด {{ formatTimeStr(item.openingTime) }}-{{ formatTimeStr(item.closingTime) }})
                      </span>
                    </div>
                 </div>
              </div>
          </div>

          <!-- Tips -->
          <div class="bg-blue-50 rounded-2xl p-5 border border-blue-100">
             <h3 class="text-sm font-bold text-blue-800 mb-2 flex items-center gap-1.5">
               <Sparkles class="w-4 h-4 text-blue-600" />
               <span>เคล็ดลับ</span>
             </h3>
             <ul class="space-y-1.5 text-xs text-blue-700">
               <li>• กดที่ช่องเวลาเพื่อตั้งเวลาไปถึงและออก</li>
               <li>• แก้ไขค่าใช้จ่ายได้โดยกดที่ตัวเลข ฿</li>
               <li>• กดลูกศรขึ้น-ลงเพื่อจัดลำดับสถานที่</li>
               <li>• กดรูปภาพเพื่อดูรายละเอียดสถานที่</li>
             </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useTripStore } from '../stores/trip'
import { useDialog, useToast } from '../composables/useNotify'
import { 
  MapIcon, CheckCircle2, RotateCcw,
  Compass, Utensils, BedDouble, Plus, PlusCircle, Clock, MapPin, Sparkles, Coins,
  Calendar, CalendarDays, X, ArrowRight, Luggage, Wand2, AlertTriangle, AlertCircle
} from 'lucide-vue-next'

const tripStore = useTripStore()
const userLocation = ref(null)

const getStorageKey = () => `trip_active_step_${tripStore.tripPlanId || 'default'}`

const loadSavedStep = () => {
  try {
    const saved = localStorage.getItem(getStorageKey())
    if (saved !== null) {
      const parsed = parseInt(saved, 10)
      return isNaN(parsed) ? 0 : parsed
    }
  } catch (e) {
    console.error('Failed to load activeStep from localStorage', e)
  }
  return 0
}

const activeStep = ref(loadSavedStep())

// Watch for tripPlanId changes to load the corresponding step
watch(() => tripStore.tripPlanId, () => {
  activeStep.value = loadSavedStep()
}, { immediate: true })

// Watch activeStep changes to persist into localStorage
watch(activeStep, (newStep) => {
  try {
    localStorage.setItem(getStorageKey(), newStep.toString())
  } catch (e) {
    console.error('Failed to save activeStep to localStorage', e)
  }
})

// Safe length watcher: only clamp if activeStep exceeds newLen (allow activeStep === newLen for completed)
watch(() => tripStore.tripItems.length, (newLen) => {
  if (tripStore.isLoading) return
  if (newLen > 0 && activeStep.value > newLen) {
    activeStep.value = newLen
  }
})

const isTripCompleted = computed(() => {
  return tripStore.tripItems.length > 0 && activeStep.value >= tripStore.tripItems.length
})

const handleCheckIn = (idx) => {
  if (idx === activeStep.value) {
    activeStep.value++
    if (activeStep.value >= tripStore.tripItems.length) {
      toast.success('ยินดีด้วย! คุณเดินทางเช็คอินครบทุกสถานที่แล้ว')
    } else {
      const nextItem = tripStore.tripItems[activeStep.value]
      toast.success(`เช็คอินสำเร็จ! จุดหมายถัดไป: ${nextItem?.title || ''}`)
    }
  }
}

const undoCheckIn = () => {
  if (activeStep.value > 0) {
    activeStep.value--
    toast.info('ย้อนกลับการเช็คอินเรียบร้อย')
  }
}

const resetCheckIn = () => {
  activeStep.value = 0
  try {
    localStorage.setItem(getStorageKey(), '0')
  } catch (e) {}
  toast.success('รีเซ็ตการเช็คอินเรียบร้อยแล้ว เริ่มต้นเดินทางใหม่ได้เลย!')
}


  const routeCache = ref({})
  
  const fetchRouteCache = async () => {
    const items = tripStore.tripItems;
    if (!items || items.length === 0) return;
    
    // First leg: from userLocation
    if (userLocation.value && items[0].lat && items[0].lng) {
      const key = `${userLocation.value.lat},${userLocation.value.lng}-${items[0].lat},${items[0].lng}`;
      if (!routeCache.value[key]) {
        try {
          const res = await fetch(`https://router.project-osrm.org/route/v1/driving/${userLocation.value.lng},${userLocation.value.lat};${items[0].lng},${items[0].lat}?overview=false`);
          const data = await res.json();
          if (data.routes && data.routes.length > 0) {
            routeCache.value[key] = {
              distanceKm: data.routes[0].distance / 1000,
              travelTimeMins: Math.round(data.routes[0].duration / 60)
            };
          }
        } catch (e) { console.error('OSRM fetch failed', e) }
      }
    }
    
    // Subsequent legs
    for (let i = 1; i < items.length; i++) {
      const prev = items[i - 1];
      const curr = items[i];
      if (prev.lat && prev.lng && curr.lat && curr.lng) {
        const key = `${prev.lat},${prev.lng}-${curr.lat},${curr.lng}`;
        if (!routeCache.value[key]) {
          try {
            const res = await fetch(`https://router.project-osrm.org/route/v1/driving/${prev.lng},${prev.lat};${curr.lng},${curr.lat}?overview=false`);
            const data = await res.json();
            if (data.routes && data.routes.length > 0) {
              routeCache.value[key] = {
                distanceKm: data.routes[0].distance / 1000,
                travelTimeMins: Math.round(data.routes[0].duration / 60)
              };
            }
          } catch (e) { console.error('OSRM fetch failed', e) }
        }
      }
    }
  }

  watch(() => tripStore.tripItems, fetchRouteCache, { deep: true, immediate: true })
  watch(userLocation, fetchRouteCache)

const { confirm } = useDialog()
  const toast = useToast()

const showCreateTripModal = ref(false)
const showTripDropdown = ref(false)
const isCreatingTrip = ref(false)
const newTrip = ref({
  name: '',
  startDate: '',
  endDate: ''
})

const tripDurationText = computed(() => {
  if (!newTrip.value.startDate || !newTrip.value.endDate) return null
  const start = new Date(newTrip.value.startDate)
  const end = new Date(newTrip.value.endDate)
  const diffTime = end.getTime() - start.getTime()
  if (diffTime < 0) return { error: 'วันสิ้นสุดต้องอยู่หลังวันเริ่มต้น' }
  const diffDays = Math.round(diffTime / (1000 * 3600 * 24)) + 1
  const nights = diffDays - 1
  if (diffDays <= 1) {
    return { text: '1 วัน (ไปเช้า-เย็นกลับ)' }
  }
  return { text: `${diffDays} วัน ${nights} คืน` }
})

const formatDateForInput = (d) => {
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const openCreateModal = () => {
  if (!newTrip.value.startDate) {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    newTrip.value.startDate = formatDateForInput(today)
    newTrip.value.endDate = formatDateForInput(tomorrow)
  }
  showCreateTripModal.value = true
}

// Close dropdown if clicked outside
const closeDropdown = (e) => {
  if (!e.target.closest('.trip-dropdown-container')) {
    showTripDropdown.value = false
  }
}

const googleMapsUrl = computed(() => {
    if (tripStore.tripItems.length === 0) {
      return 'https://maps.google.com/maps?q=' + encodeURIComponent('กาญจนบุรี') + '&t=&z=10&ie=UTF8&iwloc=&output=embed';
    }
    
    const currentIndex = Math.min(activeStep.value, tripStore.tripItems.length - 1);
    const currItem = tripStore.tripItems[currentIndex];
    
    let saddr = '';
    
    if (currentIndex === 0) {
      if (userLocation.value) {
        saddr = userLocation.value.lat + ',' + userLocation.value.lng;
      }
    } else {
      const prevItem = tripStore.tripItems[currentIndex - 1];
      saddr = prevItem.lat + ',' + prevItem.lng;
    }
    
    const daddr = currItem.lat + ',' + currItem.lng;
    
    if (saddr) {
      return 'https://maps.google.com/maps?saddr=' + saddr + '&daddr=' + daddr + '&t=&z=12&ie=UTF8&iwloc=&output=embed';
    } else {
      return 'https://maps.google.com/maps?q=' + daddr + '&t=&z=14&ie=UTF8&iwloc=&output=embed';
    }
  });

onMounted(() => {
  document.addEventListener('click', closeDropdown)
  
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})

const currentPlan = computed(() => {
  return tripStore.tripPlans.find(p => p.id === tripStore.tripPlanId)
})

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const createNewTrip = async () => {
  if (!newTrip.value.name || !newTrip.value.startDate || !newTrip.value.endDate) return
  if (tripDurationText.value && tripDurationText.value.error) {
    toast.error(tripDurationText.value.error)
    return
  }
  isCreatingTrip.value = true
  try {
    await tripStore.createTrip(
      newTrip.value.name.trim(), 
      new Date(newTrip.value.startDate).toISOString(), 
      new Date(newTrip.value.endDate).toISOString()
    )
    showCreateTripModal.value = false
    newTrip.value = { name: '', startDate: '', endDate: '' }
  } catch (e) {
    console.error('Failed to create trip', e)
  } finally {
    isCreatingTrip.value = false
  }
}

const confirmDeleteTrip = async () => {
  if (!tripStore.tripPlanId) return
  const isConfirmed = await confirm({
    title: 'ลบทริปการเดินทาง?',
    message: 'คุณแน่ใจหรือไม่ว่าต้องการลบทริปนี้ ข้อมูลและสถานที่ในทริปนี้จะถูกลบทั้งหมดและไม่สามารถกู้คืนได้?',
    confirmText: 'ลบทริป',
    cancelText: 'ยกเลิก'
  })

  if (isConfirmed) {
    await tripStore.deleteTrip(tripStore.tripPlanId)
  }
}

const getTypeConfig = (item) => {
  let type = (item.placeType || item.$type || '').toLowerCase()
  if (type === 'restaurant' || item.foodType != null) {
    return {
      type: 'Restaurant',
      label: 'ร้านอาหาร & คาเฟ่',
      categoryBadge: 'มื้ออาหาร / คาเฟ่',
      contextDesc: 'พักรับประทานอาหาร ~ 1 ชม.',
      icon: Utensils,
      colorClass: 'bg-amber-500',
      textClass: 'text-amber-700',
      badgeClass: 'bg-amber-50 text-amber-700 border-amber-200/80',
      nodeBorder: 'border-amber-500 text-amber-600',
      cardActiveRing: 'ring-amber-200 border-amber-400 bg-amber-50/30'
    }
  }
  if (type === 'accommodation' || item.accommodationType != null || item.pricePerNight != null) {
    return {
      type: 'Accommodation',
      label: 'ที่พัก & รีสอร์ท',
      categoryBadge: 'เช็คอินที่พัก',
      contextDesc: 'เช็คอินพักผ่อน / พักค้างคืน',
      icon: BedDouble,
      colorClass: 'bg-indigo-600',
      textClass: 'text-indigo-700',
      badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
      nodeBorder: 'border-indigo-500 text-indigo-600',
      cardActiveRing: 'ring-indigo-200 border-indigo-400 bg-indigo-50/30'
    }
  }
  return {
    type: 'Attraction',
    label: 'สถานที่เที่ยว',
    categoryBadge: 'จุดท่องเที่ยว',
    contextDesc: 'เที่ยวชมประมาณ 1.5 - 2 ชม.',
    icon: Compass,
    colorClass: 'bg-emerald-600',
    textClass: 'text-emerald-700',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    nodeBorder: 'border-emerald-500 text-emerald-600',
    cardActiveRing: 'ring-emerald-200 border-emerald-400 bg-emerald-50/30'
  }
}

const totalCost = computed(() => {
  return tripStore.tripItems.reduce((sum, item) => sum + (parseFloat(item.estimatedCost) || 0), 0)
})

const attractionCosts = computed(() => {
  return tripStore.tripItems
    .filter(i => getTypeConfig(i).type === 'Attraction')
    .reduce((sum, i) => sum + (parseFloat(i.estimatedCost) || 0), 0)
})

const restaurantCosts = computed(() => {
  return tripStore.tripItems
    .filter(i => getTypeConfig(i).type === 'Restaurant')
    .reduce((sum, i) => sum + (parseFloat(i.estimatedCost) || 0), 0)
})

const hotelCosts = computed(() => {
  return tripStore.tripItems
    .filter(i => getTypeConfig(i).type === 'Accommodation')
    .reduce((sum, i) => sum + (parseFloat(i.estimatedCost) || 0), 0)
})

// Haversine distance formula (in km)
const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return R * c; // Distance in km
}

// Convert "HH:mm" to minutes since midnight
const timeToMins = (timeStr) => {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

// Convert minutes to "HH:mm"
const minsToTime = (mins) => {
  const d = Math.floor(mins / (24 * 60));
  let h = Math.floor((mins % (24 * 60)) / 60);
  let m = Math.floor(mins % 60);
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}${d > 0 ? ` (+${d} วัน)` : ''}`;
}

const tripStartTime = ref('08:00') // Default start time

  let geoWatcherId = null;
  const AUTO_CHECKIN_RADIUS_KM = 0.3; // 300 meters

  const stopGeoWatcher = () => {
    if (geoWatcherId !== null) {
      navigator.geolocation.clearWatch(geoWatcherId);
      geoWatcherId = null;
    }
  };

  onUnmounted(() => {
    stopGeoWatcher();
  });

  const checkAutoCheckIn = (lat, lng) => {
    if (activeStep.value >= tripStore.tripItems.length) return;
    
    const currItem = tripStore.tripItems[activeStep.value];
    if (currItem && currItem.lat && currItem.lng) {
      const dist = getDistanceFromLatLonInKm(lat, lng, currItem.lat, currItem.lng);
      if (dist <= AUTO_CHECKIN_RADIUS_KM) {
        toast.success(`ถึงเป้าหมายแล้ว! เช็คอินเข้า ${currItem.title} อัตโนมัติ`, { timeout: 5000 });
        handleCheckIn(activeStep.value);
      }
    }
  };

  const toggleUserLocation = () => {
    if (userLocation.value) {
      userLocation.value = null;
      stopGeoWatcher();
      toast.info('ปิดระบบนำทางและการเช็คอินอัตโนมัติแล้ว');
    } else {
      if ("geolocation" in navigator) {
        toast.success('เปิดระบบนำทางและเช็คอินอัตโนมัติเมื่อใกล้ถึงที่หมาย (300m)');
        
        // Initial fetch
        navigator.geolocation.getCurrentPosition((pos) => {
          userLocation.value = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          checkAutoCheckIn(pos.coords.latitude, pos.coords.longitude);
        }, (err) => {
          alert("ไม่สามารถดึงตำแหน่งปัจจุบันได้ กรุณาอนุญาตให้ใช้งาน GPS");
        });

        // Watch location
        geoWatcherId = navigator.geolocation.watchPosition((pos) => {
          userLocation.value = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          checkAutoCheckIn(pos.coords.latitude, pos.coords.longitude);
        }, (err) => {
          console.error("GPS Watch error", err);
        }, {
          enableHighAccuracy: true,
          maximumAge: 10000,
          timeout: 5000
        });

      } else {
        alert("เบราว์เซอร์นี้ไม่รองรับการดึงตำแหน่ง");
      }
    }
  }

  const customDurations = ref({})

  const setCustomDuration = (itemId, mins) => {
    customDurations.value[itemId] = mins
  }

  const formatTimeStr = (t) => {
    if (!t) return ''
    return String(t).substring(0, 5)
  }

  const checkOperatingStatus = (item, arriveMins, leaveMins) => {
    if (item.placeType === 'Accommodation') {
      return {
        status: 'ok',
        badgeText: 'เช็คอินพักค้างคืน (บริการ 24 ชม.)',
        badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
        iconClass: 'text-indigo-600',
        alertMessage: null
      }
    }

    if (!item.openingTime || !item.closingTime) {
      return {
        status: 'ok',
        badgeText: 'เปิดบริการตามปกติ',
        badgeClass: 'bg-slate-50 text-slate-700 border-slate-200',
        iconClass: 'text-slate-500',
        alertMessage: null
      }
    }

    const [oh, om] = item.openingTime.split(':').map(Number)
    const [ch, cm] = item.closingTime.split(':').map(Number)
    const openMins = oh * 60 + om
    const closeMins = ch * 60 + cm
    const openStr = formatTimeStr(item.openingTime)
    const closeStr = formatTimeStr(item.closingTime)

    // Check 1: Arrive after closing
    if (arriveMins >= closeMins) {
      return {
        status: 'closed',
        badgeText: `ปิดทำการแล้ว (ปิด ${closeStr} น.)`,
        badgeClass: 'bg-rose-100 text-rose-800 border-rose-300 font-extrabold',
        iconClass: 'text-rose-600',
        alertMessage: `แผนถึงเวลา ${minsToTime(arriveMins)} น. แต่สถานที่ปิดทำการเวลา ${closeStr} น. (ปิดแล้ว!)`
      }
    }

    // Check 2: Arrive before opening
    if (arriveMins < openMins) {
      const waitMins = openMins - arriveMins
      return {
        status: 'early',
        badgeText: `ยังไม่เปิด (เปิด ${openStr} น.)`,
        badgeClass: 'bg-amber-100 text-amber-900 border-amber-300 font-bold',
        iconClass: 'text-amber-600',
        alertMessage: `แผนถึงเวลา ${minsToTime(arriveMins)} น. ก่อนเวลาเปิดทำการ ${openStr} น. (ต้องรอ ${waitMins} นาที)`
      }
    }

    // Check 3: Closes before visit ends
    if (leaveMins > closeMins) {
      const availableMins = closeMins - arriveMins
      return {
        status: 'warning',
        badgeText: `ปิดก่อนเที่ยวเสร็จ (ปิด ${closeStr} น.)`,
        badgeClass: 'bg-amber-100 text-amber-900 border-amber-300 font-bold',
        iconClass: 'text-amber-600',
        alertMessage: `สถานที่จะปิดเวลา ${closeStr} น. ก่อนเที่ยวเสร็จ (มีเวลาเที่ยวเพียง ${availableMins} นาที)`
      }
    }

    // Check 4: On time!
    return {
      status: 'ok',
      badgeText: `ทันเวลาเปิด (${openStr} - ${closeStr} น.)`,
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200/80 font-bold',
      iconClass: 'text-emerald-600',
      alertMessage: null
    }
  }

  const calculatedTimeline = computed(() => {
    let currentMins = timeToMins(tripStartTime.value)
    
    return tripStore.tripItems.map((item, index) => {
      let travelTimeMins = 0
      let distanceKm = 0
      
      // Calculate travel from previous place OR from user location if it's the first place
      if (index > 0) {
        const prevItem = tripStore.tripItems[index - 1]
        if (prevItem.lat && prevItem.lng && item.lat && item.lng) {
           distanceKm = getDistanceFromLatLonInKm(prevItem.lat, prevItem.lng, item.lat, item.lng)
           travelTimeMins = Math.max(10, Math.round(distanceKm)) // At least 10 mins
        } else {
           travelTimeMins = 30 // Fallback 30 mins
        }
      } else if (index === 0 && userLocation.value && item.lat && item.lng) {
        distanceKm = getDistanceFromLatLonInKm(userLocation.value.lat, userLocation.value.lng, item.lat, item.lng)
        travelTimeMins = Math.max(10, Math.round(distanceKm))
      }
      
      currentMins += travelTimeMins
      const arriveTime = currentMins
      
      // Duration based on place type
      let durationMins = 90 // Default 1.5 hours
      const pType = getTypeConfig(item).type
      if (pType === 'Restaurant') durationMins = 60
      if (pType === 'Accommodation') durationMins = 0
      
      if (customDurations.value[item.id] !== undefined) {
        durationMins = customDurations.value[item.id]
      }
      
      currentMins += durationMins
      const leaveTime = currentMins
      
      const operatingStatus = checkOperatingStatus(item, arriveTime, leaveTime)
      
      return {
        ...item,
        calculatedArrive: minsToTime(arriveTime),
        calculatedLeave: minsToTime(leaveTime),
        arriveMins: arriveTime,
        leaveMins: leaveTime,
        travelFromPrevMins: travelTimeMins,
        travelFromPrevKm: distanceKm.toFixed(1),
        durationMins,
        operatingStatus
      }
    })
  })

  const timeConflicts = computed(() => {
    return calculatedTimeline.value.filter(item => item.operatingStatus && item.operatingStatus.status !== 'ok')
  })

  const autoOptimizeSchedule = () => {
    if (calculatedTimeline.value.length === 0) return

    let currentStartMins = timeToMins(tripStartTime.value)
    let earliestNeededStartMins = currentStartMins

    // 1. Check if first item opens later than arrival
    const first = calculatedTimeline.value[0]
    if (first && first.openingTime && first.placeType !== 'Accommodation') {
      const [oh, om] = first.openingTime.split(':').map(Number)
      const openMins = oh * 60 + om
      const travel = first.travelFromPrevMins || 0
      if (currentStartMins + travel < openMins) {
        earliestNeededStartMins = openMins - travel
      }
    }

    // 2. Check if any subsequent places close before arrival
    let maxOverMins = 0
    for (const item of calculatedTimeline.value) {
      if (item.placeType !== 'Accommodation' && item.closingTime) {
        const [ch, cm] = item.closingTime.split(':').map(Number)
        const closeMins = ch * 60 + cm
        if (item.arriveMins >= closeMins) {
          const neededShift = (item.arriveMins + 60) - closeMins
          if (neededShift > maxOverMins) {
            maxOverMins = neededShift
          }
        } else if (item.leaveMins > closeMins) {
          const neededShift = item.leaveMins - closeMins
          if (neededShift > maxOverMins) {
            maxOverMins = neededShift
          }
        }
      }
    }

    if (maxOverMins > 0) {
      // Trim durations if long
      let savedFromDuration = 0
      for (const item of tripStore.tripItems) {
        const pType = getTypeConfig(item).type
        if (pType === 'Attraction') {
          const curDur = customDurations.value[item.id] || 120
          if (curDur > 90) {
            customDurations.value[item.id] = 90
            savedFromDuration += (curDur - 90)
          }
        } else if (pType === 'Restaurant') {
          const curDur = customDurations.value[item.id] || 60
          if (curDur > 45) {
            customDurations.value[item.id] = 45
            savedFromDuration += (curDur - 45)
          }
        }
      }

      const remainingShift = Math.max(0, maxOverMins - savedFromDuration)
      if (remainingShift > 0) {
        earliestNeededStartMins = Math.max(360, earliestNeededStartMins - remainingShift)
      }
    }

    const h = Math.floor((earliestNeededStartMins % 1440) / 60).toString().padStart(2, '0')
    const m = Math.floor(earliestNeededStartMins % 60).toString().padStart(2, '0')
    tripStartTime.value = `${h}:${m}`

    toast.success(`ปรับเวลาเริ่มทริปเป็น ${tripStartTime.value} น. ทุกสถานที่อยู่ในเวลาเปิดทำการแล้ว!`)
  }

  const saveTimelineTimes = async () => {
    try {
      for (let i = 0; i < calculatedTimeline.value.length; i++) {
        const item = calculatedTimeline.value[i]
        const arriveStr = item.calculatedArrive.split(' ')[0] + ':00'
        const leaveStr = item.calculatedLeave.split(' ')[0] + ':00'
        await tripStore.updateItem(i, {
          startTime: arriveStr,
          endTime: leaveStr
        })
      }
      toast.success('บันทึกเวลาเปิด-ปิดและเวลาเดินทางลงในแผนเรียบร้อย!')
    } catch (e) {
      console.error(e)
      toast.error('ไม่สามารถบันทึกเวลาได้')
    }
  }

const totalDuration = computed(() => {
  if (calculatedTimeline.value.length === 0) return null
  const first = calculatedTimeline.value[0]
  const last = calculatedTimeline.value[calculatedTimeline.value.length - 1]
  // Extract time without day offset for simplicity in total calculation
  const startMins = timeToMins(first.calculatedArrive.split(' ')[0])
  
  let endStr = last.calculatedLeave;
  let endMins = timeToMins(endStr.split(' ')[0]);
  if (endStr.includes('+')) {
      const days = parseInt(endStr.match(/\+(\d+)/)[1]);
      endMins += days * 24 * 60;
  }
  
  const diff = endMins - startMins
  if (diff <= 0) return null
  
  const h = Math.floor(diff / 60)
  const m = diff % 60
  if (h === 0) return `${m} นาที`
  if (m === 0) return `${h} ชั่วโมง`
  return `${h} ชม. ${m} นาที`
})

const formatTime = (timeStr) => {
  if (!timeStr) return ''
  return String(timeStr).substring(0, 5)
}


const updateField = (index, field, value) => {
   let parsedValue = value
   if ((field === 'startTime' || field === 'endTime') && value) {
      if (value.length === 5) parsedValue = value + ':00'
   }
   tripStore.updateItem(index, { [field]: parsedValue })
}

const moveUp = (idx) => {
  if (idx > 0) tripStore.reorderItems(idx, idx - 1)
}

const moveDown = (idx) => {
  if (idx < tripStore.tripItems.length - 1) tripStore.reorderItems(idx, idx + 1)
}

const removeItem = async (id) => {
  const ok = await confirm({
    title: 'ลบสถานที่นี้?',
    message: 'คุณสามารถเพิ่มกลับมาใหม่ได้ตลอดเวลา',
    confirmText: 'ลบเลย',
    cancelText: 'ยกเลิก',
    type: 'danger'
  })
  if (ok) tripStore.removeItem(id)
}

const clearAll = async () => {
  const ok = await confirm({
    title: 'ล้างแผนทั้งหมด?',
    message: 'สถานที่ทั้งหมดจะถูกลบออกจากแผนการเดินทาง',
    confirmText: 'ล้างทั้งหมด',
    cancelText: 'ยกเลิก',
    type: 'danger'
  })
  if (ok) {
    const items = [...tripStore.tripItems]
    for (const item of items) {
      await tripStore.removeItem(item.id)
    }
  }
}
</script>







