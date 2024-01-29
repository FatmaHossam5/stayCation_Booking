import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import axios from 'axios';
import React, { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext';
import './pay.css'
import { toast } from 'react-toastify';
const cardElementStyle = {
    base: {
      fontSize: '16px',
      color: '#424770',
      
      '::placeholder': {
        color: '#aab7c4',
      },
      backgroundColor:"black"
    },
    invalid: {
      color: '#9e2146',
    },
  };

export default function Pay({bookingId}) {
    const strip=useStripe()
    const elements=useElements();
    const {baseUrl,reqHeaders}=useContext(AuthContext)
    
    const handleSubmit = async (event) => {
       
        event.preventDefault();
    
        if (!strip || !elements) {
         
          return;
        }
        const cardElement = elements.getElement(CardElement);
        console.log(cardElement);
        const {token, error} = await strip.createToken(cardElement);
    
        if (error) {
       
          console.log(error.message);
       
    
        } else {
        
          console.log(token?.id);
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
        
        }catch (error) {
        
          toast.error(error?.response?.data?.message)
      
        }
  
    }
  return (
    <>


<form   onSubmit={handleSubmit}>

<div className="card-element-container">
      <label className="card-element-label">Card Details</label>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#333',
              '::placeholder': {
                color: 'white',
              },
            },
            invalid: {
              color: '#dc3545',
            },
          },
        }}
      />
    </div>

    </form>


    
    </>
  )
}
