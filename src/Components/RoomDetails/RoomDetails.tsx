import { Typography, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Date from "../Date/Date";
import bedRoom from "../../assets/bedRoom.png";
import livingroom from "../../assets/livingroom.png";
import bathRoom from "../../assets/bathRoom.png";
import diningroom from "../../assets/diningroom.png";
import wifi from  "../../assets/wifi.png";
import unit from '../../assets/unit.png';
import refigrator from '../../assets/refigrator.png';
import tv from "../../assets/tv.png";
import Navbar from "../Navbar/Navbar";
// import Carousel from '../Carousel/Carousel';
import Footer from "../shared/Footer/Footer";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import axios from "axios";
import MyDate from "../Date/Date";
import { format } from "date-fns";

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
 const location=useLocation();
//  const searchParams = new URLSearchParams(location.search);
//  const [startDate, setStartDate] = useState(searchParams.get('startDate') || '');
//  const [endDate, setEndDate] = useState(searchParams.get('endDate') || '');

 const count = location?.state?.count;
 console.log('Count from location state:', count);
  const dateRange=location?.state?.ranges
  console.log(`${format(dateRange[0].startDate,'ddMMM')}`);
  
  // const [dateRange, setDateRange] = useState({
  //     startDate: new Date(),
  //     endDate: new Date(),
  //   });
  // const queryParams = new URLSearchParams(search);
  // const startDateParam = queryParams.get('startDate');
  // const endDateParam  = queryParams.get('endDate');
  useEffect(() => {
      axios.get(`http://154.41.228.234:3000/api/v0/portal/rooms/${roomId}`, {
          params: {
              startDate,
              endDate,
          },
      })
      .then((response) => {
        // setStartDate(searchParams.get('startDate') || '');
        // setEndDate(searchParams.get('endDate') || '');
          console.log(response);
          setRoomDetails(response?.data?.data?.room);
       
      })
      .catch((error) => {
          console.log(error);
      });
  }, [roomId, location.search]);

     console.log(roomDetails);

    //  console.log(count);
    //  console.log(ranges);
     
     

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
              <Item sx={{ boxShadow: "none"}}>

              <input type="text" value={`${startDate} - ${endDate}`} />
              <input type="text" value={count} />

              </Item>
            </Grid>
            <Grid item xs={6} sx={{ desplay: "flex", alignItems: 'center' }}>
                {/* all icons */}
              <Item sx={{ boxShadow: "none", display: 'flex', alignItems: 'center'}}>
                <Box  sx={{ marginRight: '15px' }}>
                  <img src={bedRoom} alt="icons" />
                  <Typography sx={{color:'#B0B0B0',fonSize:'8px',fontFamily:'Poppins'}}>bedroom</Typography>
                </Box>

                <Box  sx={{ marginRight: '15px' }}>
                <img src={livingroom} alt="icons" />
                 <Typography sx={{color:'#B0B0B0',fonSize:'8px',fontFamily:'Poppins'}}>living room</Typography>
                </Box>

                <Box  sx={{ marginRight: '15px' }}>
                <img src={bathRoom} alt="icons" />
                <Typography sx={{color:'#B0B0B0',fonSize:'8px',fontFamily:'Poppins'}}>bathroom</Typography>
                </Box>

                <Box  sx={{ marginRight: '15px' }}>
                <img src={diningroom} alt="icons" />
                <Typography sx={{color:'#B0B0B0',fonSize:'8px',fontFamily:'Poppins'}}>dining room</Typography>
                </Box>
                
                
              </Item>

              <Item sx={{ boxShadow: "none" ,display: 'flex', alignItems: 'center' }}>
              <Box  sx={{ marginRight: '15px' }}>
                  <img src={wifi} alt="icons" />
                  <Typography sx={{color:'#B0B0B0',fonSize:'8px',fontFamily:'Poppins'}}>10 mbp/s</Typography>
                </Box>

                <Box  sx={{ marginRight: '15px' }}>
                  <img src={unit} alt="icons" />
                  <Typography sx={{color:'#B0B0B0',fonSize:'8px',fontFamily:'Poppins'}}>7 unit ready</Typography>
                </Box>

                <Box  sx={{ marginRight: '15px' }}>
                  <img src={refigrator} alt="icons" />
                  <Typography sx={{color:'#B0B0B0',fonSize:'8px',fontFamily:'Poppins'}}>2 refigrator</Typography>
                </Box>

                <Box  sx={{ marginRight: '15px' }}>
                  <img src={tv} alt="icons" />
                  <Typography sx={{color:'#B0B0B0',fonSize:'8px',fontFamily:'Poppins'}}>4 television</Typography>
                </Box>
              
              </Item>
            </Grid>
            
          </Grid>
        </Box>
      </Container>
      <Footer/>
    </>
  );
}
