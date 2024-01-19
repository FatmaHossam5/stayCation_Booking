
import { Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography, FormControl, FormLabel, FormHelperText, FormGroup, Container, CssBaseline, Stack, ListItem, Button, InputAdornment } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import useRooms from '../../custom Hook/useRooms';
import { useAdsContext } from '../../Context/AdsContext';

const style = {
  position: 'absolute' as 'absolute',
  top: '55%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: '#203FC7',
  borderRadius: "7px",
  boxShadow: 24,
  p: 5,
};

export default function AddAds() {
  const { register, handleSubmit, formState: { errors },control } = useForm();
  const navigate=useNavigate();
  const {rooms ,refetchRooms}=useRooms();
  let reqHeaders = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NThhMTgyYjQ3ZWUyYjE0Zjk1NDY5OTAiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTcwNDQ4NDEyNiwiZXhwIjoxNzA1NjkzNzI2fQ.N9gU4yHP3g8g5ajsm_Tf6w1EIDJE-Gfu4e0tsPejUj8'
  let Headers = { Authorization: reqHeaders }
  const [ads, setAds] = useState([])
const[isActive,setIsActive]=useState("")
const handleSelectChange = (event) => {
  const selectedValue = event.target.value ;
  setIsActive(selectedValue);
};
 
console.log(errors);

  {/*Get All Ads */ }
  const getAllAds = () => {
    axios.get('http://154.41.228.234:3000/api/v0/admin/ads', { headers: Headers }).then((response) => {
     
      setAds(response.data.data.ads)
    }).catch((error) => {
    
      
      toast.error(error.response.message);
    })


  }


  {/*create Ads */ }
  const createAds = (data) => {
 

    axios.post('http://154.41.228.234:3000/api/v0/admin/ads', data, { headers: Headers }).then((response) => {
  
    toast.success("Added SuccessFully !")
      navigate(`/dashboard/ads`)
 

    }).catch((error) => {
   toast.error(error?.response?.data)

    })
  }

  const handleClose =()=>{
    navigate('/dashboard/ads')
  }

  useEffect(() => {
    getAllAds();
   
  }, [])
  return (
    <>
       
      <Box>
        <Box sx={style}>
          <Grid container spacing={3}>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h4" color="white">
                Ads
              </Typography>
              <IconButton sx={{ color: 'white' }} onClick={handleClose}>
                <CancelOutlinedIcon />
              </IconButton>
            </Grid>
            <form onSubmit={handleSubmit(createAds)} style={{width:'100%'}}>
      <Box sx={{ margin:"auto" }}>
        <Grid item lg={12}>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel htmlFor="room" sx={{ color: 'white' }}>
              Room Name
            </InputLabel>
            <Select
              {...register('room', { required: true })}
              className="selectStyle"
              defaultValue=""
              error={Boolean(errors.room)}
              

            >
              <MenuItem value="" disabled>
                Room Name
              </MenuItem>
              {rooms.map((room) => (
                <MenuItem key={room?._id} value={room?._id}>
                  {room?.roomNumber}
                </MenuItem>
              ))}
            </Select>
            {errors.room && errors.room.type === 'required' && (
              <Typography color="error">Room Name is required</Typography>
            )}
          </FormControl>

          <FormControl fullWidth sx={{ mt: 2 }}>
          
          
                <TextField
      InputLabelProps={{
        style: { color: 'white' },
      }}
      sx={{
        bgcolor: '#203FC7',
        mb: 1,
        display: 'flex',
        justifyContent: 'flex-start',
        borderRadius:"7px",
        borderBottom:"none",
        

      }}
      variant="filled"
      label="Discount"
      {...register('discount', { required: true })}
      error={Boolean(errors.discount)}
      helperText={errors.discount && errors.discount.type === 'required' && 'Discount is required'}
    />
          </FormControl>

 
             <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel htmlFor="isActive" sx={{ color: 'white' }}>
                      Active
                    </InputLabel>
                  
                        <Select
                       {...register('isActive',{required:true})}
                          className="selectStyle"
                          error={Boolean(errors.isActive)}
                          value={isActive}
                          onChange={handleSelectChange}

                        >
                          <MenuItem value="" disabled>
                            Active
                          </MenuItem>
                          <MenuItem value={true}>Yes</MenuItem>
                          <MenuItem value={false}>No</MenuItem>
                        </Select>
                     
                   
                    {errors.isActive && (
                      <Typography color="error">This Field is required</Typography>
                    )}
                  </FormControl> 
             

          <Grid item sx={{ textAlign: 'right', mt: 3 }}>
            <Button type="submit" variant="contained"sx={{bgcolor:" #203FC7"}}  className="addAds">
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
          </Grid>
        </Box>
      </Box>
  

    </>
  )
}
