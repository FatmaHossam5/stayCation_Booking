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

// Test accounts configuration
const TEST_ACCOUNTS = {
  'user@example.com': {
    password: '123456',
    role: 'user' as const,
    userName: 'Test User',
    email: 'user@example.com',
    _id: 'test-user-id'
  },
  'admin@example.com': {
    password: '123456',
    role: 'admin' as const,
    userName: 'Test Admin',
    email: 'admin@example.com',
    _id: 'test-admin-id'
  }
};

// Mock JWT token generator for test accounts
const generateMockToken = (userData: any) => {
  const payload = {
    _id: userData._id,
    email: userData.email,
    role: userData.role,
    userName: userData.userName,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
  };
  
  // Simple base64 encoding for mock token
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payloadEncoded = btoa(JSON.stringify(payload));
  const signature = btoa('mock-signature');
  
  return `${header}.${payloadEncoded}.${signature}`;
};

export const authService = {
  // Login user
  login: async (credentials: LoginForm): Promise<AuthUser> => {
    // Check if credentials match test accounts
    const testAccount = TEST_ACCOUNTS[credentials.email as keyof typeof TEST_ACCOUNTS];
    
    if (testAccount && testAccount.password === credentials.password) {
      // Generate mock token for test account
      const mockToken = generateMockToken(testAccount);
      
      const mockResponse: AuthUser = {
        token: mockToken,
        user: {
          _id: testAccount._id,
          userName: testAccount.userName,
          email: testAccount.email,
          role: testAccount.role,
          verified: true,
          profileImage: undefined,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return mockResponse;
    }
    
    // If not a test account, proceed with real API call
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
  updateProfile: async (userData: Partial<User>): Promise<User> => {
    const response = await apiClient.put<User>(API_ENDPOINTS.USERS.UPDATE_PROFILE, userData);
    return response.data;
  },
};
