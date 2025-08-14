import { AddressElement, CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import axios from 'axios';
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext';
import './pay.css'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  Paper, 
  Stepper, 
  Step, 
  StepLabel,
  Alert,
  CircularProgress,
  Divider,
  useTheme,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip
} from '@mui/material';
import { ArrowBack, Payment, Security, ExpandMore, CreditCard, LocationOn } from '@mui/icons-material';

const steps = ['Booking Details', 'Payment Information', 'Confirmation'];

// Test data for Stripe
const testData = {
  cardNumber: '4242 4242 4242 4242',
  expiryDate: '12/34',
  cvc: '123',
  address: {
    name: 'Test User',
    address: '123 Test Street',
    city: 'Test City',
    state: 'Test State',
    postal_code: '12345',
    country: 'US'
  }
};

interface PayProps {
  bookingId: string;
}

export default function Pay({ bookingId }: PayProps) {
    const stripe = useStripe()
    const elements = useElements();
    const {baseUrl, reqHeaders} = useContext(AuthContext)
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');
        setIsLoading(true);
    
        if (!stripe || !elements) {
          setError('Payment system is not ready. Please try again.');
          setIsLoading(false);
          return;
        }
        
        const cardElement = elements.getElement(CardElement);
        
        if (!cardElement) {
          setError('Please enter your card information.');
          setIsLoading(false);
          return;
        }

        const {token, error: stripeError} = await stripe.createToken(cardElement);
    
        if (stripeError) {
          setError(stripeError.message || 'Payment failed');
          setIsLoading(false);
        } else {
          const tokenId = token?.id;  
          handlePayment(tokenId)   
        }
    }
  
    const handlePayment = async(token: string) => {
        try {
          const response = await axios.post(
            `${baseUrl}/portal/booking/${bookingId}/pay`,
            {token},
            {
              headers: {
                ...reqHeaders,
                'Content-Type': 'application/json'
              }
            }
          )
      
          toast.success(response.data.message)
          navigate(`/user/booking-details/${bookingId}`)
        
        } catch (error: any) {
          setError(error?.response?.data?.message || 'Payment failed. Please try again.');
          setIsLoading(false);
        }
    }

    const handleBack = () => {
      navigate(-1);
    };

  return (
    <Container 
      maxWidth="md" 
      sx={{ 
        py: { xs: 2, md: 4 },
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      {/* Header with Back Button */}
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={handleBack}
          variant="text"
          sx={{ mb: 2 }}
        >
          Back to Booking
        </Button>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 600,
            color: theme.palette.primary.main
          }}
        >
          Complete Your Payment
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Secure payment powered by Stripe
        </Typography>
      </Box>

      {/* Test Data Section */}
      <Paper 
        elevation={1} 
        sx={{ 
          p: 2, 
          mb: 3, 
          backgroundColor: '#fff3cd',
          border: '1px solid #ffeaa7',
          borderRadius: 2
        }}
      >
        <Accordion sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
          <AccordionSummary 
            expandIcon={<ExpandMore />}
            sx={{ 
              '& .MuiAccordionSummary-content': {
                alignItems: 'center',
                gap: 1
              }
            }}
          >
            <CreditCard color="warning" />
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Test Payment Data
            </Typography>
            <Chip 
              label="Development Only" 
              size="small" 
              color="warning" 
              variant="outlined"
            />
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                  <CreditCard fontSize="small" sx={{ mr: 1 }} />
                  Test Card Information:
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', backgroundColor: '#f8f9fa', p: 1, borderRadius: 1 }}>
                  Card Number: {testData.cardNumber}<br/>
                  Expiry: {testData.expiryDate}<br/>
                  CVC: {testData.cvc}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                  <LocationOn fontSize="small" sx={{ mr: 1 }} />
                  Sample Address:
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', backgroundColor: '#f8f9fa', p: 1, borderRadius: 1 }}>
                  Name: {testData.address.name}<br/>
                  Address: {testData.address.address}<br/>
                  City: {testData.address.city}, {testData.address.state} {testData.address.postal_code}<br/>
                  Country: {testData.address.country}
                </Typography>
              </Box>
              <Alert severity="info" sx={{ mt: 1 }}>
                <Typography variant="body2">
                  <strong>Note:</strong> This is test data for development purposes only. 
                  Use these values to test the payment form. In production, real payment data will be required.
                </Typography>
              </Alert>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Paper>

      {/* Progress Stepper */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 2, 
          mb: 3, 
          backgroundColor: 'rgba(32, 63, 199, 0.05)',
          borderRadius: 2
        }}
      >
        <Stepper activeStep={1} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Payment Form */}
      <Paper 
        elevation={2} 
        sx={{ 
          p: { xs: 3, md: 4 },
          borderRadius: 3,
          backgroundColor: 'white'
        }}
      >
        <Box sx={{ mb: 3 }}>
          <Typography 
            variant="h6" 
            gutterBottom
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              color: theme.palette.primary.main
            }}
          >
            <Payment />
            Payment Information
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Your payment information is encrypted and secure
          </Typography>
        </Box>

        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ width: '100%' }}
        >
          {/* Shipping Address */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
              Shipping Address
            </Typography>
            <AddressElement 
              options={{mode: 'shipping'}} 
              className="address-element-container" 
            />
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Payment Method */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
              Payment Method
            </Typography>
            <Box sx={{ mb: 2 }}>
              <CardElement 
                className="card-element-container"
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#9e2146',
                    },
                  },
                }}
              />
            </Box>
            <Typography 
              variant="caption" 
              color="text.secondary"
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 0.5 
              }}
            >
              <Security fontSize="small" />
              Your payment information is secure and encrypted
            </Typography>
          </Box>

          {/* Submit Button */}
          <Button
            disabled={!stripe || isLoading}
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{
              py: 1.5,
              borderRadius: 2,
              fontSize: '1.1rem',
              fontWeight: 600,
              textTransform: 'none',
              boxShadow: 2,
              '&:hover': {
                boxShadow: 4,
              }
            }}
          >
            {isLoading ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={20} color="inherit" />
                Processing Payment...
              </Box>
            ) : (
              'Complete Payment'
            )}
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}
