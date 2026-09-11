<!-- หน้าเว็บ: หน้าแรกของเว็บไซต์ -->
<template>
  <div class="bg-gray-50 min-h-screen pb-20 font-sans">
    
    <div class="max-w-[1500px] mx-auto px-4 md:px-8 pt-4">
      <!-- 1. Hero Banner Wrapper -->
      <div class="relative mb-24">
        
        <!-- Image & Background (Rounded and Clipped) -->
        <div class="w-full h-[380px] md:h-[450px] rounded-3xl overflow-hidden relative shadow-sm group">
          <transition-group name="fade" tag="div" class="relative w-full h-full">
            <div v-for="(slide, index) in heroSlides" :key="index" v-show="currentSlide === index" class="absolute inset-0 w-full h-full">
              <img :src="slide.image" class="absolute inset-0 w-full h-full object-cover transition-transform duration-[10000ms]" :class="currentSlide === index ? 'scale-110' : 'scale-100'" alt="Kanchanaburi Landscape" />
              <div class="absolute inset-0 bg-gradient-to-r from-[#002244]/95 via-[#002244]/50 to-transparent"></div>
              
              <!-- Content Container -->
              <div class="relative w-full h-full px-6 md:px-16 flex flex-col justify-center">
                
                <!-- Left Text -->
                <div class="text-white z-10 w-full md:w-auto -mt-10 transform transition-all duration-700" :class="currentSlide === index ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'">
                  <div class="flex items-center gap-1.5 text-sm font-bold mb-4 text-yellow-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    กาญจนบุรี
                  </div>
                  <h2 class="text-2xl md:text-4xl font-bold mb-2 tracking-tight text-white/90">{{ slide.subtitle }}</h2>
                  <h1 class="text-4xl md:text-6xl font-black mb-6 tracking-tight drop-shadow-lg leading-tight">{{ slide.title }}</h1>
                  <p class="text-lg md:text-xl text-white/90 max-w-xl font-medium leading-relaxed drop-shadow-sm">{{ slide.desc }}</p>
                </div>

              </div>
            </div>
          </transition-group>
        </div>

        <!-- Transparent Overlays for dropdowns -->
          <div v-if="isCategoryOpen || isTagOpen" @click="isCategoryOpen = false; isTagOpen = false" class="fixed inset-0 z-30"></div>

          <!-- Floating Search Bar (Custom UI) -->
          <div class="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[95%] md:w-[90%] max-w-5xl z-40">
            <div class="bg-white rounded-3xl shadow-xl shadow-blue-900/10 p-2 flex flex-col md:flex-row items-center border border-gray-100">
              
              <div class="flex flex-col md:flex-row w-full divide-y md:divide-y-0 md:divide-x divide-gray-100 relative">
                
                <!-- หมวดหมู่ (Custom Dropdown) -->
                <div class="flex-1 px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition cursor-pointer rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none relative" @click.stop="toggleCategory">
                  <div class="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                  </div>
                  <div class="w-full">
                    <p class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-0.5">หมวดหมู่</p>
                    <div class="text-sm font-bold text-gray-900 flex justify-between items-center w-full">
                      {{ searchCategory === 'places' ? 'สถานที่ท่องเที่ยว' : searchCategory === 'restaurants' ? 'ร้านอาหารและคาเฟ่' : 'ที่พัก' }}
                      <svg class="w-4 h-4 text-gray-400 transition-transform" :class="isCategoryOpen ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                  
                  <!-- Dropdown Menu -->
                  <transition enter-active-class="transition duration-200 ease-out" enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-100 ease-in" leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
                    <div v-if="isCategoryOpen" class="absolute top-[110%] left-0 w-full min-w-[200px] bg-white border border-gray-100 shadow-xl rounded-2xl py-2 z-50">
                      <div @click.stop="selectCategory('places')" class="px-5 py-3 hover:bg-blue-50 cursor-pointer text-sm font-bold transition-colors" :class="searchCategory === 'places' ? 'text-blue-600 bg-blue-50/50' : 'text-gray-700'">สถานที่ท่องเที่ยว</div>
                      <div @click.stop="selectCategory('restaurants')" class="px-5 py-3 hover:bg-blue-50 cursor-pointer text-sm font-bold transition-colors" :class="searchCategory === 'restaurants' ? 'text-blue-600 bg-blue-50/50' : 'text-gray-700'">ร้านอาหารและคาเฟ่</div>
                      <div @click.stop="selectCategory('hotels')" class="px-5 py-3 hover:bg-blue-50 cursor-pointer text-sm font-bold transition-colors" :class="searchCategory === 'hotels' ? 'text-blue-600 bg-blue-50/50' : 'text-gray-700'">ที่พัก</div>
                    </div>
                  </transition>
                </div>
  
                <!-- ค้นหาชื่อ -->
                <div class="flex-1 px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition cursor-text">
                  <div class="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </div>
                  <div class="w-full">
                    <p class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-0.5">ค้นหาชื่อ</p>
                    <input type="text" v-model="searchKeyword" @keyup.enter="doSearch" placeholder="พิมพ์ชื่อสถานที่..." class="w-full bg-transparent outline-none text-sm font-bold text-gray-900 placeholder-gray-400" />
                  </div>
                </div>
  
                <!-- ประเภท (Custom Dropdown) -->
                <div class="flex-1 px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition cursor-pointer relative md:border-r-0" @click.stop="toggleTag">
                  <div class="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </div>
                  <div class="w-full">
                    <p class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-0.5">ประเภท</p>
                    <div class="text-sm font-bold text-gray-900 flex justify-between items-center w-full">
                      {{ searchTag }}
                      <svg class="w-4 h-4 text-gray-400 transition-transform" :class="isTagOpen ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>

                  <!-- Dropdown Menu -->
                  <transition enter-active-class="transition duration-200 ease-out" enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-100 ease-in" leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
                    <div v-if="isTagOpen" class="absolute top-[110%] right-0 w-full min-w-[200px] bg-white border border-gray-100 shadow-xl rounded-2xl py-2 z-50 max-h-64 overflow-y-auto">
                      <div @click.stop="selectTag('ทั้งหมด')" class="px-5 py-3 hover:bg-blue-50 cursor-pointer text-sm font-bold transition-colors" :class="searchTag === 'ทั้งหมด' ? 'text-blue-600 bg-blue-50/50' : 'text-gray-700'">ทั้งหมด</div>
                      <div v-for="tag in currentTags" :key="tag" @click.stop="selectTag(tag)" class="px-5 py-3 hover:bg-blue-50 cursor-pointer text-sm font-bold transition-colors" :class="searchTag === tag ? 'text-blue-600 bg-blue-50/50' : 'text-gray-700'">{{ tag }}</div>
                    </div>
                  </transition>

                </div>
              </div>
  
              <!-- Search Button -->
              <div class="w-full md:w-auto p-2 shrink-0">
                <button @click="doSearch" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-2xl md:rounded-2xl w-full shadow-lg shadow-blue-600/30 transition-all hover:scale-105 flex items-center justify-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  <span>ค้นหา</span>
                </button>
              </div>
              
            </div>
          </div>
        </div>
      </div>
  
      <!-- Main Content -->
    <div class="max-w-[1200px] mx-auto px-6 mt-24">
      
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        <!-- ================= LEFT COLUMN (MAIN FEED) ================= -->
        <div class="lg:col-span-12">
          
          <!-- Section: Top Attractions Spotlight Stage -->
          <div class="mb-14 scroll-mt-28" id="explore-section">
            <!-- Section Header -->
            <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
              <div>
                <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-2">
                  <Sparkles class="w-3.5 h-3.5 text-blue-600" />
                  <span>{{ sectionHeading.badge }}</span>
                </div>
                <h2 class="text-2xl md:text-3xl font-black text-[#003366] tracking-tight">{{ sectionHeading.title }}</h2>
                <p class="text-gray-500 text-sm mt-1">{{ sectionHeading.desc }}</p>
              </div>
              
              <div class="flex items-center gap-3">
                <RouterLink :to="sectionHeading.seeAllUrl" class="text-blue-600 font-bold text-sm hover:text-blue-700 flex items-center gap-1.5 group bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm hover:shadow transition-all">
                  <span>ดูทั้งหมดในหมวดนี้</span>
                  <ArrowRight class="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </RouterLink>
              </div>
            </div>

            <!-- Active Filter Status Pill (Shows when user searches) -->
            <div v-if="searchKeyword.trim() || searchTag !== 'ทั้งหมด'" class="flex items-center gap-2 mb-4 bg-blue-50/80 border border-blue-200/60 rounded-2xl px-4 py-2 text-xs font-medium text-blue-900 w-fit">
              <Search class="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>
                กำลังกรอง: 
                <strong v-if="searchKeyword.trim()">"{{ searchKeyword.trim() }}"</strong>
                <span v-if="searchKeyword.trim() && searchTag !== 'ทั้งหมด'"> • </span>
                <strong v-if="searchTag !== 'ทั้งหมด'">ประเภท {{ searchTag }}</strong>
                (พบ {{ filteredAttractions.length }} แห่ง)
              </span>
              <button @click="clearSearch" class="ml-2 text-blue-600 hover:text-red-500 font-bold flex items-center gap-1 cursor-pointer bg-white px-2 py-0.5 rounded-lg border border-blue-200 shadow-2xs">
                <X class="w-3 h-3" />
                <span>ล้างตัวกรอง</span>
              </button>
            </div>

            <!-- Interactive Mood Tabs (Filter Pills) -->
            <div class="flex items-center gap-2.5 overflow-x-auto pb-2 mb-6 scrollbar-none">
              <button 
                v-for="mood in moodTabs" 
                :key="mood.id"
                @click="activeMood = mood.id"
                class="px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition-all shrink-0 flex items-center gap-2 cursor-pointer shadow-sm"
                :class="activeMood === mood.id 
                  ? 'bg-[#003366] text-white shadow-md shadow-blue-900/20 scale-[1.02]' 
                  : 'bg-white text-gray-700 border border-gray-200/90 hover:bg-gray-50 hover:text-gray-900'"
              >
                <component 
                  :is="mood.icon" 
                  class="w-4 h-4 shrink-0 transition-colors" 
                  :class="activeMood === mood.id ? 'text-white' : mood.color" 
                />
                <span>{{ mood.label }}</span>
              </button>
            </div>

            <!-- Error State -->
            <div v-if="errorMsg" class="bg-red-50 text-red-600 p-4 rounded-2xl border border-red-100 mb-6">
              {{ errorMsg }}
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div class="lg:col-span-7 xl:col-span-8 h-[460px] bg-gray-200 animate-pulse rounded-3xl"></div>
              <div class="lg:col-span-5 xl:col-span-4 flex flex-col gap-3">
                <div v-for="i in 4" :key="i" class="h-24 bg-gray-200 animate-pulse rounded-2xl"></div>
              </div>
            </div>

            <!-- Empty Search State -->
            <div v-else-if="filteredAttractions.length === 0 && !loading" class="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm my-6">
              <div class="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search class="w-8 h-8" />
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">ไม่พบสถานที่ที่ตรงกับคำค้นหา</h3>
              <p class="text-gray-500 text-sm max-w-md mx-auto mb-6">ลองพิมพ์คำค้นหาอื่น หรือเปลี่ยนประเภทดูนะครับ</p>
              <button @click="clearSearch" class="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-sm transition cursor-pointer">
                ล้างคำค้นหาและแสดงทั้งหมด
              </button>
            </div>

            <!-- Dynamic Interactive Spotlight & Discovery Deck -->
            <div v-else-if="filteredAttractions.length > 0" class="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              <!-- LEFT: Grand Cinema Spotlight Stage -->
              <div class="lg:col-span-7 xl:col-span-8 relative h-[420px] md:h-[480px] rounded-3xl overflow-hidden shadow-xl group border border-gray-100">
                <!-- Background Image with smooth transition -->
                <img 
                  :src="getImageUrl(currentSpotlight)" 
                  :key="currentSpotlight ? currentSpotlight.id : 0"
                  class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                />
                
                <!-- Gradient Overlays for readability -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent"></div>

                <!-- Top Badges & Actions -->
                <div class="absolute top-5 left-5 right-5 flex justify-between items-start z-10">
                  <div class="flex items-center gap-2">
                    <span class="px-3.5 py-1.5 rounded-full bg-blue-600/90 backdrop-blur-md text-white text-xs font-black tracking-wider uppercase flex items-center gap-1.5 shadow-lg border border-white/20">
                      <Sparkles class="w-3.5 h-3.5 text-yellow-300" />
                      <span>{{ searchCategory === 'restaurants' ? 'ร้านแนะนำ' : searchCategory === 'hotels' ? 'ที่พักแนะนำ' : 'ไฮไลท์ที่แนะนำ' }}</span>
                    </span>
                    <span 
                      class="px-3.5 py-1.5 rounded-full text-xs font-black shadow-lg backdrop-blur-md border border-white/20 flex items-center gap-1.5"
                      :class="getPlaceBadge(currentSpotlight).isFree ? 'bg-emerald-500/90 text-white' : 'bg-white/90 text-gray-900'"
                    >
                      <Ticket v-if="getPlaceBadge(currentSpotlight).isFree" class="w-3.5 h-3.5 text-white" />
                      <span>{{ getPlaceBadge(currentSpotlight).text }}</span>
                    </span>
                  </div>

                  <!-- Favorite Button -->
                  <button 
                    @click.stop="toggleSpotlightFavorite"
                    class="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl"
                    :class="isSpotlightFavorite ? 'bg-red-500 scale-110' : 'bg-black/40 backdrop-blur-md hover:bg-white text-white hover:text-red-500 border border-white/20'"
                    title="บันทึกสถานที่ถูกใจ"
                  >
                    <HeartIcon class="w-5 h-5 transition-colors" :class="isSpotlightFavorite ? 'text-white fill-white' : ''" />
                  </button>
                </div>

                <!-- Bottom Glass Content Panel -->
                <div class="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10" v-if="currentSpotlight">
                  <!-- Location & Hours info -->
                  <div class="flex flex-wrap items-center gap-2.5 text-white/80 text-xs font-medium mb-2.5">
                    <span class="flex items-center gap-1 bg-white/15 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
                      <MapPin class="w-3.5 h-3.5 text-blue-300" />
                      <span>{{ currentSpotlight.location?.address || 'กาญจนบุรี' }}</span>
                    </span>
                    <span v-if="currentSpotlight.openingTime" class="flex items-center gap-1 bg-white/15 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
                      <Clock class="w-3.5 h-3.5 text-emerald-300" />
                      <span>{{ currentSpotlight.openingTime.slice(0, 5) }} - {{ currentSpotlight.closingTime ? currentSpotlight.closingTime.slice(0, 5) : '18:00' }} น.</span>
                    </span>
                    <span class="flex items-center gap-1 bg-yellow-400/20 backdrop-blur-md text-yellow-300 px-2 py-1 rounded-lg border border-yellow-400/30 font-bold">
                      <StarIcon class="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span>{{ currentSpotlight.rating || '4.9' }}</span>
                    </span>
                  </div>

                  <!-- Title -->
                  <h3 class="text-2xl md:text-4xl font-black text-white leading-tight mb-2 drop-shadow-md group-hover:text-blue-200 transition-colors">
                    {{ currentSpotlight.name }}
                  </h3>

                  <!-- Description Snippet -->
                  <p class="text-white/85 text-xs md:text-sm line-clamp-2 max-w-2xl mb-5 leading-relaxed drop-shadow-sm font-normal">
                    {{ currentSpotlight.description || 'หนึ่งในสุดยอดสถานที่ท่องเที่ยวของกาญจนบุรีที่ไม่ควรพลาด' }}
                  </p>

                  <!-- Action Buttons (Very enticing to click!) -->
                  <div class="flex flex-wrap items-center gap-3">
                    <RouterLink 
                      :to="'/place/' + currentSpotlight.id"
                      class="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs md:text-sm flex items-center gap-2 shadow-lg shadow-blue-600/40 hover:scale-105 transition-all cursor-pointer"
                    >
                      <span>ดูรายละเอียด & แผนที่</span>
                      <ArrowRight class="w-4 h-4" />
                    </RouterLink>

                    <button 
                      @click="addSpotlightToTrip"
                      class="px-5 py-3 rounded-2xl bg-white/20 hover:bg-white text-white hover:text-blue-900 font-bold text-xs md:text-sm backdrop-blur-md border border-white/30 flex items-center gap-2 shadow-lg transition-all hover:scale-105 cursor-pointer"
                    >
                      <Plus class="w-4 h-4" />
                      <span>จัดลงทริปทันที</span>
                    </button>
                  </div>
                </div>
              </div>

              <!-- RIGHT: Interactive Discovery Rail (Clickable Thumbnails & List) -->
              <div class="lg:col-span-5 xl:col-span-4 flex flex-col justify-between">
                <div class="flex items-center justify-between mb-3 px-1">
                  <span class="text-xs font-bold uppercase tracking-wider text-gray-500">เลือกดูสถานที่ในหมวดนี้</span>
                  <span class="text-xs font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{{ filteredAttractions.length }} แห่ง</span>
                </div>

                <div class="space-y-2.5 overflow-y-auto max-h-[440px] pr-1 scrollbar-thin">
                  <div 
                    v-for="(place, index) in filteredAttractions" 
                    :key="place.id"
                    @click="selectSpotlight(place.id)"
                    class="p-3 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center gap-3 group relative"
                    :class="currentSpotlight?.id === place.id 
                      ? 'bg-blue-50/90 border-blue-400 shadow-md ring-2 ring-blue-500/20 translate-x-1' 
                      : 'bg-white hover:bg-gray-50/80 border-gray-100 hover:border-gray-200 shadow-sm'"
                  >
                    <!-- Ranking Number -->
                    <div 
                      class="w-6 text-center text-xs font-black shrink-0 transition-colors"
                      :class="currentSpotlight?.id === place.id ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'"
                    >
                      0{{ index + 1 }}
                    </div>

                    <!-- Thumbnail Image -->
                    <div class="w-16 h-16 rounded-xl overflow-hidden shrink-0 relative bg-gray-100 shadow-inner">
                      <img :src="getImageUrl(place)" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div v-if="currentSpotlight?.id === place.id" class="absolute inset-0 bg-blue-600/20 ring-2 ring-blue-600 inset-ring"></div>
                    </div>

                    <!-- Place Info -->
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center justify-between gap-1 mb-0.5">
                        <h4 
                          class="font-bold text-sm truncate transition-colors"
                          :class="currentSpotlight?.id === place.id ? 'text-blue-700 font-extrabold' : 'text-gray-800 group-hover:text-blue-600'"
                        >
                          {{ place.name }}
                        </h4>
                      </div>
                      
                      <p class="text-xs text-gray-400 truncate mb-1">
                        {{ place.location?.address ? place.location.address.split(' ')[1] || 'กาญจนบุรี' : 'กาญจนบุรี' }}
                      </p>

                      <div class="flex items-center gap-2">
                        <span 
                          class="text-[10px] font-black px-1.5 py-0.5 rounded flex items-center gap-1"
                          :class="getPlaceBadge(place).isFree ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'"
                        >
                          <Ticket v-if="getPlaceBadge(place).isFree" class="w-2.5 h-2.5" />
                          <span>{{ getPlaceBadge(place).text }}</span>
                        </span>
                        <span class="text-[10px] font-bold text-gray-500 flex items-center gap-0.5">
                          <StarIcon class="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          {{ place.rating || '4.8' }}
                        </span>
                      </div>
                    </div>

                    <!-- Action Quick Add button on hover -->
                    <button 
                      @click.stop="addPlaceToTrip(place, $event)"
                      title="เพิ่มลงในแผนเดินทาง"
                      class="w-8 h-8 rounded-full bg-white hover:bg-blue-600 text-gray-400 hover:text-white border border-gray-200 shadow-sm flex items-center justify-center shrink-0 transition-all hover:scale-110 cursor-pointer"
                    >
                      <Plus class="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <!-- Section: Quick Explore Categories (Lifestyle Discovery Cards) -->
          <div class="mb-16">
            <div class="flex items-end justify-between mb-6">
              <div>
                <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-2">
                  <Compass class="w-3.5 h-3.5 text-emerald-600" />
                  <span>เลือกตามไลฟ์สไตล์การเดินทาง</span>
                </div>
                <h2 class="text-2xl md:text-3xl font-black text-[#003366] tracking-tight">สำรวจกาญจนบุรีในแบบคุณ</h2>
                <p class="text-gray-500 text-sm mt-1">ค้นพบเสน่ห์ของเมืองกาญจน์ครบทุกมิติ ทั้งธรรมชาติ อาหาร และที่พัก</p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <!-- Card 1: เที่ยวไหนดี -->
              <RouterLink 
                to="/places" 
                class="group relative h-[320px] rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between p-6 border border-gray-100 cursor-pointer"
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/1/13/Erawan_Waterfall_Level_3_P1110151.JPG" class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 group-hover:from-blue-950/90 transition-colors duration-500"></div>

                <!-- Top Badge -->
                <div class="relative z-10 flex justify-between items-center">
                  <span class="px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-black border border-white/25 flex items-center gap-1.5 shadow-sm">
                    <Compass class="w-3.5 h-3.5 text-emerald-300" />
                    <span>ธรรมชาติ & ประวัติศาสตร์</span>
                  </span>
                  <span class="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 border border-white/25 shadow-sm">
                    <ArrowRight class="w-4 h-4" />
                  </span>
                </div>

                <!-- Bottom Info -->
                <div class="relative z-10">
                  <span class="text-emerald-300 text-xs font-bold tracking-wider uppercase mb-1 block">{{ attractions.length || 6 }} จุดหมายยอดนิยม</span>
                  <h3 class="text-2xl font-black text-white mb-2 group-hover:text-emerald-200 transition-colors">เที่ยวไหนดี</h3>
                  <p class="text-white/80 text-xs leading-relaxed line-clamp-2 mb-4">
                    สัมผัสมนต์เสน่ห์แห่งขุนเขา น้ำตกใสสีมรกต และเส้นทางรถไฟประวัติศาสตร์ระดับโลก
                  </p>
                  <div class="inline-flex items-center gap-2 text-xs font-extrabold text-white bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl border border-white/25 group-hover:bg-emerald-500 group-hover:border-emerald-400 transition-all">
                    <span>เริ่มค้นหาสถานที่</span>
                    <ArrowRight class="w-3.5 h-3.5" />
                  </div>
                </div>
              </RouterLink>

              <!-- Card 2: กินอะไรดี -->
              <RouterLink 
                to="/restaurants" 
                class="group relative h-[320px] rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between p-6 border border-gray-100 cursor-pointer"
              >
                <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800" class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 group-hover:from-amber-950/90 transition-colors duration-500"></div>

                <!-- Top Badge -->
                <div class="relative z-10 flex justify-between items-center">
                  <span class="px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-black border border-white/25 flex items-center gap-1.5 shadow-sm">
                    <Utensils class="w-3.5 h-3.5 text-amber-300" />
                    <span>ของกิน & คาเฟ่ริมน้ำ</span>
                  </span>
                  <span class="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 border border-white/25 shadow-sm">
                    <ArrowRight class="w-4 h-4" />
                  </span>
                </div>

                <!-- Bottom Info -->
                <div class="relative z-10">
                  <span class="text-amber-300 text-xs font-bold tracking-wider uppercase mb-1 block">{{ restaurants.length || 2 }} ร้านเด็ดบรรยากาศดี</span>
                  <h3 class="text-2xl font-black text-white mb-2 group-hover:text-amber-200 transition-colors">กินอะไรดี</h3>
                  <p class="text-white/80 text-xs leading-relaxed line-clamp-2 mb-4">
                    ลิ้มลองรสชาติแกงป่าเมืองกาญจน์ ปลาคังสดหวาน และคาเฟ่ดีไซน์ชิคริมแม่น้ำแคว
                  </p>
                  <div class="inline-flex items-center gap-2 text-xs font-extrabold text-white bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl border border-white/25 group-hover:bg-amber-500 group-hover:border-amber-400 transition-all">
                    <span>ค้นหาร้านอร่อย</span>
                    <ArrowRight class="w-3.5 h-3.5" />
                  </div>
                </div>
              </RouterLink>

              <!-- Card 3: พักที่ไหน -->
              <RouterLink 
                to="/hotels" 
                class="group relative h-[320px] rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between p-6 border border-gray-100 cursor-pointer"
              >
                <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800" class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 group-hover:from-indigo-950/90 transition-colors duration-500"></div>

                <!-- Top Badge -->
                <div class="relative z-10 flex justify-between items-center">
                  <span class="px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-black border border-white/25 flex items-center gap-1.5 shadow-sm">
                    <BedDouble class="w-3.5 h-3.5 text-blue-300" />
                    <span>แพริมน้ำ & รีสอร์ท</span>
                  </span>
                  <span class="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 border border-white/25 shadow-sm">
                    <ArrowRight class="w-4 h-4" />
                  </span>
                </div>

                <!-- Bottom Info -->
                <div class="relative z-10">
                  <span class="text-blue-300 text-xs font-bold tracking-wider uppercase mb-1 block">{{ hotels.length || 2 }} ที่พักท่ามกลางธรรมชาติ</span>
                  <h3 class="text-2xl font-black text-white mb-2 group-hover:text-blue-200 transition-colors">พักที่ไหน</h3>
                  <p class="text-white/80 text-xs leading-relaxed line-clamp-2 mb-4">
                    นอนแพลอยน้ำฟังเสียงคลื่น สูดโอโซนบริสุทธิ์ในรีสอร์ทส่วนตัวท่ามกลางหุบเขา
                  </p>
                  <div class="inline-flex items-center gap-2 text-xs font-extrabold text-white bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl border border-white/25 group-hover:bg-blue-600 group-hover:border-blue-500 transition-all">
                    <span>เลือกที่พักโดนใจ</span>
                    <ArrowRight class="w-3.5 h-3.5" />
                  </div>
                </div>
              </RouterLink>
            </div>
          </div>



        </div>

        
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { StarIcon, HeartIcon, MapPin, Clock, Plus, ArrowRight, Sparkles, Flame, Leaf, Landmark, Ticket, Search, X, Compass, Utensils, BedDouble, CheckCircle2 } from 'lucide-vue-next'
import PlaceCard from '../components/PlaceCard.vue'
import api from '../services/api'
import { useTripStore } from '../stores/trip'
import { useFavoriteStore } from '../stores/favorite'
import { useToast } from '../composables/useNotify'

