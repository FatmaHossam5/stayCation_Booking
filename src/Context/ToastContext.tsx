import React, { createContext, useContext, ReactNode } from "react";
import { toast, ToastOptions } from "react-toastify";

interface ToastContextType {
  showToast: (message: string, type: 'success' | 'error' | 'warning' | 'info', options?: ToastOptions) => void;
  showSuccess: (message: string, options?: ToastOptions) => void;
  showError: (message: string, options?: ToastOptions) => void;
  showWarning: (message: string, options?: ToastOptions) => void;
  showInfo: (message: string, options?: ToastOptions) => void;
  dismissToast: (toastId?: string | number) => void;
  dismissAll: () => void;
}

const defaultToastOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored"
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info', options?: ToastOptions) => {
    const toastOptions = { ...defaultToastOptions, ...options };
    return toast[type](message, toastOptions);
  };

  const showSuccess = (message: string, options?: ToastOptions) => {
    return showToast(message, 'success', options);
  };

  const showError = (message: string, options?: ToastOptions) => {
    return showToast(message, 'error', options);
  };

  const showWarning = (message: string, options?: ToastOptions) => {
    return showToast(message, 'warning', options);
  };

  const showInfo = (message: string, options?: ToastOptions) => {
    return showToast(message, 'info', options);
  };

  const dismissToast = (toastId?: string | number) => {
    toast.dismiss(toastId);
  };

  const dismissAll = () => {
    toast.dismiss();
  };

  const value: ToastContextType = {
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    dismissToast,
    dismissAll
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToastContext = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
};

export default ToastProvider;