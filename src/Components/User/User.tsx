import * as React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Avatar,
  IconButton,
  useTheme,
  useMediaQuery,
  Grid,
  Tooltip,
  Skeleton,
  Alert,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  Search,
  FilterList,
  MoreVert,
  Visibility,
  Person,
  Email,
  Phone,
  LocationOn,
  AdminPanelSettings,
  Person as UserIcon,
  CalendarToday,
  Refresh,
  Add as AddIcon,
  Settings as SettingsIcon,
  Group as GroupIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import DashboardLayout, { 
  StyledTableCell, 
  StyledTableRow, 
  StatusChip, 
  ActionMenu,
  EmptyState,
  MobileCardSkeleton
} from '../shared/common/DashboardLayout';

// Enhanced Mobile Card Component
const UserCard = ({ user, onView, onMenuClick, onMenuClose, anchorEl }: {
  user: any;
  onView: (user: any) => void;
  onMenuClick: (event: React.MouseEvent<HTMLElement>, index: number) => void;
  onMenuClose: (index: number) => void;
  anchorEl: HTMLElement | null;
}) => {
  const theme = useTheme();

  const getRoleColor = (role: string) => {
    return role === 'admin' ? 'error' : 'success';
  };

  const getRoleIcon = (role: string) => {
    return role === 'admin' ? <AdminPanelSettings /> : <UserIcon />;
  };

  return (
    <Card 
      sx={{ 
        mb: 2, 
        transition: 'all 0.2s ease-in-out',
        borderRadius: 3,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: theme.shadows[4],
        }
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ 
              bgcolor: theme.palette.primary.main,
              width: 48,
              height: 48
            }}>
              <Person />
            </Avatar>
            <Box>
              <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 0.5 }}>
                {user?.userName || 'N/A'}
              </Typography>
              <StatusChip 
                status={user?.role || 'user'} 
                size="small"
                variant="outlined"
              />
            </Box>
          </Box>
          <IconButton 
            onClick={(event) => onMenuClick(event, 0)} 
            size="small"
            sx={{ 
              color: 'text.secondary',
              '&:hover': { 
                backgroundColor: 'action.hover',
                transform: 'scale(1.05)'
              }
            }}
          >
            <MoreVert />
          </IconButton>
        </Box>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Email sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary" sx={{ wordBreak: 'break-word' }}>
                {user?.email || 'N/A'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Phone sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {user?.phoneNumber || 'N/A'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {user?.country || 'N/A'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <ActionMenu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => onMenuClose(0)}
          actions={[
            {
              label: 'View Details',
              icon: <Visibility fontSize="small" />,
              onClick: () => onView(user),
              color: 'primary'
            }
          ]}
        />
      </CardContent>
    </Card>
  );
};