const router = useRouter()
const tripStore = useTripStore()
const favoriteStore = useFavoriteStore()
const toast = useToast()

const attractions = ref([])
const restaurants = ref([])
const hotels = ref([])
const loading = ref(true)
const errorMsg = ref(null)

const searchCategory = ref('places')
const searchKeyword = ref('')
const isCategoryOpen = ref(false)
const isTagOpen = ref(false)
const searchTag = ref('ทั้งหมด')

const toggleCategory = () => {
  isCategoryOpen.value = !isCategoryOpen.value
  isTagOpen.value = false
}

const toggleTag = () => {
  isTagOpen.value = !isTagOpen.value
  isCategoryOpen.value = false
}

const selectCategory = (val) => {
  searchCategory.value = val
  isCategoryOpen.value = false
  searchTag.value = 'ทั้งหมด'
  activeMood.value = 'all'
}

const selectTag = (val) => {
  searchTag.value = val
  isTagOpen.value = false
}

const currentTags = computed(() => {
  if (searchCategory.value === 'restaurants') {
    return ['ยอดฮิต', 'คาเฟ่', 'อาหารไทย', 'ริมน้ำ', 'บรรยากาศดี']
  } else if (searchCategory.value === 'hotels') {
    return ['ยอดฮิต', 'โรงแรม', 'รีสอร์ท', 'ริมน้ำ', 'แพริมน้ำ']
  }
  return ['ยอดฮิต', 'ธรรมชาติ', 'ประวัติศาสตร์']
})

