
import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, useTheme, useMediaQuery, Avatar, Rating, Skeleton, Alert, Button } from "@mui/material";
import { styled } from '@mui/material/styles';
import { format } from 'date-fns';
import { reviewsService, handleApiError } from '../../../services/api';
import { toast } from 'react-toastify';
import axios from 'axios';

// Styled components
const TestimonialCard = styled(Paper)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
  },
}));

const ReviewHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(1),
}));

const ReviewDate = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
  marginLeft: 'auto',
}));

// Types
interface Review {
  _id: string;
  rating: number;
  review: string;
  user: {
    _id: string;
    userName: string;
    profileImage?: string;
  };
  room: {
    _id: string;
    roomNumber: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface Room {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
}

interface ReviewsData {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

const RateSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [reviewsData, setReviewsData] = useState<ReviewsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // First, fetch available rooms to get real room IDs
      let roomIds: string[] = [];
      try {
        const roomsResponse = await axios.get('/api/v0/portal/rooms/available', {
          params: {
            page: 1,
            size: 10, // Get first 10 rooms
          }
        });
        
        if (roomsResponse.data?.data?.rooms && Array.isArray(roomsResponse.data.data.rooms)) {
          roomIds = roomsResponse.data.data.rooms.map((room: Room) => room._id);
        }
      } catch (err) {
        console.warn('Failed to fetch rooms, using fallback approach:', err);
        // If rooms fetch fails, we'll handle it gracefully
      }

      // If no rooms found, use a fallback approach
      if (roomIds.length === 0) {
        // Try to fetch some reviews without specific room IDs or use a different approach
        console.log('No rooms found, will show fallback content');
        setReviewsData({
          reviews: [],
          averageRating: 0,
          totalReviews: 0
        });
        return;
      }

      const allReviews: Review[] = [];
      let totalRating = 0;
      let totalReviews = 0;

      // Fetch reviews from the available rooms
      for (const roomId of roomIds.slice(0, 5)) { // Limit to first 5 rooms to avoid too many requests
        try {
          const response = await reviewsService.getRoomReviews(roomId);
          
          let reviews: Review[] = [];
          if (response.data?.data?.roomReviews && Array.isArray(response.data.data.roomReviews)) {
            reviews = response.data.data.roomReviews;
          } else if (response.data?.roomReviews && Array.isArray(response.data.roomReviews)) {
            reviews = response.data.roomReviews;
          } else if (response.data?.reviews && Array.isArray(response.data.reviews)) {
            reviews = response.data.reviews;
          } else if (Array.isArray(response.data)) {
            reviews = response.data;
          }

          allReviews.push(...reviews);
          
          // Calculate total rating
          reviews.forEach((review: Review) => {
            totalRating += review.rating;
            totalReviews++;
          });
        } catch (err) {
          // Continue with other rooms if one fails
          console.warn(`Failed to fetch reviews for room ${roomId}:`, err);
        }
      }

      // Sort reviews by date (most recent first) and rating (highest first)
      const sortedReviews = allReviews.sort((a, b) => {
        const dateComparison = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        if (dateComparison !== 0) return dateComparison;
        return b.rating - a.rating;
      });

      // Take the top 3 reviews for display
      const topReviews = sortedReviews.slice(0, 3);

      const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0;

      setReviewsData({
        reviews: topReviews,
        averageRating,
        totalReviews
      });

    } catch (err: any) {
      console.error('Error fetching reviews:', err);
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      // Don't show toast for this component as it's on the landing page
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllReviews();
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return '#4CAF50';
    if (rating >= 3) return '#FF9800';
    return '#F44336';
  };

  const getRatingLabel = (rating: number) => {
    if (rating >= 4.5) return 'Excellent';
    if (rating >= 4) return 'Very Good';
    if (rating >= 3.5) return 'Good';
    if (rating >= 3) return 'Fair';
    return 'Poor';
  };



  if (loading) {
    return (
      <Box 
        component="section" 
        sx={{
          py: { xs: 4, md: 6 },
          textAlign: 'center'
        }}
      >
        <Typography 
          variant="h4" 
          color="primary"
          sx={{ 
            mb: 1,
            fontWeight: 'bold',
            fontSize: { xs: '1.5rem', md: '2rem' }
          }}
        >
          What Our Guests Say
        </Typography>
        
        <Typography 
          variant="body1" 
          color="text.secondary"
          sx={{ 
            mb: 6,
            maxWidth: '600px',
            mx: 'auto',
            fontSize: { xs: '0.9rem', md: '1rem' }
          }}
        >
          Discover why families choose StayCation for their perfect getaway
        </Typography>

        {/* Loading skeletons */}
        {[1, 2, 3].map((index) => (
          <TestimonialCard 
            key={index}
            elevation={3}
            sx={{
              p: { xs: 3, md: 4 },
              maxWidth: '800px',
              mx: 'auto',
              mb: 3,
              background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: { xs: 3, md: 4 } }}>
              <Skeleton variant="circular" width={120} height={120} />
              <Box sx={{ flex: 1, width: '100%' }}>
                <Skeleton variant="text" width="60%" height={32} />
                <Skeleton variant="text" width="40%" height={24} sx={{ mb: 2 }} />
                <Skeleton variant="text" width="100%" height={20} />
                <Skeleton variant="text" width="80%" height={20} />
                <Skeleton variant="text" width="60%" height={20} />
              </Box>
            </Box>
          </TestimonialCard>
        ))}
      </Box>
    );
  }

  if (error) {
    return (
      <Box 
        component="section" 
        sx={{
          py: { xs: 4, md: 6 },
          textAlign: 'center'
        }}
      >
        <Typography 
          variant="h4" 
          color="primary"
          sx={{ 
            mb: 1,
            fontWeight: 'bold',
            fontSize: { xs: '1.5rem', md: '2rem' }
          }}
        >
          What Our Guests Say
        </Typography>
        
        <Alert 
          severity="error" 
          action={
            <Button color="inherit" size="small" onClick={fetchAllReviews}>
              Retry
            </Button>
          }
          sx={{ maxWidth: '600px', mx: 'auto', mt: 3 }}
        >
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box 
      component="section" 
      sx={{
        py: { xs: 4, md: 6 },
        textAlign: 'center'
      }}
    >
      {/* Section Header */}
      <Typography 
        variant="h4" 
        color="primary"
        sx={{ 
          mb: 1,
          fontWeight: 'bold',
          fontSize: { xs: '1.5rem', md: '2rem' }
        }}
      >
        What Our Guests Say
      </Typography>
      
      <Typography 
        variant="body1" 
        color="text.secondary"
        sx={{ 
          mb: 2,
          maxWidth: '600px',
          mx: 'auto',
          fontSize: { xs: '0.9rem', md: '1rem' }
        }}
      >
        Discover why families choose StayCation for their perfect getaway
      </Typography>

      {/* Overall Rating Summary */}
      {reviewsData && reviewsData.totalReviews > 0 && (
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 1 }}>
            <Rating 
              value={reviewsData.averageRating} 
              precision={0.1} 
              readOnly 
              size="large"
              sx={{
                '& .MuiRating-iconFilled': {
                  color: getRatingColor(reviewsData.averageRating),
                },
                '& .MuiRating-iconHover': {
                  color: getRatingColor(reviewsData.averageRating),
                }
              }}
            />
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 'bold',
                color: getRatingColor(reviewsData.averageRating),
                fontSize: { xs: '1.2rem', md: '1.5rem' }
              }}
            >
              {reviewsData.averageRating.toFixed(1)}
            </Typography>
          </Box>
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{ 
              fontWeight: '500',
              fontSize: { xs: '0.9rem', md: '1rem' }
            }}
          >
            {getRatingLabel(reviewsData.averageRating)} • {reviewsData.totalReviews} reviews
          </Typography>
        </Box>
      )}

      {/* Testimonial Cards */}
      {reviewsData && reviewsData.reviews.length > 0 ? (
        reviewsData.reviews.map((review) => (
          <TestimonialCard 
            key={review._id}
            elevation={3}
            sx={{
              p: { xs: 3, md: 4 },
              maxWidth: '800px',
              mx: 'auto',
              mb: 3,
              background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Box 
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                gap: { xs: 3, md: 4 },
                textAlign: { xs: 'center', md: 'left' }
              }}
            >
              {/* Profile Image */}
              <Box 
                sx={{
                  flexShrink: 0,
                  position: 'relative'
                }}
              >
                <Avatar
                  src={review.user.profileImage}
                  sx={{
                    width: { xs: 120, md: 150 },
                    height: { xs: 120, md: 150 },
                    fontSize: { xs: '2rem', md: '2.5rem' },
                    bgcolor: getRatingColor(review.rating),
                    border: '4px solid',
                    borderColor: 'primary.main',
                    boxShadow: 3
                  }}
                >
                  {getInitials(review.user.userName)}
                </Avatar>
              </Box>

              {/* Testimonial Content */}
              <Box sx={{ flex: 1 }}>
                <ReviewHeader>
                  <Box sx={{ flex: 1 }}>
                    <Typography 
                      variant="h6" 
                      color="primary"
                      sx={{ 
                        mb: 1,
                        fontWeight: '600',
                        fontSize: { xs: '1.1rem', md: '1.25rem' }
                      }}
                    >
                      {review.user.userName}
                    </Typography>
                    
                    <Box sx={{ mb: 2 }}>
                      <Rating 
                        value={review.rating} 
                        readOnly 
                        size="large"
                        sx={{
                          '& .MuiRating-iconFilled': {
                            color: theme.palette.warning.main,
                          },
                          '& .MuiRating-iconHover': {
                            color: theme.palette.warning.main,
                          }
                        }}
                      />
                    </Box>
                  </Box>
                  <ReviewDate sx={{ fontFamily: 'Poppins' }}>
                    {format(new Date(review.createdAt), 'MMM dd, yyyy')}
                  </ReviewDate>
                </ReviewHeader>
                
                <Typography 
                  variant="body1"
                  sx={{ 
                    mb: 2,
                    fontStyle: 'italic',
                    lineHeight: 1.6,
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    color: 'text.primary'
                  }}
                >
                  "{review.review}"
                </Typography>
                
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    fontWeight: '500',
                    fontSize: { xs: '0.8rem', md: '0.9rem' }
                  }}
                >
                  Room {review.room.roomNumber}
                </Typography>
              </Box>
            </Box>
          </TestimonialCard>
        ))
      ) : (
        <TestimonialCard 
          elevation={3}
          sx={{
            p: { xs: 3, md: 4 },
            maxWidth: '800px',
            mx: 'auto',
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
            border: '1px solid',
            borderColor: 'divider'
          }}
        >
          <Typography 
            variant="h6" 
            color="text.secondary"
            sx={{ 
              fontStyle: 'italic',
              fontSize: { xs: '1rem', md: '1.2rem' }
            }}
          >
            "What a great trip with my family and I should try again next time soon. 
            The accommodations were perfect, the service was exceptional, and the memories 
            we created will last a lifetime."
          </Typography>
          
          <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
            <Avatar
              sx={{
                width: 60,
                height: 60,
                bgcolor: 'primary.main',
                border: '2px solid',
                borderColor: 'primary.main',
              }}
            >
              HK
            </Avatar>
            <Box>
              <Typography 
                variant="subtitle1" 
                color="primary"
                sx={{ fontWeight: '600' }}
              >
                Happy Family
              </Typography>
              <Rating value={5} readOnly size="small" />
            </Box>
          </Box>
        </TestimonialCard>
      )}
    </Box>
  );
};

export default RateSection;