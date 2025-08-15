import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Alert,
  Box,
  FormControl,
  IconButton,
  Link as MuiLink,
  Snackbar,
  Typography
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { Controller } from 'react-hook-form';
import { EnhancedButton, EnhancedTextField } from '../UXComponents';

// Field Label Component
export const FieldLabel: React.FC<{ children: React.ReactNode; sx?: any }> = ({ children, sx }) => (
  <Typography
    variant="body2"
    sx={{
      color: '#333333',
      fontFamily: 'Poppins, sans-serif',
      fontSize: '13px',
      fontWeight: 500,
      mb: 0.25,
      mt: 1,
      ...sx
    }}
  >
    {children}
  </Typography>
);

// Field Helper Text Component
export const FieldHelper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Typography
    variant="caption"
    sx={{
      color: '#666666',
      fontFamily: 'Poppins, sans-serif',
      fontSize: '11px',
      mb: 0.25,
      display: 'block'
    }}
  >
    {children}
  </Typography>
);

// Field Container Component
export const FieldContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
    {children}
  </Box>
);

// Form Container Component
export const FormContainer: React.FC<{ 
  children: React.ReactNode;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void> | void;
}> = ({ children, onSubmit }) => (
  <FormControl component="form" onSubmit={onSubmit} sx={{ width: '100%' }}>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2}}>
      {children}
    </Box>
  </FormControl>
);

// Error Alert Component
export const ErrorAlert: React.FC<{ error: string }> = ({ error }) => (
  error ? (
    <Alert severity="error" sx={{ mb: 2 }}>
      {error}
    </Alert>
  ) : null
);

// Success Snackbar Component
export const SuccessSnackbar: React.FC<{
  open: boolean;
  message: string;
  onClose: () => void;
}> = ({ open, message, onClose }) => (
  <Snackbar
    open={open}
    autoHideDuration={4000}
    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    onClose={onClose}
  >
    <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
      {message}
    </Alert>
  </Snackbar>
);

// Link Text Component
export const LinkText: React.FC<{
  children: React.ReactNode;
  to: string;
  linkText: string;
}> = ({ children, to, linkText }) => (
  <Typography
    variant="body2"
    sx={{
      color: '#666666',
      fontFamily: 'Poppins, sans-serif',
      fontSize: { xs: '13px', sm: '14px' },
      textAlign: 'center'
    }}
  >
    {children}{' '}
    <MuiLink
      component={Link}
      to={to}
      sx={{
        color: '#EB5148',
        fontWeight: 600,
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline'
        }
      }}
    >
      {linkText}
    </MuiLink>
  </Typography>
);

// Email Field Component
export const EmailField: React.FC<{
  control: any;
  errors: any;
  placeholder?: string;
  validation?: any;
}> = ({ control, errors, placeholder = "Enter your email address", validation }) => (
  <FieldContainer>
    <FieldLabel>Email Address</FieldLabel>
    <Controller
      name="email"
      control={control}
      rules={validation || {
        required: 'Email is required',
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
          message: 'Please enter a valid email address'
        }
      }}
      render={({ field }) => (
        <EnhancedTextField
          {...field}
          placeholder={placeholder}
          type="email"
          fullWidth
          variant="filled"
          error={!!errors.email}
          helperText={errors.email?.message}
          sx={{
            '& .MuiFilledInput-root': {
              backgroundColor: '#F8F9FA',
              '&:hover': {
                backgroundColor: '#F1F3F4'

              },
              '&.Mui-focused': {
                backgroundColor: '#FFFFFF'
              }
            }
          }}
        />
      )}
    />
  </FieldContainer>
);

