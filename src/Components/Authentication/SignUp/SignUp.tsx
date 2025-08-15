import React, { useState } from 'react';
import { 
  Box, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Select,
  Divider,
  Grid
} from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import signUpImage from "../../../assets/Rectangle 7.png";
import { useForm } from 'react-hook-form';
import { userService, handleApiError } from '../../../services/api';
import { 
  AuthLayout, 
  FormContainer, 
  ErrorAlert, 
  SuccessSnackbar, 
  LinkText,
  EmailField,
  PasswordField,
  ConfirmPasswordField,
  PhoneNumberField,
  SubmitButton,
  CustomField
} from '../../shared/common';

interface SignUpForm {
  userName: string;
  phoneNumber: string;
  email: string;
  country: string;
  password: string;
  confirmPassword: string;
  role: string;
  profileImage: File | null;
}

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const {
    control,
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch
  } = useForm<SignUpForm>({
    mode: "onBlur",
    defaultValues: {
      userName: '',
      phoneNumber: '',
      email: '',
      country: '',
      password: '',
      confirmPassword: '',
      role: "user",
      profileImage: null
    }
  });

  const password = watch("password");

  const onSubmit = async (data: SignUpForm) => {
    setIsLoading(true);
    setSubmitError('');

    // Validate profile image
    if (!selectedFile) {
      setSubmitError('Profile image is required');
      setIsLoading(false);
      return;
    }

    // Validate file type
    if (!selectedFile.type.startsWith('image/')) {
      setSubmitError('Please select a valid image file');
      setIsLoading(false);
      return;
    }

    // Validate file size (max 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setSubmitError('Image file size must be less than 5MB');
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('userName', data.userName);
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('confirmPassword', data.confirmPassword);
      formData.append('phoneNumber', data.phoneNumber);
      formData.append('country', data.country);
      formData.append('role', data.role);
      formData.append('profileImage', selectedFile);

      const response = await userService.register(formData);
      
      setSuccessMessage('Registration successful! Redirecting to login...');
      setShowSuccess(true);
      
      // Redirect after 2 seconds
      setTimeout(() => {
        window.location.href = '/auth/signin';
      }, 2000);
      
    } catch (error: any) {
      console.error('Registration error:', error);
      setSubmitError(handleApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setSubmitError('Please select a valid image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setSubmitError('Image file size must be less than 5MB');
        return;
      }

      setSelectedFile(file);
      setSubmitError(''); // Clear any previous errors
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join StayCation and start your journey with us. Please fill in your details to create your account."
      image={signUpImage}
      imageAlt="Sign Up"
      paddingTop={{ xs: 8, sm: 10, md:12 }}
    >
      {/* Error Alert */}
      <ErrorAlert error={submitError} />

      {/* Form */}
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        {/* Personal Information Section */}
        <Box sx={{ mb: 1.5 }}>
          <Box sx={{ 
            fontSize: '15px', 
            fontWeight: 600, 
            color: '#333', 
            mb: 1,
            fontFamily: 'Poppins, sans-serif'
          }}>
            Personal Information
          </Box>
          
                     <Grid container spacing={3}>
             <Grid item xs={12} sm={6}>
               <CustomField
                 control={control}
                 errors={errors}
                 name="userName"
                 label="Username"
                 placeholder="Enter your username"
                 validation={{
                   required: 'Username is required',
                   minLength: {
                     value: 3,
                     message: 'Username must be at least 3 characters'
                   }
                 }}
               />
             </Grid>
             <Grid item xs={12} sm={6}>
               <PhoneNumberField
                 control={control}
                 errors={errors}
                 placeholder="Enter your phone number"
               />
             </Grid>
           </Grid>

           <Grid container spacing={3}>
             <Grid item xs={12} sm={6}>
               <EmailField
                 control={control}
                 errors={errors}
                 placeholder="Enter your email address"
               />
             </Grid>
             <Grid item xs={12} sm={6}>
               <CustomField
                 control={control}
                 errors={errors}
                 name="country"
                 label="Country"
                 placeholder="Enter your country"
                 validation={{
                   required: 'Country is required'
                 }}
               />
             </Grid>
           </Grid>

           <Grid container spacing={3}>
             <Grid item xs={12} sm={6}>
               <CustomField
                 control={control}
                 errors={errors}
                 name="role"
                 label="Role"
                 validation={{
                   required: 'Role is required'
                 }}
                 startIcon={<CloudUpload />}
                 endIcon={
                   <FormControl fullWidth>
                     <Select
                       defaultValue="user"
                       sx={{
                         '& .MuiSelect-select': {
                           padding: '12px 16px',
                           backgroundColor: '#F8F9FA',
                           borderRadius: 1.5,
                           '&:hover': {
                             backgroundColor: '#F1F3F4'
                           },
                           '&.Mui-focused': {
                             backgroundColor: '#FFFFFF'
                           }
                         }
                       }}
                     >
                       <MenuItem value="user">User</MenuItem>
                       <MenuItem value="admin">Admin</MenuItem>
                     </Select>
                   </FormControl>
                 }
               />
             </Grid>
                           <Grid item xs={12} sm={6}>
                <Box>
                  <Box sx={{ 
                    fontSize: '13px', 
                    fontWeight: 500, 
                    color: '#333333', 
                    mb: 0.25,
                    fontFamily: 'Poppins, sans-serif'
                  }}>
                    Profile Image *
                  </Box>
                  <Box
                    sx={{
                      border: '2px dashed #ddd',
                      borderRadius: 1.5,
                      p: 2,
                      textAlign: 'center',
                      cursor: 'pointer',
                      backgroundColor: '#F8F9FA',
                      '&:hover': {
                        backgroundColor: '#F1F3F4',
                        borderColor: '#999'
                      }
                    }}
                    onClick={() => document.getElementById('profile-image-input')?.click()}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                      id="profile-image-input"
                      required
                    />
                    <CloudUpload sx={{ fontSize: 40, color: '#666', mb: 1 }} />
                    <Box sx={{ color: '#666', fontSize: '14px' }}>
                      {selectedFile ? selectedFile.name : 'Click to upload profile image'}
                    </Box>
                    {selectedFile && (
                      <Box sx={{ color: '#999', fontSize: '12px', mt: 0.5 }}>
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </Box>
                    )}
                  </Box>
                  {errors.profileImage && (
                    <Box sx={{ color: 'error.main', fontSize: '12px', mt: 0.5 }}>
                      {errors.profileImage.message}
                    </Box>
                  )}
                </Box>
              </Grid>
           </Grid>
        </Box>

        <Divider sx={{ my: 1.5 }} />

        {/* Security Section */}
        <Box sx={{ mb: 1.5 }}>
          <Box sx={{ 
            fontSize: '15px', 
            fontWeight: 600, 
            color: '#333', 
            mb: 1,
            fontFamily: 'Poppins, sans-serif'
          }}>
            Security
          </Box>
          
                     <Grid container spacing={3}>
             <Grid item xs={12} sm={6}>
               <PasswordField
                 control={control}
                 errors={errors}
                 showPassword={showPassword}
                 onTogglePassword={() => setShowPassword(!showPassword)}
                 label="Password"
                 placeholder="Create a strong password"
               />
             </Grid>
             <Grid item xs={12} sm={6}>
               <ConfirmPasswordField
                 control={control}
                 errors={errors}
                 showConfirmPassword={showConfirmPassword}
                 onToggleConfirmPassword={() => setShowConfirmPassword(!showConfirmPassword)}
                 password={password}
                 label="Confirm Password"
                 placeholder="Confirm your password"
               />
             </Grid>
           </Grid>
        </Box>

        {/* Submit Button */}
        <SubmitButton
          isLoading={isLoading}
          isValid={isValid}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </SubmitButton>
      </FormContainer>

      {/* Links to Sign In and Forgot Password */}
      <Box sx={{ mt: 1.5, textAlign: 'center' }}>
        <LinkText to="/auth/signin" linkText="Sign in here">
          Already have an account?
        </LinkText>
                 <Box sx={{ mt: 1 }}>
           <LinkText to="/auth/forget-pass" linkText="Forgot your password?">
             Having trouble signing in?
           </LinkText>
         </Box>
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