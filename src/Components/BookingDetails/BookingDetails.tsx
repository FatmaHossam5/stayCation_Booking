import { 
  Container, 
  Grid, 
  Paper, 
  styled, 
  Typography, 
  IconButton, 
  Button, 
  Box,
  CircularProgress,
  Alert,
  Chip,
  Divider
} from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { AuthContext } from '../../Context/AuthContext'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'
import { bookingService } from '../../services/bookingService'
import { format } from 'date-fns'

// Type definitions
interface BookingDetails {
  user?: {
    userName?: string
    name?: string
    fullName?: string
  }
  room?: {
    roomNumber?: string
    number?: string
    name?: string
  }
  totalPrice?: number
  price?: number
  amount?: number
  startDate?: string
  checkIn?: string
  endDate?: string
  checkOut?: string
  status?: string
  paymentStatus?: string
  bookingStatus?: string
}

// Styled components for better organization
const ConfirmationCard = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(135deg, #203FC7 0%, #1a2f9e 100%)',
  borderRadius: theme.spacing(3),
  padding: theme.spacing(4),
  boxShadow: '0 8px 32px rgba(32, 63, 199, 0.3)',
  maxWidth: 600,
  width: '100%',
  margin: '0 auto',
  [theme.breakpoints.down('sm')]: {
    margin: theme.spacing(2),
    padding: theme.spacing(3),
  }
}))

const InfoSection = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(2.5),
  marginBottom: theme.spacing(2),
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
  }
}))

const StatusChip = styled(Chip)(({ theme }) => ({
  background: 'linear-gradient(45deg, #4CAF50, #45a049)',
  color: 'white',
  fontWeight: 600,
  fontSize: '0.875rem',
  padding: theme.spacing(0.5, 2),
  '& .MuiChip-label': {
    padding: theme.spacing(0.5, 1),
  }
}))

export default function BookingDetails() {
  const { baseUrl, reqHeaders, role } = useContext(AuthContext)
  const { bookingId } = useParams()
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem("userToken");
        const bookingData = await bookingService.getBookingDetails(bookingId!, role, token!, baseUrl);
        setBookingDetails(bookingData);
      } catch (error) {
        console.error('Error fetching booking details:', error)
        setError('Failed to load booking details. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchBookingDetails()
  }, [baseUrl, bookingId, role])

  const handleBackToHome = () => {
    navigate('/')
  }

  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return 'N/A'
    try {
      return format(new Date(dateString), 'MMM dd, yyyy')
    } catch {
      return 'Invalid date'
    }
  }

  const getStatusColor = (status: string | undefined): 'success' | 'warning' | 'error' | 'default' => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return 'success'
      case 'pending':
        return 'warning'
      case 'cancelled':
        return 'error'
      default:
        return 'default'
    }
  }

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress size={60} sx={{ color: '#203FC7' }} />
        </Box>
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={handleBackToHome}
          sx={{ bgcolor: '#203FC7' }}
        >
          Back to Home
        </Button>
      </Container>
    )
  }

  return (
    <Container maxWidth="md" sx={{ py: { xs: 2, md: 4 } }}>
      <ConfirmationCard>
        {/* Header Section */}
        <Box textAlign="center" mb={4}>
          <IconButton 
            sx={{ 
              color: '#4CAF50', 
              mb: 2,
              '&:hover': { transform: 'scale(1.1)' },
              transition: 'transform 0.2s ease-in-out'
            }}
          >
            <CheckCircleIcon sx={{ fontSize: { xs: '3rem', md: '4rem' } }} />
          </IconButton>
          
          <Typography 
            variant="h4" 
            sx={{ 
              color: 'white', 
              fontWeight: 600,
              mb: 1,
              fontSize: { xs: '1.5rem', md: '2rem' }
            }}
          >
            Booking Confirmed!
          </Typography>
          
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: { xs: '1rem', md: '1.25rem' }
            }}
          >
                         Thank you, {bookingDetails?.user?.userName || bookingDetails?.user?.name || bookingDetails?.user?.fullName || 'Guest'}
          </Typography>
        </Box>

        <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', mb: 3 }} />

        {/* Booking Information */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <InfoSection>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.7)', 
                  mb: 1,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontSize: '0.75rem'
                }}
              >
                Room Number
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: 'white', 
                  fontWeight: 600,
                  fontSize: { xs: '1rem', md: '1.25rem' }
                }}
              >
                                 {bookingDetails?.room?.roomNumber || bookingDetails?.room?.number || bookingDetails?.room?.name || 'N/A'}
              </Typography>
            </InfoSection>
          </Grid>

          <Grid item xs={12} sm={6}>
            <InfoSection>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.7)', 
                  mb: 1,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontSize: '0.75rem'
                }}
              >
                Total Amount
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: 'white', 
                  fontWeight: 600,
                  fontSize: { xs: '1rem', md: '1.25rem' }
                }}
              >
                                 ${bookingDetails?.totalPrice || bookingDetails?.price || bookingDetails?.amount || '0'}
              </Typography>
            </InfoSection>
          </Grid>

          <Grid item xs={12}>
            <InfoSection>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.7)', 
                  mb: 1,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontSize: '0.75rem'
                }}
              >
                Booking Period
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: 'white', 
                  fontWeight: 600,
                  fontSize: { xs: '1rem', md: '1.25rem' }
                }}
              >
                                 {formatDate(bookingDetails?.startDate || bookingDetails?.checkIn)} - {formatDate(bookingDetails?.endDate || bookingDetails?.checkOut)}
              </Typography>
            </InfoSection>
          </Grid>

          <Grid item xs={12}>
            <InfoSection>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.7)', 
                  mb: 2,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontSize: '0.75rem'
                }}
              >
                Payment Status
              </Typography>
                             <StatusChip 
                 label={bookingDetails?.status || bookingDetails?.paymentStatus || bookingDetails?.bookingStatus || 'Unknown'} 
                 color={getStatusColor(bookingDetails?.status || bookingDetails?.paymentStatus || bookingDetails?.bookingStatus)}
                sx={{ 
                  fontSize: { xs: '0.75rem', md: '0.875rem' },
                  height: { xs: 28, md: 32 }
                }}
              />
            </InfoSection>
          </Grid>
        </Grid>

        {/* Action Button */}
        <Box textAlign="center" mt={4}>
          <Button
            variant="contained"
            size="large"
            onClick={handleBackToHome}
            startIcon={<ArrowBackIcon />}
            sx={{
              bgcolor: 'white',
              color: '#203FC7',
              px: 4,
              py: 1.5,
              borderRadius: 3,
              fontWeight: 600,
              fontSize: { xs: '0.875rem', md: '1rem' },
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.9)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
              },
              transition: 'all 0.3s ease-in-out',
              minWidth: { xs: '200px', md: '250px' }
            }}
          >
            Back to Home
          </Button>
        </Box>
      </ConfirmationCard>
    </Container>
  )
}
