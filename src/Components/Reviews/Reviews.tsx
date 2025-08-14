import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Rating,
  Chip,
  Divider,
  Skeleton,
  Alert,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { format } from 'date-fns';
import { reviewsService, handleApiError } from '../../services/api';
import { toast } from 'react-toastify';

// Styled components
const ReviewsContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const ReviewCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: theme.spacing(2),
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
  },
}));

const ReviewHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(1),
}));

const ReviewContent = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
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

interface ReviewsProps {
  roomId: string;
  onReviewAdded?: () => void;
}

const Reviews: React.FC<ReviewsProps> = ({ roomId, onReviewAdded }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await reviewsService.getRoomReviews(roomId);
   
      
      // Handle the new API response structure
      let reviewsData = [];
      
      if (response.data?.data?.roomReviews && Array.isArray(response.data.data.roomReviews)) {
        // New API structure: response.data.data.roomReviews
        reviewsData = response.data.data.roomReviews;
      } else if (response.data?.roomReviews && Array.isArray(response.data.roomReviews)) {
        // Alternative structure: response.data.roomReviews
        reviewsData = response.data.roomReviews;
      } else if (response.data?.reviews && Array.isArray(response.data.reviews)) {
        // Legacy structure: response.data.reviews
        reviewsData = response.data.reviews;
      } else if (Array.isArray(response.data)) {
        // If response.data is directly an array
        reviewsData = response.data;
      } else {
        // Default to empty array
        reviewsData = [];
      }
      
      console.log('Fetched reviews:', reviewsData);
      console.log('Reviews data type:', typeof reviewsData);
      console.log('Is array:', Array.isArray(reviewsData));
      console.log('Total count from API:', response.data?.data?.totalCount);
      setReviews(reviewsData);
      
             // Calculate average rating
       if (Array.isArray(reviewsData) && reviewsData.length > 0) {
         const totalRating = reviewsData.reduce((sum: number, review: Review) => sum + review.rating, 0);
         setAverageRating(totalRating / reviewsData.length);
       }
       
       // Use totalCount from API response if available, otherwise use array length
       const totalCount = response.data?.data?.totalCount || response.data?.totalCount || (Array.isArray(reviewsData) ? reviewsData.length : 0);
       setTotalReviews(totalCount);
    } catch (err: any) {
      console.error('Error fetching reviews:', err);
      
      // Check if it's an authentication error
      if (err.response?.status === 401 || 
          (err.response?.data?.message && err.response.data.message.includes('jwt malformed'))) {
        setError('Please sign in to view reviews');
        // Don't show toast for auth errors
      } else {
        const errorMessage = handleApiError(err);
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (roomId) {
      fetchReviews();
    }
  }, [roomId]);



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

  if (loading) {
    return (
      <ReviewsContainer>
        <Typography variant="h5" sx={{ mb: 3, fontFamily: 'Poppins', fontWeight: 600 }}>
          Reviews
        </Typography>
        {[1, 2, 3].map((index) => (
          <ReviewCard key={index}>
            <CardContent>
              <ReviewHeader>
                <Skeleton variant="circular" width={40} height={40} />
                <Box sx={{ flex: 1 }}>
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="40%" />
                </Box>
              </ReviewHeader>
              <Skeleton variant="text" width="100%" />
              <Skeleton variant="text" width="80%" />
            </CardContent>
          </ReviewCard>
        ))}
      </ReviewsContainer>
    );
  }

  if (error) {
    return (
      <ReviewsContainer>
        <Alert 
          severity="error" 
          action={
            <Button color="inherit" size="small" onClick={fetchReviews}>
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      </ReviewsContainer>
    );
  }

  return (
    <ReviewsContainer>
      {/* Reviews Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: 600, mb: 1 }}>
            Reviews ({totalReviews})
          </Typography>
          {totalReviews > 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Rating 
                value={averageRating} 
                precision={0.1} 
                readOnly 
                size="small"
                sx={{ '& .MuiRating-iconFilled': { color: getRatingColor(averageRating) } }}
              />
              <Typography variant="body2" color="text.secondary">
                {averageRating.toFixed(1)} out of 5
              </Typography>
            </Box>
          )}
        </Box>
        <Button 
          variant="outlined" 
          onClick={fetchReviews}
          sx={{ 
            borderRadius: 2,
            textTransform: 'none',
            fontFamily: 'Poppins',
            fontWeight: 500,
          }}
        >
          Refresh
        </Button>
      </Box>

             {/* Reviews List */}
       {!Array.isArray(reviews) || reviews.length === 0 ? (
        <Card sx={{ borderRadius: 2, textAlign: 'center', py: 4 }}>
          <CardContent>
            <Typography variant="h6" color="text.secondary" sx={{ fontFamily: 'Poppins' }}>
              No reviews yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Be the first to share your experience!
            </Typography>
          </CardContent>
        </Card>
             ) : (
         (Array.isArray(reviews) ? reviews : []).map((review) => (
          <ReviewCard key={review._id}>
            <CardContent>
              <ReviewHeader>
                <Avatar 
                  src={review.user.profileImage}
                  sx={{ 
                    bgcolor: getRatingColor(review.rating),
                    width: 40,
                    height: 40,
                    fontFamily: 'Poppins',
                    fontWeight: 600,
                  }}
                >
                  {getInitials(review.user.userName)}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      fontFamily: 'Poppins',
                      fontWeight: 600,
                      color: '#152C5B',
                    }}
                  >
                    {review.user.userName}
                  </Typography>
                  <Rating 
                    value={review.rating} 
                    readOnly 
                    size="small"
                    sx={{ 
                      '& .MuiRating-iconFilled': { color: getRatingColor(review.rating) },
                      mt: 0.5,
                    }}
                  />
                </Box>
                <ReviewDate sx={{ fontFamily: 'Poppins' }}>
                  {format(new Date(review.createdAt), 'MMM dd, yyyy')}
                </ReviewDate>
              </ReviewHeader>
              
              <ReviewContent>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontFamily: 'Poppins',
                    lineHeight: 1.6,
                    color: '#333',
                  }}
                >
                  {review.review}
                </Typography>
              </ReviewContent>

              {review.updatedAt !== review.createdAt && (
                <Box sx={{ mt: 2, pt: 1 }}>
                  <Chip 
                    label="Edited" 
                    size="small" 
                    variant="outlined"
                    sx={{ 
                      fontSize: '0.75rem',
                      fontFamily: 'Poppins',
                    }}
                  />
                </Box>
              )}
            </CardContent>
          </ReviewCard>
        ))
      )}
    </ReviewsContainer>
  );
};

export default Reviews;
