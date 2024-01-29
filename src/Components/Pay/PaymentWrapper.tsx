import React from 'react'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import Pay from './Pay';
import { useParams } from 'react-router';
export default function PaymentWrapper() {
const stripePromise = loadStripe('pk_test_51OTjURBQWp069pqTmqhKZHNNd3kMf9TTynJtLJQIJDOSYcGM7xz3DabzCzE7bTxvuYMY0IX96OHBjsysHEKIrwCK006Mu7mKw8');
const { bookingId } = useParams();
  return (
    <>
    
    <Elements stripe={stripePromise}>
<Pay bookingId={bookingId}/>
    </Elements>
    
    </>
  )
}
