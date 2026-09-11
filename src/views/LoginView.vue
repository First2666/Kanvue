<!-- หน้าเว็บ: เข้าสู่ระบบและสมัครสมาชิก -->
<template>
  <div class="min-h-[calc(100vh-80px)] bg-gray-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative">
      <div class="p-8">
        <h2 class="text-2xl font-extrabold text-gray-900 mb-2">
          {{ isRegistering ? 'สร้างบัญชีใหม่' : 'ยินดีต้อนรับกลับมา!' }}
        </h2>
        <p class="text-gray-500 mb-6">
          {{ isRegistering ? 'สมัครสมาชิกเพื่อเริ่มวางแผนการเดินทางของคุณ' : 'เข้าสู่ระบบเพื่อจัดการแผนการเดินทางของคุณ' }}
        </p>

        <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
          <div v-if="errorMsg" class="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-bold text-center">
            {{ errorMsg }}
          </div>

          <div v-if="isRegistering">
            <label class="block text-sm font-bold text-gray-700 mb-1">อีเมล</label>
            <input v-model="form.email" type="email" required class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition" placeholder="you@example.com">
          </div>

          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">ชื่อผู้ใช้</label>
            <input v-model="form.username" type="text" required class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition" placeholder="Username">
          </div>

          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">รหัสผ่าน</label>
            <input v-model="form.password" type="password" required class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition" placeholder="••••••••">
          </div>

          <button type="submit" :disabled="loading" class="w-full bg-blue-600 text-white font-bold rounded-xl px-4 py-3.5 mt-2 hover:bg-blue-700 active:scale-[0.98] transition shadow-md shadow-blue-600/20 disabled:opacity-70">
            <span v-if="loading">กำลังประมวลผล...</span>
            <span v-else>{{ isRegistering ? 'สมัครสมาชิก' : 'เข้าสู่ระบบ' }}</span>
          </button>
        </form>

        <div class="mt-6 text-center text-gray-600 text-sm font-medium">
          {{ isRegistering ? 'มีบัญชีอยู่แล้ว?' : 'ยังไม่มีบัญชี?' }}
          <button @click="toggleMode" class="text-blue-600 font-bold hover:underline ml-1">
            {{ isRegistering ? 'เข้าสู่ระบบเลย' : 'สมัครสมาชิกฟรี' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const isRegistering = ref(false)
const loading = ref(false)
const errorMsg = ref('')

const form = ref({
  username: '',
  password: '',
  email: ''
})

onMounted(() => {
  if (route.query.register === 'true') {
    isRegistering.value = true
  }
})

const toggleMode = () => {
  isRegistering.value = !isRegistering.value
  errorMsg.value = ''
  form.value = { username: '', password: '', email: '' }
}

const handleSubmit = async () => {
  loading.value = true
  errorMsg.value = ''
  
  let result
  if (isRegistering.value) {
    result = await authStore.register(form.value.username, form.value.password, form.value.email)
  } else {
    result = await authStore.login(form.value.username, form.value.password)
  }

  if (!result.success) {
    errorMsg.value = result.message
  } else {
    // Reset form after successful login/register
    form.value = { username: '', password: '', email: '' }
    
    // Redirect back to home or previous page
    const redirect = route.query.redirect || '/'
    router.push(redirect)
  }
  
  loading.value = false
}
</script>
