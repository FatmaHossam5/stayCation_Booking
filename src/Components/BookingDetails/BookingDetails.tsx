import { Container, Grid, Paper, styled, Typography, IconButton, Button } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext, useEffect, useState } from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { format } from 'date-fns';
const Item = styled(Paper)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#203fc7b3",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    marginBottom:theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    boxShadow:"none",
   
  }));
export default function BookingDetails() {
    const{baseUrl,reqHeaders}=useContext(AuthContext);
    const{bookingId}=useParams();
    const [bookingDetails,setBookingDetails]=useState({})
    const navigate=useNavigate()
    useEffect(()=>{
axios.get(`${baseUrl}/portal/booking/${bookingId}`,{headers:reqHeaders}).then((response)=>{
    console.log(response);
    setBookingDetails(response.data.data.booking)
}).catch((error)=>{
    console.log(error);
    
})
    },[])
    console.log(bookingDetails);
   const handleExit=()=>{
    navigate('/')
   }
  return (
    <>
    
    <Container >
<Box sx={{width:'50%',margin:"auto",height:"100vh",bgcolor:"#203FC7",borderRadius:7}}>

<Grid item xs={8} sx={{textAlign:"center" }}>
    {/* <Item sx={{bgcolor:"inherit"}}>
<Typography variant="h4" color="initial" sx={{}}> Reservation confirmation</Typography>

    </Item> */}

    <IconButton sx={{color:"green"}} >
<CheckCircleIcon sx={{fontSize:"4rem"}}/> 
    </IconButton>

    <Item sx={{ boxShadow: "none",}}>
    <Typography variant="h4" color="initial"> Thank <span style={{color:"white"}}>{bookingDetails?.user?.userName}</span>  for your booking</Typography>
    </Item>
    
    <Item sx={{bgcolor:"inherit"}}>
    <Typography variant="body1" color="initial">Room Number</Typography>
<Typography variant="subtitle2" color="white">{bookingDetails?.room?.roomNumber}</Typography>
    </Item>
<Item sx={{bgcolor:"inherit"}}>
<Typography variant="body1" color="initial">Booking period</Typography>
<Typography variant="subtitle2" color="white">from {bookingDetails?.startDate && format(bookingDetails.startDate, 'ddMMM')} to {bookingDetails?.endDate && format(bookingDetails.endDate, 'ddMMM')}</Typography>
</Item>
<Item sx={{bgcolor:"inherit"}}>
    <Typography variant="body1" color="initial">Total Payment amount</Typography>
<Typography variant="subtitle2" color="white">{bookingDetails?.totalPrice}$</Typography></Item>
<Item sx={{bgcolor:"inherit"}}>
<Typography variant="body1" color="initial">Payment Status</Typography>
<Typography variant="subtitle2" color="Green" sx={{bgcolor:"white", width:'20%',margin:"auto",padding:1,borderRadius:"1rem"}}>{bookingDetails.status}</Typography>
</Item>
<Button sx={{bgcolor:"white",width:"40%"}} onClick={handleExit}>EXIT</Button>
</Grid>

</Box>
    </Container>
    
    
    
    </>
  )
}