// Reset tag & mood when category changes
watch(searchCategory, () => {
  searchTag.value = 'ทั้งหมด'
  activeMood.value = 'all'
})

const clearSearch = () => {
  searchKeyword.value = ''
  searchTag.value = 'ทั้งหมด'
  activeMood.value = 'all'
}

// Direct on-page search & smooth scroll
const doSearch = () => {
  const el = document.getElementById('explore-section')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// For Hero Slider
const currentSlide = ref(0)
let slideInterval = null

const heroSlides = ref([
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Bridge_over_River_Kwai.jpg/1280px-Bridge_over_River_Kwai.jpg',
    subtitle: 'ยินดีต้อนรับสู่ KanG',
    title: 'ผู้ช่วยวางแผนเที่ยวเมืองกาญจน์',
    desc: 'แพลตฟอร์มอัจฉริยะที่ช่วยคุณค้นหาสถานที่ท่องเที่ยว ร้านอาหาร ที่พัก และจัดทริปการเดินทางได้อย่างลงตัว',
    floatingText: 'เริ่ม<br>เดินทาง'
  }
])

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % heroSlides.value.length
}
const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + heroSlides.value.length) % heroSlides.value.length
}

onMounted(async () => {
  slideInterval = setInterval(nextSlide, 5000)

  try {
    const [attRes, restRes, hotelRes] = await Promise.all([
      api.get('/Attractions'),
      api.get('/Restaurants'),
      api.get('/Accommodations')
    ])
    attractions.value = attRes.data || []
    restaurants.value = restRes.data || []
    hotels.value = hotelRes.data || []
  } catch (err) {
    console.error(err)
    errorMsg.value = 'ไม่สามารถดึงข้อมูลสถานที่ได้'
  } finally {
    loading.value = false
  }
})

