import { Box, Button, TextField, Container, Grid, styled, Paper, Typography } from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import { useForm } from 'react-hook-form';
import pay from '../../assets/image 4.png'
import pay1 from '../../assets/image 5.png'
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export default function BookingInfo() {
  const location = useLocation();
  const { startDate, endDate, totalPrice } = location.state
  const [roomDetails, setRoomDetails] = useState({});
  const [bookingId, setBookingId] = useState('')

  const { baseUrl, reqHeaders } = useContext(AuthContext)
  const { roomId } = useParams();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate()


  const creatBooking = (data) => {
    axios.post(`${baseUrl}/portal/booking`, data, { headers: reqHeaders }).then((response) => {
      console.log(response);
      const bookingId = response?.data?.data?.booking?._id
      setBookingId(bookingId)
      console.log(bookingId);
      navigate(`/user/pay-booking/${bookingId}`, {
        state: {
          startDate: response?.data?.data?.booking?.startDate,
          endDate: response?.data?.data?.booking?.endDate,
          totalPrice: response?.data?.data?.booking?.totalPrice
        }
      }
      )

    }).catch((error) => {
      console.log(error);

    })
  }

const handleCancle=()=>{
  navigate(-1)
}
  return (
    <>
      <Container maxWidth="lg">
        <Box>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 5 }}>
            <Grid item xs={5} >
              <Item sx={{boxShadow:"none",display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Typography>Transfer Payment</Typography>
                <Typography variant="body1" color="initial" >Tax:10%</Typography>
                <Typography variant="body1" color="initial">Sub total:{totalPrice}$</Typography>
                <Typography variant="body1" color="initial"> Total:{totalPrice+totalPrice*0.1}$</Typography>
                
<Item className='translate' sx={{boxShadow:"none",display:"flex",alignItems:"center" ,justifyContent:"center"}}>
  <Item sx={{boxShadow:"none"}} >
<img src={pay} alt="" width={'30%'}  />
  </Item>
  <Item sx={{boxShadow:"none"}}>
    <Typography variant="body1" color="initial">Bank </Typography>
    <Typography variant="body1" color="initial">257257</Typography>
    <Typography variant="body1" color="initial">Build</Typography>


  </Item>
</Item>
<Item  className='translate' sx={{boxShadow:"none",display:"flex",alignItems:"center" ,justifyContent:"center"}}>
  <Item sx={{boxShadow:"none"}} >
<img src={pay1} alt="" width={'30%'}  />
  </Item>
  <Item   sx={{boxShadow:"none"}}>
    <Typography variant="body1" color="initial">Bank </Typography>
    <Typography variant="body1" color="initial">257257</Typography>
    <Typography variant="body1" color="initial">Build</Typography>
    

  </Item>
</Item>
<Item  sx={{boxShadow:"none"}}>
  <Button sx={{bgcolor:"#203FC7",color:"white"}} onClick={handleCancle}>
    Cancle
  </Button>
</Item>
              </Item>
            </Grid>

            <Grid item xs={false}>
        <Box
          component="div"
          sx={{
            height: '100%',
            width: 0.01, 
            backgroundColor: 'rgba(0, 0, 0, 0.12)', 
            margin: '0 35px', 
          }}
        />
      </Grid>
            <Grid item xs={5}>
              <Item  sx={{boxShadow:"none",display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <form onSubmit={handleSubmit(creatBooking)}>
                  <Item sx={{ boxShadow: "none" }}>
                    <TextField label="Start Date" {...register('startDate', { value: startDate })} />
                  </Item>
                  <Item sx={{ boxShadow: "none" }}>
                    <TextField label="End Date" {...register('endDate', { value: endDate })} />
                  </Item>
                  <Item sx={{ boxShadow: "none" }}>
                    <TextField label="Total Price" {...register('totalPrice', { value: totalPrice })} />
                  </Item>
                  <Item sx={{ boxShadow: "none" }}>
                    <TextField label="room" {...register('room', { value: roomId })} />
                  </Item>
                  <Item  sx={{boxShadow:"none", marginTop:2}}>
  <Button type='submit' sx={{bgcolor:"#203FC7",color:"white"}}>
    Pay Now
  </Button>
</Item>
                </form>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </Container>

    </>
  )
}
