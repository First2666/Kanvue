<!-- หน้าเว็บ: ระบบจัดการหลังบ้านสำหรับผู้ดูแลระบบ -->
<template>
  <div class="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-800">
    
    <!-- Sidebar -->
    <aside class="w-full md:w-72 bg-white border-r border-slate-200/80 flex flex-col sticky top-0 md:h-screen z-20 shadow-sm">
      <!-- Brand Header -->
      <div class="p-6 border-b border-slate-100 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-11 h-11 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-md shadow-blue-500/20">
            K.
          </div>
          <div>
            <div class="flex items-center gap-1.5">
              <h1 class="font-extrabold text-slate-900 text-lg tracking-tight">KanG Admin</h1>
              <span class="px-1.5 py-0.5 text-[10px] font-bold bg-blue-50 text-blue-600 rounded-full border border-blue-200">v2.5</span>
            </div>
            <p class="text-xs text-slate-400 font-medium">ระบบบริหารจัดการข้อมูล</p>
          </div>
        </div>
      </div>
      
      <!-- Navigation Tabs -->
      <nav class="flex-grow p-4 space-y-1.5 overflow-y-auto">
        <button 
          @click="currentTab = 'dashboard'" 
          :class="[
            'w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all duration-200',
            currentTab === 'dashboard' 
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
              : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
          ]"
        >
          <div class="flex items-center gap-3">
            <LayoutDashboard class="w-5 h-5" />
            <span>แดชบอร์ดสถิติ</span>
          </div>
          <span :class="['text-xs px-2 py-0.5 rounded-full font-bold', currentTab === 'dashboard' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500']">
            ภาพรวม
          </span>
        </button>

        <button 
          @click="currentTab = 'places'" 
          :class="[
            'w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all duration-200',
            currentTab === 'places' 
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
              : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
          ]"
        >
          <div class="flex items-center gap-3">
            <MapPin class="w-5 h-5" />
            <span>จัดการสถานที่</span>
          </div>
          <span :class="['text-xs px-2 py-0.5 rounded-full font-bold', currentTab === 'places' ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-600']">
            {{ places.length }}
          </span>
        </button>

        <button 
          @click="currentTab = 'users'" 
          :class="[
            'w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all duration-200',
            currentTab === 'users' 
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
              : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
          ]"
        >
          <div class="flex items-center gap-3">
            <Users class="w-5 h-5" />
            <span>จัดการผู้ใช้งาน</span>
          </div>
          <span :class="['text-xs px-2 py-0.5 rounded-full font-bold', currentTab === 'users' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500']">
            {{ users.length }}
          </span>
        </button>

        <button 
          @click="currentTab = 'reviews'" 
          :class="[
            'w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all duration-200',
            currentTab === 'reviews' 
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
              : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
          ]"
        >
          <div class="flex items-center gap-3">
            <MessageSquare class="w-5 h-5" />
            <span>ตรวจสอบรีวิว</span>
          </div>
          <span :class="['text-xs px-2 py-0.5 rounded-full font-bold', currentTab === 'reviews' ? 'bg-white/20 text-white' : 'bg-amber-50 text-amber-600']">
            {{ reviews.length }}
          </span>
        </button>
      </nav>
      
      <!-- Footer Info & Exit -->
      <div class="p-4 border-t border-slate-100 space-y-3 bg-slate-50/50">
        <div class="flex items-center gap-3 px-3 py-2 bg-white rounded-xl border border-slate-200/60 shadow-xs">
          <div class="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
            AD
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-xs font-bold text-slate-800 truncate">แอดมินระบบ (Admin)</p>
            <p class="text-[11px] text-emerald-600 flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              ระบบออนไลน์พร้อมใช้งาน
            </p>
          </div>
        </div>

        <RouterLink 
          to="/" 
          class="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-blue-600 hover:bg-blue-50/60 rounded-xl transition-colors border border-slate-200/60"
        >
          <ArrowLeft class="w-4 h-4" />
          กลับหน้าหลักแพลตฟอร์ม
        </RouterLink>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="flex-1 p-6 md:p-10 overflow-y-auto h-screen">
      
      <!-- ==================== DASHBOARD TAB ==================== -->
      <div v-if="currentTab === 'dashboard'" class="space-y-8 animate-fade-in max-w-7xl mx-auto">
        <!-- Dashboard Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold mb-2">
              <Sparkles class="w-3.5 h-3.5" />
              แดชบอร์ดภาพรวมระบบ
            </div>
            <h2 class="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">รายงานสถิติแพลตฟอร์ม KanG</h2>
            <p class="text-slate-500 text-sm mt-1">สรุปข้อมูลสถานที่ท่องเที่ยว ร้านอาหาร ที่พัก สมาชิก และรีวิวแบบ Real-time</p>
          </div>
          <div class="flex items-center gap-3">
            <button 
              @click="openAddModal" 
              class="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-sm shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Plus class="w-4 h-4" />
              เพิ่มสถานที่ใหม่
            </button>
          </div>
        </div>
        
        <!-- KPI Stat Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <!-- Card 1: Users -->
          <div class="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group">
            <div class="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-50 rounded-full group-hover:scale-110 transition-transform -z-0"></div>
            <div class="relative z-10 flex items-start justify-between">
              <div>
                <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">ผู้ใช้งานทั้งหมด</p>
                <p class="text-3xl font-black text-slate-900 mt-2">{{ users.length }}</p>
                <div class="mt-3 flex items-center gap-1.5 text-xs text-blue-600 font-bold">
                  <UserCheck class="w-3.5 h-3.5" />
                  <span>สมาชิกในระบบ</span>
                </div>
              </div>
              <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-xs">
                <Users class="w-6 h-6" />
              </div>
            </div>
          </div>

          <!-- Card 2: Attractions -->
          <div class="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group">
            <div class="absolute -right-4 -bottom-4 w-24 h-24 bg-emerald-50 rounded-full group-hover:scale-110 transition-transform -z-0"></div>
            <div class="relative z-10 flex items-start justify-between">
              <div>
                <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">สถานที่ท่องเที่ยว</p>
                <p class="text-3xl font-black text-slate-900 mt-2">{{ countByType('Attraction') }}</p>
                <div class="mt-3 flex items-center gap-1.5 text-xs text-emerald-600 font-bold">
                  <Compass class="w-3.5 h-3.5" />
                  <span>จุดเช็คอินกาญจนบุรี</span>
                </div>
              </div>
              <div class="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-xs">
                <Compass class="w-6 h-6" />
              </div>
            </div>
          </div>

          <!-- Card 3: Restaurants & Hotels -->
          <div class="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group">
            <div class="absolute -right-4 -bottom-4 w-24 h-24 bg-amber-50 rounded-full group-hover:scale-110 transition-transform -z-0"></div>
            <div class="relative z-10 flex items-start justify-between">
              <div>
                <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">ร้านอาหาร & ที่พัก</p>
                <p class="text-3xl font-black text-slate-900 mt-2">{{ countByType('Restaurant') + countByType('Accommodation') }}</p>
                <div class="mt-3 flex items-center gap-1.5 text-xs text-amber-600 font-bold">
                  <Utensils class="w-3.5 h-3.5" />
                  <span>{{ countByType('Restaurant') }} ร้าน / {{ countByType('Accommodation') }} ที่พัก</span>
                </div>
              </div>
              <div class="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shadow-xs">
                <Utensils class="w-6 h-6" />
              </div>
            </div>
          </div>

          <!-- Card 4: Reviews -->
          <div class="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group">
            <div class="absolute -right-4 -bottom-4 w-24 h-24 bg-yellow-50 rounded-full group-hover:scale-110 transition-transform -z-0"></div>
            <div class="relative z-10 flex items-start justify-between">
              <div>
                <p class="text-xs font-bold text-slate-400 uppercase tracking-wider">รีวิวจากนักท่องเที่ยว</p>
                <p class="text-3xl font-black text-slate-900 mt-2">{{ reviews.length }}</p>
                <div class="mt-3 flex items-center gap-1.5 text-xs text-yellow-600 font-bold">
                  <Star class="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  <span>ความคิดเห็นทั้งหมด</span>
                </div>
              </div>
              <div class="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center shadow-xs">
                <Star class="w-6 h-6 fill-yellow-500" />
              </div>
            </div>
          </div>
        </div>

        <!-- Two Column Overview: Recent Places & Recent Reviews -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Recent Places -->
          <div class="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
            <div class="flex items-center justify-between mb-5">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <MapPin class="w-4 h-4" />
                </div>
                <h3 class="font-extrabold text-slate-900 text-lg">สถานที่ล่าสุด</h3>
              </div>
              <button @click="currentTab = 'places'" class="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                ดูทั้งหมด ({{ places.length }})
                <ExternalLink class="w-3.5 h-3.5" />
              </button>
            </div>

            <div class="space-y-3">
              <div 
                v-for="p in places.slice(0, 4)" 
                :key="p.id" 
                class="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100"
              >
                <div class="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200/60">
                  <img v-if="p.images && p.images[0]" :src="formatImageUrl(p.images[0].imageUrl)" class="w-full h-full object-cover" />
                  <div v-else class="w-full h-full flex items-center justify-center text-slate-300">
                    <ImageIcon class="w-6 h-6" />
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2">
                    <h4 class="font-bold text-slate-900 text-sm truncate">{{ p.name }}</h4>
                    <span :class="['text-[10px] font-extrabold px-2 py-0.5 rounded-md shrink-0', getTypeBadgeClass(p.placeType)]">
                      {{ getTypeName(p.placeType) }}
                    </span>
                  </div>
                  <p class="text-xs text-slate-400 truncate mt-0.5">{{ p.description || 'ไม่มีรายละเอียด' }}</p>
                </div>
                <button @click="openEditModal(p)" class="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition">
                  <Edit3 class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <!-- Recent Reviews -->
          <div class="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
            <div class="flex items-center justify-between mb-5">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                  <MessageSquare class="w-4 h-4" />
                </div>
                <h3 class="font-extrabold text-slate-900 text-lg">รีวิวล่าสุด</h3>
              </div>
              <button @click="currentTab = 'reviews'" class="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                ดูทั้งหมด ({{ reviews.length }})
                <ExternalLink class="w-3.5 h-3.5" />
              </button>
            </div>

            <div class="space-y-3">
              <div v-if="reviews.length === 0" class="text-center py-8 text-slate-400 text-sm">
                ยังไม่มีรีวิวในระบบ
              </div>
              <div 
                v-for="r in reviews.slice(0, 4)" 
                :key="r.id" 
                class="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-1.5"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="font-bold text-slate-800 text-xs">{{ getUserName(r.userId) }}</span>
                    <span class="text-[11px] text-slate-400">รีวิว: {{ getPlaceName(r.placeId) }}</span>
                  </div>
                  <div class="flex items-center gap-1 text-amber-500 font-bold text-xs bg-amber-50 px-2 py-0.5 rounded-md">
                    <Star class="w-3.5 h-3.5 fill-amber-400" />
                    <span>{{ r.rating }}</span>
                  </div>
                </div>
                <p class="text-xs text-slate-600 line-clamp-1 italic">"{{ r.comment }}"</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ==================== PLACES TAB ==================== -->
      <div v-if="currentTab === 'places'" class="space-y-6 animate-fade-in max-w-7xl mx-auto">
        <!-- Places Top Bar -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <div>
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <MapPin class="w-5 h-5" />
              </div>
              <div>
                <h2 class="text-2xl font-black text-slate-900 tracking-tight">จัดการข้อมูลสถานที่</h2>
                <p class="text-xs text-slate-400 mt-0.5">รวมแหล่งท่องเที่ยว ร้านอาหาร และที่พักทั้งหมด {{ places.length }} แห่ง</p>
              </div>
            </div>
          </div>
          
          <button 
            @click="openAddModal" 
            class="inline-flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-sm shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <Plus class="w-4 h-4" />
            + เพิ่มสถานที่ใหม่
          </button>
        </div>

        <!-- Filter & Search Controls -->
        <div class="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <!-- Type Filter Tabs -->
          <div class="flex flex-wrap items-center gap-1.5 p-1 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
            <button 
              @click="placeTypeFilter = 'all'" 
              :class="['flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all', placeTypeFilter === 'all' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100']"
            >
              <Compass class="w-3.5 h-3.5" />
              ทั้งหมด ({{ places.length }})
            </button>
            <button 
              @click="placeTypeFilter = 'Attraction'" 
              :class="['flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all', placeTypeFilter === 'Attraction' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100']"
            >
              <Compass class="w-3.5 h-3.5" />
              ที่เที่ยว ({{ countByType('Attraction') }})
            </button>
            <button 
              @click="placeTypeFilter = 'Restaurant'" 
              :class="['flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all', placeTypeFilter === 'Restaurant' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100']"
            >
              <Utensils class="w-3.5 h-3.5" />
              ร้านอาหาร ({{ countByType('Restaurant') }})
            </button>
            <button 
              @click="placeTypeFilter = 'Accommodation'" 
              :class="['flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all', placeTypeFilter === 'Accommodation' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100']"
            >
              <BedDouble class="w-3.5 h-3.5" />
              ที่พัก ({{ countByType('Accommodation') }})
            </button>
          </div>

          <!-- Search Input -->
          <div class="relative min-w-[260px]">
            <Search class="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              v-model="placeSearch" 
              type="text" 
              placeholder="ค้นหาชื่อสถานที่ หรือคำอธิบาย..." 
              class="w-full pl-10 pr-4 py-2.5 bg-white rounded-2xl border border-slate-200/80 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-xs"
            />
          </div>
        </div>

        <!-- Places Card Grid -->
        <div v-if="filteredPlaces.length === 0" class="bg-white rounded-3xl border border-slate-200/80 p-12 text-center">
          <div class="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
            <Search class="w-8 h-8" />
          </div>
          <h3 class="font-extrabold text-slate-800 text-base">ไม่พบข้อมูลสถานที่</h3>
          <p class="text-xs text-slate-400 mt-1">ลองเปลี่ยนคำค้นหา หรือกดปุ่ม "เพิ่มสถานที่ใหม่" เพื่อสร้างข้อมูล</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="place in paginatedPlaces" 
            :key="place.id" 
            class="bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group"
          >
            <!-- Card Image -->
            <div class="h-48 w-full bg-slate-100 relative overflow-hidden">
              <img 
                v-if="place.images && place.images[0]" 
                :src="formatImageUrl(place.images[0].imageUrl)" 
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div v-else class="w-full h-full flex flex-col items-center justify-center text-slate-300 bg-slate-50">
                <ImageIcon class="w-10 h-10" />
                <span class="text-xs font-medium mt-1 text-slate-400">ไม่มีรูปภาพ</span>
              </div>

              <!-- Top Left: Type Badge -->
              <div class="absolute top-3 left-3">
                <span :class="['inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-extrabold shadow-sm backdrop-blur-md', getTypeBadgeClass(place.placeType)]">
                  <Compass v-if="place.placeType === 'Attraction'" class="w-3.5 h-3.5" />
                  <Utensils v-else-if="place.placeType === 'Restaurant'" class="w-3.5 h-3.5" />
                  <BedDouble v-else class="w-3.5 h-3.5" />
                  {{ getTypeName(place.placeType) }}
                </span>
              </div>

              <!-- Top Right: Fee / Price -->
              <div class="absolute top-3 right-3">
                <span class="inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-extrabold bg-slate-900/80 text-white shadow-sm backdrop-blur-md">
                  <Coins class="w-3.5 h-3.5 text-yellow-400" />
                  {{ place.entranceFee > 0 ? '฿' + Number(place.entranceFee).toLocaleString() : 'เข้าชมฟรี' }}
                </span>
              </div>
            </div>

            <!-- Card Content -->
            <div class="p-5 flex-1 flex flex-col justify-between">
              <div class="space-y-2">
                <div class="flex items-start justify-between gap-2">
                  <h3 class="font-extrabold text-slate-900 text-base leading-snug line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {{ place.name }}
                  </h3>
                </div>

                <p class="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {{ place.description || 'ยังไม่มีคำอธิบายสำหรับสถานที่นี้' }}
                </p>

                <!-- Tags / Categories Pills -->
                <div class="flex flex-wrap gap-1 pt-1">
                  <span 
                    v-for="(catName, cIdx) in (place.categoryNames || []).slice(0, 2)" 
                    :key="'c-'+cIdx" 
                    class="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md flex items-center gap-1"
                  >
                    <Folder class="w-2.5 h-2.5" />
                    {{ catName }}
                  </span>
                  <span 
                    v-for="(tagName, tIdx) in (place.tagNames || []).slice(0, 2)" 
                    :key="'t-'+tIdx" 
                    class="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-md flex items-center gap-1"
                  >
                    <Hash class="w-2.5 h-2.5" />
                    {{ tagName }}
                  </span>
                </div>

                <!-- Coordinates Pin -->
                <div class="flex items-center gap-1 text-[11px] text-slate-400 font-medium pt-1">
                  <MapPin class="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{{ Number(place.latitude).toFixed(4) }}, {{ Number(place.longitude).toFixed(4) }}</span>
                </div>
              </div>

              <!-- Card Action Buttons -->
              <div class="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <div class="flex items-center gap-2">
                  <button 
                    @click="openEditModal(place)" 
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl font-bold text-xs transition cursor-pointer"
                  >
                    <Edit3 class="w-3.5 h-3.5" />
                    แก้ไข
                  </button>
                  <button 
                    @click="deletePlace(place.id)" 
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl font-bold text-xs transition cursor-pointer"
                  >
                    <Trash2 class="w-3.5 h-3.5" />
                    ลบ
                  </button>
                </div>

                <a 
                  :href="getPlaceLink(place)" 
                  target="_blank" 
                  class="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition"
                  title="ดูหน้าสถานที่จริง"
                >
                  <ExternalLink class="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination Controls for Places (Max 6 per page) -->
        <div v-if="totalPlacesPages > 1" class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200/80 bg-white p-5 rounded-3xl shadow-xs">
          <p class="text-xs text-slate-500 font-medium">
            แสดงหน้า <span class="font-bold text-slate-900">{{ placesPage }}</span> จากทั้งหมด <span class="font-bold text-slate-900">{{ totalPlacesPages }}</span> หน้า (ทั้งหมด {{ filteredPlaces.length }} แห่ง)
          </p>

          <div class="flex items-center gap-2">
            <button 
              @click="placesPage = Math.max(1, placesPage - 1)" 
              :disabled="placesPage === 1"
              class="px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft class="w-4 h-4" />
              ก่อนหน้า
            </button>

            <div class="flex items-center gap-1">
              <button 
                v-for="p in totalPlacesPages" 
                :key="p"
                @click="placesPage = p"
                :class="[
                  'w-8 h-8 rounded-xl text-xs font-extrabold transition cursor-pointer',
                  placesPage === p 
                    ? 'bg-blue-600 text-white shadow-xs' 
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                ]"
              >
                {{ p }}
              </button>
            </div>

            <button 
              @click="placesPage = Math.min(totalPlacesPages, placesPage + 1)" 
              :disabled="placesPage === totalPlacesPages"
              class="px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1 cursor-pointer"
            >
              ถัดไป
              <ChevronRight class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <!-- ==================== USERS TAB ==================== -->
      <div v-if="currentTab === 'users'" class="space-y-6 animate-fade-in max-w-7xl mx-auto">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Users class="w-5 h-5" />
            </div>
            <div>
              <h2 class="text-2xl font-black text-slate-900 tracking-tight">จัดการข้อมูลผู้ใช้งาน</h2>
              <p class="text-xs text-slate-400 mt-0.5">ตรวจสอบรายชื่อ สิทธิ์การเข้าถึง และบัญชีผู้ใช้งานทั้งหมด {{ users.length }} คน</p>
            </div>
          </div>

          <!-- Search Box -->
          <div class="relative min-w-[280px]">
            <Search class="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              v-model="userSearch" 
              type="text" 
              placeholder="ค้นหาชื่อผู้ใช้ หรืออีเมล..." 
              class="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
        </div>

        <!-- Modern Users Table -->
        <div class="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-50/80 border-b border-slate-100 text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                <th class="px-6 py-4">ID</th>
                <th class="px-6 py-4">ผู้ใช้งาน</th>
                <th class="px-6 py-4">อีเมล</th>
                <th class="px-6 py-4">บทบาทสิทธิ์</th>
                <th class="px-6 py-4">สถานะ</th>
                <th class="px-6 py-4 text-right">จัดการ</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-if="filteredUsers.length === 0">
                <td colspan="6" class="px-6 py-12 text-center text-slate-400 font-medium text-sm">
                  ไม่พบข้อมูลผู้ใช้งานที่ค้นหา
                </td>
              </tr>
              <tr 
                v-for="user in paginatedUsers" 
                :key="user.id" 
                class="hover:bg-slate-50/80 transition-colors"
              >
                <!-- ID -->
                <td class="px-6 py-4 text-xs font-bold text-slate-400">#{{ user.id }}</td>
                
                <!-- Username with Avatar -->
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div :class="['w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs shadow-xs', getUserAvatarColor(user.id)]">
                      {{ (user.username || 'U').substring(0, 2).toUpperCase() }}
                    </div>
                    <div>
                      <p class="font-extrabold text-slate-900 text-sm leading-snug">{{ user.username }}</p>
                      <p class="text-[11px] text-slate-400 font-medium">User Account</p>
                    </div>
                  </div>
                </td>

                <!-- Email -->
                <td class="px-6 py-4">
                  <div class="flex items-center gap-1.5 text-xs text-slate-600">
                    <Mail class="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{{ user.email || '-' }}</span>
                  </div>
                </td>

                <!-- Role Badge -->
                <td class="px-6 py-4">
                  <span 
                    v-if="user.role === 1 || user.role === 'Admin'" 
                    class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-extrabold bg-purple-50 text-purple-700 border border-purple-200/60"
                  >
                    <ShieldCheck class="w-3.5 h-3.5 text-purple-600" />
                    Admin
                  </span>
                  <span 
                    v-else 
                    class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-extrabold bg-blue-50 text-blue-700 border border-blue-200/60"
                  >
                    <UserCheck class="w-3.5 h-3.5 text-blue-600" />
                    Member
                  </span>
                </td>

                <!-- Status -->
                <td class="px-6 py-4">
                  <span class="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                    <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                    ปกติ
                  </span>
                </td>

                <!-- Actions -->
                <td class="px-6 py-4 text-right">
                  <button 
                    @click="deleteUser(user.id)" 
                    class="inline-flex items-center gap-1 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl font-bold text-xs transition cursor-pointer"
                  >
                    <Trash2 class="w-3.5 h-3.5" />
                    ลบ
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination Controls for Users (Max 6 per page) -->
        <div v-if="totalUsersPages > 1" class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200/80 bg-white p-5 rounded-3xl shadow-xs">
          <p class="text-xs text-slate-500 font-medium">
            แสดงหน้า <span class="font-bold text-slate-900">{{ usersPage }}</span> จากทั้งหมด <span class="font-bold text-slate-900">{{ totalUsersPages }}</span> หน้า (ทั้งหมด {{ filteredUsers.length }} ผู้ใช้)
          </p>

          <div class="flex items-center gap-2">
            <button 
              @click="usersPage = Math.max(1, usersPage - 1)" 
              :disabled="usersPage === 1"
              class="px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft class="w-4 h-4" />
              ก่อนหน้า
            </button>

            <div class="flex items-center gap-1">
              <button 
                v-for="p in totalUsersPages" 
                :key="p"
                @click="usersPage = p"
                :class="[
                  'w-8 h-8 rounded-xl text-xs font-extrabold transition cursor-pointer',
                  usersPage === p 
                    ? 'bg-blue-600 text-white shadow-xs' 
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                ]"
              >
                {{ p }}
              </button>
            </div>

            <button 
              @click="usersPage = Math.min(totalUsersPages, usersPage + 1)" 
              :disabled="usersPage === totalUsersPages"
              class="px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1 cursor-pointer"
            >
              ถัดไป
              <ChevronRight class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <!-- ==================== REVIEWS TAB ==================== -->
      <div v-if="currentTab === 'reviews'" class="space-y-6 animate-fade-in max-w-7xl mx-auto">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <MessageSquare class="w-5 h-5" />
            </div>
            <div>
              <h2 class="text-2xl font-black text-slate-900 tracking-tight">ตรวจสอบและจัดการรีวิว</h2>
              <p class="text-xs text-slate-400 mt-0.5">รวมความคิดเห็นและการให้คะแนนทั้งหมด {{ reviews.length }} รายการ</p>
            </div>
          </div>
        </div>

        <!-- Review Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-if="reviews.length === 0" class="col-span-2 bg-white rounded-3xl border border-slate-200/80 p-12 text-center text-slate-400">
            ยังไม่มีข้อมูลรีวิวในระบบ
          </div>

          <div 
            v-for="review in paginatedReviews" 
            :key="review.id" 
            class="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div class="space-y-3">
              <!-- Top Row: User & Place -->
              <div class="flex items-start justify-between gap-3">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs">
                    {{ getUserName(review.userId).substring(0, 2).toUpperCase() }}
                  </div>
                  <div>
                    <h4 class="font-extrabold text-slate-900 text-sm leading-tight">{{ getUserName(review.userId) }}</h4>
                    <p class="text-xs text-blue-600 font-bold flex items-center gap-1 mt-0.5">
                      <MapPin class="w-3 h-3" />
                      {{ getPlaceName(review.placeId) }}
                    </p>
                  </div>
                </div>

                <!-- Stars Rating Badge -->
                <div class="flex items-center gap-1 px-2.5 py-1 bg-amber-50 text-amber-700 rounded-xl font-extrabold text-xs">
                  <Star class="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{{ review.rating }} / 5</span>
                </div>
              </div>

              <!-- Comment Bubble -->
              <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-slate-700 text-sm leading-relaxed">
                "{{ review.comment }}"
              </div>
            </div>

            <!-- Footer: Date & Delete Button -->
            <div class="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-400">
              <div class="flex items-center gap-1.5 font-medium">
                <Calendar class="w-3.5 h-3.5" />
                <span>{{ new Date(review.createdAt).toLocaleDateString('th-TH') }}</span>
              </div>

              <button 
                @click="deleteReview(review.id)" 
                class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl font-bold text-xs transition cursor-pointer"
              >
                <Trash2 class="w-3.5 h-3.5" />
                ลบรีวิวนี้
              </button>
            </div>
          </div>
        </div>

        <!-- Pagination Controls for Reviews (Max 6 per page) -->
        <div v-if="totalReviewsPages > 1" class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200/80 bg-white p-5 rounded-3xl shadow-xs">
          <p class="text-xs text-slate-500 font-medium">
            แสดงหน้า <span class="font-bold text-slate-900">{{ reviewsPage }}</span> จากทั้งหมด <span class="font-bold text-slate-900">{{ totalReviewsPages }}</span> หน้า (ทั้งหมด {{ reviews.length }} รีวิว)
          </p>

          <div class="flex items-center gap-2">
            <button 
              @click="reviewsPage = Math.max(1, reviewsPage - 1)" 
              :disabled="reviewsPage === 1"
              class="px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft class="w-4 h-4" />
              ก่อนหน้า
            </button>

            <div class="flex items-center gap-1">
              <button 
                v-for="p in totalReviewsPages" 
                :key="p"
                @click="reviewsPage = p"
                :class="[
                  'w-8 h-8 rounded-xl text-xs font-extrabold transition cursor-pointer',
                  reviewsPage === p 
                    ? 'bg-blue-600 text-white shadow-xs' 
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                ]"
              >
                {{ p }}
              </button>
            </div>

            <button 
              @click="reviewsPage = Math.min(totalReviewsPages, reviewsPage + 1)" 
              :disabled="reviewsPage === totalReviewsPages"
              class="px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1 cursor-pointer"
            >
              ถัดไป
              <ChevronRight class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

    </main>

    <!-- ==================== ADD / EDIT PLACE MODAL ==================== -->
    <div v-if="showPlaceModal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 md:p-6">
      <div class="bg-white rounded-3xl w-full max-w-5xl max-h-[92vh] overflow-hidden shadow-2xl border border-slate-100 animate-fade-in flex flex-col">
        <!-- Modal Header -->
        <div class="px-6 py-4.5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-20">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Edit3 v-if="editingPlace" class="w-5 h-5" />
              <Plus v-else class="w-5 h-5" />
            </div>
            <div>
              <h3 class="text-lg font-black text-slate-900 flex items-center gap-2">
                {{ editingPlace ? 'แก้ไขข้อมูลสถานที่' : 'เพิ่มสถานที่ใหม่' }}
                <span class="text-xs px-2.5 py-0.5 rounded-full font-bold" :class="getTypeBadgeClass(placeForm.placeType)">
                  {{ getTypeName(placeForm.placeType) }}
                </span>
              </h3>
              <p class="text-xs text-slate-400">กรอกข้อมูลและเลือกตำแหน่งบนแผนที่ได้อย่างสะดวกสบาย</p>
            </div>
          </div>

          <button 
            @click="closePlaceModal" 
            class="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition cursor-pointer"
          >
            <X class="w-5 h-5" />
          </button>
        </div>
        
        <!-- Modal Form with 2 Columns -->
        <form @submit.prevent="savePlace" class="flex-1 overflow-y-auto p-5 md:p-7 flex flex-col">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            <!-- LEFT COLUMN: Basic Info, Type, Fee, Tags, Photos (7 cols) -->
            <div class="lg:col-span-7 space-y-4">
              <!-- 1. ประเภทสถานที่ -->
              <div>
                <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">1. ประเภทสถานที่ *</label>
                <div class="grid grid-cols-3 gap-2.5">
                  <button 
                    type="button" 
                    @click="placeForm.placeType = 'Attraction'" 
                    :class="[
                      'p-3 rounded-2xl border text-center flex flex-col items-center gap-1.5 transition-all cursor-pointer',
                      placeForm.placeType === 'Attraction' 
                        ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20 text-emerald-900 font-black shadow-xs' 
                        : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                    ]"
                  >
                    <div class="w-8 h-8 rounded-xl bg-emerald-100/70 text-emerald-600 flex items-center justify-center">
                      <Compass class="w-4.5 h-4.5" />
                    </div>
                    <span class="text-xs font-extrabold">ที่เที่ยว</span>
                  </button>
                  
                  <button 
                    type="button" 
                    @click="placeForm.placeType = 'Restaurant'" 
                    :class="[
                      'p-3 rounded-2xl border text-center flex flex-col items-center gap-1.5 transition-all cursor-pointer',
                      placeForm.placeType === 'Restaurant' 
                        ? 'border-amber-500 bg-amber-50/60 ring-2 ring-amber-500/20 text-amber-900 font-black shadow-xs' 
                        : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                    ]"
                  >
                    <div class="w-8 h-8 rounded-xl bg-amber-100/70 text-amber-600 flex items-center justify-center">
                      <Utensils class="w-4.5 h-4.5" />
                    </div>
                    <span class="text-xs font-extrabold">ร้านอาหาร / คาเฟ่</span>
                  </button>

                  <button 
                    type="button" 
                    @click="placeForm.placeType = 'Accommodation'" 
                    :class="[
                      'p-3 rounded-2xl border text-center flex flex-col items-center gap-1.5 transition-all cursor-pointer',
                      placeForm.placeType === 'Accommodation' 
                        ? 'border-indigo-500 bg-indigo-50/60 ring-2 ring-indigo-500/20 text-indigo-900 font-black shadow-xs' 
                        : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                    ]"
                  >
                    <div class="w-8 h-8 rounded-xl bg-indigo-100/70 text-indigo-600 flex items-center justify-center">
                      <BedDouble class="w-4.5 h-4.5" />
                    </div>
                    <span class="text-xs font-extrabold">ที่พัก / รีสอร์ท</span>
                  </button>
                </div>
              </div>

              <!-- 2. ชื่อและราคา -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div class="sm:col-span-2">
                  <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">2. ชื่อสถานที่ *</label>
                  <input 
                    type="text" 
                    v-model="placeForm.name" 
                    required 
                    placeholder="เช่น สะพานข้ามแม่น้ำแคว, น้ำตกเอราวัณ..." 
                    class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50/70 text-sm font-semibold focus:bg-white transition"
                  />
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Coins class="w-3.5 h-3.5 text-yellow-500" />
                    {{ placeForm.placeType === 'Accommodation' ? 'ราคา/คืน (บาท)' : 'ค่าเข้า/ราคา (บาท)' }}
                  </label>
                  <input 
                    type="number" 
                    v-model="placeForm.entranceFee" 
                    placeholder="0 (ฟรี)" 
                    class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50/70 text-sm font-semibold focus:bg-white transition"
                  />
                </div>
              </div>

              <!-- 3. คำอธิบาย -->
              <div>
                <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">3. รายละเอียดสถานที่</label>
                <textarea 
                  v-model="placeForm.description" 
                  rows="2" 
                  placeholder="บอกเล่าความเป็นมา จุดเด่น กิจกรรม หรือข้อมูลแนะนำ..." 
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50/70 text-sm focus:bg-white transition resize-none"
                ></textarea>
              </div>

              <!-- 4. หมวดหมู่ & แท็ก (Dropdown Multi-Selects ประหยัดพื้นที่ สะอาดตา) -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 relative">
                <!-- Transparent overlay to close dropdowns when clicking outside -->
                <div 
                  v-if="isCategoryDropdownOpen || isTagDropdownOpen" 
                  @click="isCategoryDropdownOpen = false; isTagDropdownOpen = false" 
                  class="fixed inset-0 z-20"
                ></div>

                <!-- Categories Dropdown -->
                <div class="relative z-25">
                  <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                    <span class="flex items-center gap-1.5">
                      <Folder class="w-3.5 h-3.5 text-blue-500" />
                      หมวดหมู่ (Categories)
                    </span>
                    <span v-if="placeForm.categoryIds.length > 0" class="text-[10px] text-blue-600 font-bold">
                      เลือกแล้ว {{ placeForm.categoryIds.length }}
                    </span>
                  </label>

                  <!-- Trigger Button -->
                  <button 
                    type="button" 
                    @click="isCategoryDropdownOpen = !isCategoryDropdownOpen; isTagDropdownOpen = false"
                    class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 text-xs font-semibold text-slate-700 flex items-center justify-between transition cursor-pointer shadow-xs"
                  >
                    <span class="truncate">
                      {{ placeForm.categoryIds.length === 0 ? 'เลือกหมวดหมู่... (คลิกเพื่อเลือก)' : `เลือกแล้ว (${placeForm.categoryIds.length} หมวดหมู่)` }}
                    </span>
                    <ChevronDown class="w-4 h-4 text-slate-400 transition-transform" :class="isCategoryDropdownOpen ? 'rotate-180' : ''" />
                  </button>

                  <!-- Floating Dropdown Menu -->
                  <div 
                    v-if="isCategoryDropdownOpen" 
                    class="absolute left-0 right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-2xl shadow-xl z-30 p-2 max-h-48 overflow-y-auto space-y-1 animate-fade-in"
                  >
                    <button 
                      type="button"
                      v-for="cat in allCategories" 
                      :key="cat.id" 
                      @click="toggleCategory(cat.id)"
                      class="w-full px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between transition text-left cursor-pointer"
                      :class="isCategorySelected(cat.id) ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50 text-slate-700'"
                    >
                      <span>{{ cat.name }}</span>
                      <Check v-if="isCategorySelected(cat.id)" class="w-3.5 h-3.5 text-blue-600" />
                    </button>
                  </div>

                  <!-- Selected Pills -->
                  <div v-if="placeForm.categoryIds.length > 0" class="mt-1.5 flex flex-wrap gap-1">
                    <span 
                      v-for="catId in placeForm.categoryIds" 
                      :key="catId"
                      class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200/60"
                    >
                      <span>{{ getCategoryNameById(catId) }}</span>
                      <button type="button" @click.stop="toggleCategory(catId)" class="hover:text-blue-900 cursor-pointer">
                        <X class="w-2.5 h-2.5" />
                      </button>
                    </span>
                  </div>
                </div>

                <!-- Tags Dropdown -->
                <div class="relative z-25">
                  <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                    <span class="flex items-center gap-1.5">
                      <Hash class="w-3.5 h-3.5 text-emerald-500" />
                      แท็กจุดเด่น (Tags)
                    </span>
                    <span v-if="placeForm.tagIds.length > 0" class="text-[10px] text-emerald-600 font-bold">
                      เลือกแล้ว {{ placeForm.tagIds.length }}
                    </span>
                  </label>

                  <!-- Trigger Button -->
                  <button 
                    type="button" 
                    @click="isTagDropdownOpen = !isTagDropdownOpen; isCategoryDropdownOpen = false"
                    class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 text-xs font-semibold text-slate-700 flex items-center justify-between transition cursor-pointer shadow-xs"
                  >
                    <span class="truncate">
                      {{ placeForm.tagIds.length === 0 ? 'เลือกแท็กจุดเด่น... (คลิกเพื่อเลือก)' : `เลือกแล้ว (${placeForm.tagIds.length} แท็ก)` }}
                    </span>
                    <ChevronDown class="w-4 h-4 text-slate-400 transition-transform" :class="isTagDropdownOpen ? 'rotate-180' : ''" />
                  </button>

                  <!-- Floating Dropdown Menu -->
                  <div 
                    v-if="isTagDropdownOpen" 
                    class="absolute left-0 right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-2xl shadow-xl z-30 p-2 max-h-48 overflow-y-auto space-y-1 animate-fade-in"
                  >
                    <button 
                      type="button"
                      v-for="tag in allTags" 
                      :key="tag.id" 
                      @click="toggleTag(tag.id)"
                      class="w-full px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between transition text-left cursor-pointer"
                      :class="isTagSelected(tag.id) ? 'bg-emerald-50 text-emerald-700 font-bold' : 'hover:bg-slate-50 text-slate-700'"
                    >
                      <span>{{ tag.name }}</span>
                      <Check v-if="isTagSelected(tag.id)" class="w-3.5 h-3.5 text-emerald-600" />
                    </button>
                  </div>

                  <!-- Selected Pills -->
                  <div v-if="placeForm.tagIds.length > 0" class="mt-1.5 flex flex-wrap gap-1">
                    <span 
                      v-for="tagId in placeForm.tagIds" 
                      :key="tagId"
                      class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200/60"
                    >
                      <span>{{ getTagNameById(tagId) }}</span>
                      <button type="button" @click.stop="toggleTag(tagId)" class="hover:text-emerald-900 cursor-pointer">
                        <X class="w-2.5 h-2.5" />
                      </button>
                    </span>
                  </div>
                </div>
              </div>

              <!-- 5. อัปโหลดรูปภาพ -->
              <div>
                <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <ImageIcon class="w-3.5 h-3.5 text-blue-500" />
                  รูปภาพสถานที่
                </label>
                
                <label class="border-2 border-dashed border-slate-200 hover:border-blue-500 rounded-2xl p-4 flex flex-col items-center justify-center gap-1.5 cursor-pointer bg-slate-50/50 hover:bg-blue-50/30 transition group">
                  <UploadCloud class="w-6 h-6 text-slate-400 group-hover:text-blue-600 transition" />
                  <p class="text-xs font-bold text-slate-700">คลิกเลือกรูปภาพ หรือลากไฟล์มาวางที่นี่</p>
                  <p class="text-[10px] text-slate-400">รองรับ JPG, PNG, WEBP (เลือกได้หลายรูป)</p>
                  <input type="file" @change="handleFileChange" multiple accept="image/*" class="hidden" />
                </label>

                <!-- Preview Strip -->
                <div v-if="existingImages.length > 0 || selectedFilePreviews.length > 0" class="mt-2.5 flex flex-wrap gap-2">
                  <!-- รูปเดิมในระบบ -->
                  <div 
                    v-for="img in existingImages" 
                    :key="'exist-' + img.id" 
                    class="w-14 h-14 rounded-xl relative overflow-hidden border border-slate-200 group shadow-xs"
                  >
                    <img :src="formatImageUrl(img.imageUrl)" class="w-full h-full object-cover" />
                    <button 
                      type="button" 
                      @click="removeExistingImage(img.id)" 
                      class="absolute inset-0 bg-red-600/80 text-white flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer"
                      title="ลบรูปภาพนี้"
                    >
                      <X class="w-4 h-4 stroke-[3]" />
                      <span class="text-[9px] font-black mt-0.5">ลบ</span>
                    </button>
                    <span v-if="img.isPrimary" class="absolute bottom-0 inset-x-0 bg-blue-600 text-[8px] text-white text-center py-0.5 font-bold">หลัก</span>
                  </div>

                  <!-- รูปใหม่ที่กำลังจะอัปโหลด -->
                  <div 
                    v-for="(preview, idx) in selectedFilePreviews" 
                    :key="'new-' + idx" 
                    class="w-14 h-14 rounded-xl relative overflow-hidden border-2 border-blue-400 group shadow-xs"
                  >
                    <img :src="preview" class="w-full h-full object-cover" />
                    <button 
                      type="button" 
                      @click="removeNewFile(idx)" 
                      class="absolute inset-0 bg-slate-900/80 text-white flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer"
                      title="ยกเลิกรูปนี้"
                    >
                      <X class="w-4 h-4 stroke-[3]" />
                      <span class="text-[9px] font-bold mt-0.5">ยกเลิก</span>
                    </button>
                    <span class="absolute top-0 right-0 bg-blue-600 text-[8px] text-white px-1 rounded-bl font-bold">ใหม่</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- RIGHT COLUMN: SMART LOCATION & MAP PICKER (5 cols) -->
            <div class="lg:col-span-5 flex flex-col space-y-3.5 bg-slate-50/80 p-5 rounded-3xl border border-slate-200/80">
              
              <!-- Location Header -->
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-sm font-black text-slate-900 flex items-center gap-1.5">
                    <MapPin class="w-4 h-4 text-blue-600" />
                    ตำแหน่งที่ตั้ง & แผนที่
                  </h4>
                  <p class="text-[11px] text-slate-500 mt-0.5">เลือกอำเภอ หรือคลิกปักหมุดบนแผนที่ได้เลย</p>
                </div>

                <button 
                  type="button" 
                  @click="useCurrentGps" 
                  :disabled="gettingGps"
                  class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-700 text-[11px] font-bold transition cursor-pointer"
                  title="ระบุพิกัดจากตำแหน่งปัจจุบัน"
                >
                  <Navigation class="w-3 h-3" :class="gettingGps ? 'animate-spin' : ''" />
                  <span>{{ gettingGps ? 'ค้นหา...' : 'GPS ของฉัน' }}</span>
                </button>
              </div>

              <!-- 1. Quick Select District Dropdown -->
              <div>
                <label class="block text-[11px] font-bold text-slate-600 mb-1">
                  📍 เลือกอำเภอในกาญจนบุรี (13 อำเภอ)
                </label>
                <select 
                  v-model="selectedDistrict" 
                  @change="onDistrictChange"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition shadow-xs cursor-pointer"
                >
                  <option value="" disabled>-- เลือกอำเภอเพื่อเล็งพิกัดทันที --</option>
                  <option v-for="d in kanchanaburiDistricts" :key="d.name" :value="d.name">
                    {{ d.name }}
                  </option>
                </select>
              </div>

              <!-- 2. Popular Spot Shortcuts (1-Click Chips) -->
              <div>
                <label class="block text-[11px] font-bold text-slate-500 mb-1.5">
                  ⚡ จุดเช็คอินยอดนิยม (คลิกครั้งเดียวปักหมุดทันที)
                </label>
                <div class="flex flex-wrap gap-1.5">
                  <button 
                    type="button"
                    v-for="lm in popularLandmarks" 
                    :key="lm.name"
                    @click="selectLandmark(lm)"
                    class="px-2.5 py-1 rounded-lg bg-white hover:bg-blue-50 hover:text-blue-600 border border-slate-200 text-[11px] font-semibold text-slate-600 transition shadow-2xs cursor-pointer"
                  >
                    {{ lm.name }}
                  </button>
                </div>
              </div>

              <!-- 3. Search Box on Map -->
              <div class="relative">
                <input 
                  type="text" 
                  v-model="searchMapQuery" 
                  @keyup.enter="searchMapLocation"
                  placeholder="ค้นหาชื่อสถานที่บนแผนที่..." 
                  class="w-full pl-8 pr-16 py-2 rounded-xl border border-slate-300 bg-white text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
                <Search class="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <button 
                  type="button" 
                  @click="searchMapLocation" 
                  :disabled="searchingMap"
                  class="absolute right-1 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-blue-600 text-white text-[10px] font-bold hover:bg-blue-700 transition cursor-pointer"
                >
                  {{ searchingMap ? '...' : 'ค้นหา' }}
                </button>
              </div>

              <!-- 4. Interactive Map Container -->
              <div class="relative rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100">
                <div id="admin-place-map" class="w-full h-[240px] z-0"></div>
              </div>

              <!-- 5. Coordinates Display & Manual Input Toggle -->
              <div class="bg-white p-3 rounded-2xl border border-slate-200 space-y-2 shadow-xs">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <div class="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <Check class="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">พิกัดปัจจุบัน</p>
                      <p class="text-xs font-black text-slate-800 font-mono">
                        {{ placeForm.latitude }}, {{ placeForm.longitude }}
                      </p>
                    </div>
                  </div>

                  <button 
                    type="button" 
                    @click="showManualCoords = !showManualCoords"
                    class="text-[11px] font-bold text-blue-600 hover:text-blue-700 underline cursor-pointer"
                  >
                    {{ showManualCoords ? 'ซ่อนตัวเลข' : 'แก้ไขตัวเลขเอง' }}
                  </button>
                </div>

                <!-- Collapsible Manual Lat/Lng Inputs -->
                <div v-if="showManualCoords" class="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 animate-fade-in">
                  <div>
                    <label class="block text-[10px] font-bold text-slate-500 mb-0.5">ละติจูด (Lat)</label>
                    <input 
                      type="number" 
                      step="any" 
                      v-model="placeForm.latitude" 
                      @input="onManualCoordinateChange"
                      class="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-mono bg-slate-50"
                    />
                  </div>
                  <div>
                    <label class="block text-[10px] font-bold text-slate-500 mb-0.5">ลองจิจูด (Lng)</label>
                    <input 
                      type="number" 
                      step="any" 
                      v-model="placeForm.longitude" 
                      @input="onManualCoordinateChange"
                      class="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-mono bg-slate-50"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>

          <!-- Modal Action Buttons Footer -->
          <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-3 sticky bottom-0 bg-white/95 backdrop-blur-sm -mb-2 pb-2">
            <button 
              type="button" 
              @click="closePlaceModal" 
              class="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-2xl text-xs transition cursor-pointer"
            >
              ยกเลิก
            </button>
            <button 
              type="submit" 
              class="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-xs shadow-md shadow-blue-500/20 transition cursor-pointer disabled:opacity-50" 
              :disabled="saving"
            >
              <Check v-if="!saving" class="w-4 h-4" />
              <span v-if="saving">กำลังบันทึก...</span>
              <span v-else>บันทึกข้อมูลสถานที่</span>
            </button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'
