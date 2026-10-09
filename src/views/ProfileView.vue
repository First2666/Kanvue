<!-- หน้าเว็บ: จัดการข้อมูลส่วนตัวผู้ใช้ (Profile & Trips World-Class Redesign) -->
<template>
  <div class="bg-[#F8FAFC] min-h-screen pb-28 font-sans text-slate-800">
    
    <!-- 1. Ambient Hero Header (Kanchanaburi Scenic & Frosted Glass) -->
    <div class="relative bg-slate-950 overflow-hidden border-b border-slate-200/50">
      <!-- High-res Kanchanaburi Landscape Banner -->
      <div class="h-60 sm:h-72 md:h-80 w-full relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1528181304800-259b08848526?w=1600&q=80" 
          alt="Kanchanaburi Nature River & Mountains" 
          class="w-full h-full object-cover opacity-85 scale-105 transition-transform duration-1000 ease-out"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-blue-950/50 via-transparent to-slate-950/50"></div>
      </div>

      <!-- Top Utility Bar -->
      <div class="max-w-6xl mx-auto px-4 sm:px-6 absolute top-5 left-0 right-0 z-10 flex items-center justify-between">
        <RouterLink 
          to="/" 
          class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/60 hover:bg-slate-900/90 backdrop-blur-md text-white text-xs font-bold border border-white/20 transition-all shadow-sm cursor-pointer hover:-translate-x-0.5"
        >
          <ArrowLeft class="w-3.5 h-3.5" />
          <span>กลับหน้าหลัก</span>
        </RouterLink>

        <div class="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/60 backdrop-blur-md text-white text-xs font-semibold border border-white/20 shadow-sm">
          <Sparkles class="w-3.5 h-3.5 text-amber-300" />
          <span>KanG • กาญจนบุรี เมืองแห่งสายน้ำและขุนเขา</span>
        </div>
      </div>
    </div>

    <!-- 2. Profile Identity & Stats Section -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 -mt-24 sm:-mt-28 relative z-20 space-y-6">
      
      <!-- Profile Identity Box -->
      <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-900/5 border border-slate-100 flex flex-col lg:flex-row items-center lg:items-end justify-between gap-6 transition-all">
        
        <!-- Left: Avatar & Bio -->
        <div class="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left w-full lg:w-auto">
          
          <!-- Avatar with Gradient Ring and Change Button -->
          <div class="relative shrink-0 group">
            <div class="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl ring-4 ring-white shadow-xl overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-3xl sm:text-4xl font-black text-white tracking-wider">
              <img 
                v-if="userAvatarUrl" 
                :src="userAvatarUrl" 
                alt="Avatar" 
                class="w-full h-full object-cover" 
              />
              <span v-else>{{ (authStore.user?.username || 'U').substring(0, 2).toUpperCase() }}</span>
            </div>

            <!-- Avatar change button overlay -->
            <button 
              @click="showAvatarModal = true" 
              class="absolute inset-0 rounded-3xl bg-slate-950/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white text-[11px] font-bold transition-all duration-200 cursor-pointer backdrop-blur-[2px]"
              title="เปลี่ยนรูปโปรไฟล์"
            >
              <Camera class="w-5 h-5 mb-0.5" />
              <span>เปลี่ยนรูป</span>
            </button>

            <!-- Online / Active Status Badge -->
            <div class="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 ring-4 ring-white flex items-center justify-center shadow-md" title="สถานะ: พร้อมออกเดินทาง">
              <CheckCircle2 class="w-4 h-4 text-white" />
            </div>
          </div>

          <!-- User Details -->
          <div class="space-y-2">
            <div class="flex items-center justify-center sm:justify-start gap-2.5 flex-wrap">
              <h1 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {{ authStore.user?.username || 'นักเดินทาง' }}
              </h1>
              
              <!-- Role Badge -->
              <span 
                v-if="authStore.user?.role === 1" 
                class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 border border-purple-200 shadow-xs"
              >
                <ShieldCheck class="w-3.5 h-3.5 text-purple-700" />
                <span>ผู้ดูแลระบบ (Admin)</span>
              </span>
              <span 
                v-else 
                class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200/80 shadow-xs"
              >
                <Compass class="w-3.5 h-3.5 text-blue-600" />
                <span>สมาชิกนักเดินทาง KanG</span>
              </span>
            </div>

            <!-- Meta Badges -->
            <div class="flex items-center justify-center sm:justify-start gap-3 text-xs sm:text-sm text-slate-500 font-medium flex-wrap">
              <span class="flex items-center gap-1.5 text-slate-600">
                <MailIcon class="w-4 h-4 text-slate-400" />
                {{ authStore.user?.email || 'admin@kanvue.com' }}
              </span>
              <span class="text-slate-300">•</span>
              
              <!-- Copyable Member ID -->
              <button 
                @click="copyMemberId" 
                class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 font-mono text-xs font-semibold transition cursor-pointer"
                title="คลิกเพื่อคัดลอกรหัสประจำตัว"
              >
                <span>ID: #{{ authStore.user?.id || '003' }}</span>
                <Copy class="w-3 h-3 text-slate-400" />
              </button>

              <span class="text-slate-300 hidden md:inline">•</span>
              <span class="hidden md:inline-flex items-center gap-1 text-emerald-600 font-semibold">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>ยืนยันตัวตนเรียบร้อย</span>
              </span>
            </div>
          </div>

        </div>

        <!-- Right: Actions Buttons -->
        <div class="flex items-center gap-2.5 w-full sm:w-auto justify-center flex-wrap shrink-0">
          <button 
            @click="showCreateModal = true"
            class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-600/25 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <Plus class="w-4 h-4" />
            <span>วางแผนทริปใหม่</span>
          </button>

          <RouterLink 
            v-if="authStore.user?.role === 1"
            to="/admin"
            class="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 font-bold text-xs sm:text-sm hover:-translate-y-0.5 active:scale-95 transition-all duration-200 cursor-pointer shadow-xs"
          >
            <ShieldCheck class="w-4 h-4 text-purple-600" />
            <span>หน้าแอดมิน</span>
          </RouterLink>

          <button 
            @click="activeTab = 'account'"
            class="px-4 py-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm hover:-translate-y-0.5 active:scale-95 transition-all duration-200 shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <SettingsIcon class="w-4 h-4 text-slate-500" />
            <span>ตั้งค่าบัญชี</span>
          </button>

          <button 
            @click="confirmLogout"
            class="p-2.5 rounded-2xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-600 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 cursor-pointer"
            title="ออกจากระบบ"
          >
            <LogOutIcon class="w-4 h-4" />
          </button>
        </div>

      </div>

      <!-- 3. Unified Metric Ribbon (Dashboard Style) -->
      <div class="bg-white rounded-3xl p-2 sm:p-3 border border-slate-200/80 shadow-sm">
        <div class="grid grid-cols-2 md:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          
          <!-- Metric 1: Total Trips -->
          <div 
            @click="activeTab = 'trips'" 
            class="p-4 sm:p-5 flex items-center gap-4 cursor-pointer hover:bg-blue-50/50 rounded-2xl transition group"
          >
            <div class="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition duration-300">
              <Luggage class="w-6 h-6" />
            </div>
            <div>
              <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">แผนการเดินทาง</p>
              <div class="flex items-baseline gap-1 mt-0.5">
                <span class="text-2xl font-black text-slate-900">{{ tripStore.tripPlans.length }}</span>
                <span class="text-xs font-semibold text-slate-500">ทริป</span>
              </div>
            </div>
          </div>

          <!-- Metric 2: Saved Favorites -->
          <div 
            @click="activeTab = 'favorites'" 
            class="p-4 sm:p-5 flex items-center gap-4 cursor-pointer hover:bg-rose-50/50 rounded-2xl transition group"
          >
            <div class="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition duration-300">
              <HeartIcon class="w-6 h-6 fill-rose-500" />
            </div>
            <div>
              <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">สถานที่ถูกใจ</p>
              <div class="flex items-baseline gap-1 mt-0.5">
                <span class="text-2xl font-black text-slate-900">{{ favoriteStore.favoritePlaceIds.length }}</span>
                <span class="text-xs font-semibold text-slate-500">แห่ง</span>
              </div>
            </div>
          </div>

          <!-- Metric 3: Total Stops -->
          <div 
            @click="activeTab = 'trips'" 
            class="p-4 sm:p-5 flex items-center gap-4 cursor-pointer hover:bg-emerald-50/50 rounded-2xl transition group"
          >
            <div class="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition duration-300">
              <Compass class="w-6 h-6" />
            </div>
            <div>
              <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">จุดหมายในแผน</p>
              <div class="flex items-baseline gap-1 mt-0.5">
                <span class="text-2xl font-black text-slate-900">{{ totalPlacesInAllTrips }}</span>
                <span class="text-xs font-semibold text-slate-500">สถานที่</span>
              </div>
            </div>
          </div>

          <!-- Metric 4: Member Status -->
          <div 
            @click="activeTab = 'account'" 
            class="p-4 sm:p-5 flex items-center gap-4 cursor-pointer hover:bg-amber-50/50 rounded-2xl transition group"
          >
            <div class="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition duration-300">
              <Award class="w-6 h-6" />
            </div>
            <div>
              <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">ระดับสมาชิก</p>
              <div class="flex items-baseline gap-1 mt-0.5">
                <span class="text-lg sm:text-xl font-black text-slate-900 line-clamp-1">
                  {{ authStore.user?.role === 1 ? 'แอดมินระบบ' : 'นักเดินทาง' }}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- 4. Apple/Linear Style Underline Tab Navigation & Search -->
      <div class="border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div class="flex items-center gap-8 -mb-px overflow-x-auto no-scrollbar">
          
          <!-- Tab 1: Trips -->
          <button 
            @click="activeTab = 'trips'" 
            class="flex items-center gap-2 pb-3.5 text-sm font-extrabold transition-all border-b-2 cursor-pointer whitespace-nowrap"
            :class="activeTab === 'trips' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent text-slate-500 hover:text-slate-800'"
          >
            <MapIcon class="w-4 h-4" />
            <span>แผนการเดินทาง</span>
            <span class="px-2 py-0.5 rounded-full text-xs font-black" :class="activeTab === 'trips' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'">
              {{ tripStore.tripPlans.length }}
            </span>
          </button>

          <!-- Tab 2: Favorites -->
          <button 
            @click="activeTab = 'favorites'" 
            class="flex items-center gap-2 pb-3.5 text-sm font-extrabold transition-all border-b-2 cursor-pointer whitespace-nowrap"
            :class="activeTab === 'favorites' 
              ? 'border-rose-500 text-rose-600' 
              : 'border-transparent text-slate-500 hover:text-slate-800'"
          >
            <HeartIcon class="w-4 h-4" :class="activeTab === 'favorites' ? 'fill-rose-500 text-rose-500' : ''" />
            <span>สถานที่ถูกใจ</span>
            <span class="px-2 py-0.5 rounded-full text-xs font-black" :class="activeTab === 'favorites' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600'">
              {{ favoriteStore.favoritePlaceIds.length }}
            </span>
          </button>

          <!-- Tab 3: Account -->
          <button 
            @click="activeTab = 'account'" 
            class="flex items-center gap-2 pb-3.5 text-sm font-extrabold transition-all border-b-2 cursor-pointer whitespace-nowrap"
            :class="activeTab === 'account' 
              ? 'border-slate-800 text-slate-900' 
              : 'border-transparent text-slate-500 hover:text-slate-800'"
          >
            <SettingsIcon class="w-4 h-4" />
            <span>ข้อมูลบัญชี & ความปลอดภัย</span>
          </button>

        </div>

        <!-- Right Side: Filter or Quick Count -->
        <div class="text-xs font-bold text-slate-400 hidden sm:flex items-center gap-3">
          <span v-if="activeTab === 'trips'">แสดงทั้งหมด {{ tripStore.tripPlans.length }} แผนการเดินทาง</span>
          <span v-else-if="activeTab === 'favorites'">แสดงทั้งหมด {{ filteredFavorites.length }} สถานที่บันทึกไว้</span>
          <span v-else>การจัดการข้อมูลและระบบความปลอดภัย</span>
        </div>
      </div>

      <!-- ==================== TAB 1: CURATED TRIP CARDS ==================== -->
      <div v-if="activeTab === 'trips'" class="space-y-6 animate-fade-in">
        
        <!-- Header row -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 class="text-xl font-black text-slate-900 tracking-tight">แผนการเดินทางท่องเที่ยวของคุณ</h2>
            <p class="text-slate-500 text-xs sm:text-sm">ทริปทั้งหมดที่คุณออกแบบไว้สำหรับการสำรวจธรรมชาติและประวัติศาสตร์เมืองกาญจน์</p>
          </div>

          <div class="flex items-center gap-3">
            <!-- Search trips -->
            <div v-if="tripStore.tripPlans.length > 3" class="relative w-48 sm:w-56">
              <input 
                type="text" 
                v-model="searchTripQuery" 
                placeholder="ค้นหาชื่อทริป..." 
                class="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:border-blue-500"
              />
              <Search class="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5" />
            </div>

            <button 
              @click="showCreateModal = true" 
              class="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold text-xs sm:text-sm transition border border-blue-100 shadow-xs shrink-0 cursor-pointer"
            >
              <Plus class="w-4 h-4" />
              <span>สร้างทริปใหม่</span>
            </button>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="tripStore.tripPlans.length === 0" class="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
          <div class="w-20 h-20 bg-blue-50 text-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-inner">
            <Luggage class="w-10 h-10" />
          </div>
          <h3 class="text-xl font-black text-slate-900 mb-2">ยังไม่มีแผนการเดินทาง</h3>
          <p class="text-slate-500 text-sm max-w-sm mx-auto mb-6">เริ่มต้นวางแผนทริปท่องเที่ยวในฝันของคุณ สำรวจน้ำตก ร้านอาหาร และที่พักกาญจนบุรีได้ทันที</p>
          <button 
            @click="showCreateModal = true" 
            class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-md shadow-blue-600/20 cursor-pointer"
          >
            <Plus class="w-4 h-4" />
            <span>เริ่มต้นวางแผนทริปแรก</span>
          </button>
        </div>

        <!-- Curated Guidebook Cards Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="plan in displayedTripPlans" 
            :key="plan.id" 
            @click="openTrip(plan.id)" 
            class="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 hover:border-blue-400/80 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between relative"
          >
            <!-- Card Image with Landmark Real Photo -->
            <div class="h-52 relative overflow-hidden bg-slate-900">
              <img 
                :src="getTripCoverPhoto(plan)" 
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90" 
                alt="Trip Cover" 
              />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

              <!-- Top Floating Pills -->
              <div class="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                <!-- Status Badge -->
                <span 
                  v-if="plan.id === tripStore.tripPlanId" 
                  class="bg-amber-400 text-slate-950 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md text-[11px] font-black border border-amber-300"
                >
                  <Sparkles class="w-3 h-3 text-slate-950" />
                  <span>ทริปปัจจุบัน</span>
                </span>
                <span 
                  v-else 
                  class="bg-white/95 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm text-slate-800 text-[11px] font-black border border-white/20"
                >
                  <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>พร้อมเดินทาง</span>
                </span>
                
                <div class="flex items-center gap-1.5">
                  <span class="bg-slate-950/75 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[11px] font-bold border border-white/10">
                    ⏱️ {{ getTripDurationDays(plan) }} วัน
                  </span>
                  <span v-if="plan.memberCount" class="bg-slate-950/75 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[11px] font-bold border border-white/10">
                    👥 {{ plan.memberCount }} คน
                  </span>
                </div>
              </div>

              <!-- Delete Trip Button (top right on hover) -->
              <button 
                @click.stop="promptDeleteTrip(plan)" 
                class="absolute bottom-3.5 right-3.5 w-8 h-8 rounded-full bg-slate-900/80 hover:bg-rose-600 text-white/80 hover:text-white flex items-center justify-center transition-all duration-200 backdrop-blur-sm cursor-pointer border border-white/10 shadow-sm"
                title="ลบทริปนี้"
              >
                <Trash2 class="w-3.5 h-3.5" />
              </button>

              <!-- Bottom on Image: Trip Name -->
              <div class="absolute bottom-3.5 left-4 right-14">
                <h3 class="text-lg font-black text-white leading-tight line-clamp-1 group-hover:text-blue-200 transition-colors">
                  {{ plan.planName || plan.name || 'ทริปกาญจนบุรี (ยังไม่ระบุชื่อ)' }}
                </h3>
                <p class="text-xs text-white/70 font-medium mt-0.5 line-clamp-1">
                  {{ formatTripDates(plan) }}
                </p>
              </div>
            </div>

            <!-- Card Body -->
            <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
              
              <!-- Stops in Trip -->
              <div class="space-y-2">
                <div class="flex items-center justify-between text-[11px] font-bold text-slate-400">
                  <span>จุดหมายในทริป</span>
                  <span class="text-blue-600 font-extrabold">{{ (plan.items || []).length }} แห่ง</span>
                </div>

                <div v-if="getTripPlacesThumbnails(plan).length > 0" class="flex flex-wrap gap-1.5 pt-0.5">
                  <span 
                    v-for="(placeThumb, pIdx) in getTripPlacesThumbnails(plan)" 
                    :key="pIdx"
                    class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 text-slate-700 text-xs font-medium border border-slate-200/80 max-w-[180px] truncate"
                  >
                    <MapPin class="w-3 h-3 text-blue-500 shrink-0" />
                    <span class="truncate">{{ placeThumb.name }}</span>
                  </span>
                  <span v-if="(plan.items || []).length > 3" class="inline-flex items-center px-2 py-1 rounded-lg bg-blue-50 text-blue-600 text-xs font-bold">
                    +{{ (plan.items || []).length - 3 }}
                  </span>
                </div>
                <div v-else class="text-xs text-slate-400 italic py-1">
                  ยังไม่ได้เพิ่มสถานที่ในทริปนี้
                </div>
              </div>

              <!-- Budget & Open Button -->
              <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">งบประมาณ</span>
                  <span class="text-sm font-black text-slate-900">
                    ฿{{ Number(calculateTripBudget(plan)).toLocaleString() }}
                  </span>
                </div>

                <div class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-50 group-hover:bg-blue-600 text-blue-600 group-hover:text-white font-bold text-xs transition-all duration-200 shadow-2xs">
                  <span>{{ plan.id === tripStore.tripPlanId ? 'เปิดดูทริป' : 'สลับ & เปิดทริป' }}</span>
                  <ArrowRight class="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      <!-- ==================== TAB 2: FAVORITES ==================== -->
      <div v-if="activeTab === 'favorites'" class="space-y-6 animate-fade-in">
        
        <!-- Header row inside Favorites -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 class="text-xl font-black text-slate-900 tracking-tight">สถานที่ที่คุณกดถูกใจ</h2>
            <p class="text-slate-500 text-xs sm:text-sm">รวมสถานที่ท่องเที่ยว ร้านอาหาร และที่พักที่คุณบันทึกไว้ใน Wishlist</p>
          </div>

          <!-- Quick search inside favorites -->
          <div class="relative w-full sm:w-72">
            <div class="flex items-center bg-white rounded-2xl border border-slate-200 px-3.5 py-2 shadow-xs focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
              <Search class="w-4 h-4 text-slate-400 mr-2 shrink-0" />
              <input 
                type="text" 
                v-model="searchFavoriteQuery" 
                placeholder="ค้นหาสถานที่ในรายการโปรด..." 
                class="w-full outline-none text-xs font-medium text-slate-800 placeholder-slate-400 bg-transparent"
              />
              <button v-if="searchFavoriteQuery" @click="searchFavoriteQuery = ''" class="text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer">
                <X class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loadingFavorites" class="flex justify-center py-20">
          <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-rose-500"></div>
        </div>

        <!-- Empty Favorites State -->
        <div v-else-if="favoriteStore.favoritePlaceIds.length === 0" class="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
          <div class="w-20 h-20 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-inner">
            <HeartIcon class="w-10 h-10 fill-rose-500" />
          </div>
          <h3 class="text-xl font-black text-slate-900 mb-2">ยังไม่มีสถานที่ที่ถูกใจ</h3>
          <p class="text-slate-500 text-sm max-w-sm mx-auto mb-6">กดไอคอนหัวใจที่สถานที่ท่องเที่ยว ร้านอาหาร หรือที่พัก เพื่อรวบรวมไว้ดูที่นี่ได้ง่ายๆ</p>
          <RouterLink 
            to="/places" 
            class="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-md shadow-rose-500/20"
          >
            <span>สำรวจสถานที่ท่องเที่ยว</span>
          </RouterLink>
        </div>

        <!-- Search empty within favorites -->
        <div v-else-if="searchedFavorites.length === 0" class="text-center py-16 bg-white rounded-3xl border border-slate-100 shadow-sm">
          <div class="w-14 h-14 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
            <Search class="w-6 h-6" />
          </div>
          <h3 class="text-lg font-bold text-slate-900 mb-1">ไม่พบสถานที่ที่ตรงกับ "{{ searchFavoriteQuery }}"</h3>
          <p class="text-slate-500 text-xs mb-4">ลองค้นหาด้วยคำอื่น หรือกดล้างคำค้นหา</p>
          <button @click="searchFavoriteQuery = ''" class="px-5 py-2 bg-blue-600 text-white font-bold rounded-xl text-xs shadow-xs hover:bg-blue-700 cursor-pointer">
            ล้างคำค้นหา
          </button>
        </div>

        <!-- Favorites Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PlaceCard 
            v-for="place in searchedFavorites" 
            :key="place.id" 
            :id="place.id" 
            :title="place.name" 
            :description="place.description" 
            :location="place.location?.name || place.location?.address || 'กาญจนบุรี'" 
            :category="place.category?.name || 'ยอดฮิต'" 
            :priceText="(place.entranceFee || place.pricePerNight || 0) > 0 ? (place.entranceFee || place.pricePerNight) + ' ฿' : 'ฟรี'" 
            :imageUrl="getPlaceImageUrl(place)" 
          />
        </div>

      </div>

      <!-- ==================== TAB 3: ACCOUNT & SECURITY ==================== -->
      <div v-if="activeTab === 'account'" class="space-y-6 animate-fade-in">
        <div>
          <h2 class="text-xl font-black text-slate-900 tracking-tight">ข้อมูลบัญชีและความปลอดภัย</h2>
          <p class="text-slate-500 text-xs sm:text-sm">รายละเอียดบัญชีผู้ใช้ ระดับสิทธิ์ และการตั้งค่าระบบความปลอดภัย</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <!-- User Details Card -->
          <div class="md:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
            <h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <User class="w-5 h-5 text-blue-600" />
              <span>ข้อมูลโปรไฟล์ของคุณ</span>
            </h3>

            <div class="space-y-4">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-slate-100 gap-1">
                <span class="text-xs font-bold text-slate-400">ชื่อผู้ใช้งาน (Username)</span>
                <span class="text-sm font-extrabold text-slate-800">{{ authStore.user?.username }}</span>
              </div>

              <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-slate-100 gap-1">
                <span class="text-xs font-bold text-slate-400">ที่อยู่อีเมล (Email Address)</span>
                <span class="text-sm font-semibold text-slate-800">{{ authStore.user?.email || 'admin@kanvue.com' }}</span>
              </div>

              <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-slate-100 gap-1">
                <span class="text-xs font-bold text-slate-400">รหัสประจำตัวสมาชิก (Account ID)</span>
                <span class="text-sm font-mono font-bold text-slate-800">#{{ authStore.user?.id || '3' }}</span>
              </div>

              <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-slate-100 gap-1">
                <span class="text-xs font-bold text-slate-400">ระดับสิทธิ์ในระบบ (Role)</span>
                <span class="text-sm font-bold text-purple-600" v-if="authStore.user?.role === 1">แอดมินระบบ (Administrator)</span>
                <span class="text-sm font-bold text-blue-600" v-else>สมาชิกทั่วไป (Member)</span>
              </div>

              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span class="text-xs font-bold text-slate-400">สถานะความปลอดภัย (Security Session)</span>
                <span class="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                  <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>เข้าสู่ระบบอย่างปลอดภัย (JWT Protected)</span>
                </span>
              </div>
            </div>

            <!-- Profile Customization Options -->
            <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button 
                @click="showAvatarModal = true"
                class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
              >
                <Camera class="w-4 h-4 text-slate-500" />
                <span>เปลี่ยนรูปอวาตาร์</span>
              </button>

              <span class="text-xs text-slate-400">KanG Travel Dashboard v2.0</span>
            </div>
          </div>

          <!-- Quick Action & Admin Panel Link -->
          <div class="space-y-6">
            
            <!-- Admin Shortcut Card if Role === 1 -->
            <div v-if="authStore.user?.role === 1" class="bg-gradient-to-br from-purple-900 to-indigo-900 text-white rounded-3xl p-6 shadow-lg relative overflow-hidden">
              <div class="relative z-10">
                <div class="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center mb-3">
                  <ShieldCheck class="w-6 h-6 text-purple-300" />
                </div>
                <h4 class="text-base font-black mb-1">ระบบจัดการแอดมิน</h4>
                <p class="text-purple-200 text-xs mb-4">เข้าถึงแผงควบคุมหลักเพื่อจัดการสถานที่ รีวิว และข้อมูลเว็บไซต์</p>
                <RouterLink 
                  to="/admin" 
                  class="inline-flex items-center gap-2 bg-white text-purple-900 px-4 py-2 rounded-xl font-bold text-xs shadow-md hover:bg-purple-50 transition cursor-pointer"
                >
                  <span>ไปที่หน้าแอดมิน</span>
                  <ExternalLink class="w-3.5 h-3.5" />
                </RouterLink>
              </div>
            </div>

            <!-- Logout Card -->
            <div class="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs text-center">
              <h4 class="text-sm font-bold text-slate-800 mb-1">ออกจากระบบ</h4>
              <p class="text-slate-400 text-xs mb-4">คุณสามารถเข้าสู่ระบบใหม่ได้ตลอดเวลาเพื่อจัดการทริปของคุณ</p>
              <button 
                @click="confirmLogout" 
                class="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 font-bold text-xs transition duration-200 cursor-pointer"
              >
                <LogOutIcon class="w-4 h-4" />
                <span>ยืนยันออกจากระบบ</span>
              </button>
            </div>

          </div>

        </div>
      </div>

    </div>

    <!-- ==================== MODAL 1: CREATE TRIP MODAL ==================== -->
    <div 
      v-if="showCreateModal" 
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in"
    >
      <div class="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 space-y-5">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <div class="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Plus class="w-5 h-5" />
            </div>
            <div>
              <h3 class="text-lg font-black text-slate-900">สร้างแผนการเดินทางใหม่</h3>
              <p class="text-xs text-slate-400">ตั้งชื่อและระบุวันเดินทางไปเที่ยวกาญจนบุรี</p>
            </div>
          </div>
          <button @click="showCreateModal = false" class="text-slate-400 hover:text-slate-600 p-1 cursor-pointer">
            <X class="w-5 h-5" />
          </button>
        </div>

        <form @submit.prevent="handleCreateTrip" class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-slate-600 mb-1.5">ชื่อแผนการเดินทาง</label>
            <input 
              v-model="newTripForm.planName" 
              type="text" 
              placeholder="เช่น ทริปกาญจน์ 2 วัน 1 คืน นอนแพริมน้ำ" 
              required
              class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 font-medium"
            />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-slate-600 mb-1.5">วันเริ่มเดินทาง</label>
              <input 
                v-model="newTripForm.startDate" 
                type="date" 
                required
                class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-600 mb-1.5">วันสิ้นสุด</label>
              <input 
                v-model="newTripForm.endDate" 
                type="date" 
                required
                class="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div class="flex items-center justify-end gap-2.5 pt-3">
            <button 
              type="button" 
              @click="showCreateModal = false" 
              class="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 cursor-pointer"
            >
              ยกเลิก
            </button>
            <button 
              type="submit" 
              :disabled="creatingTrip"
              class="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
            >
              <span v-if="creatingTrip">กำลังสร้าง...</span>
              <span v-else>สร้างทริป & เริ่มวางแผน</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- ==================== MODAL 2: DELETE TRIP MODAL ==================== -->
    <div 
      v-if="tripToDelete" 
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in"
    >
      <div class="bg-white rounded-3xl p-6 sm:p-7 max-w-sm w-full shadow-2xl border border-slate-100 text-center space-y-4">
        <div class="w-14 h-14 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
          <Trash2 class="w-7 h-7" />
        </div>

        <div>
          <h3 class="text-base font-black text-slate-900">ยืนยันการลบทริป?</h3>
          <p class="text-xs text-slate-500 mt-1">
            คุณต้องการลบ "{{ tripToDelete.planName || tripToDelete.name }}" ใช่หรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้
          </p>
        </div>

        <div class="flex items-center justify-center gap-2.5 pt-2">
          <button 
            @click="tripToDelete = null" 
            class="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 cursor-pointer"
          >
            ยกเลิก
          </button>
          <button 
            @click="confirmDeleteTrip" 
            class="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-600/20 cursor-pointer"
          >
            ลบทริปทันที
          </button>
        </div>
      </div>
    </div>

    <!-- ==================== MODAL 3: AVATAR SELECTOR MODAL ==================== -->
    <div 
      v-if="showAvatarModal" 
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in"
    >
      <div class="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-100 space-y-5">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <Camera class="w-5 h-5 text-blue-600" />
            <h3 class="text-base font-black text-slate-900">เลือกรูปโปรไฟล์ของคุณ</h3>
          </div>
          <button @click="showAvatarModal = false" class="text-slate-400 hover:text-slate-600 p-1 cursor-pointer">
            <X class="w-5 h-5" />
          </button>
        </div>

        <!-- Presets -->
        <div>
          <p class="text-xs font-bold text-slate-500 mb-2.5">เลือกรูปสไตล์นักเดินทาง</p>
          <div class="grid grid-cols-4 gap-3">
            <button 
              v-for="(av, idx) in presetAvatars" 
              :key="idx" 
              @click="selectPresetAvatar(av.url)"
              class="relative rounded-2xl overflow-hidden aspect-square border-2 transition-all hover:scale-105 cursor-pointer"
              :class="userAvatarUrl === av.url ? 'border-blue-600 ring-2 ring-blue-200' : 'border-slate-200'"
            >
              <img :src="av.url" class="w-full h-full object-cover" />
              <span class="absolute bottom-0 inset-x-0 bg-slate-900/80 text-white text-[9px] font-bold py-0.5 text-center truncate">
                {{ av.label }}
              </span>
            </button>
          </div>
        </div>

        <!-- Custom URL Input -->
        <div class="space-y-1.5">
          <label class="text-xs font-bold text-slate-600">หรือใส่ URL รูปภาพของคุณ</label>
          <div class="flex gap-2">
            <input 
              v-model="customAvatarInput" 
              type="url" 
              placeholder="https://example.com/avatar.jpg" 
              class="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
            />
            <button 
              @click="applyCustomAvatar" 
              class="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 cursor-pointer"
            >
              ใช้รูปนี้
            </button>
          </div>
        </div>

        <div class="flex justify-between items-center pt-2 border-t border-slate-100">
          <button 
            @click="resetAvatar" 
            class="text-xs font-bold text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            ใช้รูปเริ่มต้น (ชื่อย่อ)
          </button>
          <button 
            @click="showAvatarModal = false" 
            class="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 cursor-pointer"
          >
            ปิด
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import PlaceCard from '../components/PlaceCard.vue'
import api from '../services/api'
import { getPlaceImageUrl } from '../utils/imageUrl'
import { useAuthStore } from '../stores/auth'
import { useFavoriteStore } from '../stores/favorite'
import { useTripStore } from '../stores/trip'
import { useToast } from '../composables/useNotify'
import { 
  Settings as SettingsIcon, 
  Mail as MailIcon, 
  Heart as HeartIcon, 
  Map as MapIcon, 
  LogOut as LogOutIcon, 
  Plus, 
  Compass, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Sparkles, 
  User, 
  CheckCircle2, 
  Search, 
  X, 
  ExternalLink,
  Luggage,
  MapPin,
  Award,
  Camera,
  Trash2,
  Copy
} from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()
const favoriteStore = useFavoriteStore()
const tripStore = useTripStore()
const toast = useToast()

