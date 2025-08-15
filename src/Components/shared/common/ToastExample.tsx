import React from 'react';
import { Button, Box, Typography, Paper, Grid } from '@mui/material';
import { useToastMessages } from '../../../utils/toastUtils';

/**
 * Example component demonstrating how to use the toast notification system
 * throughout your StayCation Booking project.
 * 
 * This component shows all the available toast methods and how to use them
 * in different scenarios.
 */
const ToastExample: React.FC = () => {
  const toastMessages = useToastMessages();

  // Example of handling API operations with toast notifications
  const handleApiOperation = async (operation: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success toast based on operation
      switch (operation) {
        case 'login':
          toastMessages.showLoginSuccess();
          break;
        case 'register':
          toastMessages.showRegisterSuccess();
          break;
        case 'room-create':
          toastMessages.showRoomCreateSuccess();
          break;
        case 'booking-create':
          toastMessages.showBookingCreateSuccess();
          break;
        case 'payment':
          toastMessages.showPaymentSuccess();
          break;
        default:
          toastMessages.showSuccess('Operation completed successfully!');
      }
    } catch (error) {
      // Handle different types of errors
      handleApiError(error, toastMessages);
    }
  };

  // Example of handling validation errors
  const handleValidationError = () => {
    toastMessages.showValidationError();
  };

  // Example of handling network errors
  const handleNetworkError = () => {
    toastMessages.showNetworkError();
  };

  // Example of handling authorization errors
  const handleAuthError = () => {
    toastMessages.showUnauthorized();
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom color="primary">
        Toast Notification Examples
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        This component demonstrates how to use the toast notification system throughout your project.
        Each button shows a different type of toast notification.
      </Typography>

      <Grid container spacing={3}>
        {/* Authentication Toasts */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom color="primary">
            Authentication Toasts
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button 
              variant="contained" 
              color="success" 
              onClick={() => toastMessages.showLoginSuccess()}
            >
              Login Success
            </Button>
            <Button 
              variant="contained" 
              color="error" 
              onClick={() => toastMessages.showLoginError()}
            >
              Login Error
            </Button>
            <Button 
              variant="contained" 
              color="success" 
              onClick={() => toastMessages.showRegisterSuccess()}
            >
              Register Success
            </Button>
            <Button 
              variant="contained" 
              color="success" 
              onClick={() => toastMessages.showPasswordChangeSuccess()}
            >
              Password Changed
            </Button>
          </Box>
        </Grid>

        {/* Room Management Toasts */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom color="primary">
            Room Management Toasts
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button 
              variant="contained" 
              color="success" 
              onClick={() => toastMessages.showRoomCreateSuccess()}
            >
              Room Created
            </Button>
            <Button 
              variant="contained" 
              color="success" 
              onClick={() => toastMessages.showRoomUpdateSuccess()}
            >
              Room Updated
            </Button>
            <Button 
              variant="contained" 
              color="success" 
              onClick={() => toastMessages.showRoomDeleteSuccess()}
            >
              Room Deleted
            </Button>
            <Button 
              variant="contained" 
              color="error" 
              onClick={() => toastMessages.showRoomCreateError()}
            >
              Room Create Error
            </Button>
          </Box>
        </Grid>

        {/* Booking Management Toasts */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom color="primary">
            Booking Management Toasts
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button 
              variant="contained" 
              color="success" 
              onClick={() => toastMessages.showBookingCreateSuccess()}
            >
              Booking Created
            </Button>
            <Button 
              variant="contained" 
              color="success" 
              onClick={() => toastMessages.showPaymentSuccess()}
            >
              Payment Success
            </Button>
            <Button 
              variant="contained" 
              color="success" 
              onClick={() => toastMessages.showBookingCancelSuccess()}
            >
              Booking Cancelled
            </Button>
            <Button 
              variant="contained" 
              color="warning" 
              onClick={() => toastMessages.showAlreadyBooked()}
            >
              Already Booked
            </Button>
          </Box>
        </Grid>

        {/* User Management Toasts */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom color="primary">
            User Management Toasts
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button 
              variant="contained" 
              color="success" 
              onClick={() => toastMessages.showUserCreateSuccess()}
            >
              User Created
            </Button>
            <Button 
              variant="contained" 
              color="success" 
              onClick={() => toastMessages.showProfileUpdateSuccess()}
            >
              Profile Updated
            </Button>
            <Button 
              variant="contained" 
              color="success" 
              onClick={() => toastMessages.showUserDeleteSuccess()}
            >
              User Deleted
            </Button>
          </Box>
        </Grid>

        {/* General Error Toasts */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom color="primary">
            Error Handling Toasts
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button 
              variant="contained" 
              color="error" 
              onClick={handleNetworkError}
            >
              Network Error
            </Button>
            <Button 
              variant="contained" 
              color="error" 
              onClick={() => toastMessages.showServerError()}
            >
              Server Error
            </Button>
            <Button 
              variant="contained" 
              color="error" 
              onClick={handleAuthError}
            >
              Unauthorized
            </Button>
            <Button 
              variant="contained" 
              color="warning" 
              onClick={handleValidationError}
            >
              Validation Error
            </Button>
          </Box>
        </Grid>

        {/* Favorites & Reviews Toasts */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom color="primary">
            Favorites & Reviews Toasts
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button 
              variant="contained" 
              color="success" 
              onClick={() => toastMessages.showFavoriteAddSuccess()}
            >
              Added to Favorites
            </Button>
            <Button 
              variant="contained" 
              color="success" 
              onClick={() => toastMessages.showReviewCreateSuccess()}
            >
              Review Submitted
            </Button>
            <Button 
              variant="contained" 
              color="info" 
              onClick={() => toastMessages.showInfo('This is an informational message')}
            >
              Info Message
            </Button>
          </Box>
        </Grid>

        {/* API Operation Examples */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom color="primary">
            API Operation Examples
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => handleApiOperation('login')}
            >
              Simulate Login
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => handleApiOperation('room-create')}
            >
              Simulate Room Creation
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => handleApiOperation('booking-create')}
            >
              Simulate Booking
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => handleApiOperation('payment')}
            >
              Simulate Payment
            </Button>
          </Box>
        </Grid>

        {/* Custom Toast Examples */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom color="primary">
            Custom Toast Examples
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button 
              variant="contained" 
              color="success" 
              onClick={() => toastMessages.showSuccess('Custom success message!')}
            >
              Custom Success
            </Button>
            <Button 
              variant="contained" 
              color="error" 
              onClick={() => toastMessages.showError('Custom error message!')}
            >
              Custom Error
            </Button>
            <Button 
              variant="contained" 
              color="warning" 
              onClick={() => toastMessages.showWarning('Custom warning message!')}
            >
              Custom Warning
            </Button>
            <Button 
              variant="contained" 
              color="info" 
              onClick={() => toastMessages.showInfo('Custom info message!')}
            >
              Custom Info
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Usage Instructions:
        </Typography>
        <Typography variant="body2" component="div" sx={{ mb: 2 }}>
          <strong>1. Import the toast utilities:</strong>
          <pre style={{ background: '#f5f5f5', padding: '8px', borderRadius: '4px' }}>
            {`import { useToastMessages, handleApiError } from '../utils/toastUtils';`}
          </pre>
        </Typography>
        <Typography variant="body2" component="div" sx={{ mb: 2 }}>
          <strong>2. Use in your component:</strong>
          <pre style={{ background: '#f5f5f5', padding: '8px', borderRadius: '4px' }}>
            {`const toastMessages = useToastMessages();

// Show success toast
toastMessages.showRoomCreateSuccess();

// Handle API errors
try {
  await apiCall();
  toastMessages.showSuccess('Operation successful!');
} catch (error) {
  handleApiError(error, toastMessages);
}`}
          </pre>
        </Typography>
        <Typography variant="body2">
          <strong>3. Available methods:</strong> All toast methods are available through the `toastMessages` object.
          Check the `toastUtils.ts` file for the complete list of available methods.
        </Typography>
      </Box>
    </Paper>
  );
};

export default ToastExample;
