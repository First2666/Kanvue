import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PlaceDetailView from '../views/PlaceDetailView.vue'
import PlacesView from '../views/PlacesView.vue'
import HotelsView from '../views/HotelsView.vue'
import RestaurantsView from '../views/RestaurantsView.vue'
import FavoriteView from '../views/FavoriteView.vue'
import ProfileView from '../views/ProfileView.vue'
import LoginView from '../views/LoginView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/planner', name: 'trip-planner', component: () => import('../views/TripPlannerView.vue'), meta: { requiresAuth: true } },
    { path: '/place/:id', name: 'place-detail', component: PlaceDetailView },
    { path: '/places', name: 'places', component: PlacesView },
    { path: '/hotels', name: 'hotels', component: HotelsView },
    { path: '/restaurants', name: 'restaurants', component: RestaurantsView },
    { path: '/favorites', name: 'favorites', component: FavoriteView, meta: { requiresAuth: true } },
    { path: '/profile', name: 'profile', component: ProfileView, meta: { requiresAuth: true } },
    { path: '/login', name: 'login', component: LoginView },
        { path: '/admin', name: 'admin', component: () => import('../views/AdminView.vue') },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.user) {
    next('/login?redirect=' + to.path)
  } else {
    next()
  }
})

export default router
