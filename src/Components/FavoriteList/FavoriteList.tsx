import React, { useContext, useEffect, useState, useMemo, memo } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  Box,
  Container,
  Skeleton,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Tooltip,
  Fade,
  Zoom
} from "@mui/material";
import {
  Favorite as FavoriteIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Sort as SortIcon,

} from '@mui/icons-material';
import { AuthContext } from "../../Context/AuthContext";
import { useToastContext } from "../../Context/ToastContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Type definitions
interface Room {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  images: string[];
}

interface FavoriteCardProps {
  room: Room;
  onRemove: (roomId: string) => void;
  onView: (roomId: string) => void;
  isRemoving: boolean;
  index: number;
}

interface EmptyStateProps {
  onRefresh: () => void;
}

// Memoized Favorite Card Component
const FavoriteCard: React.FC<FavoriteCardProps> = memo(({ room, onRemove, onView, isRemoving, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Fade in timeout={300 + index * 100}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
          },
          opacity: isRemoving ? 0.5 : 1,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onView(room._id)}
      >
        {/* Image Container */}
        <Box sx={{ position: 'relative', flexGrow: 1 }}>
          <CardMedia
            component="img"
            alt={`Room ${room?.roomNumber}`}
            height="220"
            image={room?.images?.[0] || '/placeholder-room.jpg'}
            sx={{
              objectFit: 'cover',
              width: '100%',
              transition: 'transform 0.3s ease',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            }}
          />
          
          {/* Price Badge */}
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '20px',
              px: 2,
              py: 0.5,
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
          >
            <Typography 
              variant="subtitle2" 
              fontWeight="700" 
              color="primary"
              sx={{ fontSize: '0.875rem' }}
            >
              ${room?.price}/night
            </Typography>
          </Box>

          {/* Remove from Favorites Button */}
          <Tooltip title="Remove from favorites" arrow>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                onRemove(room._id);
              }}
              disabled={isRemoving}
              sx={{
                position: 'absolute',
                top: 12,
                left: 12,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 1)',
                  transform: 'scale(1.1)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                },
                transition: 'all 0.2s ease',
                width: 40,
                height: 40,
              }}
            >
              <FavoriteIcon 
                sx={{ 
                  color: '#e74c3c',
                  fontSize: '1.2rem',
                  animation: isRemoving ? 'pulse 1s infinite' : 'none',
                  '@keyframes pulse': {
                    '0%': { opacity: 1 },
                    '50%': { opacity: 0.5 },
                    '100%': { opacity: 1 },
                  }
                }} 
              />
            </IconButton>
          </Tooltip>

          {/* Room Number Overlay */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
              p: 2,
            }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'white', 
                fontWeight: 600,
                textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                fontSize: { xs: '1rem', sm: '1.125rem' }
              }}
            >
              Room {room?.roomNumber}
            </Typography>
          </Box>
        </Box>

        {/* Card Content */}
        <CardContent sx={{ p: 2, flexGrow: 0 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ fontWeight: 500 }}
            >
              Capacity: {room?.capacity || 'N/A'} guests
            </Typography>
            <Chip 
              label="Available" 
              size="small" 
              color="success" 
              variant="outlined"
              sx={{ fontSize: '0.75rem' }}
            />
          </Box>
          
          {/* View Details Button */}
          <Button
            variant="outlined"
            fullWidth
            startIcon={<ViewIcon />}
            onClick={(e) => {
              e.stopPropagation();
              onView(room._id);
            }}
            sx={{
              mt: 1,
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 600,
              borderWidth: '2px',
              '&:hover': {
                borderWidth: '2px',
                transform: 'translateY(-1px)',
              },
              transition: 'all 0.2s ease',
            }}
          >
            View Details
          </Button>
        </CardContent>
      </Card>
    </Fade>
  );
});

FavoriteCard.displayName = 'FavoriteCard';

