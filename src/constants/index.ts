// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://upskilling-egypt.com:3000/api/v0',
  TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000'),
  DEFAULT_HEADERS: {
    Authorization: `Bearer ${localStorage.getItem('userToken')}`,
    'Content-Type': 'application/json',
  },
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/admin/users/login',
    REGISTER: '/admin/users',
    RESET_PASSWORD: '/admin/users/reset-password',
    CHANGE_PASSWORD: '/admin/users/change-password',
    FORGET_PASSWORD: '/admin/users/forget-password',
  },
  
  // Users
  USERS: {
    BASE: '/admin/users',
    PROFILE: '/admin/users/profile',
    UPDATE_PROFILE: '/admin/users/profile',
  },
  
  // Rooms
  ROOMS: {
    BASE: '/admin/rooms',
    AVAILABLE: '/portal/rooms',
    DETAILS: (id: string) => `/portal/rooms/${id}`,
    CREATE: '/admin/rooms',
    UPDATE: (id: string) => `/admin/rooms/${id}`,
    DELETE: (id: string) => `/admin/rooms/${id}`,
  },
  
  // Bookings
  BOOKINGS: {
    BASE: '/admin/booking',
    USER_BOOKINGS: '/portal/booking/my',
    CREATE: '/portal/booking',
    DETAILS: (id: string) => `/portal/booking/${id}`,
    UPDATE: (id: string) => `/admin/booking/${id}`,
    DELETE: (id: string) => `/admin/booking/${id}`,
  },
  
  // Reviews
  REVIEWS: {
    BASE: '/portal/room-reviews',
    ROOM_REVIEWS: (roomId: string) => `/portal/room-reviews/${roomId}`,
    CREATE: '/portal/room-reviews',
  },
  
  // Facilities
  FACILITIES: {
    BASE: '/admin/facilities',
    CREATE: '/admin/facilities',
    UPDATE: (id: string) => `/admin/facilities/${id}`,
    DELETE: (id: string) => `/admin/facilities/${id}`,
  },
  
  // Advertisements
  ADS: {
    BASE: '/admin/ads',
    CREATE: '/admin/ads',
    UPDATE: (id: string) => `/admin/ads/${id}`,
    DELETE: (id: string) => `/admin/ads/${id}`,
  },
} as const;

// Application Routes
export const ROUTES = {
  // Public routes
  PUBLIC: {
    LANDING: '/',
    SIGNIN: '/auth/signin',
    SIGNUP: '/auth/signup',
    FORGET_PASSWORD: '/auth/forget-pass',
    RESET_PASSWORD: '/auth/reset-pass',
    ROOM_DETAILS: '/auth/roomdetails',
    CHANGE_PASSWORD: '/auth/change-pass',
  },
  
  // Admin routes
  ADMIN: {
    DASHBOARD: '/dashboard',
    HOME: '/dashboard',
    USERS: '/dashboard/user',
    ROOMS: '/dashboard/rooms',
    ADD_ROOM: '/dashboard/rooms/add-room',
    ADS: '/dashboard/ads',
    ADD_ADS: '/dashboard/ads/add-ads',
    BOOKINGS: '/dashboard/book',
    FACILITIES: '/dashboard/facilities',
    CONTACT: '/dashboard/contact',
    PAYMENT: '/dashboard/payment',
    STATUS: '/dashboard/status',
  },
  
  // User routes
  USER: {
    DASHBOARD: '/',
    AVAILABLE_ROOMS: '/user/available-rooms',
    ROOM_DETAILS: '/user/room-details/:roomId/',
    CREATE_BOOKING: '/user/create-booking/:roomId/',
    PAY_BOOKING: '/user/pay-booking/:bookingId/',
    BOOKING_DETAILS: '/user/booking-details/:bookingId/',
    FAVORITES: '/user/fav',
  },
} as const;

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

// Room Status
export const ROOM_STATUS = {
  AVAILABLE: 'available',
  BOOKED: 'booked',
  MAINTENANCE: 'maintenance',
} as const;

// Booking Status
export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
} as const;

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  FAILED: 'failed',
} as const;

// Toast Types
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

// Form Validation
export const VALIDATION = {
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 50,
  },
  EMAIL: {
    MAX_LENGTH: 255,
  },
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 50,
  },
  SEED: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 10,
  },
} as const;

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  MAX_FILES: 5,
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  USER_TOKEN: 'userToken',
  USER_NAME: 'userName',
  USER_ROLE: 'role',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  TIMEOUT_ERROR: 'Request timeout. Please try again.',
  UNAUTHORIZED: 'You are not authorized to access this resource.',
  FORBIDDEN: 'Access denied.',
  NOT_FOUND: 'Resource not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  UNKNOWN_ERROR: 'An unexpected error occurred.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN: 'Login successful!',
  REGISTER: 'Registration successful!',
  LOGOUT: 'Logout successful!',
  PASSWORD_RESET: 'Password reset successfully!',
  PASSWORD_CHANGE: 'Password changed successfully!',
  PROFILE_UPDATE: 'Profile updated successfully!',
  ROOM_CREATED: 'Room created successfully!',
  ROOM_UPDATED: 'Room updated successfully!',
  ROOM_DELETED: 'Room deleted successfully!',
  BOOKING_CREATED: 'Booking created successfully!',
  BOOKING_UPDATED: 'Booking updated successfully!',
  BOOKING_CANCELLED: 'Booking cancelled successfully!',
  REVIEW_CREATED: 'Review submitted successfully!',
  FACILITY_CREATED: 'Facility created successfully!',
  FACILITY_UPDATED: 'Facility updated successfully!',
  FACILITY_DELETED: 'Facility deleted successfully!',
  AD_CREATED: 'Advertisement created successfully!',
  AD_UPDATED: 'Advertisement updated successfully!',
  AD_DELETED: 'Advertisement deleted successfully!',
} as const;

// Theme Configuration
export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

// Language Configuration
export const LANGUAGES = {
  EN: 'en',
  AR: 'ar',
} as const;

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  API: 'yyyy-MM-dd',
  DATETIME: 'MMM dd, yyyy HH:mm',
  TIME: 'HH:mm',
} as const;

// Currency
export const CURRENCY = {
  SYMBOL: '$',
  CODE: 'USD',
  LOCALE: 'en-US',
} as const;
