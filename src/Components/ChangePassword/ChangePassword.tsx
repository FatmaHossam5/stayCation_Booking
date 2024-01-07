import React from 'react'
import { Typography, TextField, Button, Grid } from '@mui/material';
import styles from '../SignUp/SignUp.module.scss';
import signUpImage from "../../assets/Rectangle 8.png"
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ChangePassword() {


  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({ mode: "all" })

  const onSubmit = (data) => {
    console.log(data);
    
    axios.post("http://154.41.228.234:3000/api/v0/admin/users/change-password", data
    ).then(response => {
      console.log(response.data);
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
        <Typography variant="h5" style={{marginBottom: "2rem"}}>Change Password</Typography>
        <Typography variant="body1" sx={{ marginTop: '10px' }}>
          If you already have an account register
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '10px' }}>
          You can <Link to={"/signin"} style={{ color: '#EB5148', fontWeight: 'bold' }}>Login here!</Link>
        </Typography>

        <form className={styles.signupForm} onSubmit={handleSubmit(onSubmit)} style={{marginTop: "7rem"}}>

          <label htmlFor=""> Old Password </label>
          <TextField
            id="filled-basic"
            variant="filled"
            placeholder='Please type here '
            sx={{ '& input': { padding: '10px' } }}
            type="password"
            {...register("oldPassword", { required: true })} />
          {errors.oldPassword && <Typography sx={{ margin: "0px", color: "red" }}>field is required</Typography>}

          <label htmlFor="">New Password </label>
          <TextField
            id="filled-basic"
            variant="filled"
            placeholder='Please type here '
            sx={{ '& input': { padding: '10px' } }}
            type='password'
            {...register("newPassword", { required: true })} />
          {errors.newPassword && <Typography sx={{ margin: "0px", color: "red" }}>field is required</Typography>}

          <label htmlFor=""> Confirm Password </label>
          <TextField
            id="filled-basic"
            variant="filled"
            placeholder='Please type here '
            sx={{ '& input': { padding: '10px' } }}
            type='password'
            {...register("confirmPassword", { required: true })} />
          {errors.confirmPassword && <Typography sx={{ margin: "0px", color: "red" }}>field is required</Typography>}

          <Button variant="contained" color="primary" type="submit" sx={{marginTop: "2rem"}}>
            Save
          </Button>
        </form>
      </Grid>

      {/* <Grid item sm={1}></Grid> */}


      <Grid item xs={12} sm={6} sx={{ textAlign: 'end' }}>
        <img src={signUpImage} alt="Signup" />
      </Grid>

    </Grid >
  )
}
