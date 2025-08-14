import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../../Context/AuthContext';
import signUpImage from "../../../assets/Rectangle 8.png";
import { 
  AuthLayout, 
  FormContainer, 
  ErrorAlert, 
  SuccessSnackbar, 
  LinkText,
  EmailField,
  SubmitButton
} from '../../shared/common';
import { Box } from '@mui/material';

interface ForgetPasswordForm {
  email: string;
}

export default function ForgetPassword() {
  const navigate = useNavigate();
  const { baseUrl } = useContext(AuthContext);
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch
  } = useForm<ForgetPasswordForm>({ 
    mode: "onChange",
    defaultValues: {
      email: ''
    }
  });

  const email = watch('email');

  const onSubmit = async (data: ForgetPasswordForm) => {
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      await axios.post(`${baseUrl}/portal/users/forgot-password`, data, {
        headers: { Authorization: `${localStorage.getItem('token')}` }
      });
      
      setSuccessMessage('Password reset email sent successfully! Check your inbox.');
      setShowSuccess(true);
      
      // Redirect after a short delay to show success message
      setTimeout(() => {
        navigate("/auth/reset-pass");
      }, 2000);
      
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to send reset email. Please try again.';
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Don't worry! Enter your email address and we'll send you a link to reset your password."
      image={signUpImage}
      imageAlt="Forgot Password"
    >
      {/* Error Alert */}
      <ErrorAlert error={errorMessage} />

      {/* Form */}
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        {/* Email Field */}
        <EmailField
          control={control}
          errors={errors}
          placeholder="Enter your email address"
        />

        {/* Submit Button */}
        <SubmitButton
          isLoading={isLoading}
          isValid={isValid}
          disabled={!email}
        >
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </SubmitButton>
      </FormContainer>

      {/* Link to Sign In */}
      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <LinkText to="/auth/signin" linkText="Sign in here">
          Remember your password?
        </LinkText>
      </Box>

      {/* Success Snackbar */}
      <SuccessSnackbar
        open={showSuccess}
        message={successMessage}
        onClose={() => setShowSuccess(false)}
      />
    </AuthLayout>
  );
}