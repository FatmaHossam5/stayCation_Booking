import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  TablePagination,
  IconButton,
  Grid,
  Card,
  CardMedia,
  Typography,
  CardActionArea,
  Box,
  Skeleton,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Container } from "@mui/system";
import FavoriteIcon from '@mui/icons-material/Favorite';
import InfoIcon from '@mui/icons-material/Info';
import { AuthContext } from "../../Context/AuthContext";
import { format } from "date-fns";
import { toast } from "react-toastify";

function AvailableRooms() {

  const [roomsList, setRoomsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesArray, setPagesArray] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate()
  const location = useLocation();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [favoriteRooms, setFavoriteRooms] = useState([]);
  const { baseUrl, reqHeaders } = useContext(AuthContext)
  const count = location?.state?.count
  const dateRange = location?.state?.ranges
  const startDate = `${format(dateRange[0].startDate, 'ddMMM')}`
  const endDate = `${format(dateRange[0].endDate, 'ddMMM')}`


  const fetchAvailableRooms = (page) => {
    axios
      .get(`${baseUrl}/portal/rooms/available`, {
        params: {
          page,
          size: rowsPerPage,
          startDate,
          endDate,
        },
      })
      .then((response) => {


        setPagesArray(response?.data?.data?.totalCount || 0);
        setRoomsList(response.data.data.rooms);
      })
      .catch((error) => {

        toast.error(error?.response?.data?.message)
      });
  };

  const addToFavorites = (roomId) => {

    axios
      .post(`${baseUrl}/portal/favorite-rooms`, {
        roomId,

      }, { headers: reqHeaders })
      .then((response) => {

        setFavoriteRooms((prevFavorites) => [...prevFavorites, roomId]);

        toast.success(response?.data?.message)
      })
      .catch((error) => {

        toast.error(error?.response?.data?.message)

      });
  };
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage + 1);
    fetchAvailableRooms(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setCurrentPage(1);
    fetchAvailableRooms(1);
  };
  const handleDetails = (roomId) => {

    axios
      .get(`${baseUrl}/portal/rooms/${roomId}`, {
        params: {
          startDate,
          endDate

        },
      })
      .then((response) => {

   


        navigate(`/user/room-details/${roomId}?startDate=${startDate}&endDate=${endDate}`, {
          state: {
            DetailsRoom: response.data, count, ranges: dateRange


          },

        });



      })
      .catch((error) => {
        console.error("Error fetching room details:", error);

      });
    console.log(roomId);



  };

  useEffect(() => {

    fetchAvailableRooms();

  }, [startDate, endDate]);

  return (
    <>
      <Container sx={{ width: '90%' }}>
        <Grid container spacing={2} sx={{ margin: "auto" }}>
        {(roomsList.length === 0 ? Array.from({ length: 10 }) : roomsList).map((room, index) => (
            
            <Grid item xs={12} sm={6} md={4} key={index} >
                {room ? (
              <Card
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <CardActionArea >
                  <CardMedia
                    component="img"
                    alt={`Image ${index + 1}`}
                    height="140"
                    width="100%"
                    image={room?.images[0]}
                    sx={{
                      objectFit: 'cover',
                    }}
                  />
                  {hoveredIndex === index && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',


                      }}
                    >
                      <IconButton sx={{ color: "white" }} onClick={() => addToFavorites(room?._id)}
                        aria-label="Add to favorites">

                        {favoriteRooms.includes(room?._id) ? (
                          <FavoriteIcon color="error" />
                        ) : (
                          <FavoriteIcon />
                        )}
                      </IconButton>
                      <IconButton sx={{ color: "white" }} onClick={() => handleDetails(room?._id)}>
                        <InfoIcon />
                      </IconButton>
                    </div>
                  )}
                </CardActionArea>
                <Typography
                  variant="body2"
                  component="div"
                  sx={{
                    position: 'relative',
                    top: -140,

                    textAlign: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '4px',
                    fontSize: '12px',
                  }}
                >
                  {room?.price} $ per night
                </Typography>
              </Card>):( <Skeleton variant="rounded" height={140} animation="wave" />
        )}
            </Grid>
          ))}
       
        </Grid>
      </Container>
      <Box sx={{width:'35%',margin:'auto',marginBottom:5}}>

      
      <TablePagination
      
        rowsPerPageOptions={[5, 10, 25]}
        colSpan={3}
        count={pagesArray}
        rowsPerPage={rowsPerPage}
        page={currentPage - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </Box>
    </>
  );
}

export default AvailableRooms;
