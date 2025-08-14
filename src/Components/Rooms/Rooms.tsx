
import {
  Hotel as HotelIcon,
  MonetizationOn as MonetizationOnIcon,
  People as PeopleIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Alert,
  Box,
  Button,
  Card, CardContent, Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  IconButton, Modal,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import Select from 'react-dropdown-select';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import { AuthContext } from '../../Context/AuthContext';
import useFacilities from '../../custom Hook/useFacilities';
import useRooms from '../../custom Hook/useRooms';
import DashboardLayout, {
  ActionMenu,
  EmptyState,
  StyledTableCell,
  StyledTableRow
} from '../shared/common/DashboardLayout';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '95%', sm: 600, md: 800 },
  maxWidth: '90vw',
  maxHeight: '90vh',
  overflow: 'auto',
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
  p: { xs: 2, sm: 3, md: 4 },
};

// Enhanced Mobile Card Component
const RoomCard = ({ room, onEdit, onDelete, onMenuClick, onMenuClose, anchorEl, index }: {
  room: any;
  onEdit: (room: any) => void;
  onDelete: (id: string) => void;
  onMenuClick: (event: React.MouseEvent<HTMLElement>, index: number) => void;
  onMenuClose: (index: number) => void;
  anchorEl: HTMLElement | null;
  index: number;
}) => {
  const theme = useTheme();
  
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{
              width: 60,
              height: 60,
              borderRadius: 2,
              overflow: 'hidden',
              border: '2px solid #e0e0e0',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: theme.palette.primary.main,
                transform: 'scale(1.05)'
              }
            }}>
              {room?.images && room?.images.length > 0 ? 
                <img 
                  src={room?.images[0]} 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }} 
                  alt={`Room ${room.roomNumber}`}
                /> :
                <Box sx={{
                  width: '100%',
                  height: '100%',
                  bgcolor: 'grey.300',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <HotelIcon sx={{ fontSize: 40, color: 'grey.500' }} />
                </Box>
              }
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                Room {room?.roomNumber}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {room?.capacity} guests
              </Typography>
            </Box>
          </Box>
          <IconButton
            size="small"
            onClick={(event) => onMenuClick(event, index)}
            sx={{ 
              color: 'text.secondary',
              '&:hover': { 
                backgroundColor: 'action.hover',
                transform: 'scale(1.05)'
              }
            }}
          >
            <MoreVertIcon />
          </IconButton>
        </Box>
        
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary" display="block">
              Price per Night
            </Typography>
            <Typography variant="body1" fontWeight={500} color="primary.main">
              ${room?.price}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary" display="block">
              Discount
            </Typography>
            <Chip 
              label={`${room?.discount}% OFF`} 
              color={room?.discount > 0 ? "success" : "default"} 
              size="small"
              variant="outlined"
              sx={{ fontWeight: 600 }}
            />
          </Grid>
        </Grid>
        
        <ActionMenu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => onMenuClose(index)}
          actions={[
            {
              label: 'Edit',
              icon: <EditIcon fontSize="small" />,
              onClick: () => onEdit(room),
              color: 'primary'
            },
            {
              label: 'Delete',
              icon: <DeleteOutlineOutlinedIcon fontSize="small" />,
              onClick: () => onDelete(room._id),
              color: 'error'
            }
          ]}
        />
      </CardContent>
    </Card>
  );
};

