import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { API_CONFIG, STORAGE_KEYS, ERROR_MESSAGES } from '../constants/index';
import { ApiError, ApiResponse } from '../types';

// Create axios instance with default configuration
const api: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.DEFAULT_HEADERS,
});

// Token validation function
const validateToken = (token: string | null): boolean => {
  if (!token) return false;
  
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    
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
    const token = localStorage.getItem(STORAGE_KEYS.USER_TOKEN);
    
    if (token && token.trim() !== '') {
      // Clean the token - remove any existing "Bearer " prefix
      let cleanToken = token;
      if (token.startsWith('Bearer ')) {
        cleanToken = token.substring(7); // Remove "Bearer " prefix
      }
      
      // Always add "Bearer " prefix
      config.headers.Authorization = `Bearer ${cleanToken}`;
    }
    
    // Add request configuration
    
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
    let errorMessage: string = ERROR_MESSAGES.UNKNOWN_ERROR;
    
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      errorMessage = ERROR_MESSAGES.TIMEOUT_ERROR;
    } else if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
      errorMessage = ERROR_MESSAGES.NETWORK_ERROR;
    } else if (error.response?.status === 401) {
      errorMessage = ERROR_MESSAGES.UNAUTHORIZED;
      // Clear authentication data
      localStorage.removeItem(STORAGE_KEYS.USER_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER_ROLE);
      localStorage.removeItem(STORAGE_KEYS.USER_NAME);
    } else if (error.response?.status === 403) {
      errorMessage = ERROR_MESSAGES.FORBIDDEN;
    } else if (error.response?.status === 404) {
      errorMessage = ERROR_MESSAGES.NOT_FOUND;
    } else if (error.response?.status === 500) {
      errorMessage = ERROR_MESSAGES.SERVER_ERROR;
    } else if (error.response?.data && typeof error.response.data === 'object' && 'message' in error.response.data) {
      errorMessage = error.response.data.message as string;
    }
    
    const apiError: ApiError = {
      message: errorMessage,
      status: error.response?.status || 0,
      code: error.code,
    };
    
    return Promise.reject(apiError);
  }
);

// Generic API methods
export const apiClient = {
  // GET request
  get: async <T>(url: string, config?: any): Promise<AxiosResponse<ApiResponse<T>>> => {
    return api.get<ApiResponse<T>>(url, config);
  },

  // POST request
  post: async <T>(url: string, data?: any, config?: any): Promise<ApiResponse<T>> => {
    const response = await api.post<ApiResponse<T>>(url, data, config);
    return response.data;
  },

  // PUT request
  put: async <T>(url: string, data?: any, config?: any): Promise<ApiResponse<T>> => {
    const response = await api.put<ApiResponse<T>>(url, data, config);
    return response.data;
  },

  // PATCH request
  patch: async <T>(url: string, data?: any, config?: any): Promise<ApiResponse<T>> => {
    const response = await api.patch<ApiResponse<T>>(url, data, config);
    return response.data;
  },

  // DELETE request
  delete: async <T>(url: string, config?: any): Promise<ApiResponse<T>> => {
    const response = await api.delete<ApiResponse<T>>(url, config);
    return response.data;
  },

  // File upload
  upload: async <T>(url: string, formData: FormData, config?: any): Promise<ApiResponse<T>> => {
    const response = await api.post<ApiResponse<T>>(url, formData, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...config?.headers,
      },
    });
    return response.data;
  },
};

// Error handling utility
export const handleApiError = (error: any): string => {
  if (error.message) {
    return error.message;
  }
  return ERROR_MESSAGES.UNKNOWN_ERROR;
};

export default api;