// Password Field Component
export const PasswordField: React.FC<{
  control: any;
  errors: any;
  showPassword: boolean;
  onTogglePassword: () => void;
  name?: string;
  label?: string;
  placeholder?: string;
  validation?: any;
}> = ({ 
  control, 
  errors, 
  showPassword, 
  onTogglePassword, 
  name = "password",
  label = "Password",
  placeholder = "Enter your password",
  validation
}) => (
  <FieldContainer>
    <FieldLabel>{label}</FieldLabel>
    <Controller
      name={name}
      control={control}
      rules={validation || {
        required: 'Password is required',
        minLength: {
          value: 8,
          message: 'Password must be at least 8 characters'
        },

      }}
      render={({ field }) => (
        <EnhancedTextField
          {...field}
          placeholder={placeholder}
          type={showPassword ? 'text' : 'password'}
          fullWidth
          variant="filled"
          error={!!errors[name]}
          helperText={errors[name]?.message}
          endIcon={
            <IconButton
              onClick={onTogglePassword}
              edge="end"
              sx={{ color: 'action.active' }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          }
          sx={{
            '& .MuiFilledInput-root': {
              backgroundColor: '#F8F9FA',
              '&:hover': {
                backgroundColor: '#F1F3F4'
              },
              '&.Mui-focused': {
                backgroundColor: '#FFFFFF'
              }
            }
          }}
        />
      )}
    />
  </FieldContainer>
);

// Confirm Password Field Component
export const ConfirmPasswordField: React.FC<{
  control: any;
  errors: any;
  showConfirmPassword: boolean;
  onToggleConfirmPassword: () => void;
  password: string;
  name?: string;
  label?: string;
  placeholder?: string;
}> = ({ 
  control, 
  errors, 
  showConfirmPassword, 
  onToggleConfirmPassword, 
  password,
  name = "confirmPassword",
  label = "Confirm Password",
  placeholder = "Confirm your password"
}) => (
  <FieldContainer>
    <FieldLabel>{label}</FieldLabel>
    <Controller
      name={name}
      control={control}
      rules={{
        required: 'Please confirm your password',
        validate: (value: string) => value === password || 'Passwords do not match'
      }}
      render={({ field }) => (
        <EnhancedTextField
          {...field}
          placeholder={placeholder}
          type={showConfirmPassword ? 'text' : 'password'}
          fullWidth
          variant="filled"
          error={!!errors[name]}
          helperText={errors[name]?.message}
          endIcon={
            <IconButton
              onClick={onToggleConfirmPassword}
              edge="end"
              sx={{ color: 'action.active' }}
            >
              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          }
          sx={{
            '& .MuiFilledInput-root': {
              backgroundColor: '#F8F9FA',
              '&:hover': {
                backgroundColor: '#F1F3F4'
              },
              '&.Mui-focused': {
                backgroundColor: '#FFFFFF'
              }
            }
          }}
        />
      )}
    />
  </FieldContainer>
);

// Submit Button Component
export const SubmitButton: React.FC<{
  isLoading: boolean;
  isValid: boolean;
  children: React.ReactNode;
  disabled?: boolean;
}> = ({ isLoading, isValid, children, disabled = false }) => (
  <Box sx={{ mt: 1 }}>
    <EnhancedButton
      fullWidth
      variant="primary"
      size="large"
      type="submit"
      loading={isLoading}
      disabled={!isValid || disabled}
      sx={{
        height: { xs: 56, sm: 60 }
      }}
    >
      {children}
    </EnhancedButton>
  </Box>
);

// Phone Number Field Component
export const PhoneNumberField: React.FC<{
  control: any;
  errors: any;
  name?: string;
  label?: string;
  placeholder?: string;
  validation?: any;
}> = ({ 
  control, 
  errors, 
  name = "phoneNumber",
  label = "Phone Number",
  placeholder = "Enter your phone number",
  validation
}) => (
  <FieldContainer>
    <FieldLabel>{label}</FieldLabel>
    <Controller
      name={name}
      control={control}
      rules={validation || {
        required: 'Phone number is required',
        pattern: {
          value: /^[+]?[\d\s\-\(\)]+$/,
          message: 'Please enter a valid phone number'
        }
      }}
      render={({ field }) => (
        <EnhancedTextField
          {...field}
          placeholder={placeholder}
          type="tel"
          fullWidth
          variant="filled"
          error={!!errors[name]}
          helperText={errors[name]?.message}
          sx={{
            '& .MuiFilledInput-root': {
              backgroundColor: '#F8F9FA',
              '&:hover': {
                backgroundColor: '#F1F3F4'
              },
              '&.Mui-focused': {
                backgroundColor: '#FFFFFF'
              }
            }
          }}
        />
      )}
    />
  </FieldContainer>
);

// Custom Field Component
export const CustomField: React.FC<{
  control: any;
  errors: any;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  validation?: any;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}> = ({ 
  control, 
  errors, 
  name, 
  label, 
  type = "text",
  placeholder,
  validation,
  helperText,
  startIcon,
  endIcon
}) => (
  <FieldContainer>
    <FieldLabel>{label}</FieldLabel>
    {helperText && <FieldHelper>{helperText}</FieldHelper>}
    <Controller
      name={name}
      control={control}
      rules={validation || { required: `${label} is required` }}
      render={({ field }) => (
        <EnhancedTextField
          {...field}
          placeholder={placeholder || `Enter your ${label.toLowerCase()}`}
          type={type}
          fullWidth
          variant="filled"
          error={!!errors[name]}
          helperText={errors[name]?.message}
          startIcon={startIcon}
          endIcon={endIcon}
          sx={{
            '& .MuiFilledInput-root': {
              backgroundColor: '#F8F9FA',
              '&:hover': {
                backgroundColor: '#F1F3F4'
              },
              '&.Mui-focused': {
                backgroundColor: '#FFFFFF'
              }
            }
          }}
        />
      )}
    />
  </FieldContainer>
);
