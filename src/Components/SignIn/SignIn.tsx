import React, { useContext } from 'react'
import { Box, Typography, TextField, Button, Grid, FormControl } from '@mui/material';
import signin from "../../assets/bg-signin.png";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
export default function SignIn() {
  const {register,handleSubmit,formState:{errors}}=useForm();
const {baseUrl,saveUserData,role,userData}=useContext(AuthContext)
const navigate=useNavigate()

  const signIn=(data)=>{
    axios.post(`${baseUrl}/admin/users/login`,data).then((response)=>
    {localStorage.setItem('userToken', response.data.data.token );
    saveUserData();
    {role==='admin'?navigate('/dashboard'):navigate('/user')}

toast.success('logIn SuccessFully')
    

     
 
    
    }).catch((error)=>{
      toast.error(error.response.data);
    })
    
  }
  return (
    <>
    <FormControl component="form"  onSubmit={handleSubmit(signIn)} >
  <Grid container spacing={2} sx={{bgcolor:"#ffffff",display:'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' ,paddingLeft:"120px"}}>
  <Grid item xs={6}>
  <Typography sx={{color:'#000000',mr: 2,display:"flex",justifyContent:"flex-start",fontFamily:"Poppins",fontSize:'30px',fontWeight:500,marginBottom:'20px',}} >Sign in</Typography>
  <Typography sx={{color:'#000000',mr: 2,display:"flex",justifyContent:"flex-start",fontFamily:"Poppins",fontSize:'20px',fontWeight:300,marginBottom:'20px'}} >If you don’t have an account registerYou can..</Typography>
  <Typography sx={{color:'#000000',mr: 2,display:"flex",justifyContent:"flex-start",fontFamily:"Poppins",fontSize:'20px',fontWeight:300}} >Email Address</Typography>
    <TextField {...register('email', { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })} label="Email" type="email" margin="normal" fullWidth sx={{bgcolor:"#F5F6F8",fontFamily:"Poppins",}}/>
    {errors.email && errors.email.type === 'required' && (<Typography sx={{color:'red'}}>email is required</Typography>)}
    <Typography sx={{color:'#000000',mr: 2,display:"flex",justifyContent:"flex-start",fontFamily:"Poppins",fontSize:'20px',fontWeight:300}} >Password</Typography>
    <TextField {...register('password', { required: true })} label="Password" type="password" margin="normal" fullWidth sx={{bgcolor:"#F5F6F8",fontFamily:"Poppins",}}/>
    {errors.password&&errors.password.type==='required'&&(<Typography sx={{color:"red"}}> password is required</Typography>)}
    <Button type="submit" variant="contained" fullWidth sx={{bgcolor:'#3252DF', '&:hover': { bgcolor: '#2843CC' },marginTop:"60px",fontFamily:"Poppins",}}>
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