onUnmounted(() => {
  if (slideInterval) clearInterval(slideInterval)
})

// Dynamic Section Heading
const sectionHeading = computed(() => {
  if (searchCategory.value === 'restaurants') {
    return {
      badge: 'ร้านอาหารและคาเฟ่ยอดนิยม',
      title: 'ร้านอร่อย & คาเฟ่แนะนำสำหรับคุณ',
      desc: 'คัดสรรร้านอาหารพื้นบ้าน คาเฟ่ริมน้ำ และจุดเช็คอินของกินเมืองกาญจน์',
      seeAllUrl: '/restaurants'
    }
  } else if (searchCategory.value === 'hotels') {
    return {
      badge: 'ที่พักและรีสอร์ทแนะนำ',
      title: 'ที่พัก & รีสอร์ทวิวสวยสำหรับคุณ',
      desc: 'แพริมน้ำ รีสอร์ทธรรมชาติ และโรงแรมบรรยากาศดีทั่วกาญจนบุรี',
      seeAllUrl: '/hotels'
    }
  }
  return {
    badge: 'จุดหมายปลายทางยอดนิยม',
    title: 'สถานที่แนะนำสำหรับคุณ',
    desc: 'คัดสรรจุดท่องเที่ยวไฮไลท์เมืองกาญจน์ที่ได้รับคะแนนความนิยมสูงสุด',
    seeAllUrl: '/places?tag=ยอดฮิต'
  }
})

