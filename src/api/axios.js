// src/api/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api', // Base URL for your Express server
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include token if present
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt'); // Assuming you store your JWT in localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
