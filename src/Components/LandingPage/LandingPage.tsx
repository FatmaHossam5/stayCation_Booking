import {
  Box
} from "@mui/material";
import Navbar from "../Navbar/Navbar";


import Carousel from '../Carousel/Carousel.tsx';
import BookingSelector from './sections/BookingSelector.tsx';
import RateSection from "./sections/RateSection.tsx";
import Footer from "../shared/Footer/Footer.tsx";



export default function LandingPage() {





 
  

  return (
    <div>
     {/* <Rate/> */}
 
      <Box >
      <Navbar/>
      <BookingSelector/>
       <Carousel/>
       <RateSection/>
      <Footer/>
      </Box>
      

     
    </div>
  );
}