// Mood Tabs & Filtering dynamically adapted per category
const activeMood = ref('all')

const moodTabs = computed(() => {
  if (searchCategory.value === 'restaurants') {
    return [
      { id: 'all', label: 'ร้านทั้งหมด', icon: Flame, color: 'text-amber-500' },
      { id: 'thai', label: 'อาหารไทยริมน้ำ', icon: Landmark, color: 'text-amber-600' },
      { id: 'cafe', label: 'คาเฟ่ & บรรยากาศดี', icon: Sparkles, color: 'text-pink-500' }
    ]
  } else if (searchCategory.value === 'hotels') {
    return [
      { id: 'all', label: 'ที่พักทั้งหมด', icon: Flame, color: 'text-amber-500' },
      { id: 'raft', label: 'แพริมน้ำ & ธรรมชาติ', icon: Leaf, color: 'text-teal-500' },
      { id: 'resort', label: 'รีสอร์ท', icon: Sparkles, color: 'text-emerald-500' }
    ]
  }
  return [
    { id: 'all', label: 'ยอดนิยมทั้งหมด', icon: Flame, color: 'text-amber-500' },
    { id: 'nature', label: 'ธรรมชาติ & น้ำตก', icon: Leaf, color: 'text-emerald-500' },
    { id: 'history', label: 'ประวัติศาสตร์ & รถไฟ', icon: Landmark, color: 'text-amber-600' },
    { id: 'free', label: 'เที่ยวฟรี', icon: Ticket, color: 'text-teal-500' }
  ]
})

