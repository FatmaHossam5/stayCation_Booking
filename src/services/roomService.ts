import { apiClient } from '../lib/api';
import { API_ENDPOINTS } from '../constants';
import { Room, PaginatedResponse, RoomFilters } from '../types';

export const roomService = {
  // Get all rooms (admin)
  getAllRooms: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<PaginatedResponse<Room>> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.status) queryParams.append('status', params.status);

    const url = `${API_ENDPOINTS.ROOMS.BASE}?${queryParams.toString()}`;
    const response = await apiClient.get<PaginatedResponse<Room>>(url);
    return response.data;
  },

  // Get available rooms (public)
  getAvailableRooms: async (filters?: RoomFilters): Promise<PaginatedResponse<Room>> => {
    const queryParams = new URLSearchParams();
    
    if (filters?.minPrice) queryParams.append('minPrice', filters.minPrice.toString());
    if (filters?.maxPrice) queryParams.append('maxPrice', filters.maxPrice.toString());
    if (filters?.capacity) queryParams.append('capacity', filters.capacity.toString());
    if (filters?.facilities?.length) {
      filters.facilities.forEach(facility => {
        queryParams.append('facilities', facility);
      });
    }
    if (filters?.status) queryParams.append('status', filters.status);
    if (filters?.dateRange?.startDate) queryParams.append('startDate', filters.dateRange.startDate);
    if (filters?.dateRange?.endDate) queryParams.append('endDate', filters.dateRange.endDate);

    const url = `${API_ENDPOINTS.ROOMS.AVAILABLE}?${queryParams.toString()}`;
    const response = await apiClient.get<PaginatedResponse<Room>>(url);
    return response.data;
  },

  // Get room by ID
  getRoomById: async (roomId: string): Promise<Room> => {
    const response = await apiClient.get<Room>(API_ENDPOINTS.ROOMS.DETAILS(roomId));
    return response.data;
  },

  // Create new room (admin)
  createRoom: async (roomData: FormData): Promise<Room> => {
    const response = await apiClient.upload<Room>(API_ENDPOINTS.ROOMS.CREATE, roomData);
    return response.data;
  },

  // Update room (admin)
  updateRoom: async (roomId: string, roomData: FormData): Promise<Room> => {
    const response = await apiClient.upload<Room>(API_ENDPOINTS.ROOMS.UPDATE(roomId), roomData);
    return response.data;
  },

  // Delete room (admin)
  deleteRoom: async (roomId: string): Promise<{ message: string }> => {
    const response = await apiClient.delete<{ message: string }>(API_ENDPOINTS.ROOMS.DELETE(roomId));
    return response.data;
  },
};
