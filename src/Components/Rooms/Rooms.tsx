// import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
  , Paper, tableCellClasses, Box, Typography, Button
  , TextField, InputLabel, MenuItem, FormControl, IconButton, Modal, Grid, Menu
} from '@mui/material';
import Select from 'react-dropdown-select';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {  useContext, useEffect, useState } from 'react';
import useFacilities from '../../custom Hook/useFacilities';
import axios from 'axios';
import Avatar from '../../assets/avatar.png'
import { useNavigate } from 'react-router';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import trash from '../../assets/Email (1).png'
import useRooms from '../../custom Hook/useRooms';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Context/AuthContext';
import CustomPagination from '../Pagination/Pagination';




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
  width: 800,
  bgcolor: 'background.paper',
  borderRadius: "7px",

  boxShadow: 24,
  p: 4,
};


export default function Rooms() {
const [roomId, setRoomId] = useState(0)
const { register, handleSubmit, formState: { errors }, setValue } = useForm();
const [selectedValue, setSelectedValue] = useState([])
const{formattedFacilities}=useFacilities()
const navigate=useNavigate()

const [modalState, setModalState] = useState('close')
const{baseUrl,reqHeaders}=useContext(AuthContext)
const{rooms,refetchRooms , currentPage, totalPages, rowsPerPage, handlePageChange, handleRowsPerPageChange}=useRooms();

// console.log(refetchRooms);
const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
const open = Boolean(anchorEl);
const [anchorElArray, setAnchorElArray] = useState(Array(rooms.length).fill(null));

const handleClick = (event: MouseEvent<HTMLElement>, index: number) => {
  const newAnchorElArray = [...anchorElArray];
  newAnchorElArray[index] = event.currentTarget;
  setAnchorElArray(newAnchorElArray);
};

const handleCloseAncorEl = (index: number) => {
  const newAnchorElArray = [...anchorElArray];
  newAnchorElArray[index] = null;
  setAnchorElArray(newAnchorElArray);
};

       {/* show Modals */}
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

  const UpdateRoom = (data) => {
    const formattedSelected = selectedValue.map(({ value }) => value)
    axios.put(`${baseUrl}/admin/rooms/${roomId}`, { ...data, facilities: formattedSelected }, { headers: { ...reqHeaders, "Content-Type": "multipart/form-data" } }).then((response) => {
      toast.success("Updated SuccessFully!")
      handleClose();
      refetchRooms ();
    }).catch((error) => {
     
      
      toast.error(error?.response?.data?.message)

    })
  }

  const deleteRoom = () => {
    axios.delete(`${baseUrl}/admin/rooms/${roomId}`, { headers: reqHeaders })
      .then((response) => {
        toast.success("Deleted SuccessFully !")
        setRoomId(roomId);
        handleClose();
        refetchRooms ()
    

      }).catch((error) => {
      
        toast.error(error?.response?.data)
      })
  }


  return (<>
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
                  options={formattedFacilities}
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
  
    <Box sx={{display:"flex",justifyContent:"space-between",mb:4}}>
      <Box>
      <Typography variant='h5'>Rooms Table Details</Typography>
      <Typography variant='subtitle1'>You can check all details</Typography>
      </Box>
    <Button variant="contained"onClick={() => {navigate('/dashboard/rooms/add-room');}}>Add New Room</Button>
    </Box>
    <Box sx={{display:"flex",justifyContent:"space-between"}}>
      <Box
      sx={{width: 500,maxWidth: '100%',mb:3}}>
      <TextField  fullWidth label="Search by number ..." id="fullWidth" />
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
            <StyledTableCell align="right">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rooms.map((room,index) => (
            <StyledTableRow  key={room.index}>
              <StyledTableCell align="center">{room?.roomNumber}</StyledTableCell>

              <StyledTableCell align='right'>{room?.images&&room?.images.length>0?<img src={room?.images[0]} style={{width:'50px',height:"50px",borderRadius:"25px"}}/>:<img src={Avatar} style={{width:'50px',height:"50px"
              }}/>}
          
              </StyledTableCell>
              <StyledTableCell align="right" >{room?.price}</StyledTableCell>
              <StyledTableCell align="right">{room?.discount}</StyledTableCell>
              <StyledTableCell align="right">{room?.capacity}</StyledTableCell>
              <StyledTableCell align="right">
            

<div>
        <IconButton
          aria-label="more"
          id={`long-button-${index}`}
          aria-controls={open ? `long-menu-${index}` : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={(event) => handleClick(event, index)}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id={`long-menu-${index}`}
          MenuListProps={{
            'aria-labelledby': `long-button-${index}`,
          }}
          anchorEl={anchorElArray[index]}
          open={Boolean(anchorElArray[index])}
          onClose={() => handleCloseAncorEl(index)}
        >
       
       <MenuItem onClick={()=>{handleClose();showDeleteModal(room._id)}}>
          <IconButton aria-label="delete">
                  < DeleteOutlineOutlinedIcon />
                </IconButton>
                Delete
          </MenuItem>
          <MenuItem onClick={() => { handleClose(); showUpdateModal(room) }}>
                              <IconButton >
                                <EditIcon />
                              </IconButton>
                              Update
                            </MenuItem>
        </Menu>
      </div>



              </StyledTableCell>


            </StyledTableRow>
          ))}
          
        </TableBody>
       
      </Table>
      <CustomPagination
        totalCount={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
      /> 
    </TableContainer>
    </>  );
}
