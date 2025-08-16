
import {
  BookOnline as BookOnlineIcon,
  MonetizationOn as MonetizationOnIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import HotelIcon from '@mui/icons-material/Hotel';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { Box, Button, Card, CardContent, Divider, Grid, IconButton, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Context/AuthContext';
import { API_ENDPOINTS } from '../../constants';
import { bookingService } from '../../services/bookingService';
import { roomService } from '../../services/roomService';
import DashboardLayout, {
  EmptyState,
  StatusChip,
  StyledTableCell,
  StyledTableRow
} from '../shared/common/DashboardLayout';

// Enhanced modal styling
const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '95%', sm: '80%', md: '70%', lg: '60%' },
  maxWidth: 800,
  maxHeight: '90vh',
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
  overflow: 'auto',
};

// Booking Details Modal Component
const BookingDetailsModal = ({ open, onClose, booking, roomInfo, isAdmin }: any) => {
  const theme = useTheme();

  if (!booking) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="booking-details-modal"
      aria-describedby="booking-details-description"
      sx={{
        '& .MuiBackdrop-root': {
          backdropFilter: 'blur(4px)',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
        }
      }}
    >
      <Box sx={modalStyle}>
        {/* Header */}
        <Box sx={{ 
          p: 3, 
          pb: 2, 
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          bgcolor: 'grey.50'
        }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary', mb: 0.5 }}>
              Booking Details
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Booking ID: {booking._id}
            </Typography>
          </Box>
          <IconButton 
            onClick={onClose} 
            sx={{ 
              color: 'text.secondary',
              '&:hover': { 
                backgroundColor: 'action.hover',
                color: 'text.primary',
                transform: 'scale(1.1)'
              },
              transition: 'all 0.2s ease'
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ p: 3 }}>
          <Grid container spacing={3}>
            {/* Left Column - Main Info */}
            <Grid item xs={12} md={8}>
              {/* Room Information */}
              <Card sx={{ mb: 3, borderRadius: 2 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <HotelIcon sx={{ fontSize: 28, color: 'primary.main', mr: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Room Information
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    {roomInfo?.images && roomInfo.images.length > 0 ? (
                      <img
                        src={roomInfo.images[0]}
                        alt={roomInfo.roomNumber}
                        style={{
                          width: '100px',
                          height: '100px',
                          borderRadius: '12px',
                          objectFit: 'cover'
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          width: '100px',
                          height: '100px',
                          borderRadius: '12px',
                          bgcolor: 'grey.200',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <HotelIcon sx={{ fontSize: 40, color: 'grey.500' }} />
                      </Box>
                    )}
                    
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {roomInfo?.roomNumber || 'Room Information'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {roomInfo?.capacity || 'Standard'} Room
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {roomInfo?.description || 'Room details not available'}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              {/* Booking Dates */}
              <Card sx={{ mb: 3, borderRadius: 2 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CalendarTodayIcon sx={{ fontSize: 28, color: 'primary.main', mr: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Booking Period
                    </Typography>
                  </Box>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ p: 2, bgcolor: '#e3f2fd', borderRadius: 2 }}>
                        <Typography variant="caption" color="text.secondary" display="block">
                          Check-in Date
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600, color: 'primary.main' }}>
                          {formatDate(booking.startDate)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatTime(booking.startDate)}
                        </Typography>
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ p: 2, bgcolor: '#f3e5f5', borderRadius: 2 }}>
                        <Typography variant="caption" color="text.secondary" display="block">
                          Check-out Date
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600, color: 'secondary.main' }}>
                          {formatDate(booking.endDate)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatTime(booking.endDate)}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  
                  <Box sx={{ mt: 2, p: 2, bgcolor: '#fff3e0', borderRadius: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'warning.main' }}>
                      Duration: {calculateDuration(booking.startDate, booking.endDate)} days
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              {/* Payment Information */}
              {booking.stripeChargeId && (
                <Card sx={{ mb: 3, borderRadius: 2 }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <ReceiptIcon sx={{ fontSize: 28, color: 'primary.main', mr: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Payment Information
                      </Typography>
                    </Box>
                    
                    <Box sx={{ p: 2, bgcolor: '#f1f8e9', borderRadius: 2 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Stripe Charge ID
                      </Typography>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 500 }}>
                        {booking.stripeChargeId}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              )}
            </Grid>

            {/* Right Column - Summary & Status */}
            <Grid item xs={12} md={4}>
              {/* User Information - Only show for admin */}
              {isAdmin && booking.user && (
                <Card sx={{ mb: 3, borderRadius: 2 }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        User Information
                      </Typography>
                    </Box>
                    <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                        {booking.user?.userName || booking.user?.name || booking.user?.fullName || 'Unknown User'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {booking.user?.email || 'No email provided'}
                      </Typography>
                      {booking.user?.phone && (
                        <Typography variant="body2" color="text.secondary">
                          {booking.user.phone}
                        </Typography>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              )}

              {/* Booking Status */}
              <Card sx={{ mb: 3, borderRadius: 2 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Booking Status
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <StatusChip status={booking.status} />
                  </Box>
                </CardContent>
              </Card>

              {/* Price Summary */}
              <Card sx={{ mb: 3, borderRadius: 2 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <AttachMoneyIcon sx={{ fontSize: 28, color: 'primary.main', mr: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Total Price
                    </Typography>
                  </Box>
                  
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                      ${booking.totalPrice}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total amount paid
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              {/* Timestamps */}
              <Card sx={{ borderRadius: 2 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <AccessTimeIcon sx={{ fontSize: 28, color: 'primary.main', mr: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Timestamps
                    </Typography>
                  </Box>
                  
                  <Box sx={{ space: 2 }}>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="caption" color="text.secondary" display="block">
                        Created
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {formatDate(booking.createdAt)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatTime(booking.createdAt)}
                      </Typography>
                    </Box>
                    
                    <Divider sx={{ my: 1 }} />
                    
                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block">
                        Last Updated
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {formatDate(booking.updatedAt)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatTime(booking.updatedAt)}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Footer */}
        <Box sx={{ 
          p: 3, 
          pt: 2, 
          borderTop: '1px solid #e0e0e0',
          display: 'flex',
          justifyContent: 'flex-end',
          bgcolor: 'grey.50'
        }}>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{ 
              borderRadius: 2, 
              px: 4,
              '&:hover': { transform: 'translateY(-1px)' }
            }}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

// Enhanced Mobile Card Component
const BookingCard = ({ booking, roomInfo, index, onViewDetails }: any) => {
  return (
    <Card
      sx={{
        mb: 2,
        borderRadius: 3,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          transform: 'translateY(-2px)',
        }
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
          {/* Room Image */}
          <Box sx={{ position: 'relative' }}>
            {roomInfo?.images && roomInfo.images.length > 0 ? (
              <img
                src={roomInfo.images[0]}
                alt={roomInfo.roomNumber}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '12px',
                  objectFit: 'cover'
                }}
              />
            ) : (
              <Box
                sx={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '12px',
                  bgcolor: 'grey.200',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <HotelIcon sx={{ fontSize: 32, color: 'grey.500' }} />
              </Box>
            )}
          </Box>

          {/* Room Info */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
              {roomInfo?.roomNumber || `Room ${index + 1}`}
            </Typography>
            <StatusChip status={booking.status} size="small" />
          </Box>

          {/* Price */}
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
              ${booking.totalPrice}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Total Price
            </Typography>
          </Box>
        </Box>

        {/* Dates */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Box>
            <Typography variant="caption" color="text.secondary" display="block">
              Check-in
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {new Date(booking.startDate).toLocaleDateString()}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" display="block">
              Check-out
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {new Date(booking.endDate).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>

        {/* Actions */}
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => onViewDetails(booking)}
            sx={{ 
              borderRadius: 2,
              '&:hover': { 
                transform: 'translateY(-1px)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              },
              transition: 'all 0.2s ease'
            }}
          >
            View Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default function Bookings() {
  const [book, setBook] = useState<any[]>([])
  const {role } = useContext(AuthContext)
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesArray, setPagesArray] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [roomDetails, setRoomDetails] = useState<{ [key: string]: any }>({});
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Determine if this is admin or user context
  const isAdmin = role === 'admin';
  

  


  const handleChangePage = (_event: any, newPage: number) => {
    setCurrentPage(newPage + 1);
    getAllBookig(newPage + 1);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setCurrentPage(1);
    getAllBookig(1);
  };

  const fetchRoomDetails = async (roomId: string) => {
    console.log(roomId);    
    try {
      const roomData = await roomService.getRoomById(roomId);
      return roomData;
    } catch (error) {
      // Silently handle room details fetch error - room info is optional
      return null;
    }
  };

  const getAllBookig = async (page: number) => {
    setLoading(true);
    setError(null);

    try {
      let response;
    
      if (isAdmin) {
        // Admin: use /api/v0/admin/booking
        response = await bookingService.getAllBookings();
      } else {
        // User: use /api/v0/portal/booking/my
        response = await bookingService.getUserBookings();
        console.log('User bookings response:', response);
      }
      
      // Handle the response structure correctly
      if (response) {
        console.log('Raw response:', response);
        
        // The API response structure varies - handle different cases
        let bookingsData = [];
        let totalCount = 0;
        
        if (response.data && response.data.myBooking) {
          // Case 1: {data: {myBooking: Array, totalCount: number}}
          bookingsData = response.data.myBooking;
          totalCount = response.data.totalCount || 0;
        } else if (response.myBooking) {
          // Case 2: {myBooking: Array, totalCount: number}
          bookingsData = response.myBooking;
          totalCount = response.totalCount || 0;
        } else if (response.data && Array.isArray(response.data)) {
          // Case 3: {data: Array}
          bookingsData = response.data;
          totalCount = response.totalCount || response.data.length || 0;
        } else if (Array.isArray(response)) {
          // Case 4: Direct array
          bookingsData = response;
          totalCount = response.length;
        } else {
          // Fallback
          bookingsData = [];
          totalCount = 0;
        }
        
        console.log('Processed bookings data:', bookingsData);
        console.log('Total count:', totalCount);
        
        setBook(bookingsData);
        setPagesArray(totalCount);
      } else {
        // Fallback for empty response
        setBook([]);
        setPagesArray(0);
      }

      setLoading(false);
    } catch (error: any) {
      console.error('Error fetching bookings:', error);
      const errorMessage = error?.response?.data?.message || error?.message || "Failed to fetch bookings";
      setError(errorMessage);
      toast.error(errorMessage);
      setLoading(false);
    }
  };

  const handleViewDetails = async (booking: any) => {
    setSelectedBooking(booking);
    setModalOpen(true);
    
    // Fetch room details only when viewing details
    if (booking.room && !roomDetails[booking.room]) {
      const roomInfo = await fetchRoomDetails(booking.room);
      if (roomInfo) {
        setRoomDetails(prev => ({
          ...prev,
          [booking.room]: roomInfo
        }));
      }
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedBooking(null);
  };

  useEffect(() => {
    // Check if user is authenticated before fetching bookings
    const token = localStorage.getItem('userToken');
    if (!token) {
      setError('Authentication required. Please log in.');
      return;
    }
    
    getAllBookig(1);
  }, [role]); // Re-fetch when role changes

  // Calculate stats - ensure book is always an array
  const bookingsArray = Array.isArray(book) ? book : [];
  const totalBookings = bookingsArray.length;
  const completedBookings = bookingsArray.filter(b => b.status === 'completed').length;
  const pendingBookings = bookingsArray.filter(b => b.status === 'pending').length;
  const totalRevenue = bookingsArray.reduce((sum, booking) => sum + (booking.totalPrice || 0), 0);

  const stats = [
    {
      label: isAdmin ? 'Total Bookings' : 'My Bookings',
      value: totalBookings,
      icon: <BookOnlineIcon />,
      color: 'primary' as const
    },
    {
      label: 'Completed',
      value: completedBookings,
      icon: <CheckCircleIcon />,
      color: 'success' as const
    },
    {
      label: 'Pending',
      value: pendingBookings,
      icon: <ScheduleIcon />,
      color: 'warning' as const
    },
    {
      label: isAdmin ? 'Total Revenue' : 'My Spending',
      value: `$${totalRevenue.toLocaleString()}`,
      icon: <MonetizationOnIcon />,
      color: 'info' as const
    }
  ];

  // Mobile view component
  const MobileView = () => (
    <Box sx={{ p: 2 }}>
      {bookingsArray && bookingsArray.length > 0 ? (
        bookingsArray.map((booking, index) => (
          <BookingCard
            key={booking._id}
            booking={booking}
            roomInfo={roomDetails[booking.room]}
            index={index}
            onViewDetails={handleViewDetails}
          />
        ))
      ) : (
        <EmptyState
          icon={<BookOnlineIcon />}
          title={isAdmin ? "No bookings found" : "No bookings found"}
          description={isAdmin 
            ? "There are no bookings in the system yet." 
            : "You haven't made any bookings yet. Start exploring our rooms!"
          }
        />
      )}
    </Box>
  );

  return (
    <DashboardLayout
      title={isAdmin ? "All Bookings" : "My Bookings"}
      subtitle={isAdmin 
        ? "Manage and view all hotel reservations" 
        : "Manage and view all your hotel reservations"
      }
      stats={stats}
      loading={loading}
      error={error}
      emptyMessage={isAdmin ? "No bookings found" : "No bookings found"}
      totalCount={pagesArray}
      currentPage={currentPage}
      rowsPerPage={rowsPerPage}
      onPageChange={(page) => handleChangePage(null, page - 1)}
      onRowsPerPageChange={(rowsPerPage) => handleChangeRowsPerPage({ target: { value: rowsPerPage.toString() } } as any)}
      mobileView={<MobileView />}
    >
      {/* Desktop Table Layout */}
      <TableContainer>
        <Table sx={{ minWidth: 700 }} aria-label="bookings table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Room Details</StyledTableCell>
              {isAdmin && <StyledTableCell align="center">User</StyledTableCell>}
              <StyledTableCell align="right">Total Price</StyledTableCell>
              <StyledTableCell align="center">Check-in</StyledTableCell>
              <StyledTableCell align="center">Check-out</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookingsArray && bookingsArray.length > 0 ? (
              bookingsArray.map((booking, index) => {
                const roomInfo = roomDetails[booking.room];
                return (
                  <StyledTableRow key={booking._id}>
                    <StyledTableCell align="center">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {roomInfo?.images && roomInfo.images.length > 0 ? (
                          <img
                            src={roomInfo.images[0]}
                            alt={roomInfo.roomNumber}
                            style={{
                              width: '60px',
                              height: '60px',
                              borderRadius: '12px',
                              objectFit: 'cover'
                            }}
                          />
                        ) : (
                          <Box
                            sx={{
                              width: '60px',
                              height: '60px',
                              borderRadius: '12px',
                              bgcolor: 'grey.200',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <HotelIcon sx={{ fontSize: 24, color: 'grey.500' }} />
                          </Box>
                        )}
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {roomInfo?.roomNumber || `Room ${index + 1}`}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {roomInfo?.capacity || 'Standard'} Room
                          </Typography>
                        </Box>
                      </Box>
                    </StyledTableCell>
                    {isAdmin && (
                      <StyledTableCell align="center">
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {booking.user?.userName || booking.user?.name || booking.user?.fullName || 'Unknown User'}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {booking.user?.email || 'No email'}
                        </Typography>
                      </StyledTableCell>
                    )}
                    <StyledTableCell align="right">
                      <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                        ${booking.totalPrice}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Typography variant="body2">
                        {new Date(booking.startDate).toLocaleDateString()}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Typography variant="body2">
                        {new Date(booking.endDate).toLocaleDateString()}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <StatusChip status={booking.status} size="small" />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleViewDetails(booking)}
                        sx={{ 
                          borderRadius: 2, 
                          minWidth: 80,
                          '&:hover': { 
                            transform: 'translateY(-1px)',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                          },
                          transition: 'all 0.2s ease'
                        }}
                      >
                        View Details
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={isAdmin ? 7 : 6} sx={{ textAlign: 'center', py: 8 }}>
                  <EmptyState
                    icon={<BookOnlineIcon />}
                    title={isAdmin ? "No bookings found" : "No bookings found"}
                    description={isAdmin 
                      ? "There are no bookings in the system yet." 
                      : "You haven't made any bookings yet. Start exploring our rooms!"
                    }
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Booking Details Modal */}
      <BookingDetailsModal
        open={modalOpen}
        onClose={handleCloseModal}
        booking={selectedBooking}
        roomInfo={selectedBooking ? roomDetails[selectedBooking.room] : null}
        isAdmin={isAdmin}
      />
    </DashboardLayout>
  );
}