import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Grid, TextField, Pagination, PaginationItem } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import { alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { AuthContext } from '../../Context/AuthContext';
import { useForm } from 'react-hook-form';
import Stack from '@mui/material/Stack';
import deleteImg from "../../assets/Email.png"
import Avatar from '@mui/material/Avatar';
import facilityImg from "../../assets/tx-seztx-pool-21834-square.avif"
import noData from "../../assets/freepik--Character--inject-70.png"

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

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

export default function Facilities() {

  const [showState, setShowState] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setShowState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openDropDown = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseDropDown = () => {
    setAnchorEl(null);
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

  function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
  ) {
    return { name, calories, fat, carbs, protein };
  }

  /////////////////// manual logic ///////////////////

  const navigate = useNavigate()
  const [pageArray, setPageArray] = useState()
  const [searchValue, setSearchValue] = useState()
  const [rows, setRows] = useState()
  const [itemID, setItemID] = useState(0);

  const reHeaders = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NThhMTgyYjQ3ZWUyYjE0Zjk1NDY5OTAiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTcwNDk3MTU4MSwiZXhwIjoxNzA2MTgxMTgxfQ.GNEwSislg2H1QrSh5o6qwWeex9TjICFe8v5gZwDcqo0`

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm()

  const handleShowAdd = () => {
    setShowState('add-state')
  }
  const handleShowDelete = (item) => {
    setShowState('delete-state');
    setItemID(item.id);
    console.log(item);

  }
  const handleShowUpdate = (item) => {
    setShowState('update-state');
    setItemId(item.id)
    setValue("name", item.name)
    console.log(item);
  }
  const handleShowData = () => {
    setShowState('view-state');
  }

  const getFacilities = () => {
    axios.get(`http://154.41.228.234:3000/api/v0/admin/room-facilities`,
      {
        headers: {
          Authorization: reHeaders
        },
        params: {
          page: 1,
          size: 5
        }
      }).then((response) => {
        console.log(response);

        setRows(response.data.data.facilities);
      }).catch((error) => {
        console.log(error.message);
        // getToastValue('error', error.response.data.message)
      })
  }

  const deleteFacility = () => {
    axios.delete(`http://154.41.228.234:3000/api/v0/admin/room-facilities/${itemID}`,
      {
        headers: {
          Authorization: reHeaders
        }
      }).then((response) => {
        console.log(response);
        handleClose()
        getFacilities()
      }).catch((error) => {
        console.log(error.message);
        // getToastValue('error', error.response.data.message)
      })
  }

  const onSubmit = (data: any) => {
    axios.post(`http://154.41.228.234:3000/api/v0/admin/room-facilities`, data,
      {
        headers: {
          Authorization: reHeaders
        }
      }).then((response) => {
        console.log(response.data.message);
        setRows(response.data.data.facilities);
        handleClose()
        getFacilities()
      }).catch((error) => {
        console.log(error);
        // getToastValue('error', error.response.data.message)
      })
  }

  useEffect(() => {
    getFacilities()
  }, [])

  const [name, setName] = useState()

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
                name="name"
                autoFocus
                onInput={e => setName(e.target.value)}
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
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <Grid item xs={12} sx={{ padding: "0 2.5rem" }}>

              <TextField sx={{ marginTop: "2.5rem", width: "100%" }} label="name"
                name="name"
                autoFocus
                onInput={e => setName(e.target.value)}
                {...register("name", { required: true })}
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
              <Button variant="contained" type="button" onClick={deleteFacility}>ok</Button>
            </Grid>
          </Grid>

        </Box>
      </Modal>

      <Modal
        open={showState == 'view-state'}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>

          <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ padding: " 2.5rem" }}>

            <Grid item xs={12} sx={{ textAlign: "end" }}  >
              <HighlightOffIcon sx={{ color: "red", marginBottom: "20px" }} onClick={handleClose} />
            </Grid>

            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <img src={facilityImg} alt="" style={{ width: "300px", height: "300px" }} />
              {/* <Avatar src={facilityImg} sx={{ margin: "auto" , width:"100px", height:"100px"}} /> */}
              <Typography id="modal-modal-title" variant="h6" component="h4" sx={{ padding: " 1rem" }}>
                Facility: test
              </Typography>

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
                    <StyledTableCell align="center"></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows?.map((row) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell component="th" scope="row"> {row.name} </StyledTableCell>
                      <StyledTableCell align="center">{row.createdBy ? row.createdBy.userName : "null"}</StyledTableCell>
                      <StyledTableCell align="center">{row.createdAt}</StyledTableCell>
                      <StyledTableCell align="center">{row.updatedAt}</StyledTableCell>
                      <StyledTableCell align="center"

                      >
                        {/* three dots icon of actions */}
                        <MoreHorizIcon
                          id="demo-customized-button"
                          aria-controls={openDropDown ? 'demo-customized-menu' : undefined}
                          aria-haspopup="true"
                          aria-expanded={openDropDown ? 'true' : undefined}
                          variant="contained"
                          disableElevation
                          onClick={handleClick}
                          endIcon={<KeyboardArrowDownIcon />}
                        />

                        <StyledMenu
                          id="demo-customized-menu"
                          MenuListProps={{
                            'aria-labelledby': 'demo-customized-button',
                          }}
                          // anchorEl={anchorEl}
                          open={openDropDown}
                          onClose={handleCloseDropDown}
                          sx={{ position: "absolute", top: "0", left: "0" }}
                        >

                          <MenuItem onClick={handleShowData} disableRipple>
                            <RemoveRedEyeIcon />
                            View
                          </MenuItem>
                          <MenuItem onClick={() => handleShowUpdate(row)} disableRipple>
                            <EditIcon />
                            Edit
                          </MenuItem>
                          <MenuItem onClick={() => handleShowDelete(row)} disableRipple>
                            <DeleteIcon />
                            Delete
                          </MenuItem>

                        </StyledMenu>

                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            : <div style={{textAlign:"center"}}>
              <img src={noData}  alt="" />
              
            </div>
              }





      </Grid>

      <Grid sx={{ marginY: "1rem" }}>
        <Stack spacing={2} sx={{ width: "40%", margin: "auto" }}>
          <Pagination count={10} />
        </Stack>
      </Grid>




      {/* <Modal show={modalState === 'delete-modal'} onHide={handleClose}>
        <Modal.Body>
          <div className="delete-container">
            <div className="icons text-end">
              <i onClick={handleClose} className="fa-regular fa-circle-xmark text-danger "></i>
            </div>
            <div className="text-center">
              <div className="text-center">
                <img className=' ' src={Datano} alt="msg-NoData" />
              </div>
              <h5 className='py-3'> Are you sure to Delete this item ? </h5>
            </div>

            <div className="delete-btn text-end">
              <button onClick={DeleteProject} className='text-white bg-danger btn btn-outline-danger   border-danger rounded-2  '>Delete This Item </button>
            </div>
          </div>
        </Modal.Body>
      </Modal> */}


      {/* <div className="container rounded-3">

            <div className=" d-flex justify-content-between header bg-white py-4 px-5">
              <h2>Projects</h2>
              <button onClick={navToAddPro} className='btn btn-warning bg-warning text-white'> <i className='fa-plus'></i> Add New Project </button>
            </div>

            <div className={`${styles.tableContainer} my-3 p-0 rounded-3 bg-white `}>

              <div className='px-3 py-4 row'>
                <div className="col-md-3">
                  <div className="search position-relative">
                    <input
                      type="text"
                      className={`form-control ${styles.searchInput} rounded-5`}
                      placeholder="Search by title of project"
                    />
                  </div>
                </div>
                <div className="col-md-2">
                  <button className='btn btn-white rounded-5 border'>
                     Filter</button>
                </div>
              </div>


              {
                allProjs.length > 0 &&

                  <table className="table table-striped text-center">
                    <thead className={`${styles.tableHead}`}>
                      <tr>
                        <th scope="col">UserName</th>
                        <th scope="col">Status</th>
                        <th scope="col">phoneNumber</th>
                        <th scope="col">Email</th>
                        <th scope="col">Date created</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>

                      {
                        allProjs?.map((pro) =>
                        (<tr key={pro?.id}>
                          <td>{pro?.title}</td>
                          <td className='text-white' ><div className='status'>{pro?.manager?.userName}</div></td>
                          <td>{pro?.description}</td>
                          <td>
                            <div className="img-container">

                              {pro?.imagePath ? (<img className='img-fluid' src={`https://upskilling-egypt.com/` + pro?.imagePath} />) : (<img className='img-fluid' src={avatar} />)}

                            </div>
                          </td>
                          <td className='datepicker'>{pro?.creationDate}</td>
                          <td> <div className="dropdown ">
                            <button className="btn btn-transparent dropdown-toggle " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                              <i className="fa-solid fa-ellipsis-vertical"></i>
                            </button>
                            <ul className="dropdown-menu ">
                              <li onClick={() => viewPro(pro?.id)}><a className="dropdown-item" > <i className=" fa-regular fa-eye "></i> View</a></li>
                              <li onClick={() => editShow(pro?.id)} ><a className="dropdown-item " > <i className="fa-regular fa-pen-to-square pe-2"></i>Edit</a></li>
                              <li onClick={() => showDeleteModel(pro?.id)}><a className="dropdown-item" > <i className="fa-solid fa-trash pe-2"></i>Delete</a></li>
                            </ul>
                          </div></td>
                        </tr>
                        ))}

                    </tbody>
                  </table>

                  // : <div className='text-center'>
                  //   <img src={noData} alt="" />
                  // </div>
              }

              <div className=" d-flex justify-content-end p-3">
                <div className="col-md-1">
                  Showing
                </div>
                <div className="col-md-1">
                  <select className='form-select'>
                    <option value="10">10</option>
                    <option value="10">20</option>
                  </select>
                </div>
                <div className="col-md-2 text-center">
                  of 102 Results
                </div>
              </div>

            </div>

          </div> */}



    </>
  )
}