import { formatImageUrl } from '../utils/imageUrl'
import { useToast } from '../composables/useNotify'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {
  LayoutDashboard,
  Users,
  MapPin,
  MessageSquare,
  Plus,
  Search,
  Trash2,
  Edit3,
  UploadCloud,
  X,
  Check,
  Star,
  ShieldCheck,
  UserCheck,
  Mail,
  Coins,
  ExternalLink,
  Compass,
  Utensils,
  BedDouble,
  ArrowLeft,
  Calendar,
  Image as ImageIcon,
  Folder,
  Hash,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Navigation
} from 'lucide-vue-next'

const router = useRouter()
const toast = useToast()

const currentTab = ref('dashboard')

const users = ref([])
const places = ref([])
const reviews = ref([])
const allCategories = ref([])
const allTags = ref([])

// Filters
const placeSearch = ref('')
const placeTypeFilter = ref('all')
const userSearch = ref('')

onMounted(async () => {
  try {
    const [uRes, pRes, revRes, catRes, tagRes] = await Promise.all([
      api.get('/Users').catch(()=>({data:[]})),
      api.get('/Places').catch(()=>({data:[]})),
      api.get('/Reviews').catch(()=>({data:[]})),
      api.get('/Categories').catch(()=>({data:[]})),
      api.get('/Tags').catch(()=>({data:[]}))
    ])
    users.value = uRes.data
    places.value = pRes.data
    reviews.value = revRes.data.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt))
    allCategories.value = catRes.data
    allTags.value = tagRes.data
  } catch(e) {
    console.error(e)
  }
})

