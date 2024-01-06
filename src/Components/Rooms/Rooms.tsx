// import * as React from 'react';
import { styled } from '@mui/material/styles';
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow
  ,Paper,tableCellClasses, Box, Typography, Button
,TextField,InputLabel,MenuItem,FormControl  } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {  useEffect, useState } from 'react';
import axios from 'axios';
import Avatar from '../../assets/avatar.png'
import { useNavigate } from 'react-router';


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


export default function Rooms() {
const [age, setAge] =useState('');
const handleChange = (event: SelectChangeEvent) => {
  setAge(event.target.value);
};
const[rooms,setRooms]=useState([])
let reqHeaders='Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NThhMTgyYjQ3ZWUyYjE0Zjk1NDY5OTAiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTcwNDQ4NDEyNiwiZXhwIjoxNzA1NjkzNzI2fQ.N9gU4yHP3g8g5ajsm_Tf6w1EIDJE-Gfu4e0tsPejUj8'
let Headers ={Authorization:reqHeaders}
const navigate=useNavigate()
const getAllRooms = () =>{
  axios.get('http://154.41.228.234:3000/api/v0/admin/rooms?page=1&size=10',{headers:Headers}).then((response)=>{
    console.log(response);
    setRooms(response?.data?.data?.rooms)
  }).catch((error)=>{
    console.log(error);
    
  })
}
console.log(rooms);

useEffect(()=>{getAllRooms()},[])
  return (<>
    <Box sx={{display:"flex",justifyContent:"space-between",mb:4}}>
      <Box>
      <Typography variant='h5'>Rooms Table Details</Typography>
      <Typography variant='subtitle1'>You can check all details</Typography>
      </Box>
    <Button variant="contained"onClick={() => {navigate('/dashboard/add-room');}}>Add New Room</Button>
    </Box>
    <Box sx={{display:"flex",justifyContent:"space-between"}}>
      <Box
      sx={{width: 500,maxWidth: '100%',mb:3}}>
      <TextField  fullWidth label="Search by number ..." id="fullWidth" />
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
            <StyledTableCell align="right">Category</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rooms.map((room) => (
            <StyledTableRow  key={room?.id}>
              <StyledTableCell align="center">{room?.roomNumber}</StyledTableCell>

              <StyledTableCell component="th" scope="row">{room?.images[0]===''?<img src={Avatar}/>:<img src={'http://upskilling-egypt.com:3000/uploads/'+room?.images[0]} alt="" />}
          
              </StyledTableCell>
              <StyledTableCell align="right">{room?.price}</StyledTableCell>
              <StyledTableCell align="right">{room?.discount}</StyledTableCell>
              <StyledTableCell align="right">{room?.capacity}</StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>  );
}