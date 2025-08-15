import { Box } from '@mui/material';
import axios from 'axios';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import signUpImage from "../../../assets/Rectangle 8.png";
import { AuthContext } from '../../../Context/AuthContext';
import { useToast } from '../../../hooks/useToast';
import {
  AuthLayout,
  EmailField,
  FormContainer,
  LinkText,
  SubmitButton
} from '../../shared/common';

interface ForgetPasswordForm {
  email: string;
}

export default function ForgetPassword() {
  const navigate = useNavigate();
  const { baseUrl } = useContext(AuthContext);
  const { showSuccess, showError } = useToast();
  
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
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
    
    try {
      // Show info toast while processing
    
      
      await axios.post(`${baseUrl}/portal/users/forgot-password`, data, {
        headers: { Authorization: `${localStorage.getItem('token')}` }
      });
      
      // Show success toast
      showSuccess('Password reset email sent successfully! Check your inbox for further instructions.', {
        autoClose: 5000,
        position: 'top-right'
      });
      
      // Redirect after a short delay to show success message
      setTimeout(() => {
        navigate("/auth/reset-pass");
      }, 3000);
      
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to send reset email. Please check your email address and try again.';
      showError(message, {
        autoClose: 6000,
        position: 'top-center'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Enhanced form submission with validation feedback
  const handleFormSubmit = handleSubmit((data: ForgetPasswordForm) => {
    if (!data.email) {
      showError('Please enter your email address', { autoClose: 3000 });
      return;
    }
    
    if (!isValid) {
      showError('Please enter a valid email address', { autoClose: 3000 });
      return;
    }
    
    onSubmit(data);
  });

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Don't worry! Enter your email address and we'll send you a link to reset your password."
      image={signUpImage}
      imageAlt="Forgot Password"
    >
      {/* Form */}
      <FormContainer onSubmit={handleFormSubmit}>
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
    </AuthLayout>
  );
}