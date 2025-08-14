import { 
  Box, 
  Button, 
  TextField, 
  Container, 
  Grid, 
  styled, 
  Paper, 
  Typography,
  Divider,
  Card,
  CardContent,
  Alert,
  Stack,
  useTheme,
  useMediaQuery
} from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import { bookingService } from '../../services/bookingService';
import { useForm } from 'react-hook-form';
import pay from '../../assets/image 4.png'
import pay1 from '../../assets/image 5.png'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PaymentIcon from '@mui/icons-material/Payment';
import ReceiptIcon from '@mui/icons-material/Receipt';

// Styled components for better organization
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
  },
}));

const PaymentMethodCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(2),
  transition: 'all 0.2s ease',
  cursor: 'pointer',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.action.hover,
  },
}));

const PriceDisplay = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(1, 0),
  '&:not(:last-child)': {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

export default function BookingInfo() {
  const location = useLocation();
  const { startDate, endDate, totalPrice } = location.state || {};
  const [roomDetails, setRoomDetails] = useState({});
  const [bookingId, setBookingId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { baseUrl, reqHeaders } = useContext(AuthContext);
  const { roomId } = useParams();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const taxRate = 0.1;
  const taxAmount = totalPrice * taxRate;
  const finalTotal = totalPrice + taxAmount;

  const createBooking = async (data: any) => {
    setIsLoading(true);
    setError('');
    
    // Check if user is authenticated
    const token = localStorage.getItem("userToken");
    if (!token) {
      setError('You must be logged in to create a booking. Please sign in.');
      setIsLoading(false);
      return;
    }
    
    // Log the data being sent
    console.log('Creating booking with data:', data);
    console.log('Request headers:', reqHeaders);
    console.log('Token exists:', !!token);
    
          try {
        const response = await bookingService.createBooking(data, token, baseUrl);
      
      // Check if the response contains an error message
      if (response.data?.message?.message === 'jwt malformed' || 
          response.data?.message?.name === 'JsonWebTokenError') {
        console.error('Authentication error: JWT malformed');
        setError('Authentication failed. Please log in again.');
        return;
      }
      
      // Check if the response contains any error message
      if (response.data?.message && typeof response.data.message === 'object' && response.data.message.message) {
        console.error('API Error:', response.data.message);
        setError(`Booking failed: ${response.data.message.message}`);
        return;
      }
      
      // Log the response to debug the structure
      console.log('Booking response:', response.data);
      
      // Try to find the booking ID in the response
      let bookingId = null;
      
      // Method 1: Check if response.data.data.booking._id exists
      if (response?.data?.data?.booking?._id) {
        bookingId = response.data.data.booking._id;
        console.log('Found bookingId in response.data.data.booking._id:', bookingId);
      }
      // Method 2: Check if response.data.booking._id exists
      else if (response?.data?.booking?._id) {
        bookingId = response.data.booking._id;
        console.log('Found bookingId in response.data.booking._id:', bookingId);
      }
      // Method 3: Check if response.data.data._id exists
      else if (response?.data?.data?._id) {
        bookingId = response.data.data._id;
        console.log('Found bookingId in response.data.data._id:', bookingId);
      }
      // Method 4: Check if response.data._id exists
      else if (response?.data?._id) {
        bookingId = response.data._id;
        console.log('Found bookingId in response.data._id:', bookingId);
      }
      
      // If still no bookingId, log the entire response for debugging
      if (!bookingId) {
        console.log('No bookingId found. Full response structure:', JSON.stringify(response.data, null, 2));
        setError('Booking created but no booking ID received. Please contact support.');
        return;
      }
      
      setBookingId(bookingId);
      
      // Navigate to payment page
      try {
        navigate(`/user/pay-booking/${bookingId}`, {
          state: {
            startDate: response?.data?.data?.booking?.startDate || response?.data?.booking?.startDate,
            endDate: response?.data?.data?.booking?.endDate || response?.data?.booking?.endDate,
            totalPrice: response?.data?.data?.booking?.totalPrice || response?.data?.booking?.totalPrice
          }
        });
      } catch (navigationError) {
        console.error('Navigation failed:', navigationError);
        // Fallback: try to navigate without state
        navigate(`/user/pay-booking/${bookingId}`);
      }
    } catch (error: any) {
      console.error('Booking creation failed:', error);
      console.error('Error details:', {
        message: error?.message,
        response: error?.response?.data,
        status: error?.response?.status,
        statusText: error?.response?.statusText
      });
      
      let errorMessage = 'Failed to create booking. Please try again.';
      
      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error?.response?.status === 401) {
        errorMessage = 'Authentication failed. Please log in again.';
      } else if (error?.response?.status === 400) {
        errorMessage = 'Invalid booking data. Please check your information.';
      } else if (error?.response?.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      } else if (error?.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleCancel}
          sx={{ mb: 2 }}
          variant="text"
        >
          Back to Room Details
        </Button>
        <Typography variant="h4" component="h1" gutterBottom>
          Complete Your Booking
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Review your booking details and proceed to payment
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={4}>
        {/* Payment Information Section */}
        <Grid item xs={12} md={5}>
          <StyledCard>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <ReceiptIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" component="h2">
                  Payment Summary
                </Typography>
              </Box>

              {/* Price Breakdown */}
              <Box sx={{ mb: 3 }}>
                <PriceDisplay>
                  <Typography variant="body1">Subtotal</Typography>
                  <Typography variant="body1" fontWeight="medium">
                    ${totalPrice?.toFixed(2)}
                  </Typography>
                </PriceDisplay>
                <PriceDisplay>
                  <Typography variant="body1">Tax (10%)</Typography>
                  <Typography variant="body1" fontWeight="medium">
                    ${taxAmount?.toFixed(2)}
                  </Typography>
                </PriceDisplay>
                <PriceDisplay>
                  <Typography variant="h6" fontWeight="bold">Total</Typography>
                  <Typography variant="h6" fontWeight="bold" color="primary.main">
                    ${finalTotal?.toFixed(2)}
                  </Typography>
                </PriceDisplay>
              </Box>

              {/* Payment Methods */}
              <Typography variant="h6" component="h3" gutterBottom>
                Payment Methods
              </Typography>
              
              <PaymentMethodCard>
                <Box sx={{ mr: 2 }}>
                  <img src={pay} alt="Bank Transfer" style={{ width: '40px', height: 'auto' }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body1" fontWeight="medium">
                    Bank Transfer
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Account: 257257
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Bank: Build
                  </Typography>
                </Box>
              </PaymentMethodCard>

              <PaymentMethodCard>
                <Box sx={{ mr: 2 }}>
                  <img src={pay1} alt="Alternative Payment" style={{ width: '40px', height: 'auto' }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body1" fontWeight="medium">
                    Alternative Payment
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Account: 257257
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Bank: Build
                  </Typography>
                </Box>
              </PaymentMethodCard>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Divider - Only show on desktop */}
        {!isMobile && (
          <Grid item xs={12} md={1}>
            <Box sx={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
              <Divider orientation="vertical" flexItem />
            </Box>
          </Grid>
        )}

        {/* Booking Form Section */}
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <PaymentIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" component="h2">
                  Booking Details
                </Typography>
              </Box>

              <form onSubmit={handleSubmit(createBooking)}>
                <Stack spacing={3}>
                  <TextField
                    label="Start Date"
                    {...register('startDate', { 
                      value: startDate,
                      required: 'Start date is required' 
                    })}
                    fullWidth
                    disabled
                    variant="outlined"
                                         error={!!errors.startDate}
                     helperText={errors.startDate?.message as string}
                  />

                  <TextField
                    label="End Date"
                    {...register('endDate', { 
                      value: endDate,
                      required: 'End date is required' 
                    })}
                    fullWidth
                    disabled
                    variant="outlined"
                                         error={!!errors.endDate}
                     helperText={errors.endDate?.message as string}
                  />

                  <TextField
                    label="Total Price"
                    {...register('totalPrice', { 
                      value: totalPrice,
                      required: 'Total price is required' 
                    })}
                    fullWidth
                    disabled
                    variant="outlined"
                                         error={!!errors.totalPrice}
                     helperText={errors.totalPrice?.message as string}
                    InputProps={{
                      startAdornment: <Typography variant="body1" sx={{ mr: 1 }}>$</Typography>,
                    }}
                  />

                  <TextField
                    label="Room ID"
                    {...register('room', { 
                      value: roomId,
                      required: 'Room ID is required' 
                    })}
                    fullWidth
                    disabled
                    variant="outlined"
                                         error={!!errors.room}
                     helperText={errors.room?.message as string}
                  />

                  <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <Button
                      variant="outlined"
                      onClick={handleCancel}
                      fullWidth={isMobile}
                      sx={{ minWidth: isMobile ? 'auto' : '120px' }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth={isMobile}
                      disabled={isLoading}
                      sx={{ 
                        minWidth: isMobile ? 'auto' : '120px',
                        bgcolor: '#203FC7',
                        '&:hover': {
                          bgcolor: '#1a2f9e',
                        }
                      }}
                    >
                      {isLoading ? 'Processing...' : 'Pay Now'}
                    </Button>
                  </Box>
                </Stack>
              </form>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Container>
  );
}
