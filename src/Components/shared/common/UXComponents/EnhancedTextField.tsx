import React from 'react';
import { TextField, TextFieldProps, styled, InputAdornment } from '@mui/material';

interface EnhancedTextFieldProps extends Omit<TextFieldProps, 'variant'> {
  variant?: 'filled' | 'outlined';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  showPasswordToggle?: boolean;
  onPasswordToggle?: () => void;
}

const StyledTextField = styled(TextField, {
  shouldForwardProp: (prop) => !['variant'].includes(prop as string),
})<EnhancedTextFieldProps>(({ theme, variant = 'filled' }) => ({
  '& .MuiFilledInput-root': {
    borderRadius: theme.spacing(1.5),
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    transition: 'all 0.3s ease',
    minHeight: 56,
    
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    
    '&.Mui-focused': {
      backgroundColor: '#ffffff',
      boxShadow: '0 0 0 3px rgba(50, 82, 223, 0.1)',
      transform: 'translateY(-1px)',
    },
    
    '&.Mui-error': {
      backgroundColor: 'rgba(244, 67, 54, 0.05)',
      '&:hover': {
        backgroundColor: 'rgba(244, 67, 54, 0.08)',
      },
    },
  },
  
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(1.5),
    transition: 'all 0.3s ease',
    minHeight: 56,
    
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    
    '&.Mui-focused': {
      transform: 'translateY(-1px)',
      boxShadow: '0 0 0 3px rgba(50, 82, 223, 0.1)',
    },
  },
  
  '& .MuiInputLabel-root': {
    fontWeight: 500,
    color: theme.palette.text.secondary,
    fontSize: '0.875rem',
    
    '&.Mui-focused': {
      color: theme.palette.primary.main,
      fontWeight: 600,
    },
    
    '&.Mui-error': {
      color: theme.palette.error.main,
    },
  },
  
  '& .MuiInputBase-input': {
    fontSize: '1rem',
    padding: theme.spacing(1.5, 2),
    
    '&::placeholder': {
      color: theme.palette.text.disabled,
      opacity: 0.7,
    },
  },
  
  '& .MuiFormHelperText-root': {
    marginLeft: 0,
    marginTop: theme.spacing(0.5),
    fontSize: '0.75rem',
    fontWeight: 500,
    
    '&.Mui-error': {
      color: theme.palette.error.main,
    },
  },
  
  // Focus styles for accessibility
  '& .MuiFocused': {
    '& .MuiFilledInput-root': {
      outline: `2px solid ${theme.palette.primary.main}`,
      outlineOffset: '2px',
    },
  },
  
  // Mobile optimizations
  [theme.breakpoints.down('sm')]: {
    '& .MuiFilledInput-root, & .MuiOutlinedInput-root': {
      minHeight: 48,
    },
    
    '& .MuiInputBase-input': {
      fontSize: '1rem', // Prevent zoom on iOS
      padding: theme.spacing(1.25, 1.5),
    },
  },
}));

const IconWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.action.active,
  transition: 'color 0.2s ease',
  
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

const EnhancedTextField: React.FC<EnhancedTextFieldProps> = ({
  startIcon,
  endIcon,
  showPasswordToggle,
  onPasswordToggle,
  variant = 'filled',
  ...props
}) => {
  const inputProps = {
    startAdornment: startIcon ? (
      <InputAdornment position="start">
        <IconWrapper>{startIcon}</IconWrapper>
      </InputAdornment>
    ) : undefined,
    endAdornment: endIcon ? (
      <InputAdornment position="end">
        <IconWrapper>{endIcon}</IconWrapper>
      </InputAdornment>
    ) : undefined,
  };

  return (
    <StyledTextField
      variant={variant}
      InputProps={inputProps}
      {...props}
    />
  );
};

export default EnhancedTextField;
