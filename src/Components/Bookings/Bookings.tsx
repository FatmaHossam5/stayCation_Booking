import { Box, Button, FormControl, Grid, IconButton, Modal, TextField, Typography, MenuItem, TableContainer, Table, TableHead, TableRow, tableCellClasses, TableCell, Paper, TableBody, ButtonBase, TablePagination, Menu} from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import  { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { toast } from 'react-toastify';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#203FC7',
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

 
  const[book,setBook]=useState([])
  const{baseUrl,reqHeaders}=useContext(AuthContext)
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesArray, setPagesArray] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showState, setShowState] = useState();
  const [itemID, setItemID] = useState(0);
  const handleClose = () => setShowState(false);
  const [anchorElArray, setAnchorElArray] = useState(Array(book?.length).fill(null));

  const handleClick = (event, index) => {
    const newAnchorElArray = [...anchorElArray];
    newAnchorElArray[index] = event.currentTarget;
    setAnchorElArray(newAnchorElArray);
  };

  const handleCloseAncorEl = (index: number) => {
    const newAnchorElArray = [...anchorElArray];
    newAnchorElArray[index] = null;
    setAnchorElArray(newAnchorElArray);
  };
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage + 1); 
    getAllBookig(newPage + 1); 
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setCurrentPage(1); 
    getAllBookig(1); 
  };

const getAllBookig =(page)=>{
  axios.get(`${baseUrl}/admin/booking?page=1&size=10`,{headers:reqHeaders,  params: {
    size: rowsPerPage,
    page: page,
   
  }}).then((response)=>{
    console.log(response?.data?.data?.booking);
    setBook(response?.data?.data?.booking);
    setPagesArray(response?.data?.data?.totalCount);
  }).catch((error)=>{
    console.log(error?.response?.message);
    
  })
}

const deleteBooking = () => {
  axios.delete(`${baseUrl}/admin/booking/${itemID}`,
    {
      headers:reqHeaders
      
    }).then((response) => {
     
     toast.success("Deleted SuccessFully")
  
      handleClose()
      getAllBookig(1)
    }).catch((error) => {
     toast.error(error?.response?.data)
    })
}
const handleShowDelete = (id) => {
  setShowState('delete-modal');
  setItemID(id);

  

}
console.log(itemID);
useEffect(()=>{
  getAllBookig(1)
},[])
  return (
    <>
    
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
      <Modal
        open={showState === "delete-modal"}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton onClick={handleClose} sx={{ color: "white" }} >
              < CancelOutlinedIcon />
            </IconButton>
          </Grid>
          

          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: "center", color: "white" }}>
            Delete This  Booking?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, textAlign: "center", color: "white" }}>
            are you sure you want to delete this item ? if you are sure just click on delete it
          </Typography>
          <Grid sx={{ textAlign: 'right', mt: 3 }}>
            <Button variant="contained" color="error"onClick={deleteBooking}  >  Delete  </Button>
          </Grid>
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
            <StyledTableCell align="right" >Status</StyledTableCell>
            <StyledTableCell align="right">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
          {book?.map((boo,index) => (
            <StyledTableRow key={index}>
             
             
              <StyledTableCell align="right">{boo?.totalPrice}</StyledTableCell>
              <StyledTableCell align="right">{ new Date (boo?.startDate).toLocaleDateString()}</StyledTableCell>
              <StyledTableCell align="right">{ new Date (boo?.endDate).toLocaleDateString()}</StyledTableCell>
              <StyledTableCell align="right">{boo?.status}</StyledTableCell>

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

                            <MenuItem onClick={() => { handleClose(); handleShowDelete(boo?._id) }}>
                              <IconButton aria-label="delete">
                                < DeleteOutlineOutlinedIcon />
                              </IconButton>
                              Delete
                            </MenuItem>
                           
                          </Menu>
                        </div>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      
      <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={3}
                  count={pagesArray} 
                  rowsPerPage={rowsPerPage}
                  page={currentPage-1}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
    </TableContainer>
    </>
  )
}