const activeTab = ref('trips')
const allPlaces = ref([])
const loadingFavorites = ref(false)
const searchFavoriteQuery = ref('')
const searchTripQuery = ref('')

// Modals
const showCreateModal = ref(false)
const creatingTrip = ref(false)
const newTripForm = ref({
  planName: '',
  startDate: new Date().toISOString().split('T')[0],
  endDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]
})

const tripToDelete = ref(null)
const showAvatarModal = ref(false)
const customAvatarInput = ref('')

// Avatar State
const userAvatarUrl = ref(localStorage.getItem('kang_custom_avatar') || authStore.user?.avatarUrl || '')

const presetAvatars = [
  { label: 'สายคาเฟ่', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80' },
  { label: 'สายลุย', url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&q=80' },
  { label: 'ธรรมชาติ', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&q=80' },
  { label: 'แอดมิน', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80' }
]

const selectPresetAvatar = (url) => {
  userAvatarUrl.value = url
  localStorage.setItem('kang_custom_avatar', url)
  if (authStore.user) authStore.user.avatarUrl = url
  showAvatarModal.value = false
  toast.success('อัปเดตรูปโปรไฟล์เรียบร้อยแล้ว!')
}

const applyCustomAvatar = () => {
  if (!customAvatarInput.value.trim()) return
  userAvatarUrl.value = customAvatarInput.value.trim()
  localStorage.setItem('kang_custom_avatar', customAvatarInput.value.trim())
  if (authStore.user) authStore.user.avatarUrl = customAvatarInput.value.trim()
  showAvatarModal.value = false
  customAvatarInput.value = ''
  toast.success('อัปเดตรูปโปรไฟล์เรียบร้อยแล้ว!')
}

const resetAvatar = () => {
  userAvatarUrl.value = ''
  localStorage.removeItem('kang_custom_avatar')
  if (authStore.user) authStore.user.avatarUrl = ''
  showAvatarModal.value = false
  toast.success('คืนค่ารูปเริ่มต้นเรียบร้อยแล้ว!')
}

// Copy ID
const copyMemberId = () => {
  const id = authStore.user?.id ? `#${authStore.user.id}` : '#003'
  navigator.clipboard.writeText(id)
  toast.success(`คัดลอกรหัสประจำตัว ${id} แล้ว`)
}

// Total places planned across all user trips
const totalPlacesInAllTrips = computed(() => {
  return tripStore.tripPlans.reduce((sum, p) => sum + (p.items?.length || 0), 0)
})

// Filtered trips by query
const displayedTripPlans = computed(() => {
  if (!searchTripQuery.value.trim()) return tripStore.tripPlans
  const q = searchTripQuery.value.trim().toLowerCase()
  return tripStore.tripPlans.filter(p => (p.planName || p.name || '').toLowerCase().includes(q))
})

// Filtered places matching user's favorite IDs
const filteredFavorites = computed(() => {
  return allPlaces.value.filter(place => favoriteStore.isFavorite(place.id))
})

// Quick search within favorites
const searchedFavorites = computed(() => {
  if (!searchFavoriteQuery.value.trim()) return filteredFavorites.value
  const q = searchFavoriteQuery.value.trim().toLowerCase()
  return filteredFavorites.value.filter(p => 
    p.name?.toLowerCase().includes(q) || 
    p.description?.toLowerCase().includes(q) || 
    p.location?.address?.toLowerCase().includes(q)
  )
})

// Curated Kanchanaburi scenery cover photos for variety
const curatedTripCovers = [
  'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=80', // Erawan / Kanchanaburi river
  'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Bridge_on_the_River_Kwai_-_tourist_plaza.JPG/1280px-Bridge_on_the_River_Kwai_-_tourist_plaza.JPG', // River Kwai
  'https://upload.wikimedia.org/wikipedia/commons/8/86/Erawan_waterfall_tier_5.jpg', // Erawan Tier 5
  'https://images.unsplash.com/photo-1508873696983-2df5703bc225?w=800&q=80', // Morning river mist
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80', // Floating luxury raft
  'https://upload.wikimedia.org/wikipedia/commons/0/07/Burma_Railway_%28I%29.jpg' // Death railway curve
]

const getTripCoverPhoto = (plan) => {
  if (plan.items && plan.items.length > 0) {
    for (const item of plan.items) {
      const place = allPlaces.value.find(p => p.id === item.placeId)
      if (place) {
        const img = getPlaceImageUrl(place, '')
        if (img) return img
      }
    }
  }
  const idx = Math.abs(Number(plan.id) || 0) % curatedTripCovers.length
  return curatedTripCovers[idx]
}

// Get thumbnails of places inside trip
const getTripPlacesThumbnails = (plan) => {
  if (!plan.items || plan.items.length === 0) return []
  return plan.items.slice(0, 3).map(item => {
    const place = allPlaces.value.find(p => p.id === item.placeId)
    return {
      id: item.placeId,
      name: place?.name || `สถานที่ #${item.placeId}`
    }
  })
}

// Calculate duration in days
const getTripDurationDays = (plan) => {
  if (!plan.startDate || !plan.endDate) return 1
  const start = new Date(plan.startDate).getTime()
  const end = new Date(plan.endDate).getTime()
  const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
  return diff > 0 ? diff : 1
}

// Format start and end date
const formatTripDates = (plan) => {
  if (!plan.startDate) return 'ยังไม่ระบุวันเดินทาง'
  const s = new Date(plan.startDate).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })
  if (!plan.endDate || plan.startDate === plan.endDate) return s
  const e = new Date(plan.endDate).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })
  return `${s} - ${e}`
}

