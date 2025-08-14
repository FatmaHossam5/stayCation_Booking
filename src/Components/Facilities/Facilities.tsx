import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Grid, TextField, Pagination, PaginationItem, IconButton, TablePagination, TableFooter, Box, Modal, Divider, MenuItem, Menu, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses, Card, CardContent, Chip, Skeleton, Alert, useTheme, useMediaQuery, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddIcon from '@mui/icons-material/Add';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import DashboardLayout, { 
  StyledTableCell, 
  StyledTableRow, 
  StatusChip, 
  ActionMenu,
  EmptyState,
  MobileCardSkeleton
} from '../shared/common/DashboardLayout';
import {
  Settings as SettingsIcon,
  Add as AddIcon2,
  TrendingUp as TrendingUpIcon,
  Build as BuildIcon,
} from '@mui/icons-material';

// Enhanced modal styling
const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '95%', sm: 500, md: 600 },
  maxWidth: '90vw',
  maxHeight: '90vh',
  overflow: 'auto',
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
  p: { xs: 2, sm: 3, md: 4 },
};

// Enhanced Mobile Card Component
const FacilityCard = ({ facility, onEdit, onDelete, onMenuClick, onMenuClose, anchorEl, index }: {
  facility: any;
  onEdit: (facility: any) => void;
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
              width: 48,
              height: 48,
              borderRadius: 2,
              bgcolor: theme.palette.primary.light,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.palette.primary.main
            }}>
              <SettingsIcon />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                {facility?.name || 'N/A'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Created by {facility?.createdBy?.userName || 'System'}
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
              Created
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {facility?.createdAt ? new Date(facility.createdAt).toLocaleDateString() : 'N/A'}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary" display="block">
              Updated
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {facility?.updatedAt ? new Date(facility.updatedAt).toLocaleDateString() : 'N/A'}
            </Typography>
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
              onClick: () => onEdit(facility),
              color: 'primary'
            },
            {
              label: 'Delete',
              icon: <DeleteOutlineOutlinedIcon fontSize="small" />,
              onClick: () => onDelete(facility._id),
              color: 'error'
            }
          ]}
        />
      </CardContent>
    </Card>
  );
};

