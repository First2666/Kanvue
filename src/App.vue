<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-grow">
      <RouterView />
    </main>
    <Footer />
    <MobileBottomNav />
    <AppNotify />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import MobileBottomNav from './components/MobileBottomNav.vue'
import Footer from './components/Footer.vue'
import AppNotify from './components/AppNotify.vue'
</script>
