import { Typography, TextField, Button, Grid } from '@mui/material';
import styles from '../SignUp/SignUp.module.scss';
import signUpImage from "../../assets/Rectangle 8.png"
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function ChangePassword() {


  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({ mode: "all" })

  const reqHeaders = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NThhMTgyYjQ3ZWUyYjE0Zjk1NDY5OTAiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTcwNDk3MTU4MSwiZXhwIjoxNzA2MTgxMTgxfQ.GNEwSislg2H1QrSh5o6qwWeex9TjICFe8v5gZwDcqo0"

  const onSubmit = (data: any) => {
    console.log(data);
    
    axios.post("http://154.41.228.234:3000/api/v0/admin/users/change-password", data, { 
      headers: { Authorization: reqHeaders }
    }
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
        <img src={signUpImage} />
      </Grid>

    </Grid >
  )
}