// Current Category's Raw Items
const baseItems = computed(() => {
  if (searchCategory.value === 'restaurants') return restaurants.value
  if (searchCategory.value === 'hotels') return hotels.value
  return attractions.value
})

// Combined Filtered List
const filteredAttractions = computed(() => {
  let list = [...baseItems.value]

  // Filter 1: Text search keyword
  if (searchKeyword.value && searchKeyword.value.trim()) {
    const kw = searchKeyword.value.trim().toLowerCase()
    list = list.filter(p => 
      (p.name && p.name.toLowerCase().includes(kw)) ||
      (p.description && p.description.toLowerCase().includes(kw)) ||
      (p.location?.address && p.location.address.toLowerCase().includes(kw))
    )
  }

  // Filter 2: Dropdown tag
  if (searchTag.value && searchTag.value !== 'ทั้งหมด') {
    const tag = searchTag.value.toLowerCase()
    list = list.filter(p => 
      (p.name && p.name.toLowerCase().includes(tag)) ||
      (p.description && p.description.toLowerCase().includes(tag)) ||
      (p.foodType && p.foodType.toLowerCase().includes(tag)) ||
      (p.accommodationType && p.accommodationType.toLowerCase().includes(tag))
    )
  }

  // Filter 3: Mood tabs
  if (activeMood.value !== 'all') {
    if (searchCategory.value === 'places') {
      if (activeMood.value === 'nature') {
        list = list.filter(p => (p.name && (p.name.includes('น้ำตก') || p.name.includes('เขื่อน') || p.name.includes('อุทยาน') || p.name.includes('แม่น้ำ'))))
      } else if (activeMood.value === 'history') {
        list = list.filter(p => (p.name && (p.name.includes('สะพาน') || p.name.includes('ถ้ำกระแซ') || p.name.includes('ปราสาท') || p.name.includes('รถไฟ'))))
      } else if (activeMood.value === 'free') {
        list = list.filter(p => (p.entranceFee || 0) === 0)
      }
    } else if (searchCategory.value === 'restaurants') {
      if (activeMood.value === 'thai') {
        list = list.filter(p => (p.foodType && p.foodType.includes('ไทย')) || (p.description && p.description.includes('ไทย')))
      } else if (activeMood.value === 'cafe') {
        list = list.filter(p => (p.name && p.name.includes('คาเฟ่')) || (p.foodType && p.foodType.includes('คาเฟ่')))
      }
    } else if (searchCategory.value === 'hotels') {
      if (activeMood.value === 'raft') {
        list = list.filter(p => (p.name && (p.name.includes('Float') || p.name.includes('แพ'))) || (p.description && p.description.includes('แพ')))
      } else if (activeMood.value === 'resort') {
        list = list.filter(p => (p.accommodationType && p.accommodationType.includes('รีสอร์ท')) || (p.description && p.description.includes('รีสอร์ท')))
      }
    }
  }

  return list
})

