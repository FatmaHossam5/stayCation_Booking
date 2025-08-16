import { apiClient } from '../lib/api';
import { API_ENDPOINTS } from '../constants';
import { Booking, PaginatedResponse, BookingFilters } from '../types';

export const bookingService = {
  // Get all bookings (admin)
  getAllBookings: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    paymentStatus?: string;
  }): Promise<PaginatedResponse<Booking>> => {
    const token = localStorage.getItem('userToken');
    const response = await apiClient.get<PaginatedResponse<Booking>>(API_ENDPOINTS.BOOKINGS.BASE, {
      headers: { Authorization: `${token}` }
    });
    return response.data.data;
  },

  // Get user bookings
  getUserBookings: async (): Promise<any> => {
    try {
      const response = await apiClient.get<any>(API_ENDPOINTS.BOOKINGS.USER_BOOKINGS);
      // The API returns {myBooking: Array, totalCount: number} for user bookings
      return response.data;
    } catch (error) {
      console.error('Error fetching user bookings:', error);
      throw error;
    }
  },

  // Get booking by ID
  getBookingById: async (bookingId: string): Promise<Booking> => {
    const response = await apiClient.get<Booking>(`${API_ENDPOINTS.BOOKINGS.BASE}/${bookingId}`);
    return response.data;
  },

  // Get booking details (for user bookings)
  getBookingDetails: async (bookingId: string, role: string, token: string, baseUrl: string): Promise<any> => {
    try {
      // Use different endpoints based on user role
      const endpoint = role === 'admin' 
        ? `${API_ENDPOINTS.BOOKINGS.BASE}/${bookingId}`
        : API_ENDPOINTS.BOOKINGS.DETAILS(bookingId);
      
      console.log('Fetching booking details with endpoint:', endpoint);
      
      const response = await apiClient.get<any>(endpoint);
      return response.data;
    } catch (error) {
      console.error('Error fetching booking details:', error);
      throw error;
    }
  },

  // Create new booking
  createBooking: async (bookingData: {
    room: string;
    startDate: string;
    endDate: string;
    totalPrice: number;
  }): Promise<any> => {
    console.log('Creating booking with endpoint:', API_ENDPOINTS.BOOKINGS.CREATE);
    console.log('Booking data:', bookingData);
    const response = await apiClient.post<any>(API_ENDPOINTS.BOOKINGS.CREATE, bookingData);
    console.log(response);
    
    return response;
  },

  // Update booking (admin)
  updateBooking: async (bookingId: string, bookingData: Partial<Booking>): Promise<Booking> => {
    const response = await apiClient.put<Booking>(API_ENDPOINTS.BOOKINGS.UPDATE(bookingId), bookingData);
    return response.data;
  },

  // Cancel booking
  cancelBooking: async (bookingId: string): Promise<{ message: string }> => {
    const response = await apiClient.patch<{ message: string }>(
      `${API_ENDPOINTS.BOOKINGS.BASE}/${bookingId}/cancel`
    );
    return response.data;
  },

  // Delete booking (admin)
  deleteBooking: async (bookingId: string): Promise<{ message: string }> => {
    const response = await apiClient.delete<{ message: string }>(API_ENDPOINTS.BOOKINGS.DELETE(bookingId));
    return response.data;
  },
};
