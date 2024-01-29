import React, { useContext, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";

export default function FavoriteList() {
  const [favList, setFavList] = useState([]);
  const { baseUrl, reqHeaders } = useContext(AuthContext);

  //call api
  const getAllFav = () => {
    axios
      .get(`${baseUrl}/portal/favorite-rooms`, { headers: reqHeaders })
      .then((response) => {
        console.log(response?.data?.data?.favoriteRooms[0].rooms);
        setFavList(response?.data?.data?.favoriteRooms[0].rooms);
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
        Your Favorites
      </Typography>

      <Typography
        sx={{
          fontFamily: "Poppins",
          fontWeight: 400,
          fontSize: "25px",
          color: "#152C5B",
        }}
      >
        Your Rooms
      </Typography>

      {favList?.length > 0 &&
  favList.map((room, index) => (
    <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
      <CardContent>
        {room?.images && room?.images.length > 0 ? (
          <div className={Style.imageWrapper}>
            <img
              src={room?.images[0]}
              alt={`Image ${index + 1}`}
            />
            <div>
              <h3 className={Style.roomName}>{room?.roomNumber}</h3>
            </div>
          </div>
        ) : (
          <div>No images available</div>
        )}
      </CardContent>
    </Grid>
  ))
}



      
    </>


  ) }









