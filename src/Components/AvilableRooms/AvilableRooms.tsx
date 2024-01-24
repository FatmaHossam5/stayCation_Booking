import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TablePagination,
  IconButton,
  Grid,
  Card,
  CardMedia,
  Typography,
  CardActionArea,
} from "@mui/material";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { Container } from "@mui/system";
import FavoriteIcon from '@mui/icons-material/Favorite';
import InfoIcon from '@mui/icons-material/Info';
import { AuthContext } from "../../Context/AuthContext";
import DetailsRoom from "../RoomDetails/RoomDetails";
import { format } from "date-fns";

function AvailableRooms() {
//   const { startDate, endDate } = useParams();
  const [roomsList, setRoomsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesArray, setPagesArray] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate =useNavigate()
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [favoriteRooms, setFavoriteRooms] = useState([]);
  const{baseUrl,reqHeaders}=useContext(AuthContext)
  const location = useLocation();
const count=location?.state?.count
const dateRange=location?.state?.ranges
const startDate=`${format(dateRange[0].startDate,'ddMMM')}`
const endDate=`${format(dateRange[0].endDate,'ddMMM')}`
console.log(startDate,endDate);

  const fetchAvailableRooms = (page) => {
    axios
      .get(`http://154.41.228.234:3000/api/v0/portal/rooms/available`, {
        params: {
          page,
          size: rowsPerPage,
          startDate,
          endDate,
        },
      })
      .then((response) => {
        console.log(response);
        
        setPagesArray(response?.data?.data?.totalCount || 0);
        setRoomsList(response.data.data.rooms);
      })
      .catch((error) => {
        console.error("Error fetching available rooms:", error);
      });
  };

  const addToFavorites = (roomId) => {
  
    axios
      .post("http://154.41.228.234:3000/api/v0/portal/favorite-rooms", {
        roomId,
       
      }, {headers:reqHeaders})
      .then((response) => {
        
        setFavoriteRooms((prevFavorites) => [...prevFavorites, roomId]);
        console.log("Room added to favorites:", response);
      })
      .catch((error) => {
        console.error("Error adding room to favorites:", error);
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
      .get(`http://154.41.228.234:3000/api/v0/portal/rooms/${roomId}`, {
        params: {
          startDate,
          endDate
          
        },
      })
      .then((response) => {
    
        console.log(response);
     console.log(startDate);
     
        
        navigate(`/user/room-details/${roomId}?startDate=${startDate}&endDate=${endDate}`, {
          state: { DetailsRoom:response.data, count,ranges:dateRange
         
          
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
      <Container>
      <Grid container spacing={2}>
        {roomsList.map((room, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <CardActionArea>
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
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <IconButton color="primary"  onClick={() => addToFavorites(room?._id)}
                      aria-label="Add to favorites">

                    {favoriteRooms.includes(room?._id) ? (
                        <FavoriteIcon color="secondary" />
                      ) : (
                        <FavoriteIcon />
                      )}
                    </IconButton>
                    <IconButton color="primary" onClick={() => handleDetails(room?._id)}>
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
                {room?.price}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            colSpan={3}
            count={pagesArray}
            rowsPerPage={rowsPerPage}
            page={currentPage - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
    </>
  );
}

export default AvailableRooms;
