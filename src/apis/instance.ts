import { getSession, signOut } from 'next-auth/react';
import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.example.com', 
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
      const session = await getSession(); 
      if (session && session.accessToken) {
        config.headers.Authorization = `Bearer ${session.accessToken}`; 
      }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
   if (error.response) {
     const { status, data } = error.response;

     // Handle 401 errors and check for session validity
     const session = await getSession();
     if (session && (status === 401 || data?.message === "Token expired")) {
       await signOut();
     }
   }
   return Promise.reject(error);
  }
);

export default axiosInstance;
