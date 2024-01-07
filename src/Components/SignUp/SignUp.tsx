import React from 'react';
import { Typography, TextField, Button, Grid, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import styles from './SignUp.module.scss';
import signUpImage from "../../assets/Rectangle 7.png"
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import profileImg from "../../assets/avatar.png"

export default function SignUp() {

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({
    userName: null,
    phoneNumber: null,
    email: null,
    country: null,
    password: null,
    confirmPassword: null,
    role: "admin"
  }, { mode: "all" })

  const onSubmit = (data) => {

    const formData = new FormData()
    formData.append('userName', data.userName)
    formData.append('email', data.email)
    formData.append('password', data.password)
    formData.append('confirmPassword', data.confirmPassword)
    formData.append('phoneNumber', data.phoneNumber)
    formData.append('country', data.country)
    formData.append('role', data.role)
    formData.append('profileImage', data.profileImage[0])

    axios.post("http://154.41.228.234:3000/api/v0/admin/users", formData
    ).then(response => {
      console.log(response.data.data.userCreated);
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
        <Typography variant="h5">Sign Up</Typography>
        <Typography variant="body1" sx={{ marginTop: '10px' }}>
          If you already have an account register
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '10px' }}>
          You can <Link to={"/signin"} style={{ color: '#EB5148', fontWeight: 'bold' }}>Login here!</Link>
        </Typography>

        <form className={styles.signupForm} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor=""> Username </label>
          <TextField
            id="filled-basic"
            variant="filled"
            placeholder='Please type here ...'
            sx={{ '& input': { padding: '10px' } }}
            type='text'
            {...register("userName", { required: true })}
          />
          {errors.userName && <Typography sx={{ margin: "0px", color: "red" }}>field is required</Typography>}

          <Grid container >
            <Grid item sm={6} >
              <Grid spacing={1} alignItems="center">
                <Grid item>
                  <label>Phone Number</label>
                </Grid>
                <Grid item>
                  <TextField
                    id="filled-basic"
                    variant="filled"
                    placeholder='Please type here'
                    sx={{ width: "90%", '& input': { padding: '10px' } }}
                    type='number'
                    {...register("phoneNumber", { required: true })}
                  />
                </Grid>
              </Grid>
              {errors.phoneNumber && (
                <Typography sx={{ margin: "0px", color: "red" }}>Field is required</Typography>
              )}
            </Grid>

            <Grid item sm={6} >
              <Grid spacing={1} alignItems="center">
                <Grid item>
                  <label >country</label>
                </Grid>
                <Grid item>
                  <TextField
                    id="filled-basic"
                    variant="filled"
                    placeholder='Please type here'
                    sx={{ width: "100%", '& input': { padding: '10px' } }}
                    type='text'
                    {...register("country", { required: true })}
                  />
                </Grid>
              </Grid>
              {errors.country && (
                <Typography sx={{ margin: "0px", color: "red" }}>Field is required</Typography>
              )}
            </Grid>
          </Grid>

          <label htmlFor=""> Email </label>
          <TextField
            id="filled-basic"
            variant="filled"
            placeholder='Please type here '
            sx={{ '& input': { padding: '10px' } }}
            type="email"
            {...register("email", { required: true })} />
          {errors.email && <Typography sx={{ margin: "0px", color: "red" }}>field is required</Typography>}

          <label htmlFor=""> Password </label>
          <TextField
            id="filled-basic"
            variant="filled"
            placeholder='Please type here '
            sx={{ '& input': { padding: '10px' } }}
            type='password'
            {...register("password", { required: true })} />
          {errors.password && <Typography sx={{ margin: "0px", color: "red" }}>field is required</Typography>}

          <label htmlFor=""> Confirm Password </label>
          <TextField
            id="filled-basic"
            variant="filled"
            placeholder='Please type here '
            sx={{ '& input': { padding: '10px' } }}
            type='password'
            {...register("confirmPassword", { required: true })} />
          {errors.confirmPassword && <Typography sx={{ margin: "0px", color: "red" }}>field is required</Typography>}

          <label htmlFor=""> role </label>
          <Select
            id="filled-basic"
            variant="filled"
            sx={{ '& input': { padding: '5px' } }}
            {...register("role", { required: true })} >
            <MenuItem value="admin">admin</MenuItem>
            <MenuItem value="user">user</MenuItem>
          </Select>
          {errors.role && <Typography sx={{ margin: "0px", color: "red" }}>field is required</Typography>}

          <label htmlFor=""> profile image </label>
          <TextField
            type='file'
            id="filled-basic"
            variant="filled"
            sx={{ width: "100%", '& input': { padding: '5px' }, marginBottom: "5px" }}
            {...register("profileImage", { required: true })}
          //  value= {`http://154.41.228.234:3000/${profileImg}`}
          />

          {errors.profileImage && <Typography sx={{ margin: "0px", color: "red" }}>field is required</Typography>}

          <Button variant="contained" color="primary" type="submit">
            Sign Up
          </Button>
        </form>
      </Grid>

      {/* <Grid item sm={1}></Grid> */}


      <Grid item xs={12} sm={6} sx={{ textAlign: 'end' }}>
        <img src={signUpImage} alt="Signup" />
      </Grid>

    </Grid >
  );
}