// Loading Skeleton Component
const LoadingSkeleton = () => (
  <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
    {Array.from({ length: 6 }).map((_, index) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
        <Card sx={{ height: 320 }}>
          <Skeleton variant="rectangular" height={220} />
          <CardContent sx={{ p: 2 }}>
            <Skeleton variant="text" width="60%" sx={{ mb: 1 }} />
            <Skeleton variant="text" width="40%" sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" height={36} />
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

// Empty State Component
const EmptyState: React.FC<EmptyStateProps> = ({ onRefresh }) => (
  <Box 
    sx={{ 
      textAlign: 'center', 
      py: 8,
      px: 2,
      maxWidth: 400,
      mx: 'auto'
    }}
  >
    <Box
      sx={{
        width: 120,
        height: 120,
        borderRadius: '50%',
        backgroundColor: 'rgba(21, 44, 91, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mx: 'auto',
        mb: 3,
      }}
    >
      <FavoriteIcon sx={{ fontSize: 60, color: '#152C5B', opacity: 0.6 }} />
    </Box>
    <Typography 
      variant="h5" 
      color="text.secondary" 
      sx={{ mb: 2, fontWeight: 600 }}
    >
      No favorite rooms yet
    </Typography>
    <Typography 
      variant="body1" 
      color="text.secondary" 
      sx={{ mb: 4, lineHeight: 1.6 }}
    >
      Start exploring our amazing rooms and add them to your favorites to see them here.
    </Typography>

  </Box>
);

export default function FavoriteList() {
  const [favList, setFavList] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, roomId: null as string | null });
  const [sortBy, setSortBy] = useState('name');
  const [filterBy] = useState('all');
  
  const { baseUrl, reqHeaders } = useContext(AuthContext);
  const { showSuccess, showError } = useToastContext();
  const navigate = useNavigate();

  // Fetch favorite rooms
  const getAllFav = async () => {
    const token = localStorage.getItem("userToken");
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${baseUrl}/portal/favorite-rooms`,{
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json'
        }
      });
      setFavList(response?.data?.data?.favoriteRooms?.[0]?.rooms || []);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      setError('Failed to load your favorite rooms. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Remove room from favorites
  const removeRoomFromFavorites = async (roomId: string) => {
    setRemovingId(roomId);
    try {
      await axios.delete(`${baseUrl}/portal/favorite-rooms/${roomId}`, {
        headers: reqHeaders,
        data: { roomId }
      });
      
      setFavList((prevList) => prevList.filter((room) => room?._id !== roomId));
      showSuccess('Room removed from favorites successfully!');
    } catch (error) {
      console.error('Error removing from favorites:', error);
      showError('Failed to remove room from favorites. Please try again.');
    } finally {
      setRemovingId(null);
      setConfirmDialog({ open: false, roomId: null });
    }
  };

  // Handle remove confirmation
  const handleRemoveClick = (roomId: string) => {
    setConfirmDialog({ open: true, roomId });
  };

  // Navigate to room details
  const handleViewRoom = (roomId: string) => {
    navigate(`/user/room-details/${roomId}`);
  };

  // Sort and filter favorites
  const sortedAndFilteredFavList = useMemo(() => {
    let filtered = [...favList];
    
    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return (a.price || 0) - (b.price || 0);
        case 'name':
          return (a.roomNumber || '').localeCompare(b.roomNumber || '');
        case 'capacity':
          return (a.capacity || 0) - (b.capacity || 0);
        default:
          return 0;
      }
    });
    
    return filtered;
  }, [favList, sortBy, filterBy]);

  useEffect(() => {
    getAllFav();
  }, []);

  return (
    <>
      <Container maxWidth="xl" sx={{ py: { xs: 3, sm: 4, md: 5 }, px: { xs: 2, sm: 3, md: 4 } }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: "Poppins",
              fontWeight: 700,
              fontSize: { xs: "28px", sm: "32px", md: "36px", lg: "40px" },
              color: "#152C5B",
              mb: 1,
              letterSpacing: "-0.5px",
              lineHeight: 1.2,
            }}
          >
            Your Favorite Rooms
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              fontSize: { xs: "16px", sm: "18px" },
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.6,
              mb: 3,
            }}
          >
            Manage and view all the rooms you've added to your favorites
          </Typography>
          
          {/* Return Button */}
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate('/')}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: '25px',
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              borderWidth: '2px',
              '&:hover': {
                borderWidth: '2px',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(21, 44, 91, 0.15)',
              },
              transition: 'all 0.2s ease',
            }}
          >
            ← Back to Dashboard
          </Button>
        </Box>

        {/* Controls */}
        {!isLoading && favList.length > 0 && (
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'stretch', sm: 'center' },
              gap: 2,
              mb: 4,
              p: 3,
              backgroundColor: 'rgba(21, 44, 91, 0.02)',
              borderRadius: '12px',
              border: '1px solid rgba(21, 44, 91, 0.1)',
            }}
          >
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Sort by</InputLabel>
                <Select
                  value={sortBy}
                  label="Sort by"
                  onChange={(e) => setSortBy(e.target.value)}
                  startAdornment={<SortIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                >
                  <MenuItem value="name">Room Number</MenuItem>
                  <MenuItem value="price">Price</MenuItem>
                  <MenuItem value="capacity">Capacity</MenuItem>
                </Select>
              </FormControl>
            </Box>
            
            <Typography variant="body2" color="text.secondary">
              {sortedAndFilteredFavList.length} room{sortedAndFilteredFavList.length !== 1 ? 's' : ''} in favorites
            </Typography>
          </Box>
        )}

        {/* Content */}
        {isLoading ? (
          <LoadingSkeleton />
        ) : error ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Alert 
              severity="error" 
              sx={{ 
                maxWidth: 500, 
                mx: 'auto',
                '& .MuiAlert-message': { fontSize: '1rem' }
              }}
            >
              <Typography variant="h6" sx={{ mb: 1 }}>
                Failed to load favorites
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                {error}
              </Typography>
              <Button 
                variant="contained" 
                onClick={getAllFav}
                sx={{ textTransform: 'none' }}
              >
                Try Again
              </Button>
            </Alert>
          </Box>
        ) : favList.length === 0 ? (
          <EmptyState onRefresh={getAllFav} />
        ) : (
          <Zoom in timeout={500}>
            <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
              {sortedAndFilteredFavList.map((room, index) => (
                <Grid 
                  item 
                  xs={12} 
                  sm={6} 
                  md={4} 
                  lg={3} 
                  xl={2.4} 
                  key={room?._id || index}
                >
                  <FavoriteCard
                    room={room}
                    onRemove={handleRemoveClick}
                    onView={handleViewRoom}
                    isRemoving={removingId === room._id}
                    index={index}
                  />
                </Grid>
              ))}
            </Grid>
          </Zoom>
        )}
      </Container>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog({ open: false, roomId: null })}
        PaperProps={{
          sx: {
            borderRadius: '12px',
            minWidth: { xs: '90%', sm: 400 }
          }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          Remove from Favorites?
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" color="text.secondary">
            Are you sure you want to remove this room from your favorites? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button 
            onClick={() => setConfirmDialog({ open: false, roomId: null })}
            sx={{ textTransform: 'none' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={() => confirmDialog.roomId && removeRoomFromFavorites(confirmDialog.roomId)}
            variant="contained" 
            color="error"
            startIcon={<DeleteIcon />}
            sx={{ textTransform: 'none' }}
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>

    </>
  );
}









