import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Alert,
  AlertTitle,
  Grid
} from "@mui/material";
import Navbar from "../Navbar/Navbar";
import Carousel from '../Carousel/Carousel.tsx';
import BookingSelector from './sections/BookingSelector.tsx';
import RateSection from "./sections/RateSection.tsx";
import Footer from "../shared/Footer/Footer.tsx";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

export default function LandingPage() {
  const { userToken } = useContext(AuthContext);

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      {/* Test Accounts Info - Only show when not logged in */}
      {!userToken && (
        <Box 
          component="section" 
          sx={{ 
            py: { xs: 2, md: 3 },
            backgroundColor: 'info.light',
            borderBottom: '1px solid',
            borderColor: 'info.main'
          }}
        >
          <Container maxWidth="lg">
            <Alert severity="info" sx={{ mb: 2 }}>
              <AlertTitle>Test Accounts Available</AlertTitle>
              You can use these test accounts to explore the application:
            </Alert>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Card sx={{ bgcolor: 'primary.light', color: 'primary.contrastText' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      User Account
                    </Typography>
                    <Typography variant="body2">
                      <strong>Email:</strong> user@example.com<br />
                      <strong>Password:</strong> User123456<br />
                      <strong>Role:</strong> User - Can browse rooms, make bookings, and manage favorites
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{ bgcolor: 'secondary.light', color: 'secondary.contrastText' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Admin Account
                    </Typography>
                    <Typography variant="body2">
                      <strong>Email:</strong> admin@example.com<br />
                      <strong>Password:</strong> Admin123456<br />
                      <strong>Role:</strong> Admin - Can manage rooms, bookings, users, and system settings
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}
      
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

