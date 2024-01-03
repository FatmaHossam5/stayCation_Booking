import React, { useContext } from 'react'
import { Box, Typography, TextField, Button, Grid, FormControl } from '@mui/material';
import signin from "../../assets/bg-signin.png";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';
export default function SignIn() {
  const {register,handleSubmit,formState:{errors}}=useForm();
const {baseUrl}=useContext(AuthContext)
  const signIn=(data)=>{
    axios.post(`${baseUrl}/admin/users/login`,data).then((response)=>{console.log(response);
    }).catch((error)=>{console.log(error);
    })
    
  }
  return (
    <>
    <FormControl component="form"  onSubmit={handleSubmit(signIn)} >
     <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{bgcolor:"#ffffff"}}>
  <Grid item xs={6}>
  <Typography sx={{color:'#000000',mr: 2,display:"flex",justifyContent:"flex-start",fontFamily:"cairo",fontSize:'30px',fontWeight:500,marginBottom:'20px'}} >Sign in</Typography>
  <Typography sx={{color:'#000000',mr: 2,display:"flex",justifyContent:"flex-start",fontFamily:"cairo",fontSize:'20px',fontWeight:300,marginBottom:'20px'}} >If you don’t have an account registerYou can..</Typography>
  <Typography sx={{color:'#000000',mr: 2,display:"flex",justifyContent:"flex-start",fontFamily:"cairo",fontSize:'20px',fontWeight:300}} >Email Address</Typography>
    <TextField {...register('email')} label="Email" type="email" margin="normal" fullWidth sx={{bgcolor:"#F5F6F8"}}/>
    <Typography sx={{color:'#000000',mr: 2,display:"flex",justifyContent:"flex-start",fontFamily:"cairo",fontSize:'20px',fontWeight:300}} >Password</Typography>
    <TextField {...register('password')} label="Password" type="password" margin="normal" fullWidth sx={{bgcolor:"#F5F6F8"}}/>
    <Button type="submit" variant="contained" fullWidth sx={{bgcolor:'#3252DF', '&:hover': { bgcolor: '#2843CC' },marginTop:"60px",fontFamily:"cairo"}}>
      Sign In
    </Button>
  </Grid>
  <Grid item xs={6} display="flex" alignItems="center">
    <img src={signin} alt="google" width={'100%'} />
  </Grid>
</Grid>
</FormControl>
    </>
  )
}



