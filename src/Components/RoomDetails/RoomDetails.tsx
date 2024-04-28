import { Typography, Container, TextField, Button, Avatar, InputAdornment } from "@mui/material";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import bedRoom from "../../assets/bedRoom.png";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import axios from "axios";
import { format } from "date-fns";
import { toast } from "react-toastify";
import PunchClockIcon from '@mui/icons-material/PunchClock';
import { AuthContext } from "../../Context/AuthContext";
import Footer from "../shared/Footer/Footer";
import Review from "../LandingPage/sections/ReviewSection/Review";

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
  const location = useLocation();
  const count = location?.state?.count;
  const dateRange = location?.state?.ranges
  const startDate = `${format(dateRange[0]?.startDate, 'ddMMM')}`
  const endDate = `${format(dateRange[0]?.endDate, 'ddMMM')}`
  const { baseUrl } = useContext(AuthContext)
  const navigate = useNavigate();

  // Navigate to the new component for creating a booking
  const handleCreateBooking = () => {
    const totalPrice = roomDetails?.price * count
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
    axios.get(`${baseUrl}/portal/rooms/${roomId}`, {
      params: {
        startDate,
        endDate,
      },
    })
      .then((response) => {


        setRoomDetails(response?.data?.data?.room);



        setRoomDetails(response?.data?.data?.room);

      })
      .catch((error) => {

        toast.error(error?.message)

        toast.error(error?.message)
      });
  }, [roomId, location.search]);



  return (
    <>



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

      <Box sx={{ display: "flex", marginLeft: 5 }}>
        {roomDetails && roomDetails?.images?.map((img, index) => (
          <img src={img} width={"30%"} style={{
            marginRight: '10px',
            borderRadius: '8px',

          }} alt={`Image${index + 1}`} />
        ))

        }

      </Box>

      <Container maxWidth="lg">
        <Box sx={{ width: "100%" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {/* <Grid item xs={7}> */}
            <Grid item xs={7}>
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
              {/*  Facilities  */}
              <Grid item xs={6} sx={{ marginBottom: 3 }}>

                <Item sx={{ boxShadow: "none", display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                  {roomDetails?.facilities?.map((facility, index) => (
                    <>
                      <Box sx={{ marginRight: '15px' }}>
                        <img src={bedRoom} alt="icons" />
                        <Typography sx={{ color: '#B0B0B0', fonSize: '8px', fontFamily: 'Poppins' }}>{facility?.name}</Typography>
                      </Box>
                    </>
                  ))}
                </Item>


              </Grid>

            </Grid>

            {/* data picker */}
            <Grid item xs={5}>
              <Item sx={{ boxShadow: "none", textAlign: "center", border: "1px solid #e0e0e0", borderRadius: "8px", padding: "20px" }}>
                <Typography sx={{ fontFamily: 'Poppins', fontSize: "20px", fontWeight: 500, color: '#152C5B' }}>Start Booking</Typography>

                <Box sx={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                  <Typography sx={{ color: '#1ABC9C', fontFamily: 'Poppins', fontWeight: 500, fontSize: "30px" }}>{roomDetails.price}$</Typography>
                  <Typography sx={{ color: '#B0B0B0', fontFamily: 'Poppins', fontWeight: 500, fontSize: "30px" }}>per night</Typography>
                </Box>
                <Typography sx={{ color: '#FF1612', }}>Discount {roomDetails?.discount} % Off </Typography>
                <Box sx={{ backgroundColor: '#fff', padding: '20px' }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="h6">Pick a Date</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', width: '4%' }}>

                        </Box>
                        <TextField sx={{
                          width: '50%',

                          "& input": {
                            textAlign: 'center',
                          },
                        }} value={`${startDate} - ${endDate}`}

                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PunchClockIcon />
                              </InputAdornment>
                            ),
                          }}


                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', justifyContent: "center", alignItems: 'center', marginBottom: 5 }}>
                        <Typography sx={{ color: '#B0B0B0', fontFamily: 'Poppins', fontWeight: 500, fontSize: "16px" }}>You will pay</Typography>
                        <Typography sx={{ color: '#152C5B', fontFamily: 'Poppins', fontWeight: 500, fontSize: "16px" }}>{roomDetails?.price * count}</Typography>
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


          </Grid>
        </Box>
      </Container>

      <Review />

      <Footer />
    </>
  );
}
