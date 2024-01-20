import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Grid, TextField, Pagination, PaginationItem, IconButton, TablePagination, TableFooter } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Menu, { MenuProps } from '@mui/material/Menu';
import EditIcon from '@mui/icons-material/Edit';
import { useForm } from 'react-hook-form';
import deleteImg from "../../assets/Email.png"
import Avatar from '@mui/material/Avatar';
import facilityImg from "../../assets/tx-seztx-pool-21834-square.avif"
import noData from "../../assets/freepik--Character--inject-70.png"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { AuthContext } from '../../Context/AuthContext';
import { toast } from 'react-toastify';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2
};
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {

    color: theme.palette.common.black
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
export default function Facilities() {

  const [showState, setShowState] = useState();

  const handleClose = () => setShowState(false);







  /////////////////// manual logic ///////////////////

  const navigate = useNavigate()
  const [pageArray, setPageArray] = useState()
  const [searchValue, setSearchValue] = useState()
  const [rows, setRows] = useState()
  const [itemID, setItemID] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesArray, setPagesArray] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const{baseUrl,reqHeaders}=useContext(AuthContext)

  const [anchorElArray, setAnchorElArray] = useState(Array(rows?.length).fill(null));
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm()

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage + 1); 
    getFacilities(newPage + 1); 
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setCurrentPage(1); 
    getFacilities(1); 
  };
  const handleShowAdd = () => {
    setShowState('add-state')
  }
  const handleShowDelete = (id) => {
    setShowState('delete-state');
    setItemID(id);
    

  }
  const handleShowUpdate = (item) => {
    setShowState('update-state');
    setItemID(item._id)
    setValue("name", item.name)
    console.log(item);
  }


  const getFacilities = (page) => {
    axios.get(`${baseUrl}/admin/room-facilities`,
      {
        headers: reqHeaders,
      
        params: {
          size: rowsPerPage,
          page: page,
         
        }

      }).then((response) => {
        setPagesArray(response?.data?.data?.totalCount);
        setRows(response?.data?.data?.facilities);
      }).catch((error) => {
    
        toast.error(error?.message)
      })
  }

  const deleteFacility = () => {
    axios.delete(`${baseUrl}/admin/room-facilities/${itemID}`,
      {
        headers:reqHeaders
        
      }).then((response) => {
       
       toast.success("Deleted SuccessFully")
        handleClose()
        getFacilities(1)
      }).catch((error) => {
       toast.error(error?.response?.data)
      })
  }

  const onSubmit = (data: any) => {
    axios.post(`${baseUrl}/admin/room-facilities`, data,
      {
        headers: reqHeaders
      }).then((response) => {
        
        toast.success(response?.data?.message)
        setRows(response?.data?.data?.facilities);
        handleClose()
        getFacilities(1)
      }).catch((error) => {
        toast.error(error?.response?.data)
        
      })
  }
  const updateFacility=(data)=>{
    axios.put(`${baseUrl}/admin/room-facilities/${itemID}`,data,{  headers: reqHeaders
      
    }).then((response)=>{
     
      toast.success(response?.data?.message)
      handleClose()
      getFacilities(1)
      
    }).catch((error)=>{
    toast.error(error?.response?.data)
      
    })
  }

  useEffect(() => {
    getFacilities(1)
  }, [])



  return (
    <>

      <Modal
        open={showState == 'add-state'}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ padding: " 2.5rem 2.5rem 0 2.5rem" }}>
            <Grid item xs={6} >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Add Facility
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: "end" }}  >
              <HighlightOffIcon sx={{ color: "red" }} onClick={handleClose} />
            </Grid>
          </Grid>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <Grid item xs={12} sx={{ padding: "0 2.5rem" }}>

              <TextField sx={{ marginTop: "2.5rem", width: "100%" }} label="name"
                // name="name"
                // autoFocus
                // onInput={e => setName(e.target.value)}
                {...register("name", { required: true })}
              />
              {errors.name?.type == "required" && <p style={{ color: "red" }}>name is required</p>}

            </Grid>
            <Divider light sx={{ marginY: "2rem" }} />

            <Grid sx={{ textAlign: "end", padding: "0 2.5rem 1.5rem 2.5rem" }}>
              <Button variant="contained" type="submit">save</Button>

            </Grid>
          </form>

        </Box>
      </Modal >

      <Modal
        open={showState == 'update-state'}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ padding: " 2.5rem 2.5rem 0 2.5rem" }}>
            <Grid item xs={6} >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Update Facility
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: "end" }}  >
              <HighlightOffIcon sx={{ color: "red" }} onClick={handleClose} />
            </Grid>
          </Grid>
          <form  onSubmit={handleSubmit(updateFacility)}>
            <Grid item xs={12} sx={{ padding: "0 2.5rem" }}>

              <TextField  {...register("name", { required: true })} sx={{ marginTop: "2.5rem", width: "100%" }} label="name"

                autoFocus


              />
              {errors.name?.type == "required" && <p style={{ color: "red" }}>name is required</p>}

            </Grid>
            <Divider light sx={{ marginY: "2rem" }} />

            <Grid sx={{ textAlign: "end", padding: "0 2.5rem 1.5rem 2.5rem" }}>
              <Button variant="contained" type="submit">Update</Button>

            </Grid>
          </form>

        </Box>
      </Modal>

      <Modal
        open={showState == 'delete-state'}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ padding: " 2.5rem" }}>
            <Grid item xs={12} sx={{ textAlign: "end" }}  >
              <HighlightOffIcon sx={{ color: "red", marginBottom: "20px" }} onClick={handleClose} />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center", }}>
              <Avatar src={deleteImg} sx={{ margin: "auto" }} />
              <Typography id="modal-modal-title" variant="h6" component="h4" sx={{ padding: " 1rem" }}>
                Delete This Facility ?
              </Typography>
              <Typography id="modal-modal-title" variant="body1" component="p">
                are you sure you want to delete this item ?
                if you are sure just click on delete it
              </Typography>

            </Grid>
            <Grid xs={12} sx={{ textAlign: "end", marginTop: "1rem" }}>
              <Button variant="contained" type="button" onClick={deleteFacility}>Delete</Button>
            </Grid>
          </Grid>

        </Box>
      </Modal>



      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Typography variant="h6" component="h2">
            Facilities Table Details
          </Typography>
          <Typography variant="body1" component="h2">
            You can check all details
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: "end" }}>
          <Button variant="contained" onClick={handleShowAdd}>Add New Facility</Button>
        </Grid>
        <div>
        </div>

      </Grid>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginTop: "1rem" }}>
        {
          rows?.length > 0 ?

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead sx={{ backgroundColor: "#E2E5EB" }}>
                  <TableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell align="center">Created By</StyledTableCell>
                    <StyledTableCell align="center">Created At</StyledTableCell>
                    <StyledTableCell align="center">Updated At</StyledTableCell>
                    <StyledTableCell align="center">Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows?.map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row"> {row.name} </StyledTableCell>
                      <StyledTableCell align="center">{row.createdBy ? row.createdBy.userName : "null"}</StyledTableCell>
                      <StyledTableCell align="center">{new Date(row?.createdAt).toLocaleDateString()}</StyledTableCell>
                      <StyledTableCell align="center">{new Date(row?.updatedAt).toLocaleDateString()}</StyledTableCell>
                      <StyledTableCell align="center"

                      >

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

                            <MenuItem onClick={() => { handleClose(); handleShowDelete(row?._id) }}>
                              <IconButton aria-label="delete">
                                < DeleteOutlineOutlinedIcon />
                              </IconButton>
                              Delete
                            </MenuItem>
                            <MenuItem onClick={() => { handleClose(); handleShowUpdate(row) }}>
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
                <TableFooter>
              <TableRow>

                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={3}
                  count={pagesArray} 
                  rowsPerPage={rowsPerPage}
                  page={currentPage-1}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
              </Table>
            </TableContainer>
            : <div style={{ textAlign: "center" }}>
              <img src={noData} alt="" />

            </div>
        }
      </Grid>
    </>
  )
}
