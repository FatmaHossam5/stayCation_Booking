import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Rating,
  Chip,
  Skeleton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { reviewsService, handleApiError } from '../../services/api';

// Styled components
const SummaryContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const RatingDisplay = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconFilled': {
    color: '#FFD700',
  },
  '& .MuiRating-iconEmpty': {
    color: '#E0E0E0',
  },
}));

// Types
interface ReviewsSummaryProps {
  roomId: string;
  compact?: boolean;
}

interface ReviewsData {
  averageRating: number;
  totalReviews: number;
}

const ReviewsSummary: React.FC<ReviewsSummaryProps> = ({ roomId, compact = false }) => {
  const [reviewsData, setReviewsData] = useState<ReviewsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviewsSummary = async () => {
      try {
        setLoading(true);
        const response = await reviewsService.getRoomReviews(roomId);
        
        // Handle the new API response structure
        let reviews = [];
        if (response.data?.data?.roomReviews && Array.isArray(response.data.data.roomReviews)) {
          reviews = response.data.data.roomReviews;
        } else if (response.data?.roomReviews && Array.isArray(response.data.roomReviews)) {
          reviews = response.data.roomReviews;
        } else if (response.data?.reviews && Array.isArray(response.data.reviews)) {
          reviews = response.data.reviews;
        } else {
          reviews = [];
        }
        
        if (reviews.length > 0) {
          const totalRating = reviews.reduce((sum: number, review: any) => sum + review.rating, 0);
          const averageRating = totalRating / reviews.length;
          
          // Use totalCount from API response if available, otherwise use array length
          const totalCount = response.data?.data?.totalCount || response.data?.totalCount || reviews.length;
          
          setReviewsData({
            averageRating,
            totalReviews: totalCount,
          });
        } else {
          setReviewsData({
            averageRating: 0,
            totalReviews: 0,
          });
        }
      } catch (error) {
        // Silently handle error for summary component
        console.error('Failed to fetch reviews summary:', error);
        setReviewsData({
          averageRating: 0,
          totalReviews: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    if (roomId) {
      fetchReviewsSummary();
    }
  }, [roomId]);

  if (loading) {
    return (
      <SummaryContainer>
        <Skeleton variant="rectangular" width={120} height={24} />
        <Skeleton variant="rectangular" width={80} height={20} />
      </SummaryContainer>
    );
  }

  if (!reviewsData || reviewsData.totalReviews === 0) {
    return (
      <SummaryContainer>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ fontFamily: 'Poppins' }}
        >
          No reviews yet
        </Typography>
      </SummaryContainer>
    );
  }

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

  if (compact) {
    return (
      <SummaryContainer>
        <RatingDisplay>
          <StyledRating
            value={reviewsData.averageRating}
            precision={0.1}
            readOnly
            size="small"
          />
          <Typography 
            variant="body2" 
            sx={{ 
              fontFamily: 'Poppins',
              fontWeight: 500,
              color: getRatingColor(reviewsData.averageRating),
            }}
          >
            {reviewsData.averageRating.toFixed(1)}
          </Typography>
        </RatingDisplay>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ fontFamily: 'Poppins' }}
        >
          ({reviewsData.totalReviews} review{reviewsData.totalReviews !== 1 ? 's' : ''})
        </Typography>
      </SummaryContainer>
    );
  }

  return (
    <SummaryContainer>
      <RatingDisplay>
        <StyledRating
          value={reviewsData.averageRating}
          precision={0.1}
          readOnly
          size="small"
        />
        <Typography 
          variant="body1" 
          sx={{ 
            fontFamily: 'Poppins',
            fontWeight: 600,
            color: getRatingColor(reviewsData.averageRating),
          }}
        >
          {reviewsData.averageRating.toFixed(1)}
        </Typography>
      </RatingDisplay>
      
      <Chip 
        label={getRatingLabel(reviewsData.averageRating)}
        size="small"
        sx={{ 
          fontFamily: 'Poppins',
          fontWeight: 500,
          backgroundColor: getRatingColor(reviewsData.averageRating),
          color: 'white',
        }}
      />
      
      <Typography 
        variant="body2" 
        color="text.secondary"
        sx={{ fontFamily: 'Poppins' }}
      >
        {reviewsData.totalReviews} review{reviewsData.totalReviews !== 1 ? 's' : ''}
      </Typography>
    </SummaryContainer>
  );
};

export default ReviewsSummary;
