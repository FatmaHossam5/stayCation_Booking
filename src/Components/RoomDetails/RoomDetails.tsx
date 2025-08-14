import { Typography, Container, TextField, Button, Avatar, InputAdornment, Card, CardContent, Chip, Divider } from "@mui/material";
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
import ReviewsSection from "../Reviews/ReviewsSection";
import ReviewsSummary from "../Reviews/ReviewsSummary";

// Type definitions
interface Facility {
  name: string;
  icon?: string;
}

interface RoomDetails {
  id?: string;
  name?: string;
  price?: number;
  discount?: number;
  images?: string[];
  facilities?: Facility[];
  description?: string;
}

// Styled components for better organization
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
  },
}));

const ImageGallery = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(4),
  overflowX: 'auto',
  padding: theme.spacing(1),
  '& img': {
    borderRadius: theme.spacing(1),
    objectFit: 'cover',
    minWidth: '200px',
    height: '200px',
    [theme.breakpoints.down('sm')]: {
      minWidth: '150px',
      height: '150px',
    },
  },
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    '& img': {
      width: '100%',
      minWidth: 'auto',
      height: '250px',
    },
  },
}));

const BookingCard = styled(Card)(({ theme }) => ({
  position: 'sticky',
  top: theme.spacing(2),
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  [theme.breakpoints.down('md')]: {
    position: 'static',
    marginTop: theme.spacing(3),
  },
}));

const PriceDisplay = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

const FacilityItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(1),
  borderRadius: theme.spacing(1),
  transition: 'background-color 0.2s ease',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '& img': {
    width: '32px',
    height: '32px',
    marginBottom: theme.spacing(0.5),
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  padding: theme.spacing(1.5, 3),
  fontSize: '1rem',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: '0 4px 12px rgba(50, 82, 223, 0.3)',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-1px)',
    boxShadow: '0 6px 20px rgba(50, 82, 223, 0.4)',
  },
}));

