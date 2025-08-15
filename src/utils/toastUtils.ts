import { useToast } from '../hooks/useToast';

// Toast message templates for common actions
export const TOAST_MESSAGES = {
  // Authentication
  AUTH: {
    LOGIN_SUCCESS: 'Login successful! Welcome back.',
    LOGIN_ERROR: 'Login failed. Please check your credentials.',
    LOGOUT_SUCCESS: 'Logged out successfully.',
    REGISTER_SUCCESS: 'Account created successfully! Please check your email.',
    REGISTER_ERROR: 'Registration failed. Please try again.',
    PASSWORD_CHANGE_SUCCESS: 'Password changed successfully.',
    PASSWORD_CHANGE_ERROR: 'Failed to change password. Please try again.',
    PASSWORD_RESET_SENT: 'Password reset email sent successfully.',
    PASSWORD_RESET_ERROR: 'Failed to send password reset email.',
  },

  // Room Management
  ROOMS: {
    CREATE_SUCCESS: 'Room created successfully!',
    CREATE_ERROR: 'Failed to create room. Please try again.',
    UPDATE_SUCCESS: 'Room updated successfully!',
    UPDATE_ERROR: 'Failed to update room. Please try again.',
    DELETE_SUCCESS: 'Room deleted successfully!',
    DELETE_ERROR: 'Failed to delete room. Please try again.',
    FETCH_ERROR: 'Failed to load rooms. Please try again.',
    NOT_FOUND: 'Room not found.',
  },

  // Booking Management
  BOOKINGS: {
    CREATE_SUCCESS: 'Booking created successfully!',
    CREATE_ERROR: 'Failed to create booking. Please try again.',
    UPDATE_SUCCESS: 'Booking updated successfully!',
    UPDATE_ERROR: 'Failed to update booking. Please try again.',
    CANCEL_SUCCESS: 'Booking cancelled successfully!',
    CANCEL_ERROR: 'Failed to cancel booking. Please try again.',
    FETCH_ERROR: 'Failed to load bookings. Please try again.',
    PAYMENT_SUCCESS: 'Payment processed successfully!',
    PAYMENT_ERROR: 'Payment failed. Please try again.',
    ALREADY_BOOKED: 'This room is already booked for the selected dates.',
    INVALID_DATES: 'Please select valid check-in and check-out dates.',
  },

  // User Management
  USERS: {
    CREATE_SUCCESS: 'User created successfully!',
    CREATE_ERROR: 'Failed to create user. Please try again.',
    UPDATE_SUCCESS: 'User updated successfully!',
    UPDATE_ERROR: 'Failed to update user. Please try again.',
    DELETE_SUCCESS: 'User deleted successfully!',
    DELETE_ERROR: 'Failed to delete user. Please try again.',
    FETCH_ERROR: 'Failed to load users. Please try again.',
    PROFILE_UPDATE_SUCCESS: 'Profile updated successfully!',
    PROFILE_UPDATE_ERROR: 'Failed to update profile. Please try again.',
  },

  // Ads Management
  ADS: {
    CREATE_SUCCESS: 'Advertisement created successfully!',
    CREATE_ERROR: 'Failed to create advertisement. Please try again.',
    UPDATE_SUCCESS: 'Advertisement updated successfully!',
    UPDATE_ERROR: 'Failed to update advertisement. Please try again.',
    DELETE_SUCCESS: 'Advertisement deleted successfully!',
    DELETE_ERROR: 'Failed to delete advertisement. Please try again.',
    FETCH_ERROR: 'Failed to load advertisements. Please try again.',
  },

  // Facilities Management
  FACILITIES: {
    CREATE_SUCCESS: 'Facility added successfully!',
    CREATE_ERROR: 'Failed to add facility. Please try again.',
    UPDATE_SUCCESS: 'Facility updated successfully!',
    UPDATE_ERROR: 'Failed to update facility. Please try again.',
    DELETE_SUCCESS: 'Facility removed successfully!',
    DELETE_ERROR: 'Failed to remove facility. Please try again.',
    FETCH_ERROR: 'Failed to load facilities. Please try again.',
  },

  // General
  GENERAL: {
    NETWORK_ERROR: 'Network error. Please check your connection.',
    SERVER_ERROR: 'Server error. Please try again later.',
    VALIDATION_ERROR: 'Please check your input and try again.',
    UNAUTHORIZED: 'You are not authorized to perform this action.',
    FORBIDDEN: 'Access denied.',
    NOT_FOUND: 'Resource not found.',
    SUCCESS: 'Operation completed successfully!',
    ERROR: 'An error occurred. Please try again.',
    WARNING: 'Please review your input.',
    INFO: 'Please note this information.',
  },

  // Favorites
  FAVORITES: {
    ADD_SUCCESS: 'Added to favorites!',
    ADD_ERROR: 'Failed to add to favorites.',
    REMOVE_SUCCESS: 'Removed from favorites!',
    REMOVE_ERROR: 'Failed to remove from favorites.',
    FETCH_ERROR: 'Failed to load favorites.',
  },

  // Reviews
  REVIEWS: {
    CREATE_SUCCESS: 'Review submitted successfully!',
    CREATE_ERROR: 'Failed to submit review. Please try again.',
    UPDATE_SUCCESS: 'Review updated successfully!',
    UPDATE_ERROR: 'Failed to update review. Please try again.',
    DELETE_SUCCESS: 'Review deleted successfully!',
    DELETE_ERROR: 'Failed to delete review. Please try again.',
    FETCH_ERROR: 'Failed to load reviews.',
  },
};