// Filtered lists
const filteredPlaces = computed(() => {
  return places.value.filter(p => {
    const matchType = placeTypeFilter.value === 'all' || p.placeType === placeTypeFilter.value
    const matchQuery = !placeSearch.value || 
      p.name.toLowerCase().includes(placeSearch.value.toLowerCase()) || 
      (p.description && p.description.toLowerCase().includes(placeSearch.value.toLowerCase()))
    return matchType && matchQuery
  })
})

// Places Pagination (Limit to max 6 items per page)
const placesPage = ref(1)
const itemsPerPage = 6

const totalPlacesPages = computed(() => Math.ceil(filteredPlaces.value.length / itemsPerPage) || 1)

const paginatedPlaces = computed(() => {
  const start = (placesPage.value - 1) * itemsPerPage
  return filteredPlaces.value.slice(start, start + itemsPerPage)
})

watch([placeSearch, placeTypeFilter], () => {
  placesPage.value = 1
})

// Reviews Pagination (Limit to max 6 items per page)
const reviewsPage = ref(1)
const reviewsPerPage = 6

const totalReviewsPages = computed(() => Math.ceil(reviews.value.length / reviewsPerPage) || 1)

const paginatedReviews = computed(() => {
  const start = (reviewsPage.value - 1) * reviewsPerPage
  return reviews.value.slice(start, start + reviewsPerPage)
})

