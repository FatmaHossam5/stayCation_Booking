// User Types
export interface User {
  _id: string;
  email: string;
  userName: string;
  role: 'admin' | 'user';
  verified: boolean;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthUser {
  user: User;
  token: string;
}

// Room Types
export interface Room {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  facilities: string[];
  images: string[];
  status: 'available' | 'booked' | 'maintenance';
  createdAt: string;
  updatedAt: string;
}

// Booking Types
export interface Booking {
  _id: string;
  roomId: string;
  userId: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'failed';
  createdAt: string;
  updatedAt: string;
}

// Review Types
export interface Review {
  _id: string;
  roomId: string;
  userId: string;
  rating: number;
  review: string;
  createdAt: string;
  updatedAt: string;
}

// Facility Types
export interface Facility {
  _id: string;
  name: string;
  icon: string;
  description?: string;
}

// Advertisement Types
export interface Advertisement {
  _id: string;
  title: string;
  description: string;
  image: string;
  link?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  profileImage?: File;
}

export interface ResetPasswordForm {
  email: string;
  password: string;
  confirmPassword: string;
  seed: string;
}

export interface ChangePasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Context Types
export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginForm) => Promise<void>;
  register: (userData: RegisterForm) => Promise<void>;
  logout: () => void;
  resetPassword: (data: ResetPasswordForm) => Promise<void>;
  changePassword: (data: ChangePasswordForm) => Promise<void>;
}

// Route Types
export interface RouteConfig {
  path: string;
  element: React.ComponentType;
  allowedRoles?: string[];
  children?: RouteConfig[];
  isPublic?: boolean;
}

// Error Types
export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

// UI Types
export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

// Filter Types
export interface RoomFilters {
  minPrice?: number;
  maxPrice?: number;
  capacity?: number;
  facilities?: string[];
  status?: string;
  dateRange?: {
    startDate: string;
    endDate: string;
  };
}

export interface BookingFilters {
  status?: string;
  paymentStatus?: string;
  dateRange?: {
    startDate: string;
    endDate: string;
  };
}
