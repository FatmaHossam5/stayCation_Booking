import AddIcon from '@mui/icons-material/Add';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditIcon from '@mui/icons-material/Edit';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Modal,
  Select,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';

import {
  Campaign as CampaignIcon,
  MonetizationOn as MonetizationOnIcon,
  TrendingUp as TrendingUpIcon,
  Visibility as VisibilityIcon2,
} from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Context/AuthContext';
import DashboardLayout, {
  ActionMenu,
  EmptyState,
  StatusChip,
  StyledTableCell,
  StyledTableRow
} from '../shared/common/DashboardLayout';

// Enhanced Mobile Card Component
const MobileAdCard = ({ ad, onEdit, onDelete, onView, onMenuClick, onMenuClose, anchorEl, index }: {
  ad: any;
  onEdit: (ad: any) => void;
  onDelete: (id: string) => void;
  onView: (ad: any) => void;
  onMenuClick: (event: React.MouseEvent<HTMLElement>, index: number) => void;
  onMenuClose: (index: number) => void;
  anchorEl: HTMLElement | null;
  index: number;
}) => {
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
          <Box>
            <Typography variant="h6" color="primary" fontWeight={600} gutterBottom>
              Room {ad?.room?.roomNumber}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Capacity: {ad?.room?.capacity} guests
            </Typography>
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
              Price
            </Typography>
            <Typography variant="body1" fontWeight={500} color="primary.main">
              ${ad?.room?.price}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary" display="block">
              Discount
            </Typography>
            <Chip 
              label={`${ad?.room?.discount}% OFF`} 
              color="success" 
              size="small"
              variant="outlined"
              sx={{ fontWeight: 600 }}
            />
          </Grid>
        </Grid>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <StatusChip 
            status={ad?.isActive ? 'active' : 'inactive'} 
            size="small"
            variant="outlined"
          />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="View Details">
              <IconButton 
                size="small" 
                onClick={() => onView(ad)}
                sx={{ 
                  color: 'primary.main',
                  '&:hover': { 
                    backgroundColor: 'primary.light',
                    transform: 'scale(1.1)'
                  }
                }}
              >
                <VisibilityIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit Ad">
              <IconButton 
                size="small" 
                onClick={() => onEdit(ad)}
                sx={{ 
                  color: 'warning.main',
                  '&:hover': { 
                    backgroundColor: 'warning.light',
                    transform: 'scale(1.1)'
                  }
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Ad">
              <IconButton 
                size="small" 
                onClick={() => onDelete(ad._id)}
                sx={{ 
                  color: 'error.main',
                  '&:hover': { 
                    backgroundColor: 'error.light',
                    transform: 'scale(1.1)'
                  }
                }}
              >
                <DeleteOutlineOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        
        <ActionMenu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => onMenuClose(index)}
          actions={[
            {
              label: 'View Details',
              icon: <VisibilityIcon fontSize="small" />,
              onClick: () => onView(ad),
              color: 'primary'
            },
            {
              label: 'Edit',
              icon: <EditIcon fontSize="small" />,
              onClick: () => onEdit(ad),
              color: 'warning'
            },
            {
              label: 'Delete',
              icon: <DeleteOutlineOutlinedIcon fontSize="small" />,
              onClick: () => onDelete(ad._id),
              color: 'error'
            }
          ]}
        />
      </CardContent>
    </Card>
  );
};

