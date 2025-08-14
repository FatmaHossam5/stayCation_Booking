import React, { Suspense } from 'react'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Pay from './Pay';
import { useParams } from 'react-router';
import { Box, CircularProgress, Typography, Alert } from '@mui/material';

// Load Stripe outside of component to avoid recreating on every render
const stripePromise = loadStripe('pk_test_51OTjURBQWp069pqTmqhKZHNNd3kMf9TTynJtLJQIJDOSYcGM7xz3DabzCzE7bTxvuYMY0IX96OHBjsysHEKIrwCK006Mu7mKw8');

// Loading fallback component
const PaymentLoading = () => (
  <Box 
    sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '50vh',
      gap: 2
    }}
  >
    <CircularProgress size={40} />
    <Typography variant="body1" color="text.secondary">
      Loading payment form...
    </Typography>
  </Box>
);

// Error fallback component
const PaymentError = ({ error }: { error: string }) => (
  <Box sx={{ p: 3 }}>
    <Alert severity="error" sx={{ mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Payment System Unavailable
      </Typography>
      <Typography variant="body2">
        {error}
      </Typography>
    </Alert>
  </Box>
);

export default function PaymentWrapper() {
  const { bookingId } = useParams<{ bookingId: string }>();

  // Validate booking ID
  if (!bookingId) {
    return <PaymentError error="Invalid booking ID. Please try again." />;
  }

  return (
    <Suspense fallback={<PaymentLoading />}>
      <Elements 
        stripe={stripePromise}
        options={{
          appearance: {
            theme: 'stripe',
            variables: {
              colorPrimary: '#203fc7',
              colorBackground: '#ffffff',
              colorText: '#424770',
              colorDanger: '#df1b41',
              fontFamily: 'Poppins, system-ui, sans-serif',
              spacingUnit: '4px',
              borderRadius: '8px',
            },
          },
        }}
      >
        <Pay bookingId={bookingId} />
      </Elements>
    </Suspense>
  )
}