const filteredUsers = computed(() => {
  if (!userSearch.value) return users.value
  const q = userSearch.value.toLowerCase()
  return users.value.filter(u => 
    (u.username && u.username.toLowerCase().includes(q)) || 
    (u.email && u.email.toLowerCase().includes(q))
  )
})

// Users Pagination (Limit to max 6 items per page)
const usersPage = ref(1)
const usersPerPage = 6

const totalUsersPages = computed(() => Math.ceil(filteredUsers.value.length / usersPerPage) || 1)

const paginatedUsers = computed(() => {
  const start = (usersPage.value - 1) * usersPerPage
  return filteredUsers.value.slice(start, start + usersPerPage)
})

watch(userSearch, () => {
  usersPage.value = 1
})

const countByType = (type) => {
  return places.value.filter(p => p.placeType === type).length
}

const getTypeBadgeClass = (type) => {
  if (type === 'Attraction') return 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
  if (type === 'Restaurant') return 'bg-amber-50 text-amber-700 border border-amber-200/60'
  return 'bg-indigo-50 text-indigo-700 border border-indigo-200/60'
}

const getTypeName = (type) => {
  if (type === 'Attraction') return 'สถานที่เที่ยว'
  if (type === 'Restaurant') return 'ร้านอาหาร'
  return 'ที่พัก & รีสอร์ท'
}

