import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // URL Backend của bạn
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor để gắn token nếu có
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;