import React from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  tableCellClasses,
  TablePagination,
  Card,
  CardContent,
  Chip,
  IconButton,
  Tooltip,
  Skeleton,
  Alert,
  useTheme,
  useMediaQuery,
  Grid,
  Divider,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  CircularProgress,
  Fade,
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,

  MoreVert as MoreVertIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
  Person as PersonIcon,
  Hotel as HotelIcon,
  CalendarToday as CalendarIcon,
  AttachMoney as MoneyIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Settings as SettingsIcon,
  Star as StarIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Enhanced styled components for consistent table styling
export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontWeight: 600,
    fontSize: '0.875rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    padding: theme.spacing(2),
    borderBottom: `2px solid ${theme.palette.primary.dark}`,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: '0.875rem',
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  transition: 'all 0.2s ease-in-out',
  
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover,
  },
  
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
    transform: 'translateY(-1px)',
    boxShadow: theme.shadows[2],
  },
  
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// Enhanced Status chip component for consistent status display
export const StatusChip = ({ 
  status, 
  size = 'medium',
  variant = 'filled'
}: { 
  status: string; 
  size?: 'small' | 'medium' | 'large';
  variant?: 'filled' | 'outlined';
}) => {
  const getStatusConfig = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
      case 'active':
      case 'success':
      case 'confirmed':
        return { 
          color: 'success', 
          icon: <CheckIcon />, 
          label: 'Active',
          bgColor: '#f0fdf4',
          borderColor: '#86efac',
          textColor: '#166534'
        };
      case 'pending':
      case 'warning':
      case 'processing':
        return { 
          color: 'warning', 
          icon: <WarningIcon />, 
          label: 'Pending',
          bgColor: '#fffbeb',
          borderColor: '#fde68a',
          textColor: '#92400e'
        };
      case 'cancelled':
      case 'error':
      case 'inactive':
      case 'rejected':
        return { 
          color: 'error', 
          icon: <ErrorIcon />, 
          label: 'Inactive',
          bgColor: '#fef2f2',
          borderColor: '#fca5a5',
          textColor: '#991b1b'
        };
      default:
        return { 
          color: 'default', 
          icon: <InfoIcon />, 
          label: status,
          bgColor: '#f9fafb',
          borderColor: '#d1d5db',
          textColor: '#6b7280'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Chip
      icon={config.icon}
      label={config.label}
      color={config.color as any}
      size={size}
      variant={variant}
      sx={{
        fontWeight: 600,
        fontSize: size === 'small' ? '0.75rem' : '0.9rem',
        backgroundColor: variant === 'filled' ? config.bgColor : 'transparent',
        borderColor: config.borderColor,
        color: config.textColor,
        '& .MuiChip-icon': { 
          fontSize: size === 'small' ? '1rem' : '1.2rem',
          color: config.textColor
        },
        '&:hover': {
          backgroundColor: variant === 'filled' ? config.bgColor : config.bgColor,
          transform: 'translateY(-1px)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }
      }}
    />
  );
};

// Enhanced Loading skeleton for consistent loading states
export const TableSkeleton = ({ rows = 5, columns = 6 }: { rows?: number; columns?: number }) => (
  <TableBody>
    {[...Array(rows)].map((_, index) => (
      <StyledTableRow key={index}>
        {[...Array(columns)].map((_, colIndex) => (
          <StyledTableCell key={colIndex}>
            <Skeleton animation="wave" />
          </StyledTableCell>
        ))}
      </StyledTableRow>
    ))}
  </TableBody>
);

// Enhanced Mobile Card Skeleton
export const MobileCardSkeleton = ({ cards = 3 }: { cards?: number }) => (
  <Box sx={{ p: 2 }}>
    {[...Array(cards)].map((_, index) => (
      <Card key={index} sx={{ mb: 2, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Skeleton variant="circular" width={40} height={40} />
            <Box>
              <Skeleton variant="text" width={120} height={24} />
              <Skeleton variant="text" width={80} height={20} />
            </Box>
          </Box>
          <Skeleton variant="circular" width={32} height={32} />
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Skeleton variant="text" width="100%" height={20} />
          </Grid>
          <Grid item xs={6}>
            <Skeleton variant="text" width="100%" height={20} />
          </Grid>
          <Grid item xs={6}>
            <Skeleton variant="text" width="100%" height={20} />
          </Grid>
          <Grid item xs={6}>
            <Skeleton variant="text" width="100%" height={20} />
          </Grid>
        </Grid>
      </Card>
    ))}
  </Box>
);

// Enhanced Standardized dashboard header component
export const DashboardHeader = ({ 
  title, 
  subtitle, 
  actionButton, 
  searchProps, 
  filterProps, 

  stats
}: {
  title: string;
  subtitle?: string;
  actionButton?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
    variant?: 'contained' | 'outlined';
    color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  };
  searchProps?: {
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
  };
  filterProps?: {
    onClick: () => void;
    label?: string;
  };

  stats?: Array<{
    label: string;
    value: string | number;
    icon: React.ReactNode;
    color: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  }>;
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ mb: 4 }}>
      {/* Stats Cards */}
      {stats && stats.length > 0 && (
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                sx={{ 
                  p: 2,
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${theme.palette[stat.color].light} 0%, ${theme.palette[stat.color].main} 100%)`,
                  color: theme.palette[stat.color].contrastText,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[8],
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      {stat.label}
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    p: 1, 
                    borderRadius: 2, 
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {stat.icon}
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Title and Action Button */}
      <Box sx={{ 
        display: "flex", 
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: "space-between", 
        alignItems: { xs: 'stretch', sm: 'center' },
        mb: 3,
        gap: 2
      }}>
        <Box>
          <Typography 
            variant='h4' 
            sx={{ 
              fontWeight: 700, 
              color: theme.palette.primary.main,
              mb: subtitle ? 0.5 : 0,
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' }
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography 
              variant='subtitle1' 
              sx={{ 
                color: 'text.secondary',
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
        
        {actionButton && (
          <Button 
            variant={actionButton.variant || "contained"}
            color={actionButton.color || "primary"}
            startIcon={actionButton.icon}
            onClick={actionButton.onClick}
            sx={{ 
              px: 3,
              py: 1.5,
              borderRadius: 2,
              minWidth: { xs: 'auto', sm: 140 },
              fontWeight: 600,
              textTransform: 'none',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              '&:hover': { 
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 20px rgba(0,0,0,0.2)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            {isMobile && actionButton.label.length > 10 ? 'Add' : actionButton.label}
          </Button>
        )}
      </Box>

      {/* Search and Controls */}
      {(searchProps || filterProps) && (
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'stretch', sm: 'center' }
        }}>
          {searchProps && (
            <TextField
              placeholder={searchProps.placeholder}
              value={searchProps.value}
              onChange={(e) => searchProps.onChange(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ 
                flex: 1,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: 'background.paper',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'background.paper',
                    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
                  }
                }
              }}
            />
          )}
          
          {filterProps && (
            <Button
              variant="outlined"
              startIcon={<FilterIcon />}
              onClick={filterProps.onClick}
              sx={{ 
                borderRadius: 2, 
                px: 3,
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  transform: 'translateY(-1px)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                },
                transition: 'all 0.2s ease'
              }}
            >
              {filterProps.label || 'Filters'}
            </Button>
          )}
          

        </Box>
      )}
    </Box>
  );
};

// Enhanced Standardized table container with consistent styling
export const DashboardTableContainer = ({ 
  children, 
  loading = false,
  error = null,
  emptyMessage = "No data available",
  emptyIcon = <InfoIcon />,
  onRetry,
  mobileView = null
}: {
  children: React.ReactNode;
  loading?: boolean;
  error?: string | null;
  emptyMessage?: string;
  emptyIcon?: React.ReactNode;
  onRetry?: () => void;
  mobileView?: React.ReactNode;
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert 
          severity="error" 
          sx={{ 
            mb: 2,
            borderRadius: 2,
            '& .MuiAlert-icon': { fontSize: '1.5rem' }
          }}
        >
          {error}
        </Alert>
        {onRetry && (
          <Button 
            variant="contained" 
            onClick={onRetry}

            sx={{ 
              borderRadius: 2,
              fontWeight: 600,
              textTransform: 'none'
            }}
          >
            Try Again
          </Button>
        )}
      </Box>
    );
  }

  if (loading) {
    return (
      <Paper 
        sx={{ 
          borderRadius: 3, 
          overflow: 'hidden',
          boxShadow: theme.shadows[1],
        }}
      >
        {isMobile && mobileView ? (
          <MobileCardSkeleton />
        ) : (
          <Box sx={{ p: 3 }}>
            <TableSkeleton />
          </Box>
        )}
      </Paper>
    );
  }

  return (
    <Paper 
      sx={{ 
        borderRadius: 3, 
        overflow: 'hidden',
        boxShadow: theme.shadows[1],
        '&:hover': { boxShadow: theme.shadows[3] },
        transition: 'all 0.3s ease'
      }}
    >
      {children}
    </Paper>
  );
};

// Enhanced Standardized pagination component
export const DashboardPagination = ({
  totalCount,
  currentPage,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions = [5, 10, 25, 50]
}: {
  totalCount: number;
  currentPage: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  rowsPerPageOptions?: number[];
}) => {
  return (
    <Box sx={{ 
      borderTop: 1, 
      borderColor: 'divider',
      backgroundColor: 'background.paper'
    }}>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={currentPage - 1}
        onPageChange={(_, newPage) => {
          onPageChange(newPage + 1);
        }}
        onRowsPerPageChange={(e) => {
          onRowsPerPageChange(parseInt(e.target.value, 10));
        }}
        sx={{
          '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
            fontSize: '0.875rem',
            fontWeight: 500,
          },
          '& .MuiTablePagination-select': {
            borderRadius: 1,
          }
        }}
      />
    </Box>
  );
};

// Enhanced Standardized action menu component
export const ActionMenu = ({
  anchorEl,
  open,
  onClose,
  actions
}: {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  actions: Array<{
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
    color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
    disabled?: boolean;
  }>;
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { 
          minWidth: 140,
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          borderRadius: 2,
          border: '1px solid rgba(0,0,0,0.08)'
        }
      }}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      {actions.map((action, index) => (
        <MenuItem 
          key={index}
          onClick={() => {
            if (!action.disabled) {
              action.onClick();
              onClose();
            }
          }}
          disabled={action.disabled}
          sx={{ 
            gap: 1.5,
            py: 1.5,
            px: 2,
            '&:hover': { 
              backgroundColor: action.color ? `${action.color}.light` : 'action.hover',
              color: action.color ? `${action.color}.contrastText` : 'inherit'
            },
            '&.Mui-disabled': {
              opacity: 0.5
            }
          }}
        >
          <ListItemIcon sx={{ color: 'inherit', minWidth: 32 }}>
            {action.icon}
          </ListItemIcon>
          <ListItemText 
            primary={action.label}
            primaryTypographyProps={{
              fontSize: '0.875rem',
              fontWeight: 500
            }}
          />
        </MenuItem>
      ))}
    </Menu>
  );
};

// Enhanced Empty State Component
export const EmptyState = ({
  icon,
  title,
  description,
  action
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
}) => {
  const theme = useTheme();
  
  return (
    <Box sx={{ 
      textAlign: 'center', 
      py: 8,
      px: 3
    }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        mb: 3 
      }}>
        <Box sx={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          backgroundColor: theme.palette.primary.light,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: theme.palette.primary.main,
          opacity: 0.7
        }}>
          {icon}
        </Box>
      </Box>
      <Typography variant="h5" sx={{ 
        fontWeight: 600, 
        mb: 1,
        color: 'text.primary'
      }}>
        {title}
      </Typography>
      <Typography variant="body1" sx={{ 
        color: 'text.secondary',
        mb: action ? 3 : 0,
        maxWidth: 400,
        mx: 'auto'
      }}>
        {description}
      </Typography>
      {action && (
        <Button
          variant="contained"
          startIcon={action.icon}
          onClick={action.onClick}
          sx={{
            borderRadius: 2,
            px: 3,
            py: 1.5,
            fontWeight: 600,
            textTransform: 'none',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 20px rgba(0,0,0,0.2)'
            },
            transition: 'all 0.3s ease'
          }}
        >
          {action.label}
        </Button>
      )}
    </Box>
  );
};

// Main DashboardLayout component
const DashboardLayout = ({ 
  children,
  title,
  subtitle,
  actionButton,
  searchProps,
  filterProps,

  loading = false,
  error = null,
  emptyMessage = "No data available",
  emptyIcon = <InfoIcon />,
  onRetry,
  totalCount,
  currentPage,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions = [5, 10, 25, 50],
  stats,
  mobileView
}: {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  actionButton?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
    variant?: 'contained' | 'outlined';
    color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  };
  searchProps?: {
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
  };
  filterProps?: {
    onClick: () => void;
    label?: string;
  };

  loading?: boolean;
  error?: string | null;
  emptyMessage?: string;
  emptyIcon?: React.ReactNode;
  onRetry?: () => void;
  totalCount?: number;
  currentPage?: number;
  rowsPerPage?: number;
  onPageChange?: (page: number) => void;
  onRowsPerPageChange?: (rowsPerPage: number) => void;
  rowsPerPageOptions?: number[];
  stats?: Array<{
    label: string;
    value: string | number;
    icon: React.ReactNode;
    color: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  }>;
  mobileView?: React.ReactNode;
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
      {/* Header */}
      {(title || actionButton || searchProps || filterProps || stats) && (
        <DashboardHeader
          title={title || ''}
          subtitle={subtitle}
          actionButton={actionButton}
          searchProps={searchProps}
          filterProps={filterProps}

          stats={stats}
        />
      )}

      {/* Table Container */}
      <DashboardTableContainer
        loading={loading}
        error={error}
        emptyMessage={emptyMessage}
        emptyIcon={emptyIcon}
        onRetry={onRetry}
        mobileView={mobileView}
      >
        {isMobile && mobileView ? mobileView : children}
      </DashboardTableContainer>

      {/* Pagination */}
      {totalCount !== undefined && currentPage !== undefined && rowsPerPage !== undefined && onPageChange && onRowsPerPageChange && (
        <DashboardPagination
          totalCount={totalCount}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          rowsPerPageOptions={rowsPerPageOptions}
        />
      )}
    </Box>
  );
};

export default DashboardLayout;
