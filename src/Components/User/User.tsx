import * as React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Modal,
  Box,
  Typography,
  tableCellClasses,
  TablePagination,

} from "@mui/material";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { styled } from "@mui/system";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#E2E5EB',
    color: theme.palette.common?.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action?.hover,
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
function User() {
  const { baseUrl, reqHeaders }: any = React.useContext(AuthContext);

  const [usersList, setUsersList] = React.useState({});
  
  const handleClose = () => setModalState("close");
  const [userItem, setUserItem] = React.useState();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pagesArray, setPagesArray] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const showAllUsers = (page) => {
    axios
      .get(`${baseUrl}/admin/users?page=1&size=10`, { headers: reqHeaders ,
        params: {
          size: rowsPerPage,
          page: page,
         
        }})
      .then((response) => {
        console.log(response);
        
        setPagesArray(response?.data?.data?.totalCount);
        setUsersList(response.data);
   
      })
      .catch((error) => {
        console.log(error);
      });
  };



  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage + 1); 
    showAllUsers(newPage + 1); 
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setCurrentPage(1); 
    showAllUsers(1); 
  };

  React.useEffect(() => {
    showAllUsers(1);
  }, [userItem]);
  return (
    <>
    
      {/* Filteration */}
      <Box sx={{ pb: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Users
        </Typography>
      </Box>
      <Paper sx={{ p: 3, rounded: 3, bgcolor: "white",boxShadow:'none' }}>
   

        <TableContainer component={Paper} >
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
            <TableRow>
            <StyledTableCell align="left">User Name</StyledTableCell>
            <StyledTableCell align="left">Email</StyledTableCell>
            <StyledTableCell align="left">Phone Number</StyledTableCell>
            <StyledTableCell align="right">Country</StyledTableCell>
            <StyledTableCell align="center">Admin or user?</StyledTableCell>
            <StyledTableCell align="right">Date Created</StyledTableCell>
          </TableRow>
       
            </TableHead>
            <TableBody>
              {usersList?.data?.users?.length > 0
                ? usersList?.data?.users.map((user) => (
                    <>
                      <StyledTableRow key={user?._id}>
                        <StyledTableCell align="left">{user?.userName}</StyledTableCell>
                        <StyledTableCell align="left">{user?.email}</StyledTableCell>
                        <StyledTableCell align="left">{user?.phoneNumber}</StyledTableCell>
                        <StyledTableCell align="right">{user?.country}</StyledTableCell>
                        <StyledTableCell align="center">{user?.role}</StyledTableCell>
                        <StyledTableCell align="right">   {new Date(user?.createdAt).toLocaleDateString()}</StyledTableCell>
                      </StyledTableRow>
                    </>
                  ))
                : ""}
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

      </Paper>
    </>
  );
}

export default User;
