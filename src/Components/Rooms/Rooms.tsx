// import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
  , Paper, tableCellClasses, Box, Typography, Button
  , TextField, InputLabel, MenuItem, FormControl, IconButton, Modal, Grid, FormLabel, FormHelperText
} from '@mui/material';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Avatar from '../../assets/avatar.png'
import { useNavigate } from 'react-router';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import trash from '../../assets/Email (1).png'
import { useForm } from 'react-hook-form';
import Select from 'react-dropdown-select';


{/*MUI Table Style */ }
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#E2E5EB',
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover,
  },

  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

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
export default function Rooms() {
  const [age, setAge] = useState('');
  const [modalState, setModalState] = useState('close')
  const [roomId, setRoomId] = useState(0)
  const [facilities, setFacilities] = useState([{ "value": '', 'label': '' }])
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [selectedValue, setSelectedValue] = useState([])
  const [rooms, setRooms] = useState([])
  const navigate = useNavigate()
  let reqHeaders = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NThhMTgyYjQ3ZWUyYjE0Zjk1NDY5OTAiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTcwNDQ4NDEyNiwiZXhwIjoxNzA1NjkzNzI2fQ.N9gU4yHP3g8g5ajsm_Tf6w1EIDJE-Gfu4e0tsPejUj8'
  let Headers = { Authorization: reqHeaders }
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };


  {/*List Room */ }
  const getAllRooms = () => {
    axios.get('http://154.41.228.234:3000/api/v0/admin/rooms?page=1&size=10', { headers: Headers }).then((response) => {
      console.log(response);
      setRooms(response?.data?.data?.rooms)

    }).catch((error) => {
      console.log(error);

    })
  }
  {/*Get All Facilities */ }
  const getAllFacilities = () => {
    axios.get('http://154.41.228.234:3000/api/v0/admin/room-facilities', { headers: Headers }).then((response) => {
      const newFacilities = response?.data?.data?.facilities
      const facilities = newFacilities.map(({ _id: value, name: label }) => ({ value, label }))
      setFacilities(facilities)

    }).catch((error) => {
      console.log(error);
    })
  }

  {/*Show Modals */ }

  const showDeleteModal = (id) => {
    setModalState('delete-modal')
    setRoomId(id)
  }
  const showUpdateModal = (room) => {
    setModalState('update-modal')
    setRoomId(room._id)
    setValue("roomNumber", room.roomNumber);
    setValue("price", room.price);
    setValue("capacity", room.capacity);
    setValue("discount", room.discount);
  }
  const handleClose = () => setModalState("close");

  {/* Delete Room */ }
  const deleteRoom = () => {
    axios.delete(`http://154.41.228.234:3000/api/v0/admin/rooms/${roomId}`, { headers: Headers })
      .then((response) => {
        console.log(response);
        setRoomId(roomId);
        handleClose();
        getAllRooms()

      }).catch((error) => {
        console.log(error);
      })
  }
  {/* Update Room */ }
  const UpdateRoom = (data) => {
    const formattedSelected = selectedValue.map(({ value }) => value)
    axios.put(`http://154.41.228.234:3000/api/v0/admin/rooms/${roomId}`, { ...data, facilities: formattedSelected }, { headers: { ...Headers, "Content-Type": "multipart/form-data" } }).then((response) => {
      console.log(response);
      handleClose();
      getAllRooms();
    }).catch((error) => {
      console.log(error);

    })
  }

  useEffect(() => {
    getAllRooms(),
    getAllFacilities()
  }, [])

  return (<>
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
          <Grid sx={{ textAlign: "center" }}>
            <img src={trash} alt="trash" />
          </Grid>

          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: "center" }}>
            Delete This Room?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, textAlign: "center" }}>
            are you sure you want to delete this item ? if you are sure just click on delete it
          </Typography>
          <Grid sx={{ textAlign: 'right', mt: 3 }}>
            <Button variant="contained" color="error" onClick={deleteRoom} >  Delete  </Button>
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
          <FormControl component='form' onSubmit={handleSubmit(UpdateRoom)}>
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
                  {errors.roomNumber && errors.roomNumber.type === "required" && <Typography sx={{ color: "red" }}>Room Number is required</Typography>}
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
                <Select
                  options={facilities}
                  onChange={(selectedValue) => setSelectedValue(selectedValue)}
                  multi
                ></Select>
              </Grid>
            </Grid>
            <Grid sx={{ textAlign: 'right', mt: 3 }}>
            <Button type='submit' variant="contained" color="primary"  >  Update  </Button>
          </Grid>
          </Box>
         
          </FormControl>
        </Box>
       
      </Modal>
      <Box>
        <Typography variant='h5'>Rooms Table Details</Typography>
        <Typography variant='subtitle1'>You can check all details</Typography>
      </Box>
      <Button variant="contained" onClick={() => { navigate('/dashboard/add-room'); }}>Add New Room</Button>
    </Box>
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box
        sx={{ width: 500, maxWidth: '100%', mb: 3 }}>
        <TextField fullWidth label="Search by number ..." id="fullWidth" />
      </Box>
      <Box>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            value={age}
            onChange={handleChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="">
              <em>Tag</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            value={age}
            onChange={handleChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="">
              <em>Category</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">room number</StyledTableCell>
            <StyledTableCell align="right">image</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">Discount</StyledTableCell>
            <StyledTableCell align="right">Capacity</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rooms.map((room) => (
            <StyledTableRow key={room?.id}>
              <StyledTableCell align="center">{room?.roomNumber}</StyledTableCell>
              <StyledTableCell component="th" scope="row" crossorigin='anonymous'>{room?.images[0] === '' ? <img src={Avatar} /> : <img src={'http://upskilling-egypt.com:3000/uploads/' + room?.images[0]} alt="" />}
              </StyledTableCell>
              <StyledTableCell align="right">{room?.price}</StyledTableCell>
              <StyledTableCell align="right">{room?.discount}</StyledTableCell>
              <StyledTableCell align="right">{room?.capacity}</StyledTableCell>
              <StyledTableCell align="center">
                <IconButton onClick={() => showUpdateModal(room)} >
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => showDeleteModal(room._id)}>
                  < DeleteOutlineOutlinedIcon />
                </IconButton>
                <IconButton >
                  < RemoveRedEyeIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>);
}
