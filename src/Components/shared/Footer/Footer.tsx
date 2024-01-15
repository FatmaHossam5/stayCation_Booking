import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import fooPhoto from '../../../assets/Staycation..svg'
import { Divider, Typography } from '@mui/material';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Footer() {
  return (
    <>
          <Divider/>

    <Box sx={{ width: '100%',paddingTop:'15px' }}>
      <Divider/>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={3}>
          <Item sx={{boxShadow:'none'}}><img src={fooPhoto} alt=''/></Item>
          <Item sx={{boxShadow:'none'}}>We kaboom your beauty holiday instantly and memorable.</Item>

        </Grid>
        <Grid item xs={3}>
          <Item sx={{color:'#152C5B',boxShadow:'none'}}>For Beginners</Item>
          <Item sx={{boxShadow:'none',color:'#B0B0B0'}}>New Account</Item>
          <Item sx={{boxShadow:'none',color:'#B0B0B0'}}>Start Booking a Room</Item>
          <Item sx={{boxShadow:'none',color:'#B0B0B0'}}>Use Payments</Item>

        </Grid>
        <Grid item xs={3}>
          <Item sx={{color:'#152C5B',boxShadow:'none'}}>Explore Us</Item>
          <Item sx={{boxShadow:'none',color:'#B0B0B0'}}>Our Careers</Item>
          <Item sx={{boxShadow:'none',color:'#B0B0B0'}}>Privacy</Item>
          <Item sx={{boxShadow:'none',color:'#B0B0B0'}}>Terms & Conditions</Item>

        </Grid>
        <Grid item xs={3}>
          <Item sx={{color:'#152C5B',boxShadow:'none'}}>Connect Us</Item>
          <Item sx={{boxShadow:'none',color:'#B0B0B0'}}>support@staycation.id</Item>
          <Item sx={{boxShadow:'none',color:'#B0B0B0'}}>021 - 2208 - 1996</Item>
          <Item sx={{boxShadow:'none',color:'#B0B0B0'}}>Staycation, Kemang, Jakarta</Item>

        </Grid>
      </Grid>

      <Typography sx={{textAlign:'center',paddingTop:'25px',color:'#B0B0B0'}}>Copyright 2019 • All rights reserved • Staycation</Typography>
    </Box>
    </>
  );
}


