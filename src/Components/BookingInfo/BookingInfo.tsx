import { Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import { useForm } from 'react-hook-form';

export default function BookingInfo() {
  const location = useLocation();
  const { startDate, endDate, totalPrice } = location.state
  const [roomDetails, setRoomDetails] = useState({});
  const[bookingId,setBookingId]=useState('')
  
  const {baseUrl,reqHeaders}=useContext(AuthContext)
  const { roomId } = useParams();
  const { register, handleSubmit } = useForm();
  const navigate=useNavigate()
  
  const creatBooking =(data)=>{
axios.post(`${baseUrl}/portal/booking`,data,{headers:reqHeaders}).then((response)=>{
  console.log(response);
  const bookingId=response?.data?.data?.booking?._id
  setBookingId(bookingId)
console.log(bookingId);
navigate(`/user/pay-booking/${bookingId}`,{
  state:{
    startDate:response?.data?.data?.booking?.startDate,
    endDate:response?.data?.data?.booking?.endDate,
    totalPrice:response?.data?.data?.booking?.totalPrice
  }
}
)
 
}).catch((error)=>{
  console.log(error);
  
})
  }
  

  return (
    <>
    <form onSubmit={handleSubmit(creatBooking)}>
      <TextField label="Start Date" {...register('startDate', { value: startDate })} />
      <TextField label="End Date" {...register('endDate', { value: endDate })} />
      <TextField label="Total Price" {...register('totalPrice', { value: totalPrice })} />
      <TextField label="room" {...register('room', { value: roomId })} />


      <Button type="submit">
        Pay Now
      </Button>
    </form>
  </>
  ) 
}
