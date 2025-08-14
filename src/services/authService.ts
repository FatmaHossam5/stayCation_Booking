import { apiClient } from '../lib/api';
import { API_ENDPOINTS } from '../constants';
import { 
  LoginForm, 
  RegisterForm, 
  ResetPasswordForm, 
  ChangePasswordForm,
  AuthUser,
  User 
} from '../types';

export const authService = {
  // Login user
  login: async (credentials: LoginForm): Promise<AuthUser> => {
    const response = await apiClient.post<AuthUser>(API_ENDPOINTS.AUTH.LOGIN, credentials);
    return response.data;
  },

  // Register new user
  register: async (userData: RegisterForm): Promise<AuthUser> => {
    const formData = new FormData();
    
    // Add text fields
    formData.append('userName', userData.userName);
    formData.append('email', userData.email);
    formData.append('password', userData.password);
    
    // Add profile image if provided
    if (userData.profileImage) {
      formData.append('profileImage', userData.profileImage);
    }

    const response = await apiClient.upload<AuthUser>(API_ENDPOINTS.AUTH.REGISTER, formData);
    return response.data;
  },

  // Reset password
  resetPassword: async (data: ResetPasswordForm): Promise<{ message: string }> => {
    const response = await apiClient.post<{ message: string }>(API_ENDPOINTS.AUTH.RESET_PASSWORD, data);
    return response.data;
  },

  // Change password
  changePassword: async (data: ChangePasswordForm): Promise<{ message: string }> => {
    const response = await apiClient.put<{ message: string }>(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, data);
    return response.data;
  },

  // Forget password
  forgetPassword: async (email: string): Promise<{ message: string }> => {
    const response = await apiClient.post<{ message: string }>(API_ENDPOINTS.AUTH.FORGET_PASSWORD, { email });
    return response.data;
  },

  // Get user profile
  getProfile: async (): Promise<User> => {
    const response = await apiClient.get<User>(API_ENDPOINTS.USERS.PROFILE);
    return response.data;
  },

  // Update user profile
  updateProfile: async (userData: Partial<User> & { profileImage?: File }): Promise<User> => {
    const formData = new FormData();
    
    // Add text fields
    Object.entries(userData).forEach(([key, value]) => {
      if (key !== 'profileImage' && value !== undefined) {
        formData.append(key, value.toString());
      }
    });
    
    // Add profile image if provided
    if (userData.profileImage) {
      formData.append('profileImage', userData.profileImage);
    }

    const response = await apiClient.upload<User>(API_ENDPOINTS.USERS.UPDATE_PROFILE, formData);
    return response.data;
  },
};
