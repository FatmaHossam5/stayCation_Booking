import { useToastContext } from '../Context/ToastContext';

export const useToast = () => {
  const toastContext = useToastContext();

  return {
    ...toastContext,
    // Aliases for backward compatibility
    showSuccessToast: toastContext.showSuccess,
    showErrorToast: toastContext.showError,
    showWarningToast: toastContext.showWarning,
    showInfoToast: toastContext.showInfo,
    hideToast: toastContext.dismissToast,
    clearToasts: toastContext.dismissAll,
  };
};
