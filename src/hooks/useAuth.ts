import { useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { authService } from '../services/authService';
import { LoginForm, RegisterForm, ResetPasswordForm, ChangePasswordForm } from '../types';
import { STORAGE_KEYS, SUCCESS_MESSAGES, ROUTES } from '../constants';
import { useToast } from './useToast';

export const useAuth = () => {
  const { user, token, isAuthenticated, isLoading, login, register, logout, resetPassword, changePassword } = useContext(AuthContext);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleLogin = useCallback(async (credentials: LoginForm) => {
    try {
      await login(credentials);
      showToast(SUCCESS_MESSAGES.LOGIN, 'success');
      
      // Redirect based on user role
      const userRole = localStorage.getItem(STORAGE_KEYS.USER_ROLE);
      if (userRole === 'admin') {
        navigate(ROUTES.ADMIN.DASHBOARD);
      } else {
        navigate(ROUTES.USER.DASHBOARD);
      }
    } catch (error: any) {
      showToast(error.message || 'Login failed', 'error');
      throw error;
    }
  }, [login, navigate, showToast]);

  const handleRegister = useCallback(async (userData: RegisterForm) => {
    try {
      await register(userData);
      showToast(SUCCESS_MESSAGES.REGISTER, 'success');
      navigate(ROUTES.PUBLIC.SIGNIN);
    } catch (error: any) {
      showToast(error.message || 'Registration failed', 'error');
      throw error;
    }
  }, [register, navigate, showToast]);

  const handleLogout = useCallback(() => {
    logout();
    showToast(SUCCESS_MESSAGES.LOGOUT, 'success');
    navigate(ROUTES.PUBLIC.LANDING);
  }, [logout, navigate, showToast]);

  const handleResetPassword = useCallback(async (data: ResetPasswordForm) => {
    try {
      await resetPassword(data);
      showToast(SUCCESS_MESSAGES.PASSWORD_RESET, 'success');
      navigate(ROUTES.PUBLIC.SIGNIN);
    } catch (error: any) {
      showToast(error.message || 'Password reset failed', 'error');
      throw error;
    }
  }, [resetPassword, navigate, showToast]);

  const handleChangePassword = useCallback(async (data: ChangePasswordForm) => {
    try {
      await changePassword(data);
      showToast(SUCCESS_MESSAGES.PASSWORD_CHANGE, 'success');
    } catch (error: any) {
      showToast(error.message || 'Password change failed', 'error');
      throw error;
    }
  }, [changePassword, showToast]);

  const handleForgetPassword = useCallback(async (email: string) => {
    try {
      await authService.forgetPassword(email);
      showToast('Password reset email sent successfully', 'success');
    } catch (error: any) {
      showToast(error.message || 'Failed to send reset email', 'error');
      throw error;
    }
  }, [showToast]);

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    resetPassword: handleResetPassword,
    changePassword: handleChangePassword,
    forgetPassword: handleForgetPassword,
  };
};
