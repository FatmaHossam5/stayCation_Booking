import { Box, Button, Container, FormControl, Grid,TextField, Typography } from '@mui/material'
import * as React from 'react'
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Select from 'react-dropdown-select';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import useFacilities from '../../custom Hook/useFacilities';
import useRooms from '../../custom Hook/useRooms';


export default function AddRoom() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  let reqHeaders = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NThhMTgyYjQ3ZWUyYjE0Zjk1NDY5OTAiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTcwNDUzNjEyMCwiZXhwIjoxNzA1NzQ1NzIwfQ.p15lXfscJSFl8OJ4drIUj0vPPS3nO4L_U6iTbtwBdf8'
  let Headers = { Authorization: reqHeaders }
  const [selectedValue, setSelectedValue] = React.useState([])
  const [imgs, setImgs] = React.useState(''),
    handleImage = (e) => {
      setImgs(e.target.files[0])
    }
    const navigate=useNavigate();
    const{facilities}=useFacilities();
    const{getAllRooms}=useRooms();

   
 
  const theme = createTheme({
    components: {
      MuiFilledInput: {
        styleOverrides: {
          underline: {
            '&:after': {
              borderBottom: 'none',
            },
            '&:before': {
              borderBottom: 'none',
            },
          },
        },
      },
    },

  });
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  {/*Add Room Function */ }

  const AddNewRoom = (data) => {
    const formattedSelected = selectedValue.map(({ value }) => value)
    axios.post('http://154.41.228.234:3000/api/v0/admin/rooms', { ...data, imgs: data.imgs[0], facilities: formattedSelected }, { headers: { ...Headers, "Content-Type": "multipart/form-data" } }).then((response) => {
    toast.success("Added SuccessFully!")
      navigate('/dashboard/rooms')
      getAllRooms()
    }).catch((error) => {
      toast.error(error?.response?.data)

    })



  }
React.useEffect(()=>{
  getAllRooms()

},[])

  return (
    <>
      <Container>
        <Box sx={{ display: "flex", justifyContent: "center" }}>

          <FormControl component='form' sx={{ display: "flex", justifyContent: "center", alignItems: "center" }} defaultValue="" required onSubmit={handleSubmit(AddNewRoom)}>

            <ThemeProvider theme={theme}>

              <Box sx={{ width: '100%', display: "flex", justifyContent: "center" }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }} >
                  <Grid item xs={12} sx={{ color: "#17202A" }} >
                    <TextField
                      InputLabelProps={{
                        style: { color: 'black' },
                      }}
                      sx={{ bgcolor: "#F7F7F7", mb: 5, }}
                      variant='filled'
                      label="Room Number"
                      fullWidth
                      {...register("roomNumber",{required:true})}
                    />
                    {errors.roomNumber&&errors.roomNumber.type==="required"&& <Typography sx={{color:"red"}}>Room Number is required</Typography>}

                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
                  <Grid item xs={6} >
                    <TextField
                      InputLabelProps={{
                        style: { color: 'black' },
                      }}

                      variant='filled'
                      sx={{
                        bgcolor: "#F7F7F7", display: "flex",
                        justifyContent: "flex-start"
                      }}
                      label="Price"
                      {...register("price",{required:true,valueAsNumber:true})} />
                    {errors.price&&errors.price.type==="required"&& <Typography sx={{color:"red"}}>price is required</Typography>}

                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      InputLabelProps={{
                        style: { color: 'black' },
                      }}
                      sx={{
                        bgcolor: "#F7F7F7", mb: 5, display: "flex",
                        justifyContent: "flex-end",
                      }}
                      variant='filled'
                      label="Capacity"
                      {...register("capacity",{required:true})}
                    />
                    {errors.capacity&&errors.capacity.type==="required"&& <Typography sx={{color:"red"}}>capacity is required</Typography>}

                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      InputLabelProps={{
                        style: { color: 'black' },
                      }}
                      sx={{
                        bgcolor: "#F7F7F7", mb: 5, display: "flex",
                        justifyContent: "flex-start",
                      }}
                      variant='filled'
                      label="Discount"
                      {...register("discount",{required:true})}
                    />
                    {errors.discount&&errors.discount.type==="required"&& <Typography sx={{color:"red"}}>discount is required</Typography>}


                  </Grid>
                  <Grid item xs={6}>
                    <Select
                      options={facilities}
                      onChange={(selectedValue) => setSelectedValue(selectedValue)}
                      multi
                      placeholder="Select Facilities"
                    >
                    </Select>
                  </Grid>
                </Grid>
              </Box>
              <Grid item xs={12} >
                <Box
                  sx={{
                    textAlign:"center",
                    border: "1px #009247 dashed",
                    borderColor: "#009247",
                    bgcolor:"#EAFAF1",
                    borderRadius: 4,
                    width:"100%",
                    padding: "10px",
                  }}
                >
                     <Button component="label"  startIcon={<FileUploadOutlinedIcon color='action' />}  onChange={handleImage} {...register('imgs')}>
                     <VisuallyHiddenInput type="file" />
                     </Button>
                  <Typography sx={{color:'black'}}>Drag & Drop or <Box component="span" sx={{color:"#009247"}}> Choose a Room Images</Box>  to Upload</Typography>
               
                </Box>
              </Grid>
              <Grid item xs={12}   sx={{
       marginLeft:"auto",
       marginTop:3
        
        
         
        }}>
    
        <Button onClick={()=>navigate(-1)} type='button' variant="outlined" sx={{ color:'#203FC7',mr:5}}>
          Cancel
        </Button>
        <Button type='submit' variant="contained" sx={{ color:'white',bgcolor:'#203FC7'}}>
          Save
        </Button>
    
    </Grid>
          
            </ThemeProvider>
          </FormControl>

        </Box>
      </Container>






    </>
  )
}