const getPlaceLink = (place) => {
  if (place.placeType === 'Restaurant') return `/restaurants/${place.id}`
  if (place.placeType === 'Accommodation') return `/hotels/${place.id}`
  return `/places/${place.id}`
}

const getUserAvatarColor = (id) => {
  const colors = [
    'bg-blue-100 text-blue-700',
    'bg-indigo-100 text-indigo-700',
    'bg-emerald-100 text-emerald-700',
    'bg-purple-100 text-purple-700',
    'bg-amber-100 text-amber-700',
    'bg-rose-100 text-rose-700'
  ]
  return colors[id % colors.length]
}

// Modal & Map State
const showPlaceModal = ref(false)
const editingPlace = ref(null)
const saving = ref(false)
const selectedFiles = ref([])
const selectedFilePreviews = ref([])
const existingImages = ref([])
const deletedImageIds = ref([])
const showManualCoords = ref(false)
const selectedDistrict = ref('')
const searchMapQuery = ref('')
const searchingMap = ref(false)
const gettingGps = ref(false)

const isCategoryDropdownOpen = ref(false)
const isTagDropdownOpen = ref(false)

const getCategoryNameById = (id) => {
  const cat = allCategories.value.find(c => c.id === id)
  return cat ? cat.name : 'หมวดหมู่ #' + id
}

