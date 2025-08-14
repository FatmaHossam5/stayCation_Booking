import React from 'react';
import { Button, ButtonProps, styled } from '@mui/material';
import { CircularProgress } from '@mui/material';

interface EnhancedButtonProps extends ButtonProps {
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'destructive';
  size?: 'small' | 'medium' | 'large';
}

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => !['variant', 'loading'].includes(prop as string),
})<EnhancedButtonProps>(({ theme, variant = 'primary', size = 'medium' }) => ({
  borderRadius: theme.spacing(2),
  textTransform: 'none',
  fontWeight: 600,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  
  // Size variants
  ...(size === 'small' && {
    padding: theme.spacing(0.75, 2),
    fontSize: '0.875rem',
    minHeight: 36,
  }),
  
  ...(size === 'medium' && {
    padding: theme.spacing(1, 3),
    fontSize: '1rem',
    minHeight: 44,
  }),
  
  ...(size === 'large' && {
    padding: theme.spacing(1.5, 4),
    fontSize: '1.125rem',
    minHeight: 52,
  }),
  
  // Primary variant
  ...(variant === 'primary' && {
    background: 'linear-gradient(135deg, #3252DF 0%, #1a2f9e 100%)',
    color: 'white',
    boxShadow: '0 4px 12px rgba(50, 82, 223, 0.3)',
    '&:hover': {
      background: 'linear-gradient(135deg, #1a2f9e 0%, #0f1f6b 100%)',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(50, 82, 223, 0.4)',
    },
    '&:active': {
      transform: 'translateY(0)',
      boxShadow: '0 2px 8px rgba(50, 82, 223, 0.3)',
    },
    '&:disabled': {
      background: theme.palette.grey[300],
      color: theme.palette.grey[500],
      transform: 'none',
      boxShadow: 'none',
    },
  }),
  
  // Secondary variant
  ...(variant === 'secondary' && {
    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.grey[300]}`,
    '&:hover': {
      background: 'linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%)',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    '&:disabled': {
      background: theme.palette.grey[100],
      color: theme.palette.grey[400],
      transform: 'none',
      boxShadow: 'none',
    },
  }),
  
  // Outline variant
  ...(variant === 'outline' && {
    background: 'transparent',
    color: '#3252DF',
    border: `2px solid #3252DF`,
    '&:hover': {
      background: '#3252DF',
      color: 'white',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(50, 82, 223, 0.2)',
    },
    '&:disabled': {
      borderColor: theme.palette.grey[300],
      color: theme.palette.grey[400],
      transform: 'none',
      boxShadow: 'none',
    },
  }),
  
  // Destructive variant
  ...(variant === 'destructive' && {
    background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
    color: 'white',
    boxShadow: '0 4px 12px rgba(220, 53, 69, 0.3)',
    '&:hover': {
      background: 'linear-gradient(135deg, #c82333 0%, #a71e2a 100%)',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(220, 53, 69, 0.4)',
    },
    '&:disabled': {
      background: theme.palette.grey[300],
      color: theme.palette.grey[500],
      transform: 'none',
      boxShadow: 'none',
    },
  }),
  
  // Focus styles for accessibility
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: '2px',
  },
  
  // Touch target optimization for mobile
  [theme.breakpoints.down('sm')]: {
    minHeight: 44,
    padding: theme.spacing(1, 2),
  },
}));

const LoadingSpinner = styled(CircularProgress)(({ theme }) => ({
  color: 'inherit',
  marginRight: theme.spacing(1),
}));

const EnhancedButton: React.FC<EnhancedButtonProps> = ({
  children,
  loading = false,
  disabled,
  startIcon,
  endIcon,
  ...props
}) => {
  return (
    <StyledButton
      disabled={disabled || loading}
      startIcon={loading ? <LoadingSpinner size={20} /> : startIcon}
      endIcon={loading ? undefined : endIcon}
      {...props}
    >
      {loading ? 'Processing...' : children}
    </StyledButton>
  );
};

export default EnhancedButton;
