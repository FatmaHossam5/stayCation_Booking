import { Box, Button, FormControl, Grid, IconButton, Modal, TextField, Typography, MenuItem, TableContainer, Table, TableHead, TableRow, tableCellClasses, TableCell, Paper, TableBody, ButtonBase} from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import  { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import axios from 'axios';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: "7px",
  boxShadow: 24,
  p: 4,
};
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#E2E5EB',
    color: 'black',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function Bookig() {

  const [modalState, setModalState] = useState('close')
  const handleClose = () => setModalState("close");
  const[book,setBook]=useState([])
  let reqHeaders = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NThhMTgyYjQ3ZWUyYjE0Zjk1NDY5OTAiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTcwNDQ4NDEyNiwiZXhwIjoxNzA1NjkzNzI2fQ.N9gU4yHP3g8g5ajsm_Tf6w1EIDJE-Gfu4e0tsPejUj8'
  let Headers = { Authorization: reqHeaders }
const getAllBookig =()=>{
  axios.get('http://154.41.228.234:3000/api/v0/admin/booking?page=1&size=10',{headers:Headers}).then((response)=>{
    console.log(response?.data?.data?.booking);
    // setBook(response?.data?.data?.booking);
  }).catch((error)=>{
    console.log(error.response.message);
    
  })
}
useEffect(()=>{
  getAllBookig()
},[])
  return (
    <>
    
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
      <Modal
        open={modalState === "delete-modal"}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton onClick={handleClose} sx={{ color: "red" }} >
              < CancelOutlinedIcon />
            </IconButton>
          </Grid>
          

          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: "center" }}>
            Delete This Room?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, textAlign: "center" }}>
            are you sure you want to delete this item ? if you are sure just click on delete it
          </Typography>
          <Grid sx={{ textAlign: 'right', mt: 3 }}>
            <Button variant="contained" color="error"  >  Delete  </Button>
          </Grid>
        </Box>
      </Modal>
      <Modal
        open={modalState === "update-modal"}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton onClick={handleClose} sx={{ color: "red" }} >
              < CancelOutlinedIcon />
            </IconButton>
          </Grid>
          {/* <FormControl component='form' >
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
                    {...register("roomNumber", { required: true })}
                  />
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
                  {...register("price", { required: true })} />
                {errors.price && errors.price.type === "required" && <Typography sx={{ color: "red" }}>price is required</Typography>}
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
                  {...register("capacity", { required: true })}
                />
                {errors.capacity && errors.capacity.type === "required" && <Typography sx={{ color: "red" }}>capacity is required</Typography>}
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
                  {...register("discount", { required: true })}
                />
                {errors.discount && errors.discount.type === "required" && <Typography sx={{ color: "red" }}>discount is required</Typography>}
              </Grid>
              <Grid item xs={6}>
               
              </Grid>
            </Grid>
            <Grid sx={{ textAlign: 'right', mt: 3 }}>
            <Button type='submit' variant="contained" color="primary"  >  Update  </Button>
          </Grid>
          </Box>
         
          </FormControl> */}
        </Box>
       
      </Modal>
      <Box>
        <Typography variant='h5'>Booking Table Details</Typography>
        <Typography variant='subtitle1'>You can check all details</Typography>
      </Box>
    </Box>
   
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {/* <StyledTableCell>Room Number</StyledTableCell> */}
            <StyledTableCell align="right">price</StyledTableCell>
            <StyledTableCell align="right">Start Date</StyledTableCell>
            <StyledTableCell align="right">End Date</StyledTableCell>
            <StyledTableCell align="right">User</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {book?.map((index) => (
            <StyledTableRow key={index._id}>
              {/* <StyledTableCell component="th" scope="row">
                {index?.booking?.roomNumber}
              </StyledTableCell> */}
             
              <StyledTableCell align="right">{index?.booking?.totalPrice}</StyledTableCell>
              <StyledTableCell align="right">{index?.booking?.startDate}</StyledTableCell>
              <StyledTableCell align="right">{index?.booking?.endDate}</StyledTableCell>
              <StyledTableCell align="right">{index?.booking?.user}</StyledTableCell>

              <StyledTableCell align="center">
                <IconButton >
                  < RemoveRedEyeIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  )
}