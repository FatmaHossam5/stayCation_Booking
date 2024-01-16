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

} from "@mui/material";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
// import { TextField, Button } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import FilterIcon from "@mui/icons-material/Filter";
// import { FeaturedPlayListRounded, FilterList } from "@mui/icons-material";

function User() {
  const { baseUrl, reqHeaders }: any = React.useContext(AuthContext);

  const [usersList, setUsersList] = React.useState({});
  // const [modalState, setModalState] = React.useState("close");
  // const [searchTerm, setSearchTerm] = React.useState("");
  // const [selectedRowsPerPage, setSelectedRowsPerPage] = React.useState(10);
  const handleClose = () => setModalState("close");
  const [userItem, setUserItem] = React.useState();

  const showAllUsers = () => {
    axios
      .get(`${baseUrl}/admin/users?page=1&size=10`, { headers: reqHeaders })
      .then((response) => {
        setUsersList(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const handleBlock = (user: any) => {
  //   axios
  //     .put(`${baseUrl}/Users/${user}`, user, { headers: reqHeaders })
  //     .then((response) => {
  //       showAllUsers(response.data.isActivated);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const handleView = (user: any) => {
  //   setModalState("show-user");
  //   setUserItem(user);
  // };

  React.useEffect(() => {
    showAllUsers();
  }, [userItem]);
  return (
    <>
      {/* <Modal
        open={modalState === "show-user"}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{ p: 3 }}>
          <Typography id="modal-title" variant="h6" component="h2">
            User Details
          </Typography>
          <p>
            <b>userName:</b> {userItem?.userName}
          </p>
          <p>
            <b>phoneNumber:</b> {userItem?.phoneNumber}
          </p>
          <p>
            <b>email:</b> {userItem?.email}
          </p>
          <p>
            <b>Status:</b> {userItem?.isActivated ? "Active" : "Not Active"}
          </p>
        </Box>
      </Modal> */}
      {/* Filteration */}
      <Box sx={{ pb: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Users
        </Typography>
      </Box>
      <Paper sx={{ p: 3, rounded: 3, bgcolor: "white",boxShadow:'none' }}>
        {/* <Box display="flex" alignItems="center" mb={3}>
         
          <InputBase
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Users"
            fullWidth
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            sx={{ ml: 1, rounded: "5px" }}
          />
          <Button
            variant="contained"
            size="small"
            sx={{
              ml: 2,
              border: 1,
              color: "white",
              bgcolor: "#203FC7",
              borderRadius: "10%",
              "&:hover": {
                bgcolor: "#203FC7",
              },
            }}
          >
            <FilterList /> Filter
          </Button>
        </Box> */}

        <TableContainer component={Paper} sx={{ color: "aqua" }}>
          <Table sx={{ minWidth: 650 }} size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: "#E2E5EB" }}>
                <TableCell>User Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Admin or user?</TableCell>
                <TableCell>Date Created</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersList?.data?.users?.length > 0
                ? usersList?.data?.users.map((user) => (
                    <>
                      <TableRow key={user?._id}>
                        <TableCell>{user?.userName}</TableCell>
                        <TableCell>{user?.email}</TableCell>
                        <TableCell>{user?.phoneNumber}</TableCell>
                        <TableCell>{user?.country}</TableCell>
                        <TableCell>{user?.role}</TableCell>
                        <TableCell>{user?.createdAt}</TableCell>
                      </TableRow>
                    </>
                  ))
                : ""}
            </TableBody>
          </Table>
        </TableContainer>
{/* 
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 3 }}>
          <FormControl sx={{ minWidth: 50, marginLeft: "auto" }}>
            <Select
              value={selectedRowsPerPage}
              onChange={(e) => setSelectedRowsPerPage(e.target.value)}
            >
              <MenuItem value={10}>1</MenuItem>
              <MenuItem value={20}>2</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="body2" component="p" sx={{ mx: 2 }}>
            of 5 Results
          </Typography>
        </Box> */}
      </Paper>
    </>
  );
}

export default User;
