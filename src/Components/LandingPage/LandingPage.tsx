import Rate from './sections/RateSection'
import Navbar from "../Navbar/Navbar";
import Footer from "../shared/Footer/Footer";
import {
  Grid,
  Typography,
  Card,
  Button,
  Container,
  Box,
 
} from "@mui/material";


import Date from '../Date/Date.tsx';


export default function LandingPage() {

  return (
    <div>
     <Rate/>
  
      <Box sx={{width:'100%',height:"100vh", marginLeft:3}}>
      <Date/>

      </Box>
      
  
     
    </div>
  );
}

