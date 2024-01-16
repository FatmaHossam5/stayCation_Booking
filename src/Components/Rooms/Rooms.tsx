// import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
  , Paper, tableCellClasses, Box, Typography, Button
  , TextField, InputLabel, MenuItem, FormControl, IconButton, Modal, Grid
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Avatar from '../../assets/avatar.png'
import { useNavigate } from 'react-router';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import trash from '../../assets/Email (1).png'
import useRooms from '../../custom Hook/useRooms';



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
  // hide last border
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
  
    
    const{rooms,getAllRooms}=useRooms();
    const navigate=useNavigate()
  const [age, setAge] = useState('');
  const [modalState, setModalState] = useState('close')
  const [roomId, setRoomId] = useState(0)
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  let reqHeaders = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NThhMTgyYjQ3ZWUyYjE0Zjk1NDY5OTAiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTcwNDQ4NDEyNiwiZXhwIjoxNzA1NjkzNzI2fQ.N9gU4yHP3g8g5ajsm_Tf6w1EIDJE-Gfu4e0tsPejUj8'
  let Headers = { Authorization: reqHeaders }



  const showDeleteModal = (id) => {
    setModalState('delete-modal')
    setRoomId(id)

  }
  const handleClose = () => setModalState("close");

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
  useEffect(() => { getAllRooms() }, [])


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
      <Box>
        <Typography variant='h5'>Rooms Table Details</Typography>
        <Typography variant='subtitle1'>You can check all details</Typography>
      </Box>
    <Button variant="contained"onClick={() => {navigate('/dashboard/rooms/add-room');}}>Add New Room</Button>
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
              <StyledTableCell align="right" >{room?.price}</StyledTableCell>
              <StyledTableCell align="right">{room?.discount}</StyledTableCell>
              <StyledTableCell align="right">{room?.capacity}</StyledTableCell>
              <StyledTableCell align="center">
                <IconButton >
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => showDeleteModal(room._id)}>
                  < DeleteOutlineOutlinedIcon />
                </IconButton>
             
              </StyledTableCell>


            </StyledTableRow>
          ))}

        </TableBody>
      </Table>
    </TableContainer>
  </>);
}
