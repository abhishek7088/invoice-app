import axios from 'axios';
import authService from './auth';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Attach token automatically before each request
api.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
