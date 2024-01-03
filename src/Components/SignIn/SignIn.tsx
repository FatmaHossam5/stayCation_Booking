import React from 'react'
import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import signin from "../../assets/bg-signin.png";
export default function SignIn() {
  return (
    <>
     <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{bgcolor:"#ffffff"}}>
  <Grid item xs={6}>
  <Typography sx={{color:'#000000',mr: 2,display:"flex",justifyContent:"flex-start",fontFamily:"cairo",fontSize:'30px',fontWeight:500,marginBottom:'20px'}} >Sign in</Typography>
  <Typography sx={{color:'#000000',mr: 2,display:"flex",justifyContent:"flex-start",fontFamily:"cairo",fontSize:'20px',fontWeight:300,marginBottom:'20px'}} >If you don’t have an account registerYou can..</Typography>
  <Typography sx={{color:'#000000',mr: 2,display:"flex",justifyContent:"flex-start",fontFamily:"cairo",fontSize:'20px',fontWeight:300}} >Email Address</Typography>
    <TextField label="Email" type="email" margin="normal" fullWidth sx={{bgcolor:"#F5F6F8"}}/>
    <Typography sx={{color:'#000000',mr: 2,display:"flex",justifyContent:"flex-start",fontFamily:"cairo",fontSize:'20px',fontWeight:300}} >Password</Typography>
    <TextField label="Password" type="password" margin="normal" fullWidth sx={{bgcolor:"#F5F6F8"}}/>
    <Button type="submit" variant="contained" fullWidth sx={{bgcolor:'#3252DF', '&:hover': { bgcolor: '#2843CC' },marginTop:"60px",fontFamily:"cairo"}}>
      Sign In
    </Button>
  </Grid>
  <Grid item xs={6} display="flex" alignItems="center">
    <img src={signin} alt="google" width={'100%'} />
  </Grid>
</Grid>
    </>
  )
}