export default function Ads() {
  const theme = useTheme();
  
  const [modalState, setModalState] = useState('close');
  const [loading, setLoading] = useState(false);
  const [ads, setAds] = useState([]);
  const [selectedAd, setSelectedAd] = useState<any>(null);
  const { baseUrl } = useContext(AuthContext);
  const [adId, setAdId] = useState<string>('');
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { handleSubmit, formState: { errors }, setValue, control, reset } = useForm({
    defaultValues: {
      discount: '',
      isActive: 'true'
    }
  });

  const handleClose = () => {
    setModalState("close");
    setSelectedAd(null);
    reset();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    getAllAds(page);
  };

  const handleRowsPerPageChange = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
    getAllAds(1);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Enhanced API calls with loading states
  const getAllAds = async (page = currentPage) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${baseUrl}/admin/ads?page=${page}&size=${rowsPerPage}`, 
        {
          headers: {
            'Authorization': `${localStorage.getItem("userToken")}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setAds(response.data.data.ads);
      setTotalCount(response.data.data.totalCount);
    } catch (error: any) {
      setError(error?.response?.data?.message || 'Failed to load ads');
      toast.error(error?.response?.data?.message || 'Failed to load ads');
    } finally {
      setLoading(false);
    }
  };

  const showDeleteModal = (id: string) => {
    setModalState('delete-modal');
    setAdId(id);
  };

  const showUpdateModal = (ad: any) => {
    setModalState('update-modal');
    setAdId(ad._id);
    setSelectedAd(ad);
    setValue("discount", ad?.room?.discount || '');
    setValue('isActive', ad?.isActive ? 'true' : 'false');
  };

  const showViewModal = (ad: any) => {
    setModalState('view-modal');
    setSelectedAd(ad);
  };

  const deleteAd = async () => {
    setLoading(true);
    try {
      await axios.delete(`${baseUrl}/admin/ads/${adId}`, {
        headers: {
          'Authorization': `${localStorage.getItem("userToken")}`,
          'Content-Type': 'application/json'
        }
      });
      toast.success('Ad deleted successfully');
      handleClose();
      getAllAds();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to delete ad');
    } finally {
      setLoading(false);
    }
  };

  const updateAd = async (data: any) => {
    setLoading(true);
    try {
      const updatedData = {
        discount: data.discount,
        isActive: data.isActive === 'true',
      };
      
      await axios.put(`${baseUrl}/admin/ads/${adId}`, updatedData, {
        headers: {
          'Authorization': `${localStorage.getItem("userToken")}`,
          'Content-Type': 'application/json'
        }
      });
      toast.success('Ad updated successfully');
      handleClose();
      getAllAds();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to update ad');
    } finally {
      setLoading(false);
    }
  };

  const NavigateAddAds = () => {
    navigate('/dashboard/ads/add-ads');
  };



  useEffect(() => {
    getAllAds(currentPage);
  }, [currentPage]);

  // Calculate stats
  const totalAds = totalCount;
  const activeAds = ads.filter((ad: any) => ad?.isActive).length;
  const inactiveAds = ads.filter((ad: any) => !ad?.isActive).length;
  const totalRevenue = ads.reduce((sum: number, ad: any) => sum + (ad?.room?.price || 0), 0);

  const stats = [
    {
      label: 'Total Ads',
      value: totalAds,
      icon: <CampaignIcon />,
      color: 'primary' as const
    },
    {
      label: 'Active Ads',
      value: activeAds,
      icon: <TrendingUpIcon />,
      color: 'success' as const
    },
    {
      label: 'Inactive Ads',
      value: inactiveAds,
      icon: <VisibilityIcon2 />,
      color: 'warning' as const
    },
    {
      label: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      icon: <MonetizationOnIcon />,
      color: 'info' as const
    }
  ];

  // Mobile view component
  const MobileView = () => (
    <Box sx={{ p: 2 }}>
      {ads.length === 0 ? (
        <EmptyState
          icon={<CampaignIcon />}
          title="No advertisements found"
          description="Create your first ad to get started."
          action={{
            label: "Add New Ad",
            onClick: NavigateAddAds,
            icon: <AddIcon />
          }}
        />
      ) : (
        ads.map((ad: any, index: number) => (
          <MobileAdCard
            key={ad._id || index}
            ad={ad}
            index={index}
            anchorEl={anchorEl}
            onMenuClick={handleMenuClick}
            onMenuClose={handleMenuClose}
            onEdit={showUpdateModal}
            onDelete={showDeleteModal}
            onView={showViewModal}
          />
        ))
      )}
    </Box>
  );

  return (
    <DashboardLayout
      title="Advertisement Management"
      subtitle="Manage room promotions and discounts"
      stats={stats}
      actionButton={{
        label: "Add New Ad",
        onClick: NavigateAddAds,
        icon: <AddIcon />
      }}

      loading={loading}
      error={error}
      emptyMessage="No advertisements found. Create your first ad to get started."
      totalCount={totalCount}
      currentPage={currentPage}
      rowsPerPage={rowsPerPage}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
      mobileView={<MobileView />}
    >
      {/* Desktop Table Layout */}
      <TableContainer>
        <Table sx={{ minWidth: 700 }} aria-label="ads table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Room Number</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Discount</StyledTableCell>
              <StyledTableCell align="right">Capacity</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ads.map((ad: any, index: number) => (
              <StyledTableRow key={ad._id || index}>
                <StyledTableCell component="th" scope="row">
                  <Typography variant="body2" fontWeight={500}>
                    {ad?.room?.roomNumber}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Typography variant="body2" color="primary" fontWeight={500}>
                    ${ad?.room?.price}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Chip 
                    label={`${ad?.room?.discount}%`} 
                    color="success" 
                    size="small" 
                    variant="outlined"
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Typography variant="body2">
                    {ad?.room?.capacity} guests
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <StatusChip 
                    status={ad?.isActive ? 'active' : 'inactive'} 
                    size="small"
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                    <Tooltip title="View Details">
                      <IconButton
                        size="small"
                        onClick={() => showViewModal(ad)}
                        sx={{ 
                          color: 'primary.main',
                          '&:hover': { 
                            backgroundColor: 'primary.light',
                            transform: 'scale(1.1)'
                          },
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Ad">
                      <IconButton
                        size="small"
                        onClick={() => showUpdateModal(ad)}
                        sx={{ 
                          color: 'warning.main',
                          '&:hover': { 
                            backgroundColor: 'warning.light',
                            transform: 'scale(1.1)'
                          },
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Ad">
                      <IconButton
                        size="small"
                        onClick={() => showDeleteModal(ad._id)}
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Modal */}
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
          Delete Advertisement
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
            Are you sure you want to delete this advertisement? 
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
              This will permanently remove the advertisement and all associated data.
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
            onClick={deleteAd} 
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

      {/* Update Modal */}
      <Modal
        open={modalState === "update-modal"}
        onClose={handleClose}
        aria-labelledby="update-modal-title"
        BackdropProps={{
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(2px)'
          }
        }}
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '95%', sm: 500, md: 600 },
          maxWidth: '90vw',
          maxHeight: '90vh',
          overflow: 'auto',
          background: '#ffffff',
          boxShadow: '0 15px 50px rgba(0, 0, 0, 0.15)',
          border: '1px solid #f3f4f6',
          borderRadius: 3,
          p: { xs: 2, sm: 3, md: 4 }
        }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Box>
                <Typography variant="h5" color="#374151" fontWeight={600} gutterBottom>
                  Update Advertisement
                </Typography>
                <Typography variant="body2" color="#6b7280" sx={{ fontSize: '0.875rem' }}>
                  Modify the discount and status for this room promotion
                </Typography>
              </Box>
              <IconButton 
                onClick={handleClose} 
                sx={{ 
                  color: '#6b7280',
                  backgroundColor: '#f9fafb',
                  '&:hover': { 
                    backgroundColor: '#f3f4f6',
                    transform: 'scale(1.05)'
                  },
                  transition: 'all 0.2s ease'
                }}
                size="large"
              >
                <CancelOutlinedIcon />
              </IconButton>
            </Grid>
            
            <form onSubmit={handleSubmit(updateAd)} style={{ width: '100%' }}>
              <Box sx={{ margin: "auto" }}>
                <Grid item lg={12}>
                  
                  {/* Discount Field */}
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" color="#374151" fontWeight={600} sx={{ mb: 1 }}>
                      Discount Percentage
                    </Typography>
                    <Controller
                      name="discount"
                      control={control}
                      rules={{ 
                        required: 'Discount is required',
                        min: { value: 1, message: 'Minimum discount is 1%' },
                        max: { value: 100, message: 'Maximum discount is 100%' }
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type="number"
                          InputLabelProps={{
                            style: { color: '#6b7280' },
                          }}
                          InputProps={{
                            style: { 
                              color: '#374151',
                              fontSize: '1rem',
                              fontWeight: 500
                            },
                            endAdornment: (
                              <Typography color="#6b7280" sx={{ mr: 1, fontWeight: 500 }}>
                                %
                              </Typography>
                            ),
                            inputProps: { 
                              min: 1, 
                              max: 100,
                              step: 1
                            }
                          }}
                          sx={{
                            '& .MuiFilledInput-root': {
                              bgcolor: '#f9fafb',
                              borderRadius: 2,
                              border: '1px solid #e5e7eb',
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                bgcolor: '#f3f4f6',
                                borderColor: '#d1d5db'
                              },
                              '&.Mui-focused': {
                                bgcolor: '#ffffff',
                                borderColor: '#3b82f6',
                                boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
                              }
                            },
                            '& .MuiFilledInput-underline:before': {
                              borderBottom: 'none'
                            },
                            '& .MuiFilledInput-underline:after': {
                              borderBottom: 'none'
                            },
                            '& .MuiInputLabel-root': {
                              color: '#6b7280',
                              fontWeight: 500
                            }
                          }}
                          variant="filled"
                          label="Enter discount percentage"
                          error={Boolean(errors.discount)}
                          helperText={errors.discount?.message}
                        />
                      )}
                    />
                  </FormControl>
                  
                  {/* Status Field */}
                  <FormControl fullWidth sx={{ mb: 4 }}>
                    <Typography variant="subtitle2" color="#374151" fontWeight={600} sx={{ mb: 1 }}>
                      Advertisement Status
                    </Typography>
                    <Controller
                      name="isActive"
                      control={control}
                      rules={{ required: 'Status is required' }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          error={Boolean(errors.isActive)}
                          sx={{
                            color: '#374151',
                            '& .MuiSelect-icon': { color: '#6b7280' },
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#e5e7eb'
                            },
                            '& .MuiSelect-select': {
                              padding: '1rem',
                              fontWeight: 500
                            },
                            bgcolor: '#f9fafb',
                            borderRadius: 2,
                            border: '1px solid #e5e7eb',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              bgcolor: '#f3f4f6',
                              borderColor: '#d1d5db'
                            },
                            '&.Mui-focused': {
                              bgcolor: '#ffffff',
                              borderColor: '#3b82f6',
                              boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
                            }
                          }}
                        >
                          <MenuItem value="true">
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                              <Box sx={{ 
                                width: 10, 
                                height: 10, 
                                borderRadius: '50%', 
                                bgcolor: '#10b981',
                                border: '2px solid #d1fae5'
                              }} />
                              <Typography sx={{ fontWeight: 500, color: '#374151' }}>
                                Active - Advertisement is live
                              </Typography>
                            </Box>
                          </MenuItem>
                          <MenuItem value="false">
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                              <Box sx={{ 
                                width: 10, 
                                height: 10, 
                                borderRadius: '50%', 
                                bgcolor: '#6b7280',
                                border: '2px solid #f3f4f6'
                              }} />
                              <Typography sx={{ fontWeight: 500, color: '#374151' }}>
                                Inactive - Advertisement is paused
                              </Typography>
                            </Box>
                          </MenuItem>
                        </Select>
                      )}
                    />
                    {errors.isActive && (
                      <Typography color="#ef4444" variant="caption" sx={{ mt: 1, display: 'block', fontWeight: 500 }}>
                        {errors.isActive.message}
                      </Typography>
                    )}
                  </FormControl>

                  {/* Action Buttons */}
                  <Grid item sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button 
                      onClick={handleClose} 
                      variant="outlined"
                      sx={{ 
                        color: '#6b7280',
                        borderColor: '#d1d5db',
                        '&:hover': {
                          borderColor: '#9ca3af',
                          backgroundColor: '#f9fafb',
                          transform: 'translateY(-1px)'
                        },
                        px: 3,
                        py: 1,
                        borderRadius: 2,
                        fontWeight: 500,
                        transition: 'all 0.2s ease'
                      }}
                    >
                      Cancel
                    </Button>
                    
                    <Button 
                      type="submit" 
                      variant="contained" 
                      disabled={loading}
                      sx={{ 
                        background: '#3b82f6',
                        color: 'white',
                        '&:hover': { 
                          background: '#2563eb',
                          transform: 'translateY(-1px)',
                          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                        },
                        '&:disabled': {
                          background: '#f3f4f6',
                          color: '#9ca3af',
                          transform: 'none',
                          boxShadow: 'none'
                        },
                        px: 3,
                        py: 1,
                        borderRadius: 2,
                        fontWeight: 500,
                        fontSize: '0.95rem',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 2px 8px rgba(59, 130, 246, 0.2)'
                      }}
                    >
                      {loading ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Box sx={{
                            width: 16,
                            height: 16,
                            border: '2px solid transparent',
                            borderTop: '2px solid currentColor',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite'
                          }} />
                          Updating...
                        </Box>
                      ) : 'Update Advertisement'}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </form>
          </Grid>
        </Box>
      </Modal>

      {/* View Modal */}
      <Dialog
        open={modalState === "view-modal"}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            maxHeight: '90vh',
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
          background: '#fafafa',
          borderBottom: '1px solid #f3f4f6',
          pb: 2,
          pt: 2.5,
          px: 3
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{
              width: 40,
              height: 40,
              borderRadius: '8px',
              background: '#dbeafe',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <VisibilityIcon sx={{ color: '#3b82f6', fontSize: 20 }} />
            </Box>
            <Box>
              <Typography variant="h5" fontWeight={600} color="#374151">
                Advertisement Details
              </Typography>
              <Typography variant="body2" color="#6b7280" sx={{ mt: 0.5 }}>
                View complete information about this promotion
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ 
          pt: 2.5,
          px: 3,
          background: '#ffffff'
        }}>
          {selectedAd && (
            <Grid container spacing={2.5}>
              <Grid item xs={12} sm={6}>
                <Box sx={{
                  p: 2,
                  borderRadius: 2,
                  background: '#f0f9ff',
                  border: '1px solid #bae6fd'
                }}>
                  <Typography variant="caption" color="#0369a1" fontWeight={600} sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    Room Number
                  </Typography>
                  <Typography variant="h6" color="#0c4a6e" fontWeight={600} sx={{ mt: 0.5 }}>
                    {selectedAd?.room?.roomNumber}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{
                  p: 2,
                  borderRadius: 2,
                  background: '#f0fdf4',
                  border: '1px solid #86efac'
                }}>
                  <Typography variant="caption" color="#166534" fontWeight={600} sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    Price per Night
                  </Typography>
                  <Typography variant="h6" color="#15803d" fontWeight={600} sx={{ mt: 0.5 }}>
                    ${selectedAd?.room?.price}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{
                  p: 2,
                  borderRadius: 2,
                  background: '#fffbeb',
                  border: '1px solid #fde68a'
                }}>
                  <Typography variant="caption" color="#92400e" fontWeight={600} sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    Discount Applied
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                    <Chip 
                      label={`${selectedAd?.room?.discount}% OFF`} 
                      color="warning" 
                      variant="filled"
                      size="small"
                      sx={{ 
                        fontWeight: 600,
                        background: '#f59e0b',
                        color: 'white'
                      }}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{
                  p: 2,
                  borderRadius: 2,
                  background: '#faf5ff',
                  border: '1px solid #c4b5fd'
                }}>
                  <Typography variant="caption" color="#7c3aed" fontWeight={600} sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    Guest Capacity
                  </Typography>
                  <Typography variant="h6" color="#6d28d9" fontWeight={600} sx={{ mt: 0.5 }}>
                    {selectedAd?.room?.capacity} guests
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{
                  p: 2,
                  borderRadius: 2,
                  background: selectedAd?.isActive 
                    ? '#f0fdf4'
                    : '#fef2f2',
                  border: selectedAd?.isActive 
                    ? '1px solid #86efac'
                    : '1px solid #fca5a5'
                }}>
                  <Typography variant="caption" 
                    color={selectedAd?.isActive ? "#166534" : "#991b1b"} 
                    fontWeight={600} 
                    sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}
                  >
                    Current Status
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 0.5 }}>
                    <StatusChip 
                      status={selectedAd?.isActive ? 'active' : 'inactive'} 
                      size="small"
                    />
                    <Box sx={{ 
                      width: 6, 
                      height: 6, 
                      borderRadius: '50%', 
                      bgcolor: selectedAd?.isActive ? '#10b981' : '#ef4444',
                      animation: selectedAd?.isActive ? 'pulse 2s infinite' : 'none'
                    }} />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          )}
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
              borderColor: '#d1d5db',
              color: '#6b7280',
              fontWeight: 500,
              px: 2.5,
              py: 1,
              borderRadius: 2,
              '&:hover': {
                borderColor: '#9ca3af',
                backgroundColor: '#f9fafb',
                transform: 'translateY(-1px)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
              },
              transition: 'all 0.2s ease'
            }}
          >
            Close
          </Button>
          <Button 
            onClick={() => {
              handleClose();
              showUpdateModal(selectedAd);
            }} 
            variant="contained"
            startIcon={<EditIcon />}
            sx={{ 
              background: '#3b82f6',
              color: 'white',
              fontWeight: 500,
              px: 2.5,
              py: 1,
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(59, 130, 246, 0.2)',
              '&:hover': {
                background: '#2563eb',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
              },
              transition: 'all 0.2s ease'
            }}
          >
            Edit Advertisement
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}