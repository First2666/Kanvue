import axios from 'axios';

// Get base URL from environment variable if available, otherwise use default
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5088/api';

const api = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' }
});

// Request interceptor for API calls
api.interceptors.request.use(
  config => {
    // We could add a JWT token here if the backend uses JWT
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers['Authorization'] = 'Bearer ' + token;
    // }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized (e.g., clear user state and redirect to login)
      localStorage.removeItem('user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login?redirect=' + window.location.pathname;
      }
    }
    return Promise.reject(error);
  }
);

export default api;
