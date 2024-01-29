import React, { useContext, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import { Style } from "@mui/icons-material";
import { Skeleton, Container, Divider } from "@mui/material";
import NavBar from "../shared/NavBar/NavBar";
import Footer from "../shared/Footer/Footer";

export default function FavoriteList() {
  const [favList, setFavList] = useState([]);
  const { baseUrl, reqHeaders } = useContext(AuthContext);

  //call api
  const getAllFav = () => {
    axios
      .get(`${baseUrl}/portal/favorite-rooms`, { headers: reqHeaders })
      .then((response) => {
        // console.log(response?.data?.data?.favoriteRooms[0].rooms);
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
    <NavBar/>
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
<Container >
  

      <Grid container spacing={1}>
  {favList?.length > 0 &&
    Array.from({ length: 15 }).map((_, repeatIndex) => (
      <Grid item key={repeatIndex} xs={12} sm={6} md={4} lg={4}>
        <Card sx={{ position: 'relative', overflow: 'hidden', borderRadius:5,width:'90%'}}>
          {favList[0]?.images && favList[0]?.images.length > 0 ? (
            <div className={Style.imageWrapper} >
               <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '30%',
                  backgroundColor: '#FF498B',
                  padding: '8px',
                }}
              >
                <Typography variant="h6" className={Style.roomName} style={{ color: '#fff',paddingLeft:'15px' }}>
                  $ {favList[0]?.discount} 
                </Typography>
              </div>
              <img
                src={favList[0]?.images[0]}
                alt={`Image ${repeatIndex + 1}`}
                style={{ width: '100%', }}
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
                <Typography variant="h6" className={Style.roomName} style={{ color: '#fff',paddingLeft:'15px' }}>
                  {favList[0]?.roomNumber}
                </Typography>
              </div>
            </div>
          ) : (
            <Skeleton
              variant="rectangular"
              width="100%"
              height="100%"
              animation="wave"
              style={{ backgroundColor: '#E0E0E0', borderRadius: '15px' }}
            />
          )}
        </Card>
      </Grid>
    ))}
</Grid>

</Container>
<br></br>
<Footer />
    </>


  ) }