// Calculate total budget
const calculateTripBudget = (plan) => {
  if (plan.budgetAmount && plan.budgetAmount > 0) return plan.budgetAmount
  if (plan.items && plan.items.length > 0) {
    return plan.items.reduce((sum, i) => sum + (i.estimatedCost || 0), 0)
  }
  return 0
}

// Open trip directly in Planner
const openTrip = async (tripId) => {
  if (tripStore.switchTrip) {
    await tripStore.switchTrip(tripId)
  }
  router.push('/planner')
}

// Delete trip prompt
const promptDeleteTrip = (plan) => {
  tripToDelete.value = plan
}

const confirmDeleteTrip = async () => {
  if (!tripToDelete.value) return
  const id = tripToDelete.value.id
  tripToDelete.value = null
  await tripStore.deleteTrip(id)
}

// Create new trip handler
const handleCreateTrip = async () => {
  if (!newTripForm.value.planName.trim()) return
  creatingTrip.value = true
  try {
    await tripStore.createTrip(
      newTripForm.value.planName.trim(),
      new Date(newTripForm.value.startDate).toISOString(),
      new Date(newTripForm.value.endDate).toISOString()
    )
    showCreateModal.value = false
    newTripForm.value.planName = ''
    router.push('/planner')
  } catch (err) {
    console.error(err)
  } finally {
    creatingTrip.value = false
  }
}

const confirmLogout = () => {
  if (confirm('คุณต้องการออกจากระบบหรือไม่?')) {
    authStore.logout()
    router.push('/')
  }
}

onMounted(async () => {
  if (!authStore.user) {
    router.push('/login')
    return
  }
  
  // Ensure stores are loaded
  if (favoriteStore.favoritePlaceIds.length === 0) await favoriteStore.loadFavorites()
  if (tripStore.tripPlans.length === 0) tripStore.loadTrip()
  
  // Load places for favorites and trip cover photos
  loadingFavorites.value = true
  try {
    const [attRes, accRes, resRes] = await Promise.all([
      api.get('/Attractions').catch(() => ({ data: [] })),
      api.get('/Accommodations').catch(() => ({ data: [] })),
      api.get('/Restaurants').catch(() => ({ data: [] }))
    ])
    allPlaces.value = [
      ...(attRes.data || []),
      ...(accRes.data || []),
      ...(resRes.data || [])
    ]
  } catch (err) {
    console.error('Failed to load places:', err)
  } finally {
    loadingFavorites.value = false
  }
})
</script>
