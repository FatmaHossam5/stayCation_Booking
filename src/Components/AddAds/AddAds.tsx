import { Button, FormControl, Modal } from '@mui/base';
import { Grid, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: '#203FC7',
  borderRadius: "7px",
  boxShadow: 24,
  p: 5,
};

export default function AddAds() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [rooms, setRooms] = useState([])
  const [ads, setAds] = useState([])
  let reqHeaders = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NThhMTgyYjQ3ZWUyYjE0Zjk1NDY5OTAiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTcwNDQ4NDEyNiwiZXhwIjoxNzA1NjkzNzI2fQ.N9gU4yHP3g8g5ajsm_Tf6w1EIDJE-Gfu4e0tsPejUj8'
  let Headers = { Authorization: reqHeaders }
  const navigate=useNavigate()

console.log(errors);

  {/*Get All Ads */ }
  const getAllAds = () => {
    axios.get('http://154.41.228.234:3000/api/v0/admin/ads', { headers: Headers }).then((response) => {
      console.log(response.data.data.ads);
      setAds(response.data.data.ads)
    }).catch((error) => {
      console.log(error.response.message);
    })


  }


  {/*create Ads */ }
  const createAds = (data) => {
    axios.post('http://154.41.228.234:3000/api/v0/admin/ads', data, { headers: Headers }).then((response) => {
      console.log(response);
      navigate(-1)
      getAllAds();

    }).catch((error) => {
      console.log(error);

    })
  }
  {/*Get All Rooms */ }

  const getAllRooms = () => {
    axios.get('http://154.41.228.234:3000/api/v0/admin/rooms?page=1&size=10', { headers: Headers }).then((response) => {
      console.log(response);
      setRooms(response?.data?.data?.rooms)

    }).catch((error) => {
      console.log(error);

    })
  }
  const handleClose =()=>{
    navigate('/dashboard/ads')
  }

  useEffect(() => {
    getAllAds();
      getAllRooms();
  }, [])
  return (
    <>
      <Box  >
        <Box sx={style} >
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Typography variant="h4" color="white">Ads</Typography>
            <IconButton sx={{ color: "white" }} onClick={handleClose} >
              < CancelOutlinedIcon />
            </IconButton>
          </Grid>
          <form onSubmit={handleSubmit(createAds)} as="form" >
            <Box sx={{textAlign:"center"}}>
              <Grid>
                <select {...register("room", { required: true })} className='selectStyle'defaultValue=''>
                <option value="" disabled > Room Name</option>

                  {rooms.map((room) => <option value={room._id}>{room.roomNumber}</option>)}
                </select>
              </Grid>
              {errors.room && errors.room.type === 'required' && <span className='span-error'> Room Name is required </span>}

              <Grid>
                <input type="number" {...register("discount", { required: true,valueAsNumber:true })} placeholder='Discount' className='selectStyle' />
              </Grid>
              {errors.discount && errors.discount.type === 'required' && <span className='span-error'> Discount is required </span>}

              <Grid>
                <select {...register("isActive", { required: true })} className='selectStyle' defaultValue=''>
                  <option value="" disabled > Active</option>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </Grid>
              {errors.isActive && errors.isActive.type === 'required' && <span className='span-error' > This Field is required </span>}

              <Grid sx={{ textAlign: 'right', mt: 3 }}>
                <Button type='submit' variant="contained" color="primary" className='addAds'>  save  </Button>
              </Grid>
            </Box>
          </form>
        </Box>
      </Box>



    </>
  )
}