function User() {
  const { baseUrl }: any = React.useContext(AuthContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [usersList, setUsersList] = React.useState<any>({});
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pagesArray, setPagesArray] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
  // Modal states
  const [userDetailsModalOpen, setUserDetailsModalOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<any>(null);
  const [userDetailsLoading, setUserDetailsLoading] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const showAllUsers = async (page: number) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`${baseUrl}/admin/users`, {
        headers: {
          Authorization: `${localStorage.getItem('userToken')}`
        },
        params: {
          size: rowsPerPage,
          page: page,
        }
      });
      
      setPagesArray(response?.data?.data?.totalCount || 0);
      setUsersList(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to load users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (event: any, newPage: number) => {
    setCurrentPage(newPage + 1);
    showAllUsers(newPage + 1);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setCurrentPage(1);
    showAllUsers(1);
  };



  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleViewUser = async (user: any) => {
    try {
      setUserDetailsLoading(true);
      setSelectedUser(user);
      setUserDetailsModalOpen(true);
      
      const response = await axios.get(`${baseUrl}/admin/users/${user._id}`, {
        headers: {
          Authorization: `${localStorage.getItem('userToken')}`
        }
      });
      
      const userDetails = response.data.data || response.data;
      setSelectedUser(userDetails.user);
      
    } catch (error) {
      console.error('Error fetching user details:', error);
      setSelectedUser(user);
    } finally {
      setUserDetailsLoading(false);
    }
  };

  const handleCloseUserDetailsModal = () => {
    setUserDetailsModalOpen(false);
    setSelectedUser(null);
    setUserDetailsLoading(false);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (index: number) => {
    setAnchorEl(null);
  };

  const filteredUsers = usersList?.data?.users?.filter((user: any) =>
    user?.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user?.country?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Calculate stats
  const totalUsers = pagesArray;
  const adminUsers = filteredUsers.filter((user: any) => user?.role === 'admin').length;
  const regularUsers = filteredUsers.filter((user: any) => user?.role === 'user').length;
  const activeUsers = filteredUsers.length;

  const stats = [
    {
      label: 'Total Users',
      value: totalUsers,
      icon: <GroupIcon />,
      color: 'primary' as const
    },
    {
      label: 'Admin Users',
      value: adminUsers,
      icon: <AdminPanelSettings />,
      color: 'error' as const
    },
    {
      label: 'Regular Users',
      value: regularUsers,
      icon: <UserIcon />,
      color: 'success' as const
    },
    {
      label: 'Active Users',
      value: activeUsers,
      icon: <TrendingUpIcon />,
      color: 'info' as const
    }
  ];

  React.useEffect(() => {
    showAllUsers(1);
  }, []);

  // Mobile view component
  const MobileView = () => (
    <Box sx={{ p: 2 }}>
      {filteredUsers.length > 0 ? (
        filteredUsers.map((user: any, index: number) => (
          <UserCard
            key={user._id}
            user={user}
            onView={handleViewUser}
            onMenuClick={handleMenuClick}
            onMenuClose={handleMenuClose}
            anchorEl={anchorEl}
          />
        ))
      ) : (
        <EmptyState
          icon={<Person />}
          title="No users found"
          description={searchTerm ? 'Try adjusting your search terms.' : 'No users have been added yet.'}
        />
      )}
    </Box>
  );

  return (
    <DashboardLayout
      title="User Management"
      subtitle="Manage and monitor all user accounts and permissions"
      stats={stats}
      searchProps={{
        placeholder: "Search users by name, email, or country...",
        value: searchTerm,
        onChange: handleSearch
      }}
      filterProps={{
        onClick: () => console.log('Filter clicked'),
        label: 'Filters'
      }}

      loading={loading}
      error={error}
      emptyMessage="No users found"
      totalCount={pagesArray}
      currentPage={currentPage}
      rowsPerPage={rowsPerPage}
      onPageChange={(page) => handleChangePage(null, page - 1)}
      onRowsPerPageChange={(rowsPerPage) => handleChangeRowsPerPage({ target: { value: rowsPerPage.toString() } } as any)}
      mobileView={<MobileView />}
    >
      {/* Desktop Table Layout */}
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="users table">
          <TableHead>
            <TableRow>
              <StyledTableCell>User</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Phone</StyledTableCell>
              <StyledTableCell>Country</StyledTableCell>
              <StyledTableCell align="center">Role</StyledTableCell>
              <StyledTableCell>Created</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user: any) => (
                <StyledTableRow key={user._id}>
                  <StyledTableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 32, height: 32 }}>
                        <Person />
                      </Avatar>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {user?.userName || 'N/A'}
                      </Typography>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                      {user?.email || 'N/A'}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography variant="body2">
                      {user?.phoneNumber || 'N/A'}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography variant="body2">
                      {user?.country || 'N/A'}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <StatusChip 
                      status={user?.role || 'user'} 
                      size="small"
                      variant="outlined"
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography variant="body2">
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Tooltip title="View Details">
                      <IconButton 
                        size="small" 
                        onClick={() => handleViewUser(user)}
                        sx={{ 
                          color: 'primary.main',
                          '&:hover': { 
                            backgroundColor: 'primary.light',
                            transform: 'scale(1.1)'
                          },
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} sx={{ textAlign: 'center', py: 8 }}>
                  <EmptyState
                    icon={<Person />}
                    title="No users found"
                    description={searchTerm ? 'Try adjusting your search terms.' : 'No users have been added yet.'}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* User Details Modal */}
      <Dialog
        open={userDetailsModalOpen}
        onClose={handleCloseUserDetailsModal}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: theme.shadows[8],
          }
        }}
      >
        <DialogTitle sx={{ 
          pb: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          borderBottom: `1px solid ${theme.palette.divider}`
        }}>
          <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 48, height: 48 }}>
            <Person />
          </Avatar>
          <Box>
            <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
              {selectedUser?.userName || 'User Details'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              User Information
            </Typography>
          </Box>
        </DialogTitle>
        
        <DialogContent sx={{ pt: 3 }}>
          {userDetailsLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : selectedUser ? (
            <>
              <Grid container spacing={3}>
                {/* Basic Information */}
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.main }}>
                    Basic Information
                  </Typography>
                  <Card variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Person sx={{ fontSize: 20, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            Username:
                          </Typography>
                        </Box>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {selectedUser?.userName || 'N/A'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <AdminPanelSettings sx={{ fontSize: 20, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            Role:
                          </Typography>
                        </Box>
                        <StatusChip 
                          status={selectedUser?.role || 'user'} 
                          size="small"
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>

                {/* Contact Information */}
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.main }}>
                    Contact Information
                  </Typography>
                  <Card variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Email sx={{ fontSize: 20, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            Email:
                          </Typography>
                        </Box>
                        <Typography variant="body1" sx={{ wordBreak: 'break-word' }}>
                          {selectedUser?.email || 'N/A'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Phone sx={{ fontSize: 20, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            Phone:
                          </Typography>
                        </Box>
                        <Typography variant="body1">
                          {selectedUser?.phoneNumber || 'N/A'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <LocationOn sx={{ fontSize: 20, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            Country:
                          </Typography>
                        </Box>
                        <Typography variant="body1">
                          {selectedUser?.country || 'N/A'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <CalendarToday sx={{ fontSize: 20, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            Created:
                          </Typography>
                        </Box>
                        <Typography variant="body1">
                          {selectedUser?.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString() : 'N/A'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>

                {/* Additional Details */}
                {selectedUser?._id && (
                  <Grid item xs={12}>
                    <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.main }}>
                      Additional Details
                    </Typography>
                    <Card variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                              User ID:
                            </Typography>
                          </Box>
                          <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                            {selectedUser._id}
                          </Typography>
                        </Grid>
                        {selectedUser?.updatedAt && (
                          <Grid item xs={12} sm={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                              <CalendarToday sx={{ fontSize: 20, color: 'text.secondary' }} />
                              <Typography variant="body2" color="text.secondary">
                                Last Updated:
                              </Typography>
                            </Box>
                            <Typography variant="body1">
                              {new Date(selectedUser.updatedAt).toLocaleDateString()}
                            </Typography>
                          </Grid>
                        )}
                      </Grid>
                    </Card>
                  </Grid>
                )}
              </Grid>
            </>
          ) : (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                No user details available
              </Typography>
            </Box>
          )}
        </DialogContent>
        
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            onClick={handleCloseUserDetailsModal}
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default User;
