import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

// API Configuration
const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://upskilling-egypt.com:3000/api/v0',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000'),
  headers: {
    'Content-Type': 'application/json',
  },
};

// Create axios instance
const api: AxiosInstance = axios.create(API_CONFIG);

// Token validation function
const validateToken = (token: string | null): boolean => {
  if (!token) return false;
  
  // Check if token is a valid JWT format (3 parts separated by dots)
  const parts = token.split('.');
  if (parts.length !== 3) return false;
  
  // Check if all parts are base64 encoded
  try {
    parts.forEach(part => {
      if (part) {
        atob(part.replace(/-/g, '+').replace(/_/g, '/'));
      }
    });
    return true;
  } catch (error) {
    return false;
  }
};

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('userToken');
    console.log('Token being sent:', token);
    
    if (token && token.trim() !== '' && validateToken(token)) {
      config.headers.Authorization = `${token}`;
    } else if (token && !validateToken(token)) {
      console.error('Invalid token detected, clearing localStorage');
      localStorage.removeItem('userToken');
      localStorage.removeItem('role');
      localStorage.removeItem('userName');
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle common errors
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      console.error('Request timeout:', error);
    } else if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
      console.error('Network error:', error);
    } else if (error.response?.status === 401 || 
               (error.response?.data && typeof error.response.data === 'object' && 'message' in error.response.data && 
                typeof error.response.data.message === 'string' && error.response.data.message.includes('jwt malformed'))) {
      // Handle unauthorized access or JWT errors
      console.error('Authentication error, clearing localStorage');
      localStorage.removeItem('userToken');
      localStorage.removeItem('role');
      localStorage.removeItem('userName');
      // Don't redirect automatically, let the component handle it
    }
    
    return Promise.reject(error);
  }
);

// API endpoints
export const API_ENDPOINTS = {
  USERS: '/admin/users',
  LOGIN: '/admin/users/login',
  ROOM_REVIEWS: '/portal/room-reviews',
} as const;

// User service
export const userService = {
  // Register new user
  register: async (userData: FormData) => {
    try {
      const response = await api.post(API_ENDPOINTS.USERS, userData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTkyYWU3N2U1ZDI5NDhiOGJmMjAyZjciLCJyb2xlIjoidXNlciIsInZlcmlmaWVkIjpmYWxzZSwiaWF0IjoxNzA0OTg4MjExLCJleHAiOjE3MDYxOTc4MTF9.7ifBQJbVy2W2crDEQphbdhh1Coia-Z10nCbnBbb__LU',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Login user
  login: async (credentials: { email: string; password: string }) => {
    try {
      const response = await api.post(API_ENDPOINTS.LOGIN, credentials);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// Reviews service
export const reviewsService = {
  // Get all reviews for a room
  getRoomReviews: async (roomId: string) => {
    try {
      const response = await api.get(`${API_ENDPOINTS.ROOM_REVIEWS}/${roomId}`,{
        headers: {
          
          'Content-Type': 'application/json'
        }
      });
console.log(response)
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Create a new review
  createReview: async (reviewData: { roomId: string; rating: number; review: string }) => {
    try {
      const response = await api.post(API_ENDPOINTS.ROOM_REVIEWS, reviewData);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

// Error handling utilities
export const handleApiError = (error: any): string => {
  if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
    return 'Connection timed out. Please check your internet connection and try again.';
  } else if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
    return 'Network error. Please check your internet connection and try again.';
  } else if (error.response?.status === 401) {
    return 'Authentication failed. Please contact support.';
  } else if (error.response?.status === 500) {
    return 'Server error. Please try again later.';
  } else if (error.response?.data?.message) {
    return error.response.data.message;
  } else {
    return 'An unexpected error occurred. Please try again later.';
  }
};

export default api; 