const selectedSpotlightId = ref(null)

// Watch filtered list and keep selection synced
watch(filteredAttractions, (newList) => {
  if (newList && newList.length > 0) {
    if (!newList.some(p => p.id === selectedSpotlightId.value)) {
      selectedSpotlightId.value = newList[0].id
    }
  } else {
    selectedSpotlightId.value = null
  }
}, { immediate: true })

const currentSpotlight = computed(() => {
  if (!filteredAttractions.value || filteredAttractions.value.length === 0) return null
  if (selectedSpotlightId.value) {
    const found = filteredAttractions.value.find(p => p.id === selectedSpotlightId.value)
    if (found) return found
  }
  return filteredAttractions.value[0]
})

const selectSpotlight = (id) => {
  selectedSpotlightId.value = id
}

const isSpotlightFavorite = computed(() => {
  return currentSpotlight.value ? favoriteStore.isFavorite(currentSpotlight.value.id) : false
})

const toggleSpotlightFavorite = () => {
  if (currentSpotlight.value) {
    favoriteStore.toggleFavorite(currentSpotlight.value.id)
  }
}

const addSpotlightToTrip = () => {
  if (!currentSpotlight.value) return
  tripStore.addItem({
    id: currentSpotlight.value.id,
    title: currentSpotlight.value.name,
    location: currentSpotlight.value.location?.address || 'กาญจนบุรี',
    img: getImageUrl(currentSpotlight.value)
  })
  toast.success(`เพิ่ม "${currentSpotlight.value.name}" ลงในแผนเดินทางแล้ว!`)
}