export default function DetailsRoom() {
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState<RoomDetails>({});
  const location = useLocation();
  const count = location?.state?.count;
  const dateRange = location?.state?.ranges;
  const startDate = dateRange?.[0]?.format('YYYY-MM-DD');
  const endDate = dateRange?.[1]?.format('YYYY-MM-DD');
  const { baseUrl } = useContext(AuthContext);
  const navigate = useNavigate();

  // Navigate to the new component for creating a booking
  const handleCreateBooking = () => {
    const totalPrice = (roomDetails?.price || 0) * (count || 0);
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
    if (roomId && startDate && endDate) {
      axios.get(`${baseUrl}/portal/rooms/${roomId}`, {
        params: {
          startDate,
          endDate,
        },
      })
        .then((response) => {
          setRoomDetails(response?.data?.data?.room);
        })
        .catch((error) => {
          toast.error(error?.message || 'Failed to load room details');
        });
    }
  }, [roomId, startDate, endDate, baseUrl]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography
          variant="h3"
          sx={{
            color: "#152C5B",
            fontWeight: 600,
            fontFamily: "Poppins",
            mb: 1,
            '@media (max-width: 600px)': {
              fontSize: '2rem',
            },
          }}
        >
          Village Angga
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "#B0B0B0",
            fontWeight: 300,
            fontFamily: "Poppins",
          }}
        >
          Bogor, Indonesia
        </Typography>
      </Box>

      {/* Image Gallery */}
      {roomDetails?.images && (
        <ImageGallery>
          {roomDetails.images.map((img, index) => (
            <img 
              key={index}
              src={img} 
              alt={`Room image ${index + 1}`}
              style={{ flex: '1 1 auto' }}
            />
          ))}
        </ImageGallery>
      )}

      {/* Main Content Grid */}
      <Grid container spacing={4}>
        {/* Left Column - Room Details */}
        <Grid item xs={12} lg={7}>
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              sx={{
                color: "#152C5B",
                fontWeight: 600,
                fontFamily: "Poppins",
                mb: 2,
              }}
            >
              About this place
            </Typography>
            
            {/* Reviews Summary */}
            <ReviewsSummary roomId={roomId || ''} compact={true} />
            <Typography
              variant="body1"
              sx={{
                color: "#666",
                lineHeight: 1.8,
                mb: 3,
                fontSize: '1rem',
              }}
            >
              Minimal techno is a minimalist subgenre of techno music. It is
              characterized by a stripped-down aesthetic that exploits the use
              of repetition and understated development. Minimal techno is
              thought to have been originally developed in the early 1990s by
              Detroit-based producers Robert Hood and Daniel Bell.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#666",
                lineHeight: 1.8,
                mb: 3,
                fontSize: '1rem',
              }}
            >
              Such trends saw the demise of the soul-infused techno that
              typified the original Detroit sound. Robert Hood has noted that
              he and Daniel Bell both realized something was missing from
              techno in the post-rave era.
            </Typography>
          </Box>

          {/* Facilities Section */}
          {roomDetails?.facilities && (
            <Box>
              <Typography
                variant="h5"
                sx={{
                  color: "#152C5B",
                  fontWeight: 600,
                  fontFamily: "Poppins",
                  mb: 3,
                }}
              >
                What this place offers
              </Typography>
              <Grid container spacing={2}>
                {roomDetails.facilities.map((facility, index) => (
                  <Grid item xs={6} sm={4} md={3} key={index}>
                    <FacilityItem>
                      <img src={bedRoom} alt={facility?.name} />
                      <Typography
                        variant="caption"
                        sx={{
                          color: '#666',
                          fontFamily: 'Poppins',
                          fontSize: '0.75rem',
                          textAlign: 'center',
                        }}
                      >
                        {facility?.name}
                      </Typography>
                    </FacilityItem>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Grid>

        {/* Right Column - Booking Card */}
        <Grid item xs={12} lg={5}>
          <BookingCard>
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: 'Poppins',
                  fontWeight: 600,
                  color: '#152C5B',
                  textAlign: 'center',
                  mb: 3,
                }}
              >
                Start Booking
              </Typography>

              {/* Price Display */}
              <PriceDisplay>
                <Typography
                  variant="h3"
                  sx={{
                    color: '#1ABC9C',
                    fontFamily: 'Poppins',
                    fontWeight: 700,
                  }}
                >
                  ${roomDetails?.price || 0}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#B0B0B0',
                    fontFamily: 'Poppins',
                    fontWeight: 400,
                  }}
                >
                  per night
                </Typography>
              </PriceDisplay>

              {/* Discount Badge */}
              {roomDetails?.discount && (
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Chip
                    label={`${roomDetails.discount}% OFF`}
                    sx={{
                      backgroundColor: '#FF1612',
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                    }}
                  />
                </Box>
              )}

              <Divider sx={{ my: 3 }} />

              {/* Date Selection */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Poppins',
                    fontWeight: 600,
                    color: '#152C5B',
                    mb: 2,
                  }}
                >
                  Selected Dates
                </Typography>
                <TextField
                  fullWidth
                  value={`${startDate || ''} - ${endDate || ''}`}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PunchClockIcon color="action" />
                      </InputAdornment>
                    ),
                    readOnly: true,
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: '#f8f9fa',
                    },
                  }}
                />
              </Box>

              {/* Total Price */}
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mb: 3,
                p: 2,
                backgroundColor: '#f8f9fa',
                borderRadius: 2,
              }}>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#666',
                    fontFamily: 'Poppins',
                    fontWeight: 500,
                  }}
                >
                  Total for {count} night{count > 1 ? 's' : ''}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#152C5B',
                    fontFamily: 'Poppins',
                    fontWeight: 700,
                  }}
                >
                  ${(roomDetails?.price || 0) * (count || 0)}
                </Typography>
              </Box>

              {/* Booking Button */}
              <StyledButton
                fullWidth
                variant="contained"
                onClick={handleCreateBooking}
                disabled={!roomDetails?.price || !count}
                sx={{
                  backgroundColor: '#3252DF',
                  '&:hover': {
                    backgroundColor: '#2a47d1',
                  },
                  '&:disabled': {
                    backgroundColor: '#ccc',
                    color: '#666',
                  },
                }}
              >
                Continue to Book
              </StyledButton>
            </CardContent>
          </BookingCard>
        </Grid>
      </Grid>

      {/* Reviews Section */}
      <ReviewsSection 
        roomId={roomId || ''} 
        roomName={roomDetails?.name}
      />
    </Container>
  );
}
