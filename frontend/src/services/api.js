import axios from 'axios';


const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

console.log(' API Base URL:', API_BASE_URL);
console.log(' Environment:', import.meta.env.MODE);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000, 
  withCredentials: false 
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(' API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error(' Request error:', error);
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => {
    console.log(' API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    if (error.response) {
      
      console.error(' Response error:', error.response.status, error.response.data);
    } else if (error.request) {
     
      console.error(' No response from server:', error.message);
      console.error('Check if backend is running at:', API_BASE_URL);
    } else {
      
      console.error(' Error:', error.message);
    }
    
    if (error.response?.status === 401) {
      console.log(' Unauthorized - Clearing auth data');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;