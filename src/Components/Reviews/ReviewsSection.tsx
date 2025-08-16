import React, { useState, useContext } from 'react';
import {
  Box,
  Typography,
  Button,
  Divider,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import Reviews from './Reviews';
import AddReview from './AddReview';
import { AuthContext } from '../../Context/AuthContext';

// Styled components
const ReviewsSectionContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(3),
}));

const AddReviewButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  textTransform: 'none',
  fontFamily: 'Poppins',
  fontWeight: 600,
  padding: theme.spacing(1, 2.5),
  boxShadow: '0 4px 12px rgba(50, 82, 223, 0.3)',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-1px)',
    boxShadow: '0 6px 20px rgba(50, 82, 223, 0.4)',
  },
}));

// Types
interface ReviewsSectionProps {
  roomId: string;
  roomName?: string;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ roomId, roomName }) => {
  const [addReviewOpen, setAddReviewOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const { userToken, role } = useContext(AuthContext);

  const handleAddReviewClick = () => {
    if (!userToken) {
      // Redirect to login or show login prompt
      return;
    }
    setAddReviewOpen(true);
  };

  const handleReviewSubmitted = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleCloseAddReview = () => {
    setAddReviewOpen(false);
  };

  return (
    <ReviewsSectionContainer>
      <Divider sx={{ mb: 4 }} />
      
      {/* Section Header */}
      <SectionHeader>
        <Typography 
          variant="h4" 
          sx={{ 
            fontFamily: 'Poppins', 
            fontWeight: 700,
            color: '#152C5B',
          }}
        >
          Guest Reviews
        </Typography>
        
        {userToken && role === 'user' && (
          <AddReviewButton
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddReviewClick}
            sx={{
              backgroundColor: '#3252DF',
              '&:hover': {
                backgroundColor: '#2a47d1',
              },
            }}
          >
            Write a Review
          </AddReviewButton>
        )}
      </SectionHeader>

      {/* Login Prompt for Non-Authenticated Users */}
      {!userToken && (
        <Alert 
          severity="info" 
          sx={{ 
            mb: 3, 
            fontFamily: 'Poppins',
            borderRadius: 2,
          }}
        >
          <Typography variant="body2" sx={{ fontFamily: 'Poppins' }}>
            <strong>Want to share your experience?</strong> Please sign in to write a review.
          </Typography>
        </Alert>
      )}

      {/* Reviews Component */}
      <Reviews 
        key={refreshKey}
        roomId={roomId} 
        onReviewAdded={handleReviewSubmitted}
      />

      {/* Add Review Dialog */}
      <AddReview
        roomId={roomId}
        roomName={roomName}
        open={addReviewOpen}
        onClose={handleCloseAddReview}
        onReviewSubmitted={handleReviewSubmitted}
      />
    </ReviewsSectionContainer>
  );
};

export default ReviewsSection;
