import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../services/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user')) || null)

  async function login(username, password) {
    try {
      const res = await api.post('/Users/Login', { username, password })
      if (res.data) {
        user.value = res.data
        localStorage.setItem('user', JSON.stringify(res.data))
        return { success: true }
      }
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'การเข้าสู่ระบบล้มเหลว' }
    }
  }

  async function register(username, password, email) {
    try {
      const res = await api.post('/Users/Register', { username, password, email })
      if (res.data) {
        user.value = res.data
        localStorage.setItem('user', JSON.stringify(res.data))
        return { success: true }
      }
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'การสมัครสมาชิกล้มเหลว' }
    }
  }

  function logout() {
    user.value = null
    localStorage.removeItem('user')
  }

  return { user, login, register, logout }
})
