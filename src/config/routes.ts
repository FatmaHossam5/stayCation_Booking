// Role-based routing configuration
export interface RouteConfig {
  path: string;
  element: React.ComponentType;
  allowedRoles?: string[];
  children?: RouteConfig[];
  isPublic?: boolean;
}

// Route definitions for different user roles
export const ROUTES = {
  // Public routes (no authentication required)
  PUBLIC: {
    LANDING: '/',
    SIGNIN: '/auth/signin',
    SIGNUP: '/auth/signup',
    FORGET_PASSWORD: '/auth/forget-pass',
    RESET_PASSWORD: '/auth/reset-pass',
    ROOM_DETAILS: '/auth/roomdetails',
    CHANGE_PASSWORD: '/auth/change-pass',
    AVAILABLE_ROOMS: '/available-rooms',
  },
  
  // Admin routes (admin role required)
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
  
  // User routes (user role required)
  USER: {
    DASHBOARD: '/',
    AVAILABLE_ROOMS: '/user/available-rooms',
    ROOM_DETAILS: '/user/room-details/:roomId/',
    CREATE_BOOKING: '/user/create-booking/:roomId/',
    PAY_BOOKING: '/user/pay-booking/:bookingId/',
    BOOKING_DETAILS: '/user/booking-details/:bookingId/',
    FAVORITES: '/user/fav',
  }
};

// Default routes for each role after login
export const DEFAULT_ROUTES = {
  admin: ROUTES.ADMIN.DASHBOARD,
  user: ROUTES.USER.DASHBOARD,
  guest: ROUTES.PUBLIC.LANDING,
};

// Helper function to get default route based on role
export const getDefaultRouteByRole = (role: string): string => {
  return DEFAULT_ROUTES[role as keyof typeof DEFAULT_ROUTES] || DEFAULT_ROUTES.guest;
};

// Helper function to check if user has access to a route
export const hasRouteAccess = (userRole: string, allowedRoles?: string[]): boolean => {
  if (!allowedRoles || allowedRoles.length === 0) {
    return true; // No role restriction
  }
  return allowedRoles.includes(userRole);
}; 