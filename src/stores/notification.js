import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../services/api'

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref([])
  const unreadCount = ref(0)
  const loading = ref(false)

  async function fetchNotifications(unreadOnly = false) {
    loading.value = true
    try {
      const res = await api.get('/Notifications', {
        params: { unreadOnly }
      })
      notifications.value = res.data || []
      unreadCount.value = notifications.value.filter(n => !n.isRead).length
      return notifications.value
    } catch (err) {
      console.error('Failed to fetch notifications:', err)
      return []
    } finally {
      loading.value = false
    }
  }

  async function fetchUnreadCount() {
    try {
      const res = await api.get('/Notifications/unread-count')
      unreadCount.value = typeof res.data === 'number' ? res.data : 0
      return unreadCount.value
    } catch (err) {
      console.error('Failed to fetch unread count:', err)
      return 0
    }
  }

  async function markAsRead(id) {
    try {
      // Optimistic update
      const target = notifications.value.find(n => n.id === id)
      if (target && !target.isRead) {
        target.isRead = true
        if (unreadCount.value > 0) unreadCount.value--
      }
      await api.put(`/Notifications/${id}/read`)
      return true
    } catch (err) {
      console.error(`Failed to mark notification ${id} as read:`, err)
      return false
    }
  }

  async function markAllAsRead() {
    try {
      // Optimistic update
      notifications.value.forEach(n => {
        n.isRead = true
      })
      unreadCount.value = 0
      await api.put('/Notifications/read-all')
      return true
    } catch (err) {
      console.error('Failed to mark all notifications as read:', err)
      return false
    }
  }

  async function deleteNotification(id) {
    try {
      // Optimistic update
      const target = notifications.value.find(n => n.id === id)
      if (target && !target.isRead && unreadCount.value > 0) {
        unreadCount.value--
      }
      notifications.value = notifications.value.filter(n => n.id !== id)
      await api.delete(`/Notifications/${id}`)
      return true
    } catch (err) {
      console.error(`Failed to delete notification ${id}:`, err)
      return false
    }
  }

  function reset() {
    notifications.value = []
    unreadCount.value = 0
    loading.value = false
  }

  return {
    notifications,
    unreadCount,
    loading,
    fetchNotifications,
    fetchUnreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    reset
  }
})
