import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Rating,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Chip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import { reviewsService, handleApiError } from '../../services/api';
import { toast } from 'react-toastify';

// Styled components
const AddReviewCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  marginBottom: theme.spacing(3),
}));

const RatingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconFilled': {
    color: '#FFD700',
  },
  '& .MuiRating-iconHover': {
    color: '#FFD700',
  },
}));

const ReviewTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(1.5),
    fontFamily: 'Poppins',
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(1.5),
  textTransform: 'none',
  fontFamily: 'Poppins',
  fontWeight: 600,
  padding: theme.spacing(1.5, 3),
  boxShadow: '0 4px 12px rgba(50, 82, 223, 0.3)',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-1px)',
    boxShadow: '0 6px 20px rgba(50, 82, 223, 0.4)',
  },
}));

// Types
interface AddReviewProps {
  roomId: string;
  roomName?: string;
  onReviewSubmitted?: () => void;
  open: boolean;
  onClose: () => void;
}

const AddReview: React.FC<AddReviewProps> = ({ 
  roomId, 
  roomName, 
  onReviewSubmitted, 
  open, 
  onClose 
}) => {
  const [rating, setRating] = useState<number | null>(null);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!rating) {
      setError('Please select a rating');
      return;
    }

    if (!review.trim()) {
      setError('Please write a review');
      return;
    }

    if (review.trim().length < 10) {
      setError('Review must be at least 10 characters long');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      console.log('Submitting review:', { roomId, rating, review: review.trim() });
      console.log('Room ID type:', typeof roomId);
      const response = await reviewsService.createReview({
        roomId,
        rating,
        review: review.trim(),
      });
      console.log('Review submission response:', response);
      console.log('Response status:', response.status);
      console.log('Response data:', response.data);

      toast.success('Review submitted successfully!');
      
      // Reset form
      setRating(null);
      setReview('');
      
      // Close dialog and refresh reviews with a small delay
      onClose();
      setTimeout(() => {
        if (onReviewSubmitted) {
          onReviewSubmitted();
        }
      }, 500);
    } catch (err: any) {
      // Check if it's an authentication error
      if (err.response?.status === 401 || 
          (err.response?.data?.message && err.response.data.message.includes('jwt malformed'))) {
        setError('Please sign in to submit a review');
        toast.error('Authentication required. Please sign in again.');
      } else {
        const errorMessage = handleApiError(err);
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setRating(null);
      setReview('');
      setError(null);
      onClose();
    }
  };

  const getRatingLabel = (value: number) => {
    const labels: { [key: number]: string } = {
      1: 'Poor',
      2: 'Fair',
      3: 'Good',
      4: 'Very Good',
      5: 'Excellent',
    };
    return labels[value] || '';
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          fontFamily: 'Poppins',
        },
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        fontFamily: 'Poppins',
        fontWeight: 600,
        color: '#152C5B',
      }}>
        Write a Review
        <IconButton onClick={handleClose} disabled={loading}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {roomName && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Poppins' }}>
              Reviewing:
            </Typography>
            <Typography variant="h6" sx={{ fontFamily: 'Poppins', fontWeight: 600, color: '#152C5B' }}>
              {roomName}
            </Typography>
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2, fontFamily: 'Poppins' }}>
            {error}
          </Alert>
        )}

        {/* Rating Selection */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ 
            fontFamily: 'Poppins', 
            fontWeight: 600, 
            mb: 1,
            color: '#152C5B',
          }}>
            Your Rating *
          </Typography>
          <RatingContainer>
            <StyledRating
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
                setError(null);
              }}
              size="large"
              icon={<StarIcon fontSize="large" />}
            />
            {rating && (
              <Chip 
                label={getRatingLabel(rating)} 
                color="primary" 
                variant="outlined"
                sx={{ fontFamily: 'Poppins', fontWeight: 500 }}
              />
            )}
          </RatingContainer>
        </Box>

        {/* Review Text */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" sx={{ 
            fontFamily: 'Poppins', 
            fontWeight: 600, 
            mb: 1,
            color: '#152C5B',
          }}>
            Your Review *
          </Typography>
          <ReviewTextField
            fullWidth
            multiline
            rows={4}
            placeholder="Share your experience with this room..."
            value={review}
            onChange={(e) => {
              setReview(e.target.value);
              setError(null);
            }}
            disabled={loading}
            inputProps={{
              maxLength: 500,
            }}
            helperText={`${review.length}/500 characters`}
            FormHelperTextProps={{
              sx: { 
                fontFamily: 'Poppins',
                fontSize: '0.75rem',
                color: review.length > 450 ? '#f44336' : 'text.secondary',
              },
            }}
          />
        </Box>

        {/* Guidelines */}
        <Box sx={{ 
          p: 2, 
          backgroundColor: '#f8f9fa', 
          borderRadius: 2,
          border: '1px solid #e9ecef',
        }}>
          <Typography variant="body2" sx={{ 
            fontFamily: 'Poppins',
            color: '#666',
            fontSize: '0.875rem',
          }}>
            <strong>Review Guidelines:</strong>
          </Typography>
          <Typography variant="body2" sx={{ 
            fontFamily: 'Poppins',
            color: '#666',
            fontSize: '0.875rem',
            mt: 0.5,
          }}>
            • Minimum 10 characters required
          </Typography>
          <Typography variant="body2" sx={{ 
            fontFamily: 'Poppins',
            color: '#666',
            fontSize: '0.875rem',
          }}>
            • Be honest and constructive
          </Typography>
          <Typography variant="body2" sx={{ 
            fontFamily: 'Poppins',
            color: '#666',
            fontSize: '0.875rem',
          }}>
            • Focus on your personal experience
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button 
          onClick={handleClose} 
          disabled={loading}
          sx={{ 
            fontFamily: 'Poppins',
            fontWeight: 500,
            textTransform: 'none',
          }}
        >
          Cancel
        </Button>
        <SubmitButton
          variant="contained"
          onClick={handleSubmit}
          disabled={loading || !rating || !review.trim()}
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
          {loading ? 'Submitting...' : 'Submit Review'}
        </SubmitButton>
      </DialogActions>
    </Dialog>
  );
};

export default AddReview;