const getTagNameById = (id) => {
  const tag = allTags.value.find(t => t.id === id)
  return tag ? tag.name : 'แท็ก #' + id
}

let mapInstance = null
let markerInstance = null

// 13 Districts of Kanchanaburi
const kanchanaburiDistricts = [
  { name: 'อ.เมืองกาญจนบุรี (ตัวเมือง / สะพานแม่น้ำแคว)', lat: 14.0416, lng: 99.5036, locationId: 1 },
  { name: 'อ.ไทรโยค (ถ้ำกระแซ / ทางรถไฟสายมรณะ)', lat: 14.1030, lng: 99.1678, locationId: 3 },
  { name: 'อ.ศรีสวัสดิ์ (น้ำตกเอราวัณ / เขื่อนศรีนครินทร์)', lat: 14.3761, lng: 99.1444, locationId: 2 },
  { name: 'อ.สังขละบุรี (สะพานมอญ / เมืองบาดาล)', lat: 15.1550, lng: 98.4550, locationId: 5 },
  { name: 'อ.ทองผาภูมิ (บ้านอีต่อง / เหมืองปิล็อก)', lat: 14.6592, lng: 98.3712, locationId: 6 },
  { name: 'อ.ท่าม่วง (วัดถ้ำเสือ / มีนาคาเฟ่)', lat: 13.9538, lng: 99.6052, locationId: 9 },
  { name: 'อ.บ่อพลอย (สวนสัตว์ ซาฟารีปาร์ค)', lat: 14.2625, lng: 99.5202, locationId: 1 },
  { name: 'อ.ด่านมะขามเตี้ย', lat: 13.8540, lng: 99.4180, locationId: 1 },
  { name: 'อ.ท่ามะกา', lat: 13.9210, lng: 99.7610, locationId: 1 },
  { name: 'อ.พนมทวน (พระบรมราชานุสรณ์ดอนเจดีย์)', lat: 14.1290, lng: 99.6970, locationId: 1 },
  { name: 'อ.หนองปรือ', lat: 14.6080, lng: 99.4480, locationId: 1 },
  { name: 'อ.เลาขวัญ', lat: 14.5950, lng: 99.7820, locationId: 1 },
  { name: 'อ.ห้วยกระเจา', lat: 14.3290, lng: 99.8240, locationId: 1 }
]

