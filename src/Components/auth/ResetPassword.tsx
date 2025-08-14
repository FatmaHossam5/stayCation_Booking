import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import { ResetPasswordForm } from '../../types';
import { validateEmail, validatePassword, validateConfirmPassword, validateSeed } from '../../utils/validation';
import { 
  AuthLayout, 
  FormContainer, 
  ErrorAlert, 
  SuccessSnackbar, 
  LinkText,
  EmailField,
  PasswordField,
  ConfirmPasswordField,
  CustomField,
  SubmitButton
} from '../shared/common';
import { Box } from '@mui/material';
import { Security } from '@mui/icons-material';
import resetPasswordImage from "../../assets/Rectangle 8.png";

export default function ResetPassword() {
  const { resetPassword } = useAuth();
  
  // State management
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const { control, register, handleSubmit, formState: { errors, isValid }, watch } = useForm<ResetPasswordForm>({
    mode: "onBlur",
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      seed: ''
    }
  });

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const onSubmit = async (data: ResetPasswordForm) => {
    setIsLoading(true);
    setError('');
    
    try {
      await resetPassword(data);
      setSuccessMessage('Password reset successfully! Redirecting to login...');
      setShowSuccess(true);
    } catch (error: any) {
      setError(error.message || 'Password reset failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter your email and new password to reset your account."
      image={resetPasswordImage}
      imageAlt="Reset Password"
    >
      {/* Error Alert */}
      <ErrorAlert error={error} />

      {/* Form */}
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        {/* Email Field */}
        <EmailField
          control={control}
          errors={errors}
          placeholder="Enter your email address"
        />

        {/* Password Field */}
        <PasswordField
          control={control}
          errors={errors}
          showPassword={showPassword}
          onTogglePassword={handleClickShowPassword}
          label="New Password"
          placeholder="Enter your new password"
        />

        {/* Confirm Password Field */}
        <ConfirmPasswordField
          control={control}
          errors={errors}
          showConfirmPassword={showConfirmPassword}
          onToggleConfirmPassword={handleClickShowConfirmPassword}
          password={password}
          label="Confirm New Password"
          placeholder="Confirm your new password"
        />

        {/* Seed Field */}
        <CustomField
          control={control}
          errors={errors}
          name="seed"
          label="Security Code"
          type="text"
          placeholder="Enter security code"
          helperText="Enter the security code sent to your email"
          validation={{
            required: 'Security code is required',
            minLength: {
              value: 6,
              message: 'Security code must be at least 6 characters'
            }
          }}
          startIcon={<Security />}
        />

        {/* Submit Button */}
        <SubmitButton
          isLoading={isLoading}
          isValid={isValid}
          disabled={!password || !confirmPassword}
        >
          {isLoading ? 'Resetting Password...' : 'Reset Password'}
        </SubmitButton>
      </FormContainer>

      {/* Link to Sign In */}
      <LinkText to="/auth/signin" linkText="Sign in here">
        Already have an account?
      </LinkText>

      {/* Success Snackbar */}
      <SuccessSnackbar
        open={showSuccess}
        message={successMessage}
        onClose={() => setShowSuccess(false)}
      />
    </AuthLayout>
  );
}
