import { useContext } from 'react';
import { ToastContext } from '../Context/ToastContext';
import { ToastMessage } from '../types';

export const useToast = () => {
  const { showToast, hideToast, clearToasts } = useContext(ToastContext);

  const showSuccessToast = (message: string, duration?: number) => {
    showToast(message, 'success', duration);
  };

  const showErrorToast = (message: string, duration?: number) => {
    showToast(message, 'error', duration);
  };

  const showWarningToast = (message: string, duration?: number) => {
    showToast(message, 'warning', duration);
  };

  const showInfoToast = (message: string, duration?: number) => {
    showToast(message, 'info', duration);
  };

  return {
    showToast,
    showSuccessToast,
    showErrorToast,
    showWarningToast,
    showInfoToast,
    hideToast,
    clearToasts,
  };
};