// Custom hook for common toast operations
export const useToastMessages = () => {
  const toast = useToast();

  return {
    // Authentication toasts
    showLoginSuccess: () => toast.showSuccess(TOAST_MESSAGES.AUTH.LOGIN_SUCCESS),
    showLoginError: (message?: string) => toast.showError(message || TOAST_MESSAGES.AUTH.LOGIN_ERROR),
    showLogoutSuccess: () => toast.showSuccess(TOAST_MESSAGES.AUTH.LOGOUT_SUCCESS),
    showRegisterSuccess: () => toast.showSuccess(TOAST_MESSAGES.AUTH.REGISTER_SUCCESS),
    showRegisterError: (message?: string) => toast.showError(message || TOAST_MESSAGES.AUTH.REGISTER_ERROR),
    showPasswordChangeSuccess: () => toast.showSuccess(TOAST_MESSAGES.AUTH.PASSWORD_CHANGE_SUCCESS),
    showPasswordChangeError: () => toast.showError(TOAST_MESSAGES.AUTH.PASSWORD_CHANGE_ERROR),
    showPasswordResetSent: () => toast.showSuccess(TOAST_MESSAGES.AUTH.PASSWORD_RESET_SENT),
    showPasswordResetError: () => toast.showError(TOAST_MESSAGES.AUTH.PASSWORD_RESET_ERROR),

    // Room toasts
    showRoomCreateSuccess: () => toast.showSuccess(TOAST_MESSAGES.ROOMS.CREATE_SUCCESS),
    showRoomCreateError: (message?: string) => toast.showError(message || TOAST_MESSAGES.ROOMS.CREATE_ERROR),
    showRoomUpdateSuccess: () => toast.showSuccess(TOAST_MESSAGES.ROOMS.UPDATE_SUCCESS),
    showRoomUpdateError: (message?: string) => toast.showError(message || TOAST_MESSAGES.ROOMS.UPDATE_ERROR),
    showRoomDeleteSuccess: () => toast.showSuccess(TOAST_MESSAGES.ROOMS.DELETE_SUCCESS),
    showRoomDeleteError: () => toast.showError(TOAST_MESSAGES.ROOMS.DELETE_ERROR),
    showRoomFetchError: () => toast.showError(TOAST_MESSAGES.ROOMS.FETCH_ERROR),
    showRoomNotFound: () => toast.showWarning(TOAST_MESSAGES.ROOMS.NOT_FOUND),

    // Booking toasts
    showBookingCreateSuccess: () => toast.showSuccess(TOAST_MESSAGES.BOOKINGS.CREATE_SUCCESS),
    showBookingCreateError: (message?: string) => toast.showError(message || TOAST_MESSAGES.BOOKINGS.CREATE_ERROR),
    showBookingUpdateSuccess: () => toast.showSuccess(TOAST_MESSAGES.BOOKINGS.UPDATE_SUCCESS),
    showBookingUpdateError: (message?: string) => toast.showError(message || TOAST_MESSAGES.BOOKINGS.UPDATE_ERROR),
    showBookingCancelSuccess: () => toast.showSuccess(TOAST_MESSAGES.BOOKINGS.CANCEL_SUCCESS),
    showBookingCancelError: () => toast.showError(TOAST_MESSAGES.BOOKINGS.CANCEL_ERROR),
    showBookingFetchError: () => toast.showError(TOAST_MESSAGES.BOOKINGS.FETCH_ERROR),
    showPaymentSuccess: () => toast.showSuccess(TOAST_MESSAGES.BOOKINGS.PAYMENT_SUCCESS),
    showPaymentError: (message?: string) => toast.showError(message || TOAST_MESSAGES.BOOKINGS.PAYMENT_ERROR),
    showAlreadyBooked: () => toast.showWarning(TOAST_MESSAGES.BOOKINGS.ALREADY_BOOKED),
    showInvalidDates: () => toast.showWarning(TOAST_MESSAGES.BOOKINGS.INVALID_DATES),

    // User toasts
    showUserCreateSuccess: () => toast.showSuccess(TOAST_MESSAGES.USERS.CREATE_SUCCESS),
    showUserCreateError: (message?: string) => toast.showError(message || TOAST_MESSAGES.USERS.CREATE_ERROR),
    showUserUpdateSuccess: () => toast.showSuccess(TOAST_MESSAGES.USERS.UPDATE_SUCCESS),
    showUserUpdateError: (message?: string) => toast.showError(message || TOAST_MESSAGES.USERS.UPDATE_ERROR),
    showUserDeleteSuccess: () => toast.showSuccess(TOAST_MESSAGES.USERS.DELETE_SUCCESS),
    showUserDeleteError: () => toast.showError(TOAST_MESSAGES.USERS.DELETE_ERROR),
    showUserFetchError: () => toast.showError(TOAST_MESSAGES.USERS.FETCH_ERROR),
    showProfileUpdateSuccess: () => toast.showSuccess(TOAST_MESSAGES.USERS.PROFILE_UPDATE_SUCCESS),
    showProfileUpdateError: () => toast.showError(TOAST_MESSAGES.USERS.PROFILE_UPDATE_ERROR),

    // Ad toasts
    showAdCreateSuccess: () => toast.showSuccess(TOAST_MESSAGES.ADS.CREATE_SUCCESS),
    showAdCreateError: (message?: string) => toast.showError(message || TOAST_MESSAGES.ADS.CREATE_ERROR),
    showAdUpdateSuccess: () => toast.showSuccess(TOAST_MESSAGES.ADS.UPDATE_SUCCESS),
    showAdUpdateError: (message?: string) => toast.showError(message || TOAST_MESSAGES.ADS.UPDATE_ERROR),
    showAdDeleteSuccess: () => toast.showSuccess(TOAST_MESSAGES.ADS.DELETE_SUCCESS),
    showAdDeleteError: () => toast.showError(TOAST_MESSAGES.ADS.DELETE_ERROR),
    showAdFetchError: () => toast.showError(TOAST_MESSAGES.ADS.FETCH_ERROR),

    // Facility toasts
    showFacilityCreateSuccess: () => toast.showSuccess(TOAST_MESSAGES.FACILITIES.CREATE_SUCCESS),
    showFacilityCreateError: (message?: string) => toast.showError(message || TOAST_MESSAGES.FACILITIES.CREATE_ERROR),
    showFacilityUpdateSuccess: () => toast.showSuccess(TOAST_MESSAGES.FACILITIES.UPDATE_SUCCESS),
    showFacilityUpdateError: (message?: string) => toast.showError(message || TOAST_MESSAGES.FACILITIES.UPDATE_ERROR),
    showFacilityDeleteSuccess: () => toast.showSuccess(TOAST_MESSAGES.FACILITIES.DELETE_SUCCESS),
    showFacilityDeleteError: () => toast.showError(TOAST_MESSAGES.FACILITIES.DELETE_ERROR),
    showFacilityFetchError: () => toast.showError(TOAST_MESSAGES.FACILITIES.FETCH_ERROR),

    // General toasts
    showNetworkError: () => toast.showError(TOAST_MESSAGES.GENERAL.NETWORK_ERROR),
    showServerError: () => toast.showError(TOAST_MESSAGES.GENERAL.SERVER_ERROR),
    showValidationError: () => toast.showWarning(TOAST_MESSAGES.GENERAL.VALIDATION_ERROR),
    showUnauthorized: () => toast.showError(TOAST_MESSAGES.GENERAL.UNAUTHORIZED),
    showForbidden: () => toast.showError(TOAST_MESSAGES.GENERAL.FORBIDDEN),
    showNotFound: () => toast.showWarning(TOAST_MESSAGES.GENERAL.NOT_FOUND),
    showSuccess: (message?: string) => toast.showSuccess(message || TOAST_MESSAGES.GENERAL.SUCCESS),
    showError: (message?: string) => toast.showError(message || TOAST_MESSAGES.GENERAL.ERROR),
    showWarning: (message?: string) => toast.showWarning(message || TOAST_MESSAGES.GENERAL.WARNING),
    showInfo: (message?: string) => toast.showInfo(message || TOAST_MESSAGES.GENERAL.INFO),

    // Favorite toasts
    showFavoriteAddSuccess: () => toast.showSuccess(TOAST_MESSAGES.FAVORITES.ADD_SUCCESS),
    showFavoriteAddError: () => toast.showError(TOAST_MESSAGES.FAVORITES.ADD_ERROR),
    showFavoriteRemoveSuccess: () => toast.showSuccess(TOAST_MESSAGES.FAVORITES.REMOVE_SUCCESS),
    showFavoriteRemoveError: () => toast.showError(TOAST_MESSAGES.FAVORITES.REMOVE_ERROR),
    showFavoriteFetchError: () => toast.showError(TOAST_MESSAGES.FAVORITES.FETCH_ERROR),

    // Review toasts
    showReviewCreateSuccess: () => toast.showSuccess(TOAST_MESSAGES.REVIEWS.CREATE_SUCCESS),
    showReviewCreateError: (message?: string) => toast.showError(message || TOAST_MESSAGES.REVIEWS.CREATE_ERROR),
    showReviewUpdateSuccess: () => toast.showSuccess(TOAST_MESSAGES.REVIEWS.UPDATE_SUCCESS),
    showReviewUpdateError: (message?: string) => toast.showError(message || TOAST_MESSAGES.REVIEWS.UPDATE_ERROR),
    showReviewDeleteSuccess: () => toast.showSuccess(TOAST_MESSAGES.REVIEWS.DELETE_SUCCESS),
    showReviewDeleteError: () => toast.showError(TOAST_MESSAGES.REVIEWS.DELETE_ERROR),
    showReviewFetchError: () => toast.showError(TOAST_MESSAGES.REVIEWS.FETCH_ERROR),

    // Direct toast methods
    ...toast,
  };
};

// Helper function to handle API errors
export const handleApiError = (error: any, toastMessages: ReturnType<typeof useToastMessages>) => {
  if (error?.response?.status === 401) {
    toastMessages.showUnauthorized();
  } else if (error?.response?.status === 403) {
    toastMessages.showForbidden();
  } else if (error?.response?.status === 404) {
    toastMessages.showNotFound();
  } else if (error?.response?.status >= 500) {
    toastMessages.showServerError();
  } else if (!error?.response) {
    toastMessages.showNetworkError();
  } else {
    const errorMessage = error?.response?.data?.message || 'An error occurred. Please try again.';
    toastMessages.showError(errorMessage);
  }
};
