import {
  Box
} from '@mui/material';
import axios from 'axios';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import signin from "../../../assets/bg-signin.png";
import { getDefaultRouteByRole } from '../../../config/routes';
import { AuthContext } from '../../../Context/AuthContext';
import {
  AuthLayout,
  EmailField,
  ErrorAlert,
  FormContainer,
  LinkText,
  PasswordField,
  SubmitButton,
  SuccessSnackbar
} from '../../shared/common';

interface SignInForm {
  email: string;
  password: string;
}

export default function SignIn() {
  const { control, handleSubmit, formState: { errors, isValid } } = useForm<SignInForm>({
    mode: "onBlur",
    defaultValues: {
      email: '',
      password: ''
    }
  });
  
  const { baseUrl, saveUserData } = useContext(AuthContext) as any;
  const navigate = useNavigate();

  // State management
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const signIn = async (data: SignInForm) => {
    setIsLoading(true);
    setLoginError('');

    try {
      const response: any = await axios.post(`${baseUrl}/admin/users/login`, data);
      const userRole = response?.data?.data?.user?.role;

      localStorage.setItem("userToken", response?.data?.data?.token);
      localStorage.setItem("role", userRole);
      localStorage.setItem("userName", response?.data?.data?.user?.userName);

      saveUserData();
      setSuccessMessage('Login successful! Redirecting...');
      setShowSuccess(true);

      // Redirect to appropriate dashboard based on user role
      setTimeout(() => {
        const defaultRoute = getDefaultRouteByRole(userRole);
        
        // Force a page reload to ensure context is updated
        window.location.href = defaultRoute;
      }, 1500);

    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Login failed. Please try again.';
      setLoginError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Sign in"
      subtitle="Welcome back! Please enter your details to access your account."
      image={signin}
      imageAlt="Sign In"
    >
      {/* Error Alert */}
      <ErrorAlert error={loginError} />

      {/* Form */}
      <FormContainer onSubmit={handleSubmit(signIn)}>
        {/* Email Field */}
        <EmailField
          control={control}
          errors={errors}
          placeholder="Enter your email"
        />

        {/* Password Field */}
        <PasswordField
          control={control}
          errors={errors}
          showPassword={showPassword}
          onTogglePassword={handleClickShowPassword}
          label="Password"
          placeholder="Enter your password"
        />

        {/* Submit Button */}
        <SubmitButton
          isLoading={isLoading}
          isValid={isValid}
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </SubmitButton>
      </FormContainer>

      {/* Link to Sign Up */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <LinkText to="/auth/signup" linkText="Sign up here">
          Don't have an account?
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



