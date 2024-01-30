import { AddressElement, CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import axios from 'axios';
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext';
import './pay.css'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { Box, Button, Container } from '@mui/material';


export default function Pay({bookingId}) {
    const stripe=useStripe()
    const elements=useElements();
    const {baseUrl,reqHeaders}=useContext(AuthContext)
    const navigate=useNavigate();

    const handleSubmit = async (event) => {
       
        event.preventDefault();
    
        if (!stripe || !elements) {
         
          return;
        }
        const cardElement = elements.getElement(CardElement);
        console.log(cardElement);
        const {token, error} = await stripe.createToken(cardElement);
    
        if (error) {
       
        
          toast.error(error.message)
       
    
        } else {
        
       
          const tokenId = token?.id;  
          handlePayment(tokenId)   
       
        }
    
    
      }
  
    const handlePayment = async(token)=>{
        try{
          const response = await axios
          .post(`${baseUrl}/portal/booking/${bookingId}/pay`,
            {token},
            {headers: reqHeaders}
          )
      
        toast.success(response.data.message)
        navigate(`/user/booking-details/${bookingId}`)
        
        }catch (error) {
        
          toast.error(error?.response?.data?.message)
      
        }
  
    }
  return (
    <>

<Container
       
        className="payment-container"
        
      >
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          className="formSTYLE"
        >
     <AddressElement options={{mode: 'shipping'}} className="address-element-container" />
     <CardElement className="card-element-container"/>

     <Button
           disabled={!stripe}
            type="submit"
            className="payBtn"
            sx={{color:"white"}}
        
          >
            Pay
          </Button>
        </Box>
        </Container>
 


    
    </>
  )
}