// Popular Landmark Shortcuts
const popularLandmarks = [
  { name: 'สะพานข้ามแม่น้ำแคว', lat: 14.0416, lng: 99.5036, locationId: 1 },
  { name: 'น้ำตกเอราวัณ', lat: 14.3761, lng: 99.1444, locationId: 2 },
  { name: 'สะพานมอญ', lat: 15.1550, lng: 98.4550, locationId: 5 },
  { name: 'ถ้ำกระแซ', lat: 14.1030, lng: 99.1678, locationId: 3 },
  { name: 'วัดถ้ำเสือ', lat: 13.9538, lng: 99.6052, locationId: 9 },
  { name: 'บ้านอีต่อง', lat: 14.6592, lng: 98.3712, locationId: 6 }
]

const placeForm = ref({
  name: '',
  description: '',
  placeType: 'Attraction',
  latitude: 14.0416,
  longitude: 99.5036,
  entranceFee: 0,
  locationId: 1,
  categoryIds: [],
  tagIds: []
})

const updateCoordinates = (lat, lng, locId = null) => {
  placeForm.value.latitude = Number(Number(lat).toFixed(6))
  placeForm.value.longitude = Number(Number(lng).toFixed(6))
  if (locId) {
    placeForm.value.locationId = locId
  }
}

const onManualCoordinateChange = () => {
  const lat = Number(placeForm.value.latitude)
  const lng = Number(placeForm.value.longitude)
  if (!isNaN(lat) && !isNaN(lng) && mapInstance && markerInstance) {
    markerInstance.setLatLng([lat, lng])
    mapInstance.panTo([lat, lng])
  }
}

const selectDistrict = (d) => {
  selectedDistrict.value = d.name
  updateCoordinates(d.lat, d.lng, d.locationId)
  if (mapInstance && markerInstance) {
    markerInstance.setLatLng([d.lat, d.lng])
    mapInstance.flyTo([d.lat, d.lng], 13, { duration: 1 })
  }
}

const onDistrictChange = () => {
  const d = kanchanaburiDistricts.find(item => item.name === selectedDistrict.value)
  if (d) {
    selectDistrict(d)
  }
}

const selectLandmark = (lm) => {
  updateCoordinates(lm.lat, lm.lng, lm.locationId)
  if (mapInstance && markerInstance) {
    markerInstance.setLatLng([lm.lat, lm.lng])
    mapInstance.flyTo([lm.lat, lm.lng], 15, { duration: 1 })
  }
  toast.success(`เลือกตำแหน่ง: ${lm.name}`)
}

