import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5088/api';

const api = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use(
  config => {
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        if (user && user.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      }
    } catch (e) {
      console.error('Failed to read token from localStorage', e);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response && error.response.status === 401) {
      const isLoginRequest = error.config && error.config.url && error.config.url.includes('/Users/Login');
      if (!isLoginRequest) {
        localStorage.removeItem('user');
        const base = import.meta.env.BASE_URL || '/';
        const loginPath = (base.endsWith('/') ? base + 'login' : base + '/login');
        if (!window.location.pathname.endsWith('/login')) {
          window.location.href = `${loginPath}?redirect=${encodeURIComponent(window.location.pathname)}`;
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