export default function Facilities() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [showState, setShowState] = useState<string | null>(null);
  const handleClose = () => setShowState(null);
  const navigate = useNavigate()
  const [rows, setRows] = useState<any[]>([])
  const [itemID, setItemID] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesArray, setPagesArray] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { baseUrl, reqHeaders } = useContext(AuthContext)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (index: number) => {
    setAnchorEl(null);
  };
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm()

  const handleChangePage = (event: any, newPage: number) => {
    setCurrentPage(newPage + 1);
    getFacilities(newPage + 1);
  };
  
  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setCurrentPage(1);
    getFacilities(1);
  };
  
  const handleShowAdd = () => {
    setShowState('add-state')
    reset();
    setValue('name', '');
    setError(null);
  }
  
  const handleShowDelete = (id: string) => {
    setShowState('delete-state');
    setItemID(id);
  }
  
  const handleShowUpdate = (item: any) => {
    setShowState('update-state');
    setItemID(item._id)
    setValue("name", item.name)
  }

  const getFacilities = (page: number) => {
    setLoading(true);
    setError(null);
    axios.get(`${baseUrl}/admin/room-facilities`,
      {
        headers: {
          'Authorization': `${localStorage.getItem('userToken')}`,
          'Content-Type': 'application/json'
        },
        params: {
          size: rowsPerPage,
          page: page,
        }
      }).then((response) => {
        setPagesArray(response?.data?.data?.totalCount || 0);
        setRows(response?.data?.data?.facilities || []);
      }).catch((error: any) => {
        const errorMessage = error?.response?.data?.message || error?.message || "Failed to fetch facilities";
        setError(errorMessage);
        toast.error(errorMessage);
        setRows([]); // Ensure rows is always an array even on error
      }).finally(() => {
        setLoading(false);
      })
  }

  const deleteFacility = () => {
    setLoading(true);
    setError(null);
    axios.delete(`${baseUrl}/admin/room-facilities/${itemID}`,
      {
        headers: {
          'Authorization': `${localStorage.getItem('userToken')}`,
          'Content-Type': 'application/json'
        },
      }).then((response) => {
        toast.success("Deleted Successfully")
        handleClose()
        getFacilities(1)
      }).catch((error: any) => {
        const errorMessage = error?.response?.data?.message || error?.message || "Failed to delete facility";
        setError(errorMessage);
        toast.error(errorMessage)
      }).finally(() => {
        setLoading(false);
      })
  }

  const onSubmit = (data: any) => {
    console.log('Submitting facility data:', data);
    console.log('Token:', localStorage.getItem('userToken'));
    console.log('Base URL:', baseUrl);
    
    // Validate data before submission
    if (!data.name || data.name.trim().length === 0) {
      toast.error("Facility name is required");
      return;
    }
    
    if (data.name.trim().length < 2) {
      toast.error("Facility name must be at least 2 characters");
      return;
    }
    
    // Trim whitespace from the name
    const cleanData = {
      name: data.name.trim()
    };
    
    setLoading(true);
    setError(null);
    axios.post(`${baseUrl}/admin/room-facilities`, cleanData,
      {
        headers: {
          'Authorization': `${localStorage.getItem('userToken')}`,
          'Content-Type': 'application/json'
        },
      }).then((response) => {
        console.log('Success response:', response);
        toast.success(response?.data?.message || "Facility added successfully")
        handleClose()
        getFacilities(1)
      }).catch((error: any) => {
        console.error('Error submitting facility:', error);
        console.error('Error response:', error?.response);
        const errorMessage = error?.response?.data?.message || error?.message || "Failed to add facility";
        setError(errorMessage);
        toast.error(errorMessage)
      }).finally(() => {
        setLoading(false);
      })
  }
  
  const updateFacility = (data: any) => {
    // Validate data before submission
    if (!data.name || data.name.trim().length === 0) {
      toast.error("Facility name is required");
      return;
    }
    
    if (data.name.trim().length < 2) {
      toast.error("Facility name must be at least 2 characters");
      return;
    }
    
    // Trim whitespace from the name
    const cleanData = {
      name: data.name.trim()
    };
    
    setLoading(true);
    setError(null);
    axios.put(`${baseUrl}/admin/room-facilities/${itemID}`, cleanData, {
      headers: {
        'Authorization': `${localStorage.getItem('userToken')}`,
        'Content-Type': 'application/json'
      },
    }).then((response) => {
      toast.success(response?.data?.message || "Facility updated successfully")
      handleClose()
      getFacilities(1)
    }).catch((error: any) => {
      const errorMessage = error?.response?.data?.message || error?.message || "Failed to update facility";
      setError(errorMessage);
      toast.error(errorMessage)
    }).finally(() => {
      setLoading(false);
    })
  }



  useEffect(() => {
    getFacilities(1)
  }, [])

  // Calculate stats
  const totalFacilities = rows?.length || 0;
  const activeFacilities = rows?.length || 0; // All facilities are considered active
  const recentlyAdded = rows?.filter((facility: any) => {
    const createdDate = new Date(facility.createdAt);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return createdDate > weekAgo;
  })?.length || 0;

  const stats = [
    {
      label: 'Total Facilities',
      value: totalFacilities,
      icon: <SettingsIcon />,
      color: 'primary' as const
    },
    {
      label: 'Active Facilities',
      value: activeFacilities,
      icon: <BuildIcon />,
      color: 'success' as const
    },
    {
      label: 'Recently Added',
      value: recentlyAdded,
      icon: <AddIcon2 />,
      color: 'info' as const
    },
    {
      label: 'Growth Rate',
      value: `${Math.round((recentlyAdded / totalFacilities) * 100)}%`,
      icon: <TrendingUpIcon />,
      color: 'warning' as const
    }
  ];

  // Mobile view component
  const MobileView = () => (
    <Box sx={{ p: 2 }}>
      {rows && rows.length > 0 ? (
        rows.map((facility: any, index: number) => (
          <FacilityCard
            key={facility._id || index}
            facility={facility}
            index={index}
            anchorEl={anchorEl}
            onMenuClick={handleMenuClick}
            onMenuClose={handleMenuClose}
            onEdit={handleShowUpdate}
            onDelete={handleShowDelete}
          />
        ))
      ) : (
        <EmptyState
          icon={<SettingsIcon />}
          title="No facilities found"
          description="Get started by adding your first facility"
          action={{
            label: "Add Facility",
            onClick: handleShowAdd,
            icon: <AddIcon />
          }}
        />
      )}
    </Box>
  );

  return (
    <>
      <DashboardLayout
        title="Facilities Management"
        subtitle="Manage and monitor all room facilities and amenities"
        stats={stats}
        actionButton={{
          label: "Add New Facility",
          onClick: handleShowAdd,
          icon: <AddIcon />
        }}

        loading={loading}
        error={error}
        emptyMessage="No facilities found. Get started by adding your first facility."
        totalCount={pagesArray}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        onPageChange={(page) => handleChangePage(null, page - 1)}
        onRowsPerPageChange={(rowsPerPage) => handleChangeRowsPerPage({ target: { value: rowsPerPage.toString() } } as any)}
        mobileView={<MobileView />}
      >
        {/* Desktop Table Layout */}
        <TableContainer>
          <Table sx={{ minWidth: 700 }} aria-label="facilities table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="center">Created By</StyledTableCell>
                <StyledTableCell align="center">Created At</StyledTableCell>
                <StyledTableCell align="center">Updated At</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.length > 0 ? (
                rows?.map((row: any, index: number) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{
                          width: 32,
                          height: 32,
                          borderRadius: 1,
                          bgcolor: theme.palette.primary.light,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: theme.palette.primary.main
                        }}>
                          <SettingsIcon fontSize="small" />
                        </Box>
                        {row.name}
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.createdBy ? row.createdBy.userName : "N/A"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {new Date(row?.createdAt).toLocaleDateString()}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {new Date(row?.updatedAt).toLocaleDateString()}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                        <Tooltip title="Edit Facility">
                          <IconButton
                            size="small"
                            onClick={() => handleShowUpdate(row)}
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
                        <Tooltip title="Delete Facility">
                          <IconButton
                            size="small"
                            onClick={() => handleShowDelete(row?._id)}
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
                  <TableCell colSpan={5} sx={{ textAlign: 'center', py: 8 }}>
                    <EmptyState
                      icon={<SettingsIcon />}
                      title="No facilities found"
                      description="Get started by adding your first facility"
                      action={{
                        label: "Add Facility",
                        onClick: handleShowAdd,
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

      {/* Add Facility Modal */}
      <Modal
        open={showState === 'add-state'}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          '& .MuiBackdrop-root': {
            backdropFilter: 'blur(4px)',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          }
        }}
      >
        <Box sx={modalStyle}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: 'text.primary' }}>
              Add New Facility
            </Typography>
            <IconButton 
              onClick={handleClose} 
              sx={{ 
                color: "error.main",
                '&:hover': { backgroundColor: 'error.light', color: 'error.contrastText' }
              }}
            >
              <HighlightOffIcon />
            </IconButton>
          </Box>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Facility Name"
              {...register("name", { required: true })}
              InputLabelProps={{
                style: { color: 'text.secondary', fontWeight: 500 },
              }}
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover': { '& .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' } }
                }
              }}
            />
            {errors.name?.type === "required" && 
              <Typography sx={{ color: "error.main", mb: 2, fontSize: '0.875rem' }}>
                Facility name is required
              </Typography>
            }
            
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
                type="submit" 
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
                    Adding...
                  </Box>
                ) : 'Add Facility'}
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>

      {/* Update Facility Modal */}
      <Modal
        open={showState === 'update-state'}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          '& .MuiBackdrop-root': {
            backdropFilter: 'blur(4px)',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          }
        }}
      >
        <Box sx={modalStyle}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: 'text.primary' }}>
              Update Facility
            </Typography>
            <IconButton 
              onClick={handleClose} 
              sx={{ 
                color: "error.main",
                '&:hover': { backgroundColor: 'error.light', color: 'error.contrastText' }
              }}
            >
              <HighlightOffIcon />
            </IconButton>
          </Box>
          
          <form onSubmit={handleSubmit(updateFacility)}>
            <TextField
              fullWidth
              label="Facility Name"
              {...register("name", { required: true })}
              InputLabelProps={{
                style: { color: 'text.secondary', fontWeight: 500 },
              }}
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover': { '& .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' } }
                }
              }}
            />
            {errors.name?.type === "required" && 
              <Typography sx={{ color: "error.main", mb: 2, fontSize: '0.875rem' }}>
                Facility name is required
              </Typography>
            }
            
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
                type="submit" 
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
                ) : 'Update Facility'}
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>

      {/* Delete Facility Modal */}
      <Dialog
        open={showState === 'delete-state'}
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
          Delete Facility?
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
            Are you sure you want to delete this facility? 
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
              This will permanently remove the facility and all associated data.
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
            onClick={deleteFacility} 
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
  )
}
