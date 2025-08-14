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
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.status) queryParams.append('status', params.status);
    if (params?.paymentStatus) queryParams.append('paymentStatus', params.paymentStatus);

    const url = `${API_ENDPOINTS.BOOKINGS.BASE}?${queryParams.toString()}`;
    const response = await apiClient.get<PaginatedResponse<Booking>>(url);
    return response.data;
  },

  // Get user bookings
  getUserBookings: async (filters?: BookingFilters): Promise<PaginatedResponse<Booking>> => {
    const queryParams = new URLSearchParams();
    
    if (filters?.status) queryParams.append('status', filters.status);
    if (filters?.paymentStatus) queryParams.append('paymentStatus', filters.paymentStatus);
    if (filters?.dateRange?.startDate) queryParams.append('startDate', filters.dateRange.startDate);
    if (filters?.dateRange?.endDate) queryParams.append('endDate', filters.dateRange.endDate);

    const url = `${API_ENDPOINTS.BOOKINGS.USER_BOOKINGS}?${queryParams.toString()}`;
    const response = await apiClient.get<PaginatedResponse<Booking>>(url);
    return response.data;
  },

  // Get booking by ID
  getBookingById: async (bookingId: string): Promise<Booking> => {
    const response = await apiClient.get<Booking>(`${API_ENDPOINTS.BOOKINGS.BASE}/${bookingId}`);
    return response.data;
  },

  // Create new booking
  createBooking: async (bookingData: {
    roomId: string;
    startDate: string;
    endDate: string;
    totalPrice: number;
  }): Promise<Booking> => {
    const response = await apiClient.post<Booking>(API_ENDPOINTS.BOOKINGS.CREATE, bookingData);
    return response.data;
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