const searchMapLocation = async () => {
  if (!searchMapQuery.value.trim()) return
  searchingMap.value = true
  try {
    const query = `${searchMapQuery.value.trim()} กาญจนบุรี`
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`)
    const data = await res.json()
    if (data && data.length > 0) {
      const lat = parseFloat(data[0].lat)
      const lng = parseFloat(data[0].lon)
      updateCoordinates(lat, lng)
      if (mapInstance && markerInstance) {
        markerInstance.setLatLng([lat, lng])
        mapInstance.flyTo([lat, lng], 14, { duration: 1.2 })
      }
      toast.success(`พบตำแหน่ง: ${data[0].display_name.split(',')[0]}`)
    } else {
      toast.error('ไม่พบตำแหน่งที่ค้นหา')
    }
  } catch (e) {
    console.error(e)
    toast.error('เกิดข้อผิดพลาดในการค้นหา')
  } finally {
    searchingMap.value = false
  }
}

const useCurrentGps = () => {
  if (!navigator.geolocation) {
    toast.error('เบราว์เซอร์ไม่รองรับ GPS')
    return
  }
  gettingGps.value = true
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude
      const lng = pos.coords.longitude
      updateCoordinates(lat, lng)
      if (mapInstance && markerInstance) {
        markerInstance.setLatLng([lat, lng])
        mapInstance.flyTo([lat, lng], 15, { duration: 1 })
      }
      gettingGps.value = false
      toast.success('ระบุตำแหน่งจาก GPS สำเร็จ')
    },
    (err) => {
      console.warn(err)
      gettingGps.value = false
      toast.error('ไม่สามารถดึงตำแหน่ง GPS ได้')
    }
  )
}

const initAdminMap = async () => {
  await nextTick()
  const container = document.getElementById('admin-place-map')
  if (!container) return

  if (mapInstance) {
    mapInstance.remove()
    mapInstance = null
    markerInstance = null
  }

  const lat = Number(placeForm.value.latitude) || 14.0416
  const lng = Number(placeForm.value.longitude) || 99.5036

  mapInstance = L.map(container, {
    zoomControl: true,
    scrollWheelZoom: true
  }).setView([lat, lng], 13)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap'
  }).addTo(mapInstance)

  const pinIcon = L.divIcon({
    className: 'custom-admin-pin',
    html: `
      <div style="position: relative; width: 36px; height: 42px; transform: translate(-18px, -42px); cursor: pointer;">
        <svg viewBox="0 0 24 24" width="36" height="42" style="filter: drop-shadow(0 4px 8px rgba(37,99,235,0.45));">
          <path fill="#2563eb" stroke="#ffffff" stroke-width="1.5" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
          <circle cx="12" cy="9" r="3" fill="#ffffff"/>
        </svg>
      </div>
    `,
    iconSize: [36, 42],
    iconAnchor: [18, 42]
  })

  markerInstance = L.marker([lat, lng], { draggable: true, icon: pinIcon }).addTo(mapInstance)

  markerInstance.on('dragend', (e) => {
    const pos = e.target.getLatLng()
    updateCoordinates(pos.lat, pos.lng)
  })

  mapInstance.on('click', (e) => {
    markerInstance.setLatLng(e.latlng)
    updateCoordinates(e.latlng.lat, e.latlng.lng)
  })

  setTimeout(() => {
    if (mapInstance) {
      mapInstance.invalidateSize()
    }
  }, 350)
}

const openAddModal = () => {
  editingPlace.value = null
  placeForm.value = {
    name: '',
    description: '',
    placeType: 'Attraction',
    latitude: 14.0416,
    longitude: 99.5036,
    entranceFee: 0,
    locationId: 1,
    categoryIds: [],
    tagIds: []
  }
  selectedFiles.value = []
  selectedFilePreviews.value = []
  existingImages.value = []
  deletedImageIds.value = []
  selectedDistrict.value = ''
  searchMapQuery.value = ''
  showManualCoords.value = false
  isCategoryDropdownOpen.value = false
  isTagDropdownOpen.value = false
  showPlaceModal.value = true
  initAdminMap()
}

const openEditModal = (place) => {
  editingPlace.value = place
  placeForm.value = {
    name: place.name,
    description: place.description,
    placeType: place.placeType || 'Attraction',
    latitude: place.latitude || 14.0416,
    longitude: place.longitude || 99.5036,
    entranceFee: place.entranceFee || 0,
    locationId: place.locationId || 1,
    categoryIds: [...(place.categoryIds || [])],
    tagIds: [...(place.tagIds || [])]
  }
  selectedFiles.value = []
  selectedFilePreviews.value = []
  existingImages.value = [...(place.images || [])]
  deletedImageIds.value = []
  selectedDistrict.value = ''
  searchMapQuery.value = ''
  showManualCoords.value = false
  isCategoryDropdownOpen.value = false
  isTagDropdownOpen.value = false
  showPlaceModal.value = true
  initAdminMap()
}

const closePlaceModal = () => {
  showPlaceModal.value = false
  isCategoryDropdownOpen.value = false
  isTagDropdownOpen.value = false
  if (mapInstance) {
    mapInstance.remove()
    mapInstance = null
    markerInstance = null
  }
}

onUnmounted(() => {
  if (mapInstance) {
    mapInstance.remove()
    mapInstance = null
    markerInstance = null
  }
})

const handleFileChange = (e) => {
  const files = Array.from(e.target.files || [])
  for (const file of files) {
    selectedFiles.value.push(file)
    const reader = new FileReader()
    reader.onload = (ev) => {
      selectedFilePreviews.value.push(ev.target.result)
    }
    reader.readAsDataURL(file)
  }
  e.target.value = ''
}

const removeExistingImage = (imgId) => {
  existingImages.value = existingImages.value.filter(img => img.id !== imgId)
  if (!deletedImageIds.value.includes(imgId)) {
    deletedImageIds.value.push(imgId)
  }
}

const removeNewFile = (idx) => {
  selectedFilePreviews.value.splice(idx, 1)
  if (idx < selectedFiles.value.length) {
    selectedFiles.value.splice(idx, 1)
  }
}

const toggleCategory = (id) => {
  const idx = placeForm.value.categoryIds.indexOf(id)
  if (idx > -1) {
    placeForm.value.categoryIds.splice(idx, 1)
  } else {
    placeForm.value.categoryIds.push(id)
  }
}

const isCategorySelected = (id) => {
  return placeForm.value.categoryIds.includes(id)
}

const toggleTag = (id) => {
  const idx = placeForm.value.tagIds.indexOf(id)
  if (idx > -1) {
    placeForm.value.tagIds.splice(idx, 1)
  } else {
    placeForm.value.tagIds.push(id)
  }
}

const isTagSelected = (id) => {
  return placeForm.value.tagIds.includes(id)
}

const savePlace = async () => {
  saving.value = true
  try {
    const payload = { ...placeForm.value }
    let savedPlaceId = null

    if (editingPlace.value) {
      payload.id = editingPlace.value.id
      await api.put('/Places/' + payload.id, payload)
      savedPlaceId = payload.id
      toast.success('อัปเดตข้อมูลสถานที่สำเร็จ')
    } else {
      const res = await api.post('/Places', payload)
      savedPlaceId = res.data.id
      toast.success('เพิ่มสถานที่ใหม่สำเร็จ')
    }

    // 1. Delete removed existing images from backend
    if (deletedImageIds.value.length > 0) {
      for (const imgId of deletedImageIds.value) {
        try {
          await api.delete(`/PlaceImages/${imgId}`)
        } catch (delErr) {
          console.error(`Failed to delete image ${imgId}:`, delErr)
        }
      }
    }

    // 2. Upload new files
    if (savedPlaceId && selectedFiles.value.length > 0) {
      for (const file of selectedFiles.value) {
        try {
          const formData = new FormData()
          formData.append('file', file)
          await api.post(`/Places/${savedPlaceId}/Images`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          })
        } catch (upErr) {
          console.error('Failed to upload image:', upErr)
        }
      }
      toast.success('อัปโหลดรูปภาพสำเร็จ')
    }

    // 3. Refresh places from server to ensure 100% data sync
    try {
      const refreshed = await api.get('/Places')
      places.value = refreshed.data
    } catch (refErr) {
      console.error('Failed to refresh places:', refErr)
    }

    closePlaceModal()
  } catch (err) {
    console.error(err)
    toast.error('เกิดข้อผิดพลาดในการบันทึก')
  } finally {
    saving.value = false
  }
}


const getUserName = (id) => {
  const u = users.value.find(user => user.id === id)
  return u ? u.username : 'ผู้ใช้ #' + id
}

const getPlaceName = (id) => {
  const p = places.value.find(place => place.id === id)
  return p ? p.name : 'สถานที่ #' + id
}

const deleteUser = async (id) => {
  if (confirm('ยืนยันการลบผู้ใช้งานนี้ออกจากระบบ?')) {
    try {
      await api.delete('/Users/' + id)
      users.value = users.value.filter(u => u.id !== id)
      toast.success('ลบผู้ใช้สำเร็จ')
    } catch (err) {
      toast.error('ไม่สามารถลบผู้ใช้ได้')
    }
  }
}

const deletePlace = async (id) => {
  if(confirm('ยืนยันการลบสถานที่นี้? ข้อมูลและรูปภาพจะถูกลบออกจากระบบ')) {
    try {
      await api.delete('/Places/'+id)
      places.value = places.value.filter(p => p.id !== id)
      toast.success('ลบสถานที่สำเร็จ')
    } catch (e) {
      toast.error('เกิดข้อผิดพลาดในการลบสถานที่')
    }
  }
}

const deleteReview = async (id) => {
  if(confirm('ยืนยันการลบรีวิวนี้ออกจากระบบ?')) {
    try {
      await api.delete('/Reviews/'+id)
      reviews.value = reviews.value.filter(r => r.id !== id)
      toast.success('ลบรีวิวสำเร็จ')
    } catch (e) {
      toast.error('เกิดข้อผิดพลาดในการลบรีวิว')
    }
  }
}
</script>
