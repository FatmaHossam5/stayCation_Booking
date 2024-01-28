import { Typography, Container, TextField, Button, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Date from "../Date/Date";
import bedRoom from "../../assets/bedRoom.png";
import livingroom from "../../assets/livingroom.png";
import bathRoom from "../../assets/bathRoom.png";
import diningroom from "../../assets/diningroom.png";
import wifi from "../../assets/wifi.png";
import unit from '../../assets/unit.png';
import refigrator from '../../assets/refigrator.png';
import tv from "../../assets/tv.png";
import Navbar from "../Navbar/Navbar";
// import Carousel from '../Carousel/Carousel';
import Footer from "../shared/Footer/Footer";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import axios from "axios";
import MyDate from "../Date/Date";
import { format } from "date-fns";
import { unstable_HistoryRouter } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export default function DetailsRoom() {
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState({});
  const{baseUrl,userName}=useContext(AuthContext)
  const location = useLocation();
  const count = location?.state?.count;
  const dateRange = location?.state?.ranges
  const startDate = `${format(dateRange[0].startDate, 'ddMMM')}`
  const endDate = `${format(dateRange[0].endDate, 'ddMMM')}`
  const navigate=useNavigate();
  // Navigate to the new component for creating a booking
  const handleCreateBooking = () => {
    const totalPrice=roomDetails?.price * count
    navigate(`/user/create-booking/${roomId}`, {
      state: {
        dateRange,
        startDate,
        endDate,
        totalPrice,
       
   
    

       
      },
    });
  };



  useEffect(() => {
    axios.get(`${baseUrl}/portal/rooms/${roomId}`, {
      params: {
        startDate,
        endDate,
      },
    })
      .then((response) => {
        console.log(response);
        setRoomDetails(response?.data?.data?.room);

      })
      .catch((error) => {
        console.log(error);
      });
  }, [roomId, location.search]);

  console.log(roomDetails);

 



  return (
    <>
      <Navbar />

      {/* <Carousel/> */}
      <Typography
        sx={{
          color: "#152C5B",
          fontSize: "36px",
          fontWeight: 400,
          fontFamily: "Poppins",
          textAlign: "center",
        }}
        variant="h6"
      >
        Village Angga
      </Typography>

      <Typography
        sx={{
          color: "#B0B0B0",
          fontSize: "18px",
          fontWeight: 300,
          fontFamily: "Poppins",
          textAlign: "center",
        }}
        variant="h6"
      >
        Bogor, Indonesia
      </Typography>

      <Container maxWidth="lg">
        <Box sx={{ width: "100%" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <Item
                sx={{
                  boxShadow: "none",
                  fontSize: "16px",
                  fontWeight: 300,
                  color: "#B0B0B0",
                  textAlign: "start",
                }}
              >
                Minimal techno is a minimalist subgenre of techno music. It is
                characterized by a stripped-down aesthetic that exploits the use
                of repetition and understated development. Minimal techno is
                thought to have been originally developed in the early 1990s by
                Detroit-based producers Robert Hood and Daniel Bell.
              </Item>
              <Item
                sx={{
                  boxShadow: "none",
                  fontSize: "16px",
                  fontWeight: 300,
                  color: "#B0B0B0",
                  textAlign: "start",
                }}
              >
                Such trends saw the demise of the soul-infused techno that
                typified the original Detroit sound. Robert Hood has noted that
                he and Daniel Bell both realized something was missing from
                techno in the post-rave era.
              </Item>
              <Item
                sx={{
                  boxShadow: "none",
                  fontSize: "16px",
                  fontWeight: 300,
                  color: "#B0B0B0",
                  textAlign: "start",
                }}
              >
                Design is a plan or specification for the construction of an
                object or system or for the implementation of an activity or
                process, or the result of that plan or specification in the form
                of a prototype, product or process. The national agency for
                design: enabling Singapore to use design for economic growth and
                to make lives better.
              </Item>
            </Grid>

            {/* data picker */}
            <Grid item xs={6}>
              <Item sx={{ boxShadow: "none" }}>
                <Typography sx={{ fontFamily: 'Poppins', fontSize: "20px", fontWeight: 500, color: '#152C5B' }}>Start Booking</Typography>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ color: '#1ABC9C', fontFamily: 'Poppins', fontWeight: 500, fontSize: "30px" }}>{roomDetails.price}$</Typography>
                  <Typography sx={{ color: '#B0B0B0', fontFamily: 'Poppins', fontWeight: 500, fontSize: "30px" }}>per night</Typography>
                </Box>
                <Typography sx={{ color: '#FF1612', }}>Discount {roomDetails?.discount} Off </Typography>
                <Box sx={{ backgroundColor: '#fff', padding: '20px' }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="h6">Pick a Date</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', width: '4%' }}>
                          <img src={Avatar} alt="calendar" style={{ width: '100%', height: 'auto' }} />
                        </Box>
                        <TextField sx={{ width: '40%' }} value={`${startDate} - ${endDate}`} />
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ color: '#B0B0B0', fontFamily: 'Poppins', fontWeight: 500, fontSize: "16px" }}>You will pay</Typography>
                        <Typography sx={{ color: '#152C5B', fontFamily: 'Poppins', fontWeight: 500, fontSize: "16px" }}>{roomDetails.price * count}</Typography>
                        <Typography sx={{ color: '#B0B0B0', fontFamily: 'Poppins', fontWeight: 500, fontSize: "16px" }}>per</Typography>
                        <Typography sx={{ color: '#152C5B', fontFamily: 'Poppins', fontWeight: 500, fontSize: "16px" }}> {count}</Typography>
                      </Box>
                      <Button sx={{ color: '#FFFFFF', bgcolor: '#3252DF', '&:hover': { bgcolor: '#3252DF' } }} onClick={handleCreateBooking}>
                        Continue Book
                      </Button>
                    </Grid>
                  </Grid>
                </Box>

             

              </Item>
            </Grid>
            <Grid item xs={6} sx={{ desplay: "flex", alignItems: 'center' }}>
              {/* all icons */}
              <Item sx={{ boxShadow: "none", display: 'flex', alignItems: 'center' }}>
                <Box sx={{ marginRight: '15px' }}>
                  <img src={bedRoom} alt="icons" />
                  <Typography sx={{ color: '#B0B0B0', fonSize: '8px', fontFamily: 'Poppins' }}>bedroom</Typography>
                </Box>

                <Box sx={{ marginRight: '15px' }}>
                  <img src={livingroom} alt="icons" />
                  <Typography sx={{ color: '#B0B0B0', fonSize: '8px', fontFamily: 'Poppins' }}>living room</Typography>
                </Box>

                <Box sx={{ marginRight: '15px' }}>
                  <img src={bathRoom} alt="icons" />
                  <Typography sx={{ color: '#B0B0B0', fonSize: '8px', fontFamily: 'Poppins' }}>bathroom</Typography>
                </Box>

                <Box sx={{ marginRight: '15px' }}>
                  <img src={diningroom} alt="icons" />
                  <Typography sx={{ color: '#B0B0B0', fonSize: '8px', fontFamily: 'Poppins' }}>dining room</Typography>
                </Box>


              </Item>

              <Item sx={{ boxShadow: "none", display: 'flex', alignItems: 'center' }}>
                <Box sx={{ marginRight: '15px' }}>
                  <img src={wifi} alt="icons" />
                  <Typography sx={{ color: '#B0B0B0', fonSize: '8px', fontFamily: 'Poppins' }}>10 mbp/s</Typography>
                </Box>

                <Box sx={{ marginRight: '15px' }}>
                  <img src={unit} alt="icons" />
                  <Typography sx={{ color: '#B0B0B0', fonSize: '8px', fontFamily: 'Poppins' }}>7 unit ready</Typography>
                </Box>

                <Box sx={{ marginRight: '15px' }}>
                  <img src={refigrator} alt="icons" />
                  <Typography sx={{ color: '#B0B0B0', fonSize: '8px', fontFamily: 'Poppins' }}>2 refigrator</Typography>
                </Box>

                <Box sx={{ marginRight: '15px' }}>
                  <img src={tv} alt="icons" />
                  <Typography sx={{ color: '#B0B0B0', fonSize: '8px', fontFamily: 'Poppins' }}>4 television</Typography>
                </Box>

              </Item>
            </Grid>

          </Grid>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