export default function Rooms() {
  const theme = useTheme();
  
  const [roomId, setRoomId] = useState<string>('');
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [selectedValue, setSelectedValue] = useState<any[]>([]);
  // Image handling states for update modal
  // Image handling states for update modal
  const [updateImage, setUpdateImage] = useState<File | null>(null); // New image file selected
  const [imageChanged, setImageChanged] = useState<boolean>(false); // Whether user wants to change image
  const [imageRemoved, setImageRemoved] = useState<boolean>(false); // Whether user wants to remove image
  const { formattedFacilities, getAllFacilities } = useFacilities();
  const navigate = useNavigate();

  const [modalState, setModalState] = useState<string | null>(null);
  const { baseUrl, reqHeaders } = useContext(AuthContext);
  const { rooms, refetchRooms, currentPage, totalPages, rowsPerPage, handlePageChange, handleRowsPerPageChange, loading: roomsLoading } = useRooms();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Ensure facilities are loaded when component mounts
  useEffect(() => {
    if (!formattedFacilities || formattedFacilities.length === 0) {
      getAllFacilities();
    }
  }, [formattedFacilities, getAllFacilities]);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (index: number) => {
    setAnchorEl(null);
  };

  const showDeleteModal = (id: string) => {
    setModalState('delete-modal');
    setRoomId(id);
  };

  const showUpdateModal = (room: any) => {
    try {
      setModalState('update-modal');
      setRoomId(room._id);
      setValue("roomNumber", room.roomNumber);
      setValue("price", room.price);
      setValue("capacity", room.capacity);
      setValue("discount", room.discount);
      setImageChanged(false); // Reset image change flag when opening modal
      setImageRemoved(false); // Reset image removed flag when opening modal
      
      // Set existing facilities with comprehensive error handling
      if (room?.facilities && Array.isArray(room.facilities) && room.facilities.length > 0 && formattedFacilities && Array.isArray(formattedFacilities)) {
        const existingFacilities = room.facilities.map((facility: any) => {
          try {
            if (typeof facility === 'string') {
              const facilityOption = formattedFacilities.find((f: any) => f?.value === facility);
              return facilityOption || { value: facility, label: facility };
            } else if (facility && facility._id) {
              return { value: facility._id, label: facility.name || facility._id };
            } else {
              return { value: facility, label: facility };
            }
          } catch (error) {
            return { value: facility, label: facility };
          }
        });
        setSelectedValue(existingFacilities);
      } else {
        setSelectedValue([]);
      }
    } catch (error) {
      setSelectedValue([]);
    }
  };

  const handleClose = () => {
    setModalState(null);
    setSelectedValue([]);
    setUpdateImage(null);
    setImageChanged(false);
    setImageRemoved(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUpdateImage(e.target.files[0]);
      setImageChanged(true);
      setImageRemoved(false); // Reset removed flag when new image is selected
    }
  };

  const handleRemoveImage = () => {
    setUpdateImage(null);
    setImageChanged(true);
    setImageRemoved(true);
  };

  const UpdateRoom = (data: any) => {
    setLoading(true);
    try {
      const formattedSelected = selectedValue?.map(({ value }) => value) || [];
    
    
      // Create FormData for proper facilities handling
      const formData = new FormData();
      formData.append('roomNumber', data.roomNumber);
      formData.append('price', data.price.toString());
      formData.append('capacity', data.capacity.toString());
      formData.append('discount', data.discount.toString());
      
      // Append each facility as a separate field
      formattedSelected.forEach((facilityId: string) => {
        formData.append('facilities', facilityId);
      });
      
      // Handle image updates - only send image field when user actually changes it
      if (imageChanged && updateImage) {
        // User selected a new image - send the new file
        formData.append('imgs', updateImage);
      } else if (imageChanged && imageRemoved) {
        // User explicitly wants to remove the image - send empty string
        formData.append('imgs', '');
      }
      // If imageChanged is false, don't send any image field
      // This should preserve the existing image in most backends
      
      // Use PUT since backend doesn't support PATCH
      axios.put(`${baseUrl}/admin/rooms/${roomId}`, formData, { 
        headers: {
          'Authorization': `${localStorage.getItem('userToken')}`,
          'Content-Type': 'multipart/form-data'
        } 
      }).then((response) => {
        toast.success("Updated Successfully!");
        handleClose();
        refetchRooms();
      }).catch((error) => {
        toast.error(error?.response?.data?.message);
      }).finally(() => {
        setLoading(false);
      });
    } catch (error) {
      toast.error('Error updating room');
      setLoading(false);
    }
  };

  const deleteRoom = () => {
    setLoading(true);
    axios.delete(`${baseUrl}/admin/rooms/${roomId}`, { headers: {
      'Authorization': `${localStorage.getItem('userToken')}`
    } })
      .then((response) => {
        toast.success("Deleted Successfully!");
        handleClose();
        refetchRooms();
      }).catch((error) => {
        toast.error(error?.response?.data);
      }).finally(() => {
        setLoading(false);
      });
  };



  // Calculate stats
  const totalRooms = rooms.length;
  const totalRevenue = rooms.reduce((sum, room) => sum + (room.price || 0), 0);
  const averagePrice = totalRooms > 0 ? Math.round(totalRevenue / totalRooms) : 0;
  const roomsWithDiscount = rooms.filter(room => room.discount > 0).length;

  const stats = [
    {
      label: 'Total Rooms',
      value: totalRooms,
      icon: <HotelIcon />,
      color: 'primary' as const
    },
    {
      label: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      icon: <MonetizationOnIcon />,
      color: 'success' as const
    },
    {
      label: 'Average Price',
      value: `$${averagePrice}`,
      icon: <TrendingUpIcon />,
      color: 'info' as const
    },
    {
      label: 'With Discount',
      value: roomsWithDiscount,
      icon: <PeopleIcon />,
      color: 'warning' as const
    }
  ];

  // Mobile view component
  const MobileView = () => (
    <Box sx={{ p: 2 }}>
      {rooms && rooms.length > 0 ? (
        rooms.map((room: any, index: number) => (
          <RoomCard
            key={room._id || index}
            room={room}
            index={index}
            anchorEl={anchorEl}
            onMenuClick={handleMenuClick}
            onMenuClose={handleMenuClose}
            onEdit={showUpdateModal}
            onDelete={showDeleteModal}
          />
        ))
      ) : (
        <EmptyState
          icon={<HotelIcon />}
          title="No rooms found"
          description="Get started by adding your first room"
          action={{
            label: "Add Room",
            onClick: () => navigate('/dashboard/rooms/add-room'),
            icon: <AddIcon />
          }}
        />
      )}
    </Box>
  );

  return (
    <>
      <DashboardLayout
        title="Rooms Management"
        subtitle="Manage and monitor all room details and availability"
        stats={stats}
        actionButton={{
          label: "Add New Room",
          onClick: () => navigate('/dashboard/rooms/add-room'),
          icon: <AddIcon />
        }}

        loading={loading || roomsLoading}
        error={error}
        emptyMessage="No rooms found. Get started by adding your first room."
        totalCount={totalPages}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        onPageChange={(page) => handlePageChange(null, page)}
        onRowsPerPageChange={(rowsPerPage) => handleRowsPerPageChange({ target: { value: rowsPerPage.toString() } } as any)}
        mobileView={<MobileView />}
      >
        {/* Desktop Table Layout */}
        <TableContainer>
          <Table sx={{ minWidth: 700 }} aria-label="rooms table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Room Number</StyledTableCell>
                <StyledTableCell align="center">Image</StyledTableCell>
                <StyledTableCell align="right">Price</StyledTableCell>
                <StyledTableCell align="right">Discount</StyledTableCell>
                <StyledTableCell align="right">Capacity</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rooms && rooms.length > 0 ? (
                rooms.map((room: any, index: number) => (
                  <StyledTableRow key={room._id}>
                    <StyledTableCell component="th" scope="row">
                      <Typography variant="body2" fontWeight={500}>
                        {room?.roomNumber}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'center',
                        '& img': { 
                          borderRadius: '50%',
                          border: '2px solid #e0e0e0',
                          transition: 'all 0.3s ease',
                          '&:hover': { 
                            transform: 'scale(1.1)',
                            borderColor: 'primary.main'
                          }
                        }
                      }}>
                                      {room?.images && room?.images.length > 0 ? 
                <img src={room?.images[0]} style={{width:'50px',height:"50px"}} alt={`Room ${room.roomNumber}`}/> :
                <Box sx={{width:'50px',height:"50px", bgcolor: 'grey.300', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <HotelIcon sx={{ fontSize: 20, color: 'grey.500' }} />
                </Box>
              }
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Typography variant="body2" color="primary" fontWeight={500}>
                        ${room?.price}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Chip 
                        label={`${room?.discount}%`} 
                        color={room?.discount > 0 ? "success" : "default"} 
                        size="small"
                        variant="outlined"
                      />
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Typography variant="body2">
                        {room?.capacity} guests
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                        <Tooltip title="Edit Room">
                          <IconButton
                            size="small"
                            onClick={() => showUpdateModal(room)}
                            sx={{ 
                              color: 'primary.main',
                              '&:hover': { 
                                backgroundColor: 'primary.light',
                                transform: 'scale(1.1)'
                              },
                              transition: 'all 0.2s ease'
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Room">
                          <IconButton
                            size="small"
                            onClick={() => showDeleteModal(room._id)}
                            sx={{ 
                              color: 'error.main',
                              '&:hover': { 
                                backgroundColor: 'error.light',
                                transform: 'scale(1.1)'
                              },
                              transition: 'all 0.2s ease'
                            }}
                          >
                            <DeleteOutlineOutlinedIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} sx={{ textAlign: 'center', py: 8 }}>
                    <EmptyState
                      icon={<HotelIcon />}
                      title="No rooms found"
                      description="Get started by adding your first room"
                      action={{
                        label: "Add Room",
                        onClick: () => navigate('/dashboard/rooms/add-room'),
                        icon: <AddIcon />
                      }}
                    />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </DashboardLayout>
      
      {/* Update Room Modal */}
      <Modal
        open={modalState === "update-modal"}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        sx={{
          '& .MuiBackdrop-root': {
            backdropFilter: 'blur(4px)',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          }
        }}
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: 'text.primary' }}>
              Update Room
            </Typography>
            <IconButton 
              onClick={handleClose} 
              sx={{ 
                color: "error.main",
                '&:hover': { backgroundColor: 'error.light', color: 'error.contrastText' }
              }}
            >
              <CancelOutlinedIcon />
            </IconButton>
          </Box>
          
          <FormControl component='form' onSubmit={handleSubmit(UpdateRoom)} sx={{ width: '100%' }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  InputLabelProps={{
                    style: { color: 'text.secondary', fontWeight: 500 },
                  }}
                  sx={{ 
                    bgcolor: "grey.50", 
                    '& .MuiFilledInput-root': {
                      borderRadius: 1,
                      '&:hover': { bgcolor: 'grey.100' },
                      '&.Mui-focused': { bgcolor: 'primary.50' }
                    }
                  }}
                  variant='filled'
                  label="Room Number"
                  fullWidth
                  {...register("roomNumber", { required: true })}
                />
                {errors.roomNumber && errors.roomNumber.type === "required" && 
                  <Typography sx={{ color: "error.main", mt: 1, fontSize: '0.875rem' }}>
                    Room Number is required
                  </Typography>
                }
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  InputLabelProps={{
                    style: { color: 'text.secondary', fontWeight: 500 },
                  }}
                  variant='filled'
                  sx={{ 
                    bgcolor: "grey.50",
                    '& .MuiFilledInput-root': {
                      borderRadius: 1,
                      '&:hover': { bgcolor: 'grey.100' },
                      '&.Mui-focused': { bgcolor: 'primary.50' }
                    }
                  }}
                  label="Price"
                  fullWidth
                  {...register("price", { required: true })} 
                />
                {errors.price && errors.price.type === "required" && 
                  <Typography sx={{ color: "error.main", mt: 1, fontSize: '0.875rem' }}>
                    Price is required
                  </Typography>
                }
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  InputLabelProps={{
                    style: { color: 'text.secondary', fontWeight: 500 },
                  }}
                  sx={{ 
                    bgcolor: "grey.50",
                    '& .MuiFilledInput-root': {
                      borderRadius: 1,
                      '&:hover': { bgcolor: 'grey.100' },
                      '&.Mui-focused': { bgcolor: 'primary.50' }
                    }
                  }}
                  variant='filled'
                  label="Capacity"
                  fullWidth
                  {...register("capacity", { required: true })}
                />
                {errors.capacity && errors.capacity.type === "required" && 
                  <Typography sx={{ color: "error.main", mt: 1, fontSize: '0.875rem' }}>
                    Capacity is required
                  </Typography>
                }
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  InputLabelProps={{
                    style: { color: 'text.secondary', fontWeight: 500 },
                  }}
                  sx={{ 
                    bgcolor: "grey.50",
                    '& .MuiFilledInput-root': {
                      borderRadius: 1,
                      '&:hover': { bgcolor: 'grey.100' },
                      '&.Mui-focused': { bgcolor: 'primary.50' }
                    }
                  }}
                  variant='filled'
                  label="Discount"
                  fullWidth
                  {...register("discount", { required: true })}
                />
                {errors.discount && errors.discount.type === "required" && 
                  <Typography sx={{ color: "error.main", mt: 1, fontSize: '0.875rem' }}>
                    Discount is required
                  </Typography>
                }
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1, fontWeight: 500 }}>
                    Facilities
                  </Typography>
                </Box>
                <Select
                  options={formattedFacilities}
                  values={selectedValue}
                  onChange={(selectedValue) => setSelectedValue(selectedValue)}
                  multi
                  style={{
                    minHeight: '56px',
                    borderRadius: '4px',
                    backgroundColor: '#f5f5f5',
                    border: '1px solid #e0e0e0',
                    transition: 'all 0.3s ease-in-out',
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1, fontWeight: 500 }}>
                    Room Image
                  </Typography>
                </Box>
                
                {/* Current Image Display - Removed */}
                <Box sx={{ mb: 2, textAlign: 'center' }}>
                  <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                    Current Image:
                  </Typography>
                  <Box sx={{
                    width: 120,
                    height: 120,
                    borderRadius: 2,
                    overflow: 'hidden',
                    border: '2px solid #e0e0e0',
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f5f5f5'
                  }}>
                    {rooms.find((r: any) => r._id === roomId)?.images?.[0] ? (
                      <img 
                        src={rooms.find((r: any) => r._id === roomId)?.images?.[0] || ''} 
                        alt="Current room"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    ) : (
                      <Box sx={{
                        width: '100%',
                        height: '100%',
                        bgcolor: 'grey.300',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <HotelIcon sx={{ fontSize: 40, color: 'grey.500' }} />
                      </Box>
                    )}
                  </Box>
                </Box>
                
                {/* New Image Upload */}
                <Button
                  component="label"
                  variant="outlined"
                  fullWidth
                  sx={{
                    py: 2,
                    border: '2px dashed',
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    '&:hover': {
                      borderColor: 'primary.dark',
                      backgroundColor: 'primary.light',
                    }
                  }}
                >
                  {updateImage ? updateImage.name : 'Choose New Image'}
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Button>
                {updateImage && (
                  <Typography variant="caption" color="success.main" sx={{ mt: 1, display: 'block' }}>
                    ✓ {updateImage.name} selected
                  </Typography>
                )}
                
                {/* Remove Image Button - Only show if there's a current image */}
                {rooms.find((r: any) => r._id === roomId)?.images?.[0] && (
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={handleRemoveImage}
                    sx={{ 
                      mt: 2,
                      '&:hover': { 
                        backgroundColor: 'error.light',
                        color: 'error.contrastText'
                      }
                    }}
                    startIcon={<DeleteOutlineOutlinedIcon />}
                  >
                    {imageRemoved ? 'Image Will Be Removed' : 'Remove Current Image'}
                  </Button>
                )}
                
                {/* Show status when image is marked for removal */}
                {imageRemoved && (
                  <Typography variant="caption" color="error.main" sx={{ mt: 1, display: 'block' }}>
                    ⚠️ Current image will be removed on update
                  </Typography>
                )}
              </Grid>
            </Grid>
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
              <Button 
                variant="outlined" 
                onClick={handleClose}
                sx={{ 
                  px: 3,
                  '&:hover': { transform: 'translateY(-1px)' }
                }}
              >
                Cancel
              </Button>
              <Button 
                type='submit' 
                variant="contained" 
                color="primary"
                disabled={loading}
                sx={{ 
                  px: 3,
                  '&:hover': { transform: 'translateY(-1px)' }
                }}
              >
                {loading ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CircularProgress size={16} />
                    Updating...
                  </Box>
                ) : 'Update Room'}
              </Button>
            </Box>
          </FormControl>
        </Box>
      </Modal>

      {/* Delete Room Modal */}
      <Dialog
        open={modalState === "delete-modal"}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: 3,
            maxWidth: 400,
            width: '90vw',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            border: '1px solid #f3f4f6',
            overflow: 'hidden'
          }
        }}
        BackdropProps={{
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(2px)'
          }
        }}
      >
        <DialogTitle sx={{ 
          textAlign: 'center', 
          color: '#374151',
          fontWeight: 600,
          fontSize: '1.25rem',
          pb: 1,
          pt: 2.5,
          px: 3,
          background: '#fefefe',
          borderBottom: '1px solid #f3f4f6'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.5 }}>
            <Box sx={{
              width: 50,
              height: 50,
              borderRadius: '50%',
              background: '#fee2e2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 1.5
            }}>
              <DeleteOutlineOutlinedIcon sx={{ color: '#ef4444', fontSize: 24 }} />
            </Box>
          </Box>
          Delete Room?
        </DialogTitle>
        <DialogContent sx={{ 
          textAlign: 'center', 
          py: 2.5,
          px: 3,
          background: '#ffffff'
        }}>
          <DialogContentText sx={{ 
            color: '#6b7280', 
            mb: 2,
            fontSize: '0.95rem',
            lineHeight: 1.5
          }}>
            Are you sure you want to delete this room? 
            <br />
            <strong>This action cannot be undone.</strong>
          </DialogContentText>
          <Alert 
            severity="warning" 
            sx={{ 
              mt: 2,
              borderRadius: 2,
              background: '#fffbeb',
              border: '1px solid #fde68a',
              '& .MuiAlert-icon': { color: '#f59e0b' }
            }}
          >
            <Typography variant="body2" fontWeight={500} color="#92400e">
              This will permanently remove the room and all associated data.
            </Typography>
          </Alert>
        </DialogContent>
        <DialogActions sx={{ 
          p: 2.5, 
          pt: 0, 
          gap: 1.5,
          background: '#fafafa',
          borderTop: '1px solid #f3f4f6'
        }}>
          <Button 
            onClick={handleClose} 
            variant="outlined"
            sx={{ 
              minWidth: 100,
              py: 1,
              px: 2.5,
              borderRadius: 2,
              borderColor: '#d1d5db',
              color: '#6b7280',
              fontWeight: 500,
              '&:hover': {
                borderColor: '#9ca3af',
                backgroundColor: '#f9fafb',
                transform: 'translateY(-1px)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
              },
              transition: 'all 0.2s ease'
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={deleteRoom} 
            variant="contained" 
            disabled={loading}
            sx={{ 
              minWidth: 100,
              py: 1,
              px: 2.5,
              borderRadius: 2,
              fontWeight: 500,
              background: '#ef4444',
              color: 'white',
              boxShadow: '0 2px 8px rgba(239, 68, 68, 0.2)',
              '&:hover': {
                background: '#dc2626',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
              },
              '&:disabled': {
                background: '#f3f4f6',
                color: '#9ca3af',
                transform: 'none',
                boxShadow: 'none'
              },
              transition: 'all 0.2s ease'
            }}
          >
            {loading ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{
                  width: 14,
                  height: 14,
                  border: '2px solid transparent',
                  borderTop: '2px solid currentColor',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                Deleting...
              </Box>
            ) : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
