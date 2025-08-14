import {
  Box,
  Container
} from "@mui/material";
import Navbar from "../Navbar/Navbar";
import Carousel from '../Carousel/Carousel.tsx';
import BookingSelector from './sections/BookingSelector.tsx';
import RateSection from "./sections/RateSection.tsx";
import Footer from "../shared/Footer/Footer.tsx";

export default function LandingPage() {

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      {/* Hero Section */}
      <Box 
        component="section" 
        sx={{ 
          py: { xs: 2, md: 4 }
        }}
      >
        <Container maxWidth="xl">
          <BookingSelector />
        </Container>
      </Box>

      {/* Carousel Section */}
      <Box 
        component="section" 
        sx={{ 
          py: { xs: 4, md: 6 },
          backgroundColor: 'grey.50'
        }}
      >
        <Container maxWidth="xl">
          <Carousel />
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box 
        component="section" 
        sx={{ 
          py: { xs: 4, md: 6 },
          backgroundColor: 'background.default'
        }}
      >
        <Container maxWidth="lg">
          <RateSection />
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}

