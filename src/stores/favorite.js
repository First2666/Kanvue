import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import api from '../services/api'
import { useAuthStore } from './auth'

export const useFavoriteStore = defineStore('favorite', () => {
  const favoritePlaceIds = ref([])
  const authStore = useAuthStore()

  async function loadFavorites() {
    if (!authStore.user) {
      favoritePlaceIds.value = []
      return
    }
    try {
      const res = await api.get('/Favorites/User/' + authStore.user.id)
      favoritePlaceIds.value = res.data.map(f => f.placeId)
    } catch (err) {
      console.error('Failed to load favorites', err)
    }
  }

  async function toggleFavorite(placeId) {
    if (!authStore.user) {
      window.location.href = '/login'
      return
    }

    const idx = favoritePlaceIds.value.indexOf(placeId)
    if (idx !== -1) {
      favoritePlaceIds.value.splice(idx, 1)
      try {
        await api.delete('/Favorites/User/' + authStore.user.id + '/Place/' + placeId)
      } catch (err) {
        console.error('Failed to remove favorite', err)
        favoritePlaceIds.value.push(placeId)
      }
    } else {
      favoritePlaceIds.value.push(placeId)
      try {
        await api.post('/Favorites', {
          userId: authStore.user.id,
          placeId: placeId
        })
      } catch (err) {
        console.error('Failed to add favorite', err)
        favoritePlaceIds.value.splice(favoritePlaceIds.value.indexOf(placeId), 1)
      }
    }
  }

  function isFavorite(placeId) {
    return favoritePlaceIds.value.includes(placeId)
  }

  watch(() => authStore.user, () => {
    loadFavorites()
  }, { immediate: true })

  return {
    favoritePlaceIds,
    loadFavorites,
    toggleFavorite,
    isFavorite
  }
})
