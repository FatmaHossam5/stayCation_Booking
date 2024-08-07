import { Typography, TextField, Button, Grid } from '@mui/material';
import styles from '../SignUp/SignUp.module.scss';
import signUpImage from "../../../assets/Rectangle 8.png"
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext';


export default function ForgetPassword() {

  const navigate = useNavigate()
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm( { mode: "all" })
  const{baseUrl,reqHeaders}=useContext(AuthContext)

  const onSubmit = (data:any) => {
    console.log(data);
    axios.post(`${baseUrl}/portal/users/forgot-password`, data, { 
      headers:  reqHeaders 
    }
    ).then(response => {
      console.log(response.data.message);
      navigate("/auth/reset-pass")
    })
      .catch(error => {
        console.error(error.response.data.message);
      });
      
  }

  return (

    <Grid container sx={{ position: "relative" }} className={styles.signupContainer} >

      <Grid item sm={1}>
        <Typography variant="h4" sx={{ position: "absolute", top: "30px" }}>
           <span style={{ color: '#3252DF' }}>Stay</span>cation.</Typography>
      </Grid>

      <Grid item xs={12} sm={4} >
        <Typography variant="h5" sx={{marginBottom:"2rem"}}>Forgot password</Typography>
        <Typography variant="body1" sx={{ marginTop: '10px' }}>
          If you already have an account register
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '10px' }}>
          You can <Link to={"/auth/signin"} style={{ color: '#EB5148', fontWeight: 'bold' }}>Login here!</Link>
        </Typography>

        <form className={styles.signupForm} style={{marginTop: "7rem"}} onSubmit={handleSubmit(onSubmit)}>
        
          <label htmlFor=""> Email </label>
          <TextField
            id="filled-basic"
            variant="filled"
            placeholder='Please type here '
            sx={{ '& input': { padding: '10px' } }}
            type="email"
            {...register("email", { required: true })} />
          {errors.email && <Typography sx={{ margin: "0px", color: "red" }}>field is required</Typography>}

          <Button variant="contained" color="primary" type="submit" sx={{marginTop: "2rem"}}>
          Send mail
          </Button>
        </form>
      </Grid>

      <Grid item xs={12} sm={6} sx={{ textAlign: 'end' }}>
        <img src={signUpImage} alt="Signup" />
      </Grid>

    </Grid >
  //
   );
}