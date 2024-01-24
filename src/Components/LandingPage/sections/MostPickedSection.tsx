import img1 from '../../../assets/download.png'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box, FormControl, Grid, TextField } from '@mui/material';
import { useContext, useEffect, useState } from "react";
import styles from './MostPickedTaskTest.module.css'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import axios from 'axios';
import { AuthContext } from '../../../Context/AuthContext';
import Modal from '@mui/material/Modal';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function MostPickedSection() {

  const { userRole }: any = useContext(AuthContext)
  const [showState, setShowState] = useState();
  const handleClose = () => setShowState(false);
  const navigate = useNavigate()
  const [ads, setAds] = useState();

  const getMostPicked = () => {
    axios.get("http://154.41.228.234:3000/api/v0/portal/ads", {
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTlhMjAzNTYzODg0OGJjZTZmMDBmOTciLCJyb2xlIjoidXNlciIsInZlcmlmaWVkIjpmYWxzZSwiaWF0IjoxNzA1NjEyNDgwLCJleHAiOjE3MDY4MjIwODB9.3cdcgYBnwf4VNWPbMJcOn0sMPBtgPqY7_90Bmf5mxqw"
      }
    })
      .then((response) => {
        setAds(response.data.data.ads)
        console.log(response.data.data.ads);
        
      })
      .catch((error) => console.log(error))
  }

  const addToFav = (item: any) => {
    axios.post(`http://154.41.228.234:3000/api/v0/portal/favorite-rooms`, {
      roomId: item
    }, {
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTlhMjAzNTYzODg0OGJjZTZmMDBmOTciLCJyb2xlIjoidXNlciIsInZlcmlmaWVkIjpmYWxzZSwiaWF0IjoxNzA1NjEyNDgwLCJleHAiOjE3MDY4MjIwODB9.3cdcgYBnwf4VNWPbMJcOn0sMPBtgPqY7_90Bmf5mxqw"
      }
    })
      .then((response) => {
        toast.success(response.data.data.message);
      })
      .catch((error) =>
      toast.error(error.response.data.message)
       )
  }

  const showDetails = (item: any) => {
    // console.log(item);
    navigate(`/details/${item}`)
    // add this path in App.tsx : {path:"details/:id",element:<Details/>}
  }

  const login = () => {
    setShowState('unloginUser');
  }

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    borderColor: "#fff"
  };

  useEffect(() => {
    getMostPicked()
    console.log(userRole);
    
  }, [])

  const { register, handleSubmit, formState: { errors } } = useForm();
  const { baseUrl }: any = useContext(AuthContext)

  const signIn = (data: any) => {
    axios.post(`${baseUrl}/admin/users/login`, data).then((response) => {
      console.log(response);
      handleClose()
      toast.success(response?.data?.message);
      localStorage.removeItem("userToken")
      localStorage.removeItem("role")
      // remove token of manager if he was manager and store new token
      // changes in navbar (add logout button)
    }).catch((error) => {
      toast.error(error?.response?.data?.message);
    })
  }

  return (
    <div>

      {/* sign in */}
      <Modal
        open={showState == 'unloginUser'}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <FormControl component="form" onSubmit={handleSubmit(signIn)} sx={{ padding: "2rem", border: "none" }}>
            <Grid containersx={{ bgcolor: "#ffffff", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Grid item xs={12}>
                <Typography sx={{ color: '#000000', mr: 2, display: "flex", justifyContent: "flex-start", fontFamily: "Poppins", fontWeight: 300, marginBottom: '5px' }} >login first to enable to add rooms in your favorite...</Typography>
                <Typography sx={{ color: '#000000', mr: 2, display: "flex", justifyContent: "flex-start", fontFamily: "Poppins", fontWeight: 300 }} >Email Address</Typography>
                <TextField {...register('email', { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })} label="Email" type="email" margin="normal" fullWidth sx={{ bgcolor: "#F5F6F8", fontFamily: "Poppins" }} />
                {errors.email && errors.email.type === 'required' && (<Typography sx={{ color: 'red' }}>email is required</Typography>)}
                <Typography sx={{ color: '#000000', mr: 2, display: "flex", justifyContent: "flex-start", fontFamily: "Poppins", fontWeight: 300 }} >Password</Typography>
                <TextField {...register('password', { required: true })} label="Password" type="password" margin="normal" fullWidth sx={{ bgcolor: "#F5F6F8", fontFamily: "Poppins" }} />
                {errors.password && errors.password.type === 'required' && (<Typography sx={{ color: "red" }}> password is required</Typography>)}
                <Typography sx={{ color: '#000000', mr: 2, display: "flex", justifyContent: "flex-start", fontFamily: "Poppins", fontWeight: 300 }} >
                  <Link to={'/signup'} style={{ textDecoration: "none" }}>Creat an account!</Link>
                </Typography>
                <Button type="submit" variant="contained" fullWidth sx={{ bgcolor: '#3252DF', '&:hover': { bgcolor: '#2843CC' }, marginTop: "10px", fontFamily: "Poppins" }}>
                  Sign In
                </Button>
              </Grid>

            </Grid>
          </FormControl>


        </Box>
      </Modal >

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ justifyContent: "center", padding: "3rem 0" }}>

        <Grid item xs={10} >
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: "1rem" }}>
            Houses with beauty backyard
          </Typography>
        </Grid>

        {/* main section */}
        <Grid item xs={10} container sx={{ justifyContent: "space-between" }}>
          {
            ads?.slice(6).map((item: any) => {
              return (

                <div className={`${styles.child}`}>
                  <div className={`${styles.layer}`}>
                    {
                      userRole == "user" ?
                        <>
                          <FavoriteBorderOutlinedIcon sx={{ marginRight: "0.7rem" }} onClick={() => addToFav(item._id)} />
                          <RemoveRedEyeIcon onClick={() => showDetails(item._id)} />
                        </>
                        : <>
                          <FavoriteBorderOutlinedIcon sx={{ marginRight: "0.7rem" }} onClick={login} />
                          <RemoveRedEyeIcon onClick={() => showDetails(item._id)} />
                        </>
                    }
                  </div>
                  <div className={`${styles.badge}`}>{item?.room?.discount}% off</div>
                  <img src={item?.room?.images?.length == 0 ?
                    img1
                    : item?.room?.images[0]?.startsWith("http")
                      ? item?.room?.images[0]
                      : `http://154.41.228.234:3000` + item?.room?.images[0]}
                    style={{ width: "100%", height: "100%", borderRadius: "0.7rem" }} alt="" />
                  <div className={`${styles.details}`}>
                    <p style={{ fontSize: "20px", marginBottom: "0.3rem" }}>Ocean Land</p>
                    <p>Room price : {item?.room?.price} </p>
                  </div>

                  <div style={{ marginBottom: "1erm" }}>
                    <Typography variant="body1" component="p">
                      Room number : {item?.room?.capacity}
                    </Typography>
                    <Typography variant="caption" component="p" sx={{ color: "#B0B0B0" }}>
                      Room number : {item?.room?.roomNumber}
                    </Typography>
                  </div>
                </div>
              )
            })}

        </Grid>

      </Grid>
    </div>
  )
}