const addPlaceToTrip = (place, event) => {
  if (event) event.stopPropagation()
  tripStore.addItem({
    id: place.id,
    title: place.name,
    location: place.location?.address || 'กาญจนบุรี',
    img: getImageUrl(place)
  })
  toast.success(`เพิ่ม "${place.name}" ลงในแผนเดินทางแล้ว!`)
}

// Badge text & free indicator helper
const getPlaceBadge = (place) => {
  if (!place) return { text: 'ข้อมูลสถานที่', isFree: false }
  if (searchCategory.value === 'restaurants') {
    return { text: place.foodType || 'ร้านอาหาร & คาเฟ่', isFree: false }
  } else if (searchCategory.value === 'hotels') {
    return { 
      text: place.pricePerNight ? `฿${place.pricePerNight.toLocaleString()} / คืน` : (place.accommodationType || 'ที่พัก'), 
      isFree: false 
    }
  }
  const fee = place.entranceFee || 0
  return { 
    text: fee === 0 ? 'เข้าชมฟรี' : `฿${fee} / คน`, 
    isFree: fee === 0 
  }
}

// Helper to get image from our model
const getImageUrl = (place) => {
  if (!place) return 'https://images.unsplash.com/photo-1540304658097-f4955b23d917?auto=format&fit=crop&q=80&w=800'
  if (place.images && place.images.length > 0) {
    const primary = place.images.find(img => img.isPrimary)
    return primary ? primary.imageUrl : place.images[0].imageUrl
  }
  return place.imageUrl || 'https://images.unsplash.com/photo-1540304658097-f4955b23d917?auto=format&fit=crop&q=80&w=800' // fallback
}

</script>
