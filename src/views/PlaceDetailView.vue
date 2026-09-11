<!-- หน้าเว็บ: หน้ารายละเอียดของสถานที่ -->
<template>
  <div class="bg-[#F8FAFC] min-h-screen pb-20 font-sans text-[#1E293B]">
    <!-- Loading State (Skeleton) -->
    <div v-if="loading" class="max-w-[1280px] mx-auto px-4 md:px-8 pt-6 animate-pulse">
      <div class="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
      <div class="h-[400px] md:h-[500px] bg-gray-200 rounded-3xl mb-8"></div>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-8">
          <div class="h-48 bg-gray-200 rounded-3xl"></div>
          <div class="h-64 bg-gray-200 rounded-3xl"></div>
        </div>
        <div class="lg:col-span-1 space-y-6">
          <div class="h-[400px] bg-gray-200 rounded-3xl"></div>
        </div>
      </div>
    </div>

    <!-- Error / Not Found -->
    <div v-else-if="error || !place" class="flex flex-col items-center justify-center pt-32 text-center">
      <div class="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      </div>
      <p class="text-2xl text-gray-800 font-extrabold mb-2">{{ error ? 'เกิดข้อผิดพลาดในการโหลดข้อมูล' : 'ไม่พบข้อมูลสถานที่' }}</p>
      <p class="text-gray-500 mb-8 font-medium">โปรดลองใหม่อีกครั้ง หรือกลับไปที่หน้าแรก</p>
      <div class="flex gap-4">
        <button v-if="error" @click="fetchData" class="px-6 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition shadow-sm">ลองใหม่</button>
        <RouterLink to="/" class="px-6 py-3 border border-gray-200 bg-white text-gray-700 font-bold rounded-full hover:bg-gray-50 transition shadow-sm">กลับไปหน้าแรก</RouterLink>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else class="max-w-[1280px] mx-auto px-4 md:px-8 pt-6">
      
      <!-- Top Bar: Breadcrumb & Actions -->
      <div class="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <nav class="flex items-center text-sm text-gray-500 font-medium overflow-x-auto whitespace-nowrap pb-1">
          <RouterLink to="/" class="hover:text-blue-600 transition">หน้าแรก</RouterLink>
          <span class="mx-2">›</span>
          <RouterLink :to="placeCategoryLink" class="hover:text-blue-600 transition">{{ placeCategoryName }}</RouterLink>
          <span class="mx-2">›</span>
          <span class="hover:text-blue-600 transition">{{ place.location?.address?.includes('กาญจนบุรี') ? 'กาญจนบุรี' : (place.location?.address || 'กาญจนบุรี') }}</span>
          <span class="mx-2">›</span>
          <span class="text-gray-900 font-bold">{{ place.name }}</span>
        </nav>
        
        <div class="flex items-center gap-3 shrink-0">
          <button @click="favoriteStore.toggleFavorite(place.id)" class="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white text-[#334155] font-bold text-sm hover:bg-gray-50 shadow-sm transition cursor-pointer">
            <HeartIcon :class="['w-4 h-4', favoriteStore.isFavorite(place.id) ? 'text-red-500 fill-red-500' : '']" /> บันทึก
          </button>
          <button @click="sharePlace" class="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white text-[#334155] font-bold text-sm hover:bg-gray-50 shadow-sm transition cursor-pointer"><ShareIcon class="w-4 h-4" /> แชร์</button>
          <button @click="addToTrip" class="flex items-center gap-2 px-5 py-2 rounded-full bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 shadow-sm transition cursor-pointer">
            <PlusIcon class="w-4 h-4" /> เพิ่มลงแผนการเดินทาง
          </button>
        </div>
      </div>

      <!-- Hero Gallery -->
      <div class="mb-8 h-[360px] md:h-[460px] rounded-3xl overflow-hidden shadow-sm">
        <!-- Single Image Layout -->
        <div v-if="uniqueImages && uniqueImages.length === 1" class="w-full h-full relative group">
          <img :src="uniqueImages[0].imageUrl" :alt="place.name" class="w-full h-full object-cover transition duration-500 group-hover:scale-[1.02]" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
          <div class="absolute bottom-6 left-6 md:bottom-8 md:left-8 text-white pr-8 pointer-events-none">
            <div class="flex items-center gap-1.5 text-xs md:text-sm font-bold mb-2 text-white/90">
              <MapPinIcon class="w-4 h-4 text-blue-400" /> {{ place.location?.address || 'กาญจนบุรี' }}
            </div>
            <h1 class="text-3xl md:text-5xl font-extrabold mb-1 drop-shadow-md">{{ place.name }}</h1>
          </div>
        </div>

        <!-- Multiple Images Layout (Gallery) -->
        <div v-else-if="uniqueImages && uniqueImages.length > 1" class="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3 h-full">
          <!-- Main Left Image -->
          <div class="md:col-span-2 relative h-full group overflow-hidden bg-gray-100">
            <img @click="openLightbox(currentGalleryIndex)" :src="currentDisplayImage" :alt="place.name" class="cursor-pointer w-full h-full object-cover transition duration-500 group-hover:scale-[1.02]" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
            
            <button @click="prevImage" class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white shadow-lg transition cursor-pointer">
               <ChevronLeftIcon class="w-5 h-5 text-gray-800" />
            </button>
            <button @click="nextImage" class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white shadow-lg transition cursor-pointer">
               <ChevronRightIcon class="w-5 h-5 text-gray-800" />
            </button>

            <div class="absolute bottom-6 left-6 md:bottom-8 md:left-8 text-white pr-8 pointer-events-none">
              <div class="flex items-center gap-1.5 text-xs md:text-sm font-bold mb-2 text-white/90">
                <MapPinIcon class="w-4 h-4 text-blue-400" /> {{ place.location?.address || 'กาญจนบุรี' }}
              </div>
              <h1 class="text-3xl md:text-5xl font-extrabold mb-1 drop-shadow-md">{{ place.name }}</h1>
            </div>
          </div>

          <!-- Right Images Column -->
          <div class="hidden md:grid grid-rows-2 gap-2 md:gap-3 h-full overflow-hidden">
            <!-- Top Right Image -->
            <div class="relative h-full overflow-hidden group bg-gray-100">
               <img @click="openLightbox(1)" :src="uniqueImages[1]?.imageUrl || primaryImage" class="w-full h-full cursor-pointer object-cover transition duration-500 group-hover:scale-110" />
               <div v-if="uniqueImages.length > 3" @click="openLightbox(0)" class="absolute bottom-3 right-3 bg-white/90 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md hover:bg-white cursor-pointer transition text-gray-900">
                  <ImageIcon class="w-3.5 h-3.5" /> ดูรูปทั้งหมด {{ uniqueImages.length }} รูป
               </div>
            </div>
            <!-- Bottom Right 2 Images -->
            <div class="grid grid-cols-2 gap-2 md:gap-3 h-full overflow-hidden">
               <div class="relative h-full overflow-hidden group bg-gray-100">
                 <img @click="openLightbox(2)" :src="uniqueImages[2]?.imageUrl || primaryImage" class="w-full h-full cursor-pointer object-cover transition duration-500 group-hover:scale-110" />
               </div>
               <div class="relative h-full overflow-hidden group bg-gray-100">
                 <div v-if="uniqueImages.length > 4" class="w-full h-full relative cursor-pointer" @click="openLightbox(3)">
                   <img :src="uniqueImages[3]?.imageUrl || primaryImage" class="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
                   <div class="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold text-xl cursor-pointer hover:bg-black/50 transition">
                     +{{ uniqueImages.length - 4 }}
                   </div>
                 </div>
                 <img v-else @click="openLightbox(3)" :src="uniqueImages[3]?.imageUrl || primaryImage" class="w-full h-full cursor-pointer object-cover transition duration-500 group-hover:scale-110" />
               </div>
            </div>
          </div>
        </div>

        <!-- Fallback Header if no images -->
        <div v-else class="w-full h-full bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 rounded-3xl flex items-end p-6 md:p-8 text-white relative overflow-hidden">
          <div class="absolute inset-0 bg-black/30 backdrop-blur-xs"></div>
          <div class="relative z-10">
            <div class="flex items-center gap-1.5 text-xs md:text-sm font-bold mb-2 text-blue-300">
              <MapPinIcon class="w-4 h-4 text-blue-400" /> {{ place.location?.address || 'กาญจนบุรี' }}
            </div>
            <h1 class="text-3xl md:text-5xl font-extrabold mb-1 drop-shadow-md">{{ place.name }}</h1>
          </div>
        </div>
      </div>

      <!-- Tabs (Dynamic based on data) -->
      <div class="flex items-center gap-8 border-b border-gray-200 mb-8 overflow-x-auto">
        <a href="#about" class="flex items-center gap-2 pb-4 border-b-2 border-blue-600 text-blue-600 font-bold whitespace-nowrap">
          <InfoIcon class="w-5 h-5" /> ข้อมูลทั่วไป
        </a>
        <a href="#map" class="flex items-center gap-2 pb-4 border-b-2 border-transparent text-gray-500 font-bold hover:text-gray-900 whitespace-nowrap transition">
          <MapIcon class="w-5 h-5" /> แผนที่
        </a>
        <a v-if="nearbyPlaces.length > 0" href="#nearby" class="flex items-center gap-2 pb-4 border-b-2 border-transparent text-gray-500 font-bold hover:text-gray-900 whitespace-nowrap transition">
          <MapPinIcon class="w-5 h-5" /> สถานที่ใกล้เคียง
        </a>
        <a href="#reviews" class="flex items-center gap-2 pb-4 border-b-2 border-transparent text-gray-500 font-bold hover:text-gray-900 whitespace-nowrap transition">
          <StarIcon class="w-5 h-5" /> รีวิว
        </a>
      </div>

      <!-- 2-Column Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        <!-- LEFT COLUMN: Content -->
        <div class="lg:col-span-2 space-y-8">
          
          <!-- About -->
          <div id="about" class="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#F1F5F9]">
            <h2 class="text-2xl font-extrabold text-[#0F172A] mb-4 flex items-center gap-2">
              <MountainIcon class="w-6 h-6 text-blue-600" /> เกี่ยวกับสถานที่นี้
            </h2>
            <p class="text-[#475569] leading-relaxed text-lg whitespace-pre-line">{{ place.description || 'ไม่มีรายละเอียดเพิ่มเติมสำหรับสถานที่นี้' }}</p>
          </div>

          <!-- Compact Nearby Places (Tabbed) -->
          <div v-if="nearbyPlaces.length > 0 || nearbyAccommodations.length > 0 || nearbyRestaurants.length > 0" id="nearby" class="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#F1F5F9]">
             <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                   <h2 class="text-2xl font-extrabold text-[#0F172A] flex items-center gap-2">
                     <MapPinIcon class="w-6 h-6 text-blue-600" /> สถานที่และร้านใกล้เคียง
                   </h2>
                   <p class="text-xs text-slate-500 mt-0.5">คัดสรรจุดน่าสนใจ ที่พัก และร้านอาหารใกล้เคียง โดยเรียงตามระยะทางจริง</p>
                </div>
             </div>
             
             <!-- Tabs -->
             <div class="flex gap-2 border-b border-gray-100 pb-4 mb-5 overflow-x-auto" style="scrollbar-width: none;">
                <button 
                  v-if="nearbyPlaces.length > 0"
                  @click="nearbyTab = 'attractions'" 
                  class="px-4 py-2 rounded-full text-xs font-extrabold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer"
                  :class="nearbyTab === 'attractions' ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'"
                >
                  <CompassIcon class="w-3.5 h-3.5" />
                  ที่เที่ยวใกล้เคียง ({{ nearbyPlaces.length }})
                </button>
                <button 
                  v-if="nearbyAccommodations.length > 0"
                  @click="nearbyTab = 'accommodations'" 
                  class="px-4 py-2 rounded-full text-xs font-extrabold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer"
                  :class="nearbyTab === 'accommodations' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'"
                >
                  <BedDoubleIcon class="w-3.5 h-3.5" />
                  ที่พักใกล้เคียง ({{ nearbyAccommodations.length }})
                </button>
                <button 
                  v-if="nearbyRestaurants.length > 0"
                  @click="nearbyTab = 'restaurants'" 
                  class="px-4 py-2 rounded-full text-xs font-extrabold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer"
                  :class="nearbyTab === 'restaurants' ? 'bg-amber-500 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'"
                >
                  <UtensilsIcon class="w-3.5 h-3.5" />
                  ร้านอาหารใกล้เคียง ({{ nearbyRestaurants.length }})
                </button>
             </div>

             <!-- List -->
             <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <RouterLink 
                  v-for="item in activeNearbyList" 
                  :key="item.id" 
                  :to="`/place/${item.id}`"
                  class="flex gap-4 p-3.5 rounded-2xl hover:bg-slate-50 transition-all border border-slate-100 hover:border-slate-200 hover:shadow-sm group relative"
                >
                  <div class="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0 relative">
                    <img 
                      :src="getImageUrl(item)" 
                      @error="$event.target.src='https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&q=70'"
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                  </div>
                  <div class="flex flex-col justify-between flex-1 min-w-0">
                     <div>
                        <h4 class="font-bold text-slate-900 text-sm line-clamp-1 group-hover:text-blue-600 transition">{{ item.name }}</h4>
                        
                        <!-- Distance Badge -->
                        <div v-if="item.distanceText" class="mt-1 flex items-center gap-1">
                          <span class="inline-flex items-center gap-1 text-[11px] font-extrabold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                            <NavigationIcon class="w-2.5 h-2.5 text-emerald-600" />
                            {{ item.distanceText }}
                          </span>
                        </div>
                        <p v-else class="text-xs text-slate-400 line-clamp-1 mt-1 flex items-center gap-1">
                          <MapPinIcon class="w-3 h-3" /> {{ item.location?.address || 'กาญจนบุรี' }}
                        </p>
                     </div>

                     <div class="flex items-center justify-between text-xs pt-2">
                        <span class="font-bold" :class="{'text-blue-600': nearbyTab==='attractions', 'text-indigo-600': nearbyTab==='accommodations', 'text-amber-600': nearbyTab==='restaurants'}">
                           {{ getPriceText(item, nearbyTab) }}
                        </span>
                        <span class="text-[11px] text-slate-400 group-hover:text-blue-600 font-bold flex items-center gap-0.5 transition">
                          ดูรายละเอียด &rarr;
                        </span>
                     </div>
                  </div>
                </RouterLink>
             </div>
             
             <div v-if="activeNearbyList.length === 0" class="text-center text-slate-400 py-6 text-sm">
                ไม่มีข้อมูลในหมวดหมู่นี้
             </div>
          </div>

        
          <!-- Reviews Section -->
          <div id="reviews" class="bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-[#F1F5F9] mt-8">
            <div class="flex items-center justify-between mb-5">
              <h2 class="text-xl font-extrabold text-[#0F172A] flex items-center gap-2">
                <StarIcon class="w-5 h-5 text-yellow-400 fill-yellow-400" />
                รีวิวและประสบการณ์
              </h2>
              <span class="text-xs font-bold text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full">{{ reviews.length }} รีวิว</span>
            </div>

            <!-- Add Review (If Logged In) -->
            <div v-if="authStore.user" class="mb-6 bg-gray-50/50 p-4 rounded-2xl border border-gray-100/80">
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                  {{ authStore.user.username.charAt(0).toUpperCase() }}
                </div>
                <div class="flex-1">
                  <div class="flex gap-1 mb-1.5">
                    <button v-for="star in 5" :key="star" @click="newReview.rating = star" class="focus:outline-none transition-transform hover:scale-110">
                      <StarIcon :class="['w-5 h-5', star <= newReview.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 hover:text-yellow-200']" />
                    </button>
                  </div>
                  <textarea v-model="newReview.comment" rows="2" placeholder="แบ่งปันประสบการณ์..." class="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white resize-none shadow-sm transition-shadow"></textarea>
                  <div class="flex justify-end mt-2">
                    <button @click="submitReview" :disabled="!newReview.rating || !newReview.comment.trim() || submitting" class="px-4 py-1.5 bg-[#0F172A] text-white text-xs font-bold rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm">
                      {{ submitting ? 'กำลังส่ง...' : 'โพสต์รีวิว' }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="mb-6 bg-blue-50/50 p-4 rounded-2xl border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>
                </div>
                <p class="text-blue-800 font-medium text-xs">เข้าสู่ระบบเพื่อเขียนรีวิวและแบ่งปันประสบการณ์ของคุณ</p>
              </div>
              <RouterLink to="/login" class="px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition shadow-sm shrink-0">เข้าสู่ระบบ</RouterLink>
            </div>

            <!-- Review List -->
            <div class="space-y-4">
              <div v-if="reviewsLoading" class="flex justify-center py-6">
                <div class="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
              
              <div v-else-if="reviews.length === 0" class="text-center py-8">
                <div class="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-2">
                  <StarIcon class="w-5 h-5 text-gray-300" />
                </div>
                <p class="font-bold text-gray-700 mb-1 text-sm">ยังไม่มีรีวิว</p>
                <p class="text-xs text-gray-500">เป็นคนแรกที่แบ่งปันประสบการณ์ที่นี่สิ!</p>
              </div>
              
              <div v-else v-for="review in displayedReviews" :key="review.id" class="flex gap-3 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div class="w-8 h-8 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                  {{ review.user?.username?.charAt(0)?.toUpperCase() || 'U' }}
                </div>
                <div class="flex-1">
                  <div class="flex items-center justify-between mb-1">
                    <p class="font-bold text-[#0F172A] text-xs">{{ review.user?.username || 'ผู้ใช้งาน' }}</p>
                    <p class="text-[10px] text-gray-400">{{ new Date(review.createdAt).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' }) }}</p>
                  </div>
                  <div class="flex gap-0.5 mb-1.5">
                    <StarIcon v-for="star in 5" :key="star" :class="['w-3 h-3', star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200']" />
                  </div>
                  <p class="text-gray-600 text-xs leading-relaxed">{{ review.comment }}</p>
                </div>
              </div>
              
              <!-- Show More / Less Button -->
              <div v-if="reviews.length > 3" class="pt-2 text-center border-t border-gray-50">
                 <button @click="showAllReviews = !showAllReviews" class="text-blue-600 hover:text-blue-800 text-xs font-bold py-2 px-4 rounded-full hover:bg-blue-50 transition-colors inline-flex items-center gap-1">
                    {{ showAllReviews ? 'ย่อรีวิว' : 'ดูรีวิวทั้งหมด (' + reviews.length + ')' }}
                    <svg :class="{'rotate-180': showAllReviews}" class="w-3 h-3 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                 </button>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT COLUMN: Sticky Sidebar -->
        <div class="lg:col-span-1 sticky top-24 space-y-6">
          
          <!-- Sticky Information Card -->
          <div class="bg-white rounded-3xl shadow-sm border border-[#F1F5F9] overflow-hidden">
            <!-- Map iframe (Only if lat/lng available) -->
            <div id="map" class="relative h-[240px] bg-gray-200">
              <iframe :src="googleMapsUrl" class="w-full h-full border-0" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
              <button class="absolute bottom-3 right-3 bg-white px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-2 shadow-md hover:bg-gray-50 transition text-gray-900">
                 <ExpandIcon class="w-4 h-4" /> เปิด Google Maps
              </button>
            </div>

            <!-- Info Details -->
            <div class="p-6 space-y-5">
              <h2 class="text-xl font-extrabold text-[#0F172A] leading-tight mb-2">{{ place.name }}</h2>

              <div class="flex items-start gap-3">
                <MapPinIcon class="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                <div>
                  <div class="text-sm text-[#0F172A] font-bold">{{ place.location?.address || 'กาญจนบุรี' }}</div>
                </div>
              </div>
              
              <div v-if="place.openingTime || place.closingTime || is24Hours" class="flex items-start gap-3 bg-slate-50/80 p-3 rounded-2xl border border-slate-100">
                <ClockIcon class="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div class="flex-1">
                  <div class="flex items-center justify-between gap-2 flex-wrap">
                    <div class="text-sm font-bold text-gray-900">เวลาเปิด-ปิดทำการ</div>
                    <span v-if="currentOperatingStatus" :class="['inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border shadow-2xs', currentOperatingStatus.badgeClass]">
                      <span :class="['w-1.5 h-1.5 rounded-full', currentOperatingStatus.dotClass]"></span>
                      {{ currentOperatingStatus.text }}
                    </span>
                  </div>
                  <div class="text-sm text-gray-800 mt-1 font-bold">
                    {{ is24Hours ? 'เปิดบริการตลอด 24 ชั่วโมง' : `${formatTimeStr(place.openingTime)} - ${formatTimeStr(place.closingTime)} น.` }}
                  </div>
                  <div v-if="!is24Hours" class="text-[11px] text-slate-500 mt-0.5">
                    * แนะนำเดินทางถึงก่อนเวลาปิดอย่างน้อย 1 ชั่วโมงเพื่อการท่องเที่ยวที่ครบถ้วน
                  </div>
                </div>
              </div>
              
              <div v-if="place.entranceFee !== undefined && place.entranceFee !== null" class="flex items-start gap-3">
                <TicketIcon class="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                <div>
                  <div class="text-sm font-bold text-gray-900">ค่าเข้าชม</div>
                  <div class="text-sm text-gray-600">{{ place.entranceFee === 0 ? 'ฟรี' : place.entranceFee + ' บาท' }}</div>
                </div>
              </div>

              <div v-if="place.pricePerNight !== undefined && place.pricePerNight !== null" class="flex items-start gap-3">
                <TicketIcon class="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                <div>
                  <div class="text-sm font-bold text-gray-900">ราคาเริ่มต้น</div>
                  <div class="text-sm text-gray-600">฿{{ (place.pricePerNight || 0).toLocaleString() }} / คืน</div>
                </div>
              </div>

              <div v-if="place.averagePrice" class="flex items-start gap-3">
                <TicketIcon class="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                <div>
                  <div class="text-sm font-bold text-gray-900">ราคาเฉลี่ย</div>
                  <div class="text-sm text-gray-600">฿{{ place.averagePrice }}</div>
                </div>
              </div>

              <div v-if="place.location?.phoneNumber" class="flex items-start gap-3">
                <PhoneIcon class="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                <div>
                  <div class="text-sm font-bold text-gray-900">โทรศัพท์</div>
                  <div class="text-sm text-gray-600">{{ place.location.phoneNumber }}</div>
                </div>
              </div>

                            <!-- Action Buttons -->
              <div class="pt-4 border-t border-gray-100 space-y-3">
                <button @click="addToTrip" class="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 shadow-sm transition">
                  <PlusIcon class="w-5 h-5" /> นำไปจัดแผนเดินทาง
                </button>
                <div class="grid grid-cols-2 gap-3">
                  <button @click="startNavigation" :class="userLocation ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100' : 'bg-white text-[#334155] border-gray-200 hover:bg-gray-50'" class="border py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm transition text-sm cursor-pointer"><NavigationIcon class="w-4 h-4" /> {{ userLocation ? 'ยกเลิกนำทาง' : 'นำทาง' }}</button>
                  <button @click="sharePlace" class="border border-gray-200 text-[#334155] bg-white py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 shadow-sm transition text-sm">
                    <ShareIcon class="w-4 h-4" /> แชร์สถานที่
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

    <!-- Lightbox Modal -->
    <Teleport to="body">
      <div v-if="showLightbox" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm">
        <!-- Close Button -->
        <button @click="closeLightbox" class="absolute top-6 right-6 text-white/70 hover:text-white transition p-2 bg-black/20 hover:bg-black/40 rounded-full">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <!-- Current Image Counter -->
        <div class="absolute top-6 left-6 text-white/80 font-medium tracking-widest text-sm bg-black/40 px-4 py-2 rounded-full">
          {{ lightboxIndex + 1 }} / {{ uniqueImages.length }}
        </div>

        <!-- Prev Button -->
        <button @click="prevLightboxImage" class="absolute left-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition p-4 hover:bg-white/10 rounded-full hidden md:block">
          <ChevronLeftIcon class="w-10 h-10" />
        </button>

        <!-- Image Container -->
        <div class="relative max-w-6xl w-full h-[80vh] px-4 flex items-center justify-center" @click.self="closeLightbox">
          <img v-if="uniqueImages[lightboxIndex]" :src="uniqueImages[lightboxIndex].imageUrl" class="max-w-full max-h-full object-contain rounded-lg shadow-2xl select-none" />
          
          <!-- Mobile Controls inside image container for easier reaching -->
          <div class="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 md:hidden pointer-events-none">
             <button @click="prevLightboxImage" class="pointer-events-auto text-white/70 bg-black/30 p-2 rounded-full backdrop-blur-sm"><ChevronLeftIcon class="w-8 h-8" /></button>
             <button @click="nextLightboxImage" class="pointer-events-auto text-white/70 bg-black/30 p-2 rounded-full backdrop-blur-sm"><ChevronRightIcon class="w-8 h-8" /></button>
          </div>
        </div>

        <!-- Next Button -->
        <button @click="nextLightboxImage" class="absolute right-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition p-4 hover:bg-white/10 rounded-full hidden md:block">
          <ChevronRightIcon class="w-10 h-10" />
        </button>
        
        <!-- Thumbnail Strip -->
        <div class="absolute bottom-6 inset-x-0 flex justify-center gap-2 px-4 overflow-x-auto" style="scrollbar-width: none;">
           <img v-for="(img, idx) in uniqueImages" :key="idx" :src="img.imageUrl" @click="lightboxIndex = idx" :class="['w-16 h-16 object-cover rounded-md cursor-pointer transition-all duration-300', lightboxIndex === idx ? 'ring-2 ring-white scale-110 opacity-100' : 'opacity-40 hover:opacity-100']" />
        </div>
      </div>
    </Teleport>

</template>

<script setup>
import { useToast } from '../composables/useNotify'
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { 
  MapPinIcon, PlusIcon, ClockIcon, TicketIcon, PhoneIcon, HeartIcon, 
  ShareIcon, ChevronLeftIcon, ChevronRightIcon, ImageIcon, InfoIcon, 
  MapIcon, StarIcon, MountainIcon, QuoteIcon, DropletIcon, TreePineIcon, 
  CameraIcon, UsersIcon, LightbulbIcon, ExpandIcon, NavigationIcon,
  Compass as CompassIcon, Utensils as UtensilsIcon, BedDouble as BedDoubleIcon
} from 'lucide-vue-next'
import PlaceCard from '../components/PlaceCard.vue'
import { useTripStore } from '../stores/trip'
import { useFavoriteStore } from '../stores/favorite'
import api from '../services/api'

import { useAuthStore } from '../stores/auth'

  const authStore = useAuthStore()
  const reviews = ref([])
  const reviewsLoading = ref(false)
  const submitting = ref(false)
  const newReview = ref({
    rating: 0,
    comment: ''
  })



  const currentGalleryIndex = ref(0)
  const showLightbox = ref(false)
  const lightboxIndex = ref(0)

  const currentDisplayImage = computed(() => {
    if (uniqueImages.value && uniqueImages.value.length > 0 && currentGalleryIndex.value < uniqueImages.value.length) {
       return uniqueImages.value[currentGalleryIndex.value].imageUrl
    }
    return primaryImage.value
  })

  const nextImage = (e) => {
    if(e) e.stopPropagation()
    if (uniqueImages.value && uniqueImages.value.length > 0) {
      currentGalleryIndex.value = (currentGalleryIndex.value + 1) % uniqueImages.value.length
    }
  }

  const prevImage = (e) => {
    if(e) e.stopPropagation()
    if (uniqueImages.value && uniqueImages.value.length > 0) {
      currentGalleryIndex.value = (currentGalleryIndex.value - 1 + uniqueImages.value.length) % uniqueImages.value.length
    }
  }

  const openLightbox = (index) => {
    if (!uniqueImages.value || uniqueImages.value.length === 0) return
    lightboxIndex.value = index >= 0 && index < uniqueImages.value.length ? index : 0
    showLightbox.value = true
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    showLightbox.value = false
    document.body.style.overflow = ''
  }

  const nextLightboxImage = (e) => {
    if(e) e.stopPropagation()
    if (uniqueImages.value && uniqueImages.value.length > 0) {
      lightboxIndex.value = (lightboxIndex.value + 1) % uniqueImages.value.length
    }
  }

  const prevLightboxImage = (e) => {
    if(e) e.stopPropagation()
    if (uniqueImages.value && uniqueImages.value.length > 0) {
      lightboxIndex.value = (lightboxIndex.value - 1 + uniqueImages.value.length) % uniqueImages.value.length
    }
  }

  // Keyboard navigation for lightbox

  const handleKeydown = (e) => {
    if (!showLightbox.value) return
    if (e.key === 'ArrowRight') nextLightboxImage()
    if (e.key === 'ArrowLeft') prevLightboxImage()
    if (e.key === 'Escape') closeLightbox()
  }
  onMounted(() => { window.addEventListener('keydown', handleKeydown) })
  onUnmounted(() => { window.removeEventListener('keydown', handleKeydown) })

  const showAllReviews = ref(false)
  const displayedReviews = computed(() => {
    if (showAllReviews.value) return reviews.value
    return reviews.value.slice(0, 3)
  })

  const fetchReviews = async () => {
    reviewsLoading.value = true
    try {
      const id = route.params.id
      // In a real app we'd have a specific endpoint, for now fetch all and filter
      const res = await api.get('/Reviews')
      const placeReviews = res.data.filter(r => r.placeId == id)
      
      // Fetch users for reviews
      const usersRes = await api.get('/Users').catch(() => ({ data: [] }))
      const usersMap = usersRes.data.reduce((acc, user) => {
        acc[user.id] = user
        return acc
      }, {})
      
      reviews.value = placeReviews.map(r => ({
        ...r,
        user: usersMap[r.userId] || null
      })).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    } catch (err) {
      console.error(err)
    } finally {
      reviewsLoading.value = false
    }
  }

  const submitReview = async () => {
    if (!authStore.user) return
    submitting.value = true
    try {
      const payload = {
        userId: authStore.user.id,
        placeId: parseInt(route.params.id),
        rating: newReview.value.rating,
        comment: newReview.value.comment,
        isApproved: true,
        createdAt: new Date().toISOString()
      }
      const res = await api.post('/Reviews', payload)
      
      // Add the new review to the top of the list locally
      reviews.value.unshift({
        ...res.data,
        user: authStore.user
      })
      
      // Reset form
      newReview.value = { rating: 0, comment: '' }
      toast.success('ขอบคุณสำหรับรีวิวของคุณ!')
    } catch (err) {
      toast.error('ไม่สามารถบันทึกรีวิวได้')
    } finally {
      submitting.value = false
    }
  }


const route = useRoute()
const tripStore = useTripStore()
const favoriteStore = useFavoriteStore()
const toast = useToast()
const place = ref(null)
const loading = ref(true)
const error = ref(false)
const nearbyPlaces = ref([])

const uniqueImages = computed(() => {
  if (!place.value) return []
  let imgs = []
  if (place.value.images && place.value.images.length > 0) {
    const seen = new Set()
    imgs = place.value.images.filter(img => {
      if (!img || !img.imageUrl || seen.has(img.imageUrl)) return false
      seen.add(img.imageUrl)
      return true
    })
  }
  if (imgs.length === 0) {
    const fallbackUrl = place.value.imageUrl || 'https://images.unsplash.com/photo-1543781255-a0bcabff3d35?w=1200&q=80'
    imgs = [{ id: 0, imageUrl: fallbackUrl, isPrimary: true, description: place.value.name }]
  }
  return imgs
})

const primaryImage = computed(() => {
  if (!place.value || !uniqueImages.value || uniqueImages.value.length === 0) {
    return place.value?.imageUrl || 'https://images.unsplash.com/photo-1543781255-a0bcabff3d35?w=1200&q=80'
  }
  const primary = uniqueImages.value.find(img => img.isPrimary)
  return primary ? primary.imageUrl : uniqueImages.value[0].imageUrl
})

const placeCategoryName = computed(() => {
  if (place.value?.type === 'Accommodation' || place.value?.accommodationType !== undefined) return 'ที่พัก'
  if (place.value?.type === 'Restaurant' || place.value?.foodType !== undefined) return 'ร้านอาหารและคาเฟ่'
  return 'สถานที่ท่องเที่ยว'
})

const placeCategoryLink = computed(() => {
  if (place.value?.type === 'Accommodation' || place.value?.accommodationType !== undefined) return '/hotels'
  if (place.value?.type === 'Restaurant' || place.value?.foodType !== undefined) return '/restaurants'
  return '/places'
})

const formatTimeStr = (t) => {
  if (!t) return ''
  return String(t).substring(0, 5)
}

const is24Hours = computed(() => {
  if (!place.value) return false
  const open = place.value.openingTime
  const close = place.value.closingTime
  if (place.value.placeType === 'Accommodation') return true
  if (open && close && open.startsWith('00:00') && close.startsWith('23:59')) return true
  return false
})

const currentOperatingStatus = computed(() => {
  if (!place.value) return null
  if (is24Hours.value) {
    return {
      isOpen: true,
      text: 'เปิดบริการ 24 ชม.',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
      dotClass: 'bg-emerald-500'
    }
  }
  const open = place.value.openingTime
  const close = place.value.closingTime
  if (!open || !close) return null

  const now = new Date()
  const currentMins = now.getHours() * 60 + now.getMinutes()
  const [oh, om] = open.split(':').map(Number)
  const [ch, cm] = close.split(':').map(Number)
  const openMins = oh * 60 + om
  const closeMins = ch * 60 + cm

  let isOpen = false
  if (closeMins > openMins) {
    isOpen = currentMins >= openMins && currentMins < closeMins
  } else {
    isOpen = currentMins >= openMins || currentMins < closeMins
  }

  if (isOpen) {
    return {
      isOpen: true,
      text: `เปิดอยู่ (ปิด ${formatTimeStr(close)} น.)`,
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
      dotClass: 'bg-emerald-500'
    }
  } else {
    return {
      isOpen: false,
      text: `ปิดแล้ว (เปิด ${formatTimeStr(open)} น.)`,
      badgeClass: 'bg-rose-50 text-rose-700 border-rose-200/80',
      dotClass: 'bg-rose-500'
    }
  }
})

const getImageUrl = (item) => {
  if (item.images && item.images.length > 0) {
    const primary = item.images.find(img => img.isPrimary)
    const url = primary ? primary.imageUrl : item.images[0].imageUrl
    if (url) return url
  }
  if (item.imageUrl) return item.imageUrl
  if (item.placeType === 'Restaurant') return 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80'
  if (item.placeType === 'Accommodation') return 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80'
  return 'https://images.unsplash.com/photo-1543781255-a0bcabff3d35?w=400&q=80'
}

const userLocation = ref(null)

const startNavigation = () => {
  if (userLocation.value) {
    userLocation.value = null;
    return;
  }

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((pos) => {
      userLocation.value = { lat: pos.coords.latitude, lng: pos.coords.longitude }
    }, (err) => {
      alert("ไม่สามารถดึงตำแหน่งปัจจุบันได้ กรุณาอนุญาตให้ใช้งาน GPS")
    })
  } else {
    alert("เบราว์เซอร์ของคุณไม่รองรับ GPS")
  }
}

const googleMapsUrl = computed(() => {
  if (!place.value) return ''
  const lat = place.value.latitude || (place.value.location ? place.value.location.latitude : 14.0228)
  const lng = place.value.longitude || (place.value.location ? place.value.location.longitude : 99.5328)
  
  if (userLocation.value) { return 'https://maps.google.com/maps?saddr=' + userLocation.value.lat + ',' + userLocation.value.lng + '&daddr=' + encodeURIComponent(place.value.name + ' กาญจนบุรี') + '&z=12&output=embed'; }
  
  return 'https://maps.google.com/maps?q=' + encodeURIComponent(place.value.name + ' กาญจนบุรี') + '&z=15&output=embed'
})

const nearbyAccommodations = ref([])
const nearbyRestaurants = ref([])

// Haversine distance formula
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  if (lat1 === undefined || lon1 === undefined || lat2 === undefined || lon2 === undefined || lat1 === null || lon1 === null || lat2 === null || lon2 === null) {
    return 99999
  }
  const nLat1 = Number(lat1)
  const nLon1 = Number(lon1)
  const nLat2 = Number(lat2)
  const nLon2 = Number(lon2)
  if (isNaN(nLat1) || isNaN(nLon1) || isNaN(nLat2) || isNaN(nLon2)) return 99999

  const R = 6371 // Earth's radius in km
  const dLat = (nLat2 - nLat1) * Math.PI / 180
  const dLon = (nLon2 - nLon1) * Math.PI / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(nLat1 * Math.PI / 180) * Math.cos(nLat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

const formatDistance = (dist) => {
  if (dist === null || dist === undefined || dist >= 9999) return ''
  if (dist < 1) {
    return `ห่าง ${(dist * 1000).toFixed(0)} ม.`
  }
  return `ห่าง ${dist.toFixed(1)} กม.`
}

const nearbyTab = ref('attractions')

const activeNearbyList = computed(() => {
  if (nearbyTab.value === 'attractions') return nearbyPlaces.value
  if (nearbyTab.value === 'accommodations') return nearbyAccommodations.value
  if (nearbyTab.value === 'restaurants') return nearbyRestaurants.value
  return []
})

const getPriceText = (item, tab) => {
  if (tab === 'attractions') {
    const fee = item.entranceFee
    return (fee && fee > 0) ? 'ค่าเข้า ' + fee + ' บาท' : 'เข้าชมฟรี'
  }
  if (tab === 'accommodations') {
    const fee = item.entranceFee || item.pricePerNight
    return (fee && fee > 0) ? 'เริ่มต้น ฿' + Number(fee).toLocaleString() : 'ที่พัก'
  }
  if (tab === 'restaurants') {
    const fee = item.entranceFee || item.averagePrice
    return (fee && fee > 0) ? 'เฉลี่ย ฿' + Number(fee).toLocaleString() : 'ร้านอาหาร'
  }
  return ''
}

const fetchData = async () => {
  loading.value = true
  error.value = false
  try {
    const id = route.params.id
    
    // 1. Try unified Places API first
    let found = false
    try {
      const res = await api.get('/Places/' + id)
      if (res.data && res.data.id) {
        place.value = { ...res.data, type: res.data.placeType || 'Attraction' }
        found = true
      }
    } catch (e) {}

    // 2. Fallbacks if needed
    if (!found) {
      try {
        const res = await api.get('/Attractions/' + id)
        if (res.data && res.data.id) {
          place.value = { ...res.data, type: 'Attraction' }
          found = true
        }
      } catch (e) {}
    }
    if (!found) {
      try {
        const res = await api.get('/Accommodations/' + id)
        if (res.data && res.data.id) {
          place.value = { ...res.data, type: 'Accommodation' }
          found = true
        }
      } catch (e) {}
    }
    if (!found) {
      try {
        const res = await api.get('/Restaurants/' + id)
        if (res.data && res.data.id) {
          place.value = { ...res.data, type: 'Restaurant' }
          found = true
        }
      } catch (e) {}
    }
    
    if (!found) {
      throw new Error('Place not found')
    }

    // 3. Load all places from /Places to calculate real GPS proximity
    const curLat = place.value.latitude || (place.value.location ? place.value.location.latitude : 14.0416)
    const curLng = place.value.longitude || (place.value.location ? place.value.location.longitude : 99.5036)

    const allPlacesRes = await api.get('/Places').catch(() => ({ data: [] }))
    let allItems = allPlacesRes.data || []

    // If /Places is empty, fallback to merging individual endpoints
    if (allItems.length === 0) {
      const [aR, accR, rR] = await Promise.all([
        api.get('/Attractions').catch(() => ({ data: [] })),
        api.get('/Accommodations').catch(() => ({ data: [] })),
        api.get('/Restaurants').catch(() => ({ data: [] }))
      ])
      allItems = [
        ...(aR.data || []).map(x => ({ ...x, placeType: 'Attraction' })),
        ...(accR.data || []).map(x => ({ ...x, placeType: 'Accommodation' })),
        ...(rR.data || []).map(x => ({ ...x, placeType: 'Restaurant' }))
      ]
    }

    // Map each place with distance from current place
    const otherItems = allItems
      .filter(p => p.id != id)
      .map(p => {
        const pLat = p.latitude || (p.location ? p.location.latitude : null)
        const pLng = p.longitude || (p.location ? p.location.longitude : null)
        const dist = calculateDistance(curLat, curLng, pLat, pLng)
        return {
          ...p,
          distanceKm: dist,
          distanceText: formatDistance(dist)
        }
      })

    // Sort by proximity (closest first!)
    nearbyPlaces.value = otherItems
      .filter(p => p.placeType === 'Attraction')
      .sort((a, b) => a.distanceKm - b.distanceKm)
      .slice(0, 6)

    nearbyAccommodations.value = otherItems
      .filter(p => p.placeType === 'Accommodation')
      .sort((a, b) => a.distanceKm - b.distanceKm)
      .slice(0, 6)

    nearbyRestaurants.value = otherItems
      .filter(p => p.placeType === 'Restaurant')
      .sort((a, b) => a.distanceKm - b.distanceKm)
      .slice(0, 6)

  } catch (err) {
    console.error("Failed to fetch place details:", err)
    error.value = true
  } finally {
    fetchReviews()
    loading.value = false
  }
}


onMounted(() => {
  fetchData()
})

watch(() => route.params.id, (newId) => {
  if (newId) {
    loading.value = true;
    fetchData();
  }
})


const addToTrip = () => {
  if (place.value) {
    tripStore.addItem({
      id: place.value.id,
      title: place.value.name,
      location: place.value.location?.address || 'กาญจนบุรี',
      img: primaryImage.value
    })
    toast.success('เพิ่มลงแผนการเดินทางแล้ว!')
  }
}
</script>
<style scoped>
html {
  scroll-behavior: smooth;
}
</style>












