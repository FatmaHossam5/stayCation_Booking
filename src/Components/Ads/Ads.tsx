import { Box, Button, FormControl, Grid, IconButton, Modal, TextField, Typography, TableContainer, Table, TableHead, TableRow, tableCellClasses, TableCell, Paper, TableBody, ButtonBase, InputLabel, MenuItem, FormHelperText, Select, Menu } from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useContext, useEffect, useState } from 'react';
import trash from '../../assets/Email (1).png';
import { useForm, Controller } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import CustomPagination from '../Pagination/Pagination';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { AuthContext } from '../../Context/AuthContext';

{/*MUI Table Style */ }
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

export default function Ads() {
  const [modalState, setModalState] = useState('close')
  const {  handleSubmit, formState: { errors }, setValue, control } = useForm();
  const handleClose = () => setModalState("close");
  const [ads, setAds] = useState([])
  const { baseUrl, reqHeaders } = useContext(AuthContext)

  const [adId, setAdId] = useState(0)
  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
    getAllAds(newPage + 1)
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setCurrentPage(1);
    getAllAds(1)
  };
  const [anchorElArray, setAnchorElArray] = useState(Array(ads.length).fill(null));

  const handleClick = (event, index) => {
    const newAnchorElArray = [...anchorElArray];
    newAnchorElArray[index] = event.currentTarget;
    setAnchorElArray(newAnchorElArray);
  };

  const handleCloseAncorEl = (index) => {
    const newAnchorElArray = [...anchorElArray];
    newAnchorElArray[index] = null;
    setAnchorElArray(newAnchorElArray);
  };




  {/*Get All Ads */ }
  const getAllAds = () => {
    axios.get(`${baseUrl}/admin/ads?page=${currentPage}&size=${rowsPerPage}`, { headers: reqHeaders }).then((response) => {



      setAds(response.data.data.ads)
      setTotalPages(response.data.data.totalCount)
    }).catch((error) => {
      toast.error(error?.response?.message);
    })
  }

  const showDeleteModal = (id) => {
    setModalState('delete-modal')
    setAdId(id)
  }
  const showUpdateModal = (ad) => {
    setModalState('update-modal')
    setAdId(ad._id)
    setValue("discount", ad?.room?.discount);
    setValue('isActive', ad?.isActive)



  }

  {/* Delete Room */ }
  const deleteAD = () => {
    axios.delete(`${baseUrl}/admin/ads/${adId}`, { headers: reqHeaders })
      .then((response) => {

        setAdId(adId);
        handleClose();
        getAllAds()

      }).catch((error) => {
        toast.error(error?.response?.message);
      })
  }
  {/* Update Room */ }
  const UpdateAd = (data) => {
    const updatedData = {
      discount: data.discount,
      isActive: data.isActive,
    };

    axios.put(`${baseUrl}/admin/ads/${adId}`, updatedData, { headers: reqHeaders }).then((response) => {
      console.log(response);
      handleClose();
      getAllAds();


    }).catch((error) => {
      toast.error(error?.response?.message);

    })
  }

  const NavigateAddAds = () => {
    navigate('/dashboard/ads/add-ads')
  }
  useEffect(() => {
    getAllAds(currentPage);

  }, [currentPage])



  return (
    <>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>

        {/*delete Modal */}
        <Modal
          open={modalState === "delete-modal"}
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
            <Grid sx={{ textAlign: "center" }}>
              <img src={trash} alt="trash" />
            </Grid>

            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: "center",color:"white" }}>
              Delete This Room?
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2, textAlign: "center" ,color:"white"}}>
              are you sure you want to delete this item ? if you are sure just click on delete it
            </Typography>
            <Grid sx={{ textAlign: 'right', mt: 3 }}>
              <Button variant="contained" color="error" onClick={deleteAD} >  Delete  </Button>
            </Grid>
          </Box>
        </Modal>
        {/*update Modal */}
        <Modal
          open={modalState === "update-modal"}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >



          <Box sx={style} >
            <Grid container spacing={3}>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, }}>
                <Typography variant="h4" color="white">
                  Ads
                </Typography>
                <IconButton sx={{ color: 'white' }} onClick={handleClose}>
                  <CancelOutlinedIcon />
                </IconButton>
              </Grid>
              <form onSubmit={handleSubmit(UpdateAd)} style={{ width: '100%' }}>
                <Box sx={{ margin: "auto" }}>
                  <Grid item lg={12}>




                 
                            <FormControl fullWidth sx={{ mt: 2 }}>
                    <Controller
                      name="discount"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          {...field}
                          InputLabelProps={{
                            style: { color: 'white' },
                          }}
                          sx={{
                            bgcolor: '#203FC7',
                            mb: 1,
                            display: 'flex',
                            justifyContent: 'flex-start',
                            borderRadius: '7px',
                            borderBottom: 'none',
                          }}
                          variant="filled"
                          label="Discount"
                          error={Boolean(errors.discount)}
                          helperText={errors.discount && errors.discount.type === 'required' && 'Discount is required'}
                        />
                      )}
                    />
                  </FormControl>
                 
                      <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel htmlFor="isActive" sx={{ color: 'white' }}>
                      Active
                    </InputLabel>
                    <Controller
                      name="isActive"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Select
                          {...field}
                          error={Boolean(errors.isActive)}
                        >
                          <MenuItem value="" disabled>
                            Active
                          </MenuItem>
                          <MenuItem value={true}>Yes</MenuItem>
                          <MenuItem value={false}>No</MenuItem>
                        </Select>
                      )}
                    />
                    {errors.isActive && (
                      <Typography color="error">This Field is required</Typography>
                    )}
                  </FormControl>
                  

                    <Grid item sx={{ textAlign: 'right', mt: 3 }}>
                      <Button type="submit" variant="contained" sx={{ bgcolor: " #203FC7" }} className="addAds">
                        Save
                      </Button>
                    </Grid>

                  </Grid>
                </Box>
              </form>
            </Grid>
          </Box>





        </Modal>

        <Box>
          <Typography variant='h5'>Ads Table Details</Typography>
          <Typography variant='subtitle1'>You can check all details</Typography>
        </Box>
        <Button sx={{ px: 5 }} variant="contained" onClick={NavigateAddAds}>Add New Ads</Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Room Number</StyledTableCell>
              <StyledTableCell align="right">price</StyledTableCell>
              <StyledTableCell align="right">discount</StyledTableCell>

              <StyledTableCell align="right">capacity</StyledTableCell>
              <StyledTableCell align="right">isActive?</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {ads.map((ad, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {ad?.room?.roomNumber}
                </StyledTableCell>

                <StyledTableCell align="right">{ad?.room?.price}</StyledTableCell>
                <StyledTableCell align="right">{ad?.room?.discount}</StyledTableCell>
                <StyledTableCell align="right">{ad?.room?.capacity}</StyledTableCell>

                <StyledTableCell align="right">

                  {
                    ad?.isActive ? 'Yes' : 'No'
                  }
                </StyledTableCell>


                <StyledTableCell align="center">
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

                      <MenuItem onClick={() => { handleClose(); showDeleteModal(ad?._id) }}>
                        <IconButton aria-label="delete" >
                          < DeleteOutlineOutlinedIcon  />
                        </IconButton>
                        Delete
                      </MenuItem>
                      <MenuItem onClick={() => { handleClose(); showUpdateModal(ad) }}>
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
          totalCount={totalPages * rowsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </TableContainer>
    </>
  )
}









// <Box>
// <Box sx={style}>
//   <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
//     <IconButton onClick={handleClose} sx={{ color: "red" }} >
//       < CancelOutlinedIcon />
//     </IconButton>
//   </Grid>
//   <FormControl component='form' fullWidth onSubmit={handleSubmit(UpdateAd)} >
//    <Box sx={{textAlign:"center"}}>
//    <InputLabel htmlFor="discount">Discount:</InputLabel>
// <TextField
// type="number"
// id="discount"
// {...register('discount', { required: true })}
// placeholder="Discount"
// variant="outlined"
// fullWidth
// margin="normal"
// error={Boolean(errors.discount)}
// />
// {errors.discount && errors.discount.type === 'required' && (
// <FormHelperText error>Discount is required</FormHelperText>
// )}
// <InputLabel id="isActive-label">Active:</InputLabel>
// <Select
// labelId="isActive-label"
// id="isActive"
// {...register('isActive', { required: true })}
// className="selectStyle"
// defaultValue=""
// variant="outlined"
// error={Boolean(errors.isActive)}
// >
// <MenuItem value="" disabled>
//   Select an option
// </MenuItem>
// <MenuItem value={true}>Yes</MenuItem>
// <MenuItem value={false}>No</MenuItem>
// </Select>
// {errors.isActive && errors.isActive.type === 'required' && (
// <FormHelperText error>This Field is required</FormHelperText>)}
//     <Grid sx={{ textAlign: 'right', mt: 3 }}>
//       <Button type='submit' variant="contained" color="primary"  >  update  </Button>

//     </Grid>
//     </Box>
//   </FormControl>
// </Box>
// </Box>


{/* <TextField
// type="number"
// id="discount"
// {...register('discount', { required: true })}
// placeholder="Discount"
// variant="outlined"
// fullWidth
// margin="normal"
// error={Boolean(errors.discount)}
// />
// {errors.discount && errors.discount.type === 'required' && (
// <FormHelperText error>Discount is required</FormHelperText>
// )} */}