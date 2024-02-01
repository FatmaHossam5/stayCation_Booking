import React, { useContext, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import { Skeleton, Container, Divider, CardActionArea, CardMedia, IconButton } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function FavoriteList() {
  const [favList, setFavList] = useState([]);
  const { baseUrl, reqHeaders } = useContext(AuthContext);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  //call api
  const getAllFav = () => {
    axios
      .get(`${baseUrl}/portal/favorite-rooms`, { headers: reqHeaders })
      .then((response) => {
        // console.log(response?.data?.data?.favoriteRooms[0].rooms);
        console.log(response);
        
        setFavList(response?.data?.data?.favoriteRooms[0].rooms);
      })
      .catch((error) => {
        console.log(error);
      });
  };
 
  
  const removeRoomFromFavorites = (roomId) => {
    console.log(roomId);
    
    axios
   
      .delete(`${baseUrl}/portal/favorite-rooms/${roomId}`,{headers:reqHeaders,data:{roomId}})
      .then((response) => {
        // Remove the room from the favList state
        setFavList((prevList) => prevList.filter((room) => room?._id !== roomId));
        console.log(response);
        
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getAllFav();
  }, []);

  return (
    <>
   
      <Typography
        sx={{
          fontFamily: "Poppins",
          fontWeight: 500,
          fontSize: "30px",
          color: "#152C5B",
          textAlign: "center",
        }}
      >
        Your Favorites Rooms
      </Typography>

  
      <Container sx={{ width: '90%' }}>
        <Grid container spacing={2} sx={{ margin: "auto" }}>
        {(favList.length === 0 ? Array.from({ length: favList.length }) : favList).map((fav, index) => (
            
            <Grid item xs={12} sm={6} md={4} key={index} >
                {fav ? (
              <Card
               
              >
                <CardActionArea >
                  <CardMedia
                    component="img"
                    alt={`Image ${index + 1}`}
                    height="140"
                    width="100%"
                    image={fav?.images[0]}
                    sx={{
                      objectFit: 'cover',
                    }}
                  />
                         <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  padding: '8px',
                }}
              >
                <Typography variant="h6"style={{ color: '#fff', paddingLeft: '15px' }}>
                  {fav?.roomNumber}
                </Typography>
              </div>
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
                      <IconButton sx={{ color: "red" }} onClick={() =>removeRoomFromFavorites(fav?._id)}
                        aria-label="Add to favorites">

                        
                          <FavoriteIcon  />
                       
                      
                      </IconButton>
                   
                    </div>
                  
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
                  {fav?.price} $ per night
                </Typography>
              </Card>):( <Skeleton variant="rounded" height={180} animation="wave" />
        )}
            </Grid>
          ))}
       
        </Grid>
      </Container>



    </>


  ) }









