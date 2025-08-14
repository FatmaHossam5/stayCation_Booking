import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../Context/AuthContext';
import { 
  AuthLayout, 
  FormContainer, 
  ErrorAlert, 
  SuccessSnackbar, 
  PasswordField,
  ConfirmPasswordField,
  SubmitButton
} from '../../shared/common';

interface ChangePasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export default function ChangePassword() {
  const navigate = useNavigate();
  const { baseUrl, reqHeaders } = useContext(AuthContext);
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const { control, handleSubmit, formState: { errors, isValid }, watch } = useForm<ChangePasswordForm>({
    mode: "onBlur",
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    }
  });

  const newPassword = watch('newPassword');

  const handleClickShowCurrentPassword = () => setShowCurrentPassword(!showCurrentPassword);
  const handleClickShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const onSubmit = async (data: ChangePasswordForm) => {
    setIsLoading(true);
    setError('');
    
    try {
      await axios.put(`${baseUrl}/admin/users/change-password`, {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword
      }, {
        headers: reqHeaders
      });
      
      setSuccessMessage('Password changed successfully! Redirecting...');
      setShowSuccess(true);
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
      
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Failed to change password. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Change Password"
      subtitle="Update your password to keep your account secure. Please enter your current password and choose a new one."
      showLogo={false}
      maxWidth="sm"
    >
      {/* Error Alert */}
      <ErrorAlert error={error} />

      {/* Form */}
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        {/* Current Password Field */}
        <PasswordField
          control={control}
          errors={errors}
          name="currentPassword"
          showPassword={showCurrentPassword}
          onTogglePassword={handleClickShowCurrentPassword}
          label="Current Password"
          placeholder="Enter your current password"
        />

        {/* New Password Field */}
        <PasswordField
          control={control}
          errors={errors}
          name="newPassword"
          showPassword={showNewPassword}
          onTogglePassword={handleClickShowNewPassword}
          label="New Password"
          placeholder="Enter your new password"
        />

        {/* Confirm New Password Field */}
        <ConfirmPasswordField
          control={control}
          errors={errors}
          name="confirmNewPassword"
          showConfirmPassword={showConfirmPassword}
          onToggleConfirmPassword={handleClickShowConfirmPassword}
          password={newPassword}
          label="Confirm New Password"
          placeholder="Confirm your new password"
        />

        {/* Submit Button */}
        <SubmitButton
          isLoading={isLoading}
          isValid={isValid}
        >
          {isLoading ? 'Changing Password...' : 'Change Password'}
        </SubmitButton>
      </FormContainer>

      {/* Success Snackbar */}
      <SuccessSnackbar
        open={showSuccess}
        message={successMessage}
        onClose={() => setShowSuccess(false)}
      />
    </AuthLayout>
  );
}