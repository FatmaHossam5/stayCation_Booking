import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  useTheme,
  useMediaQuery,
  Typography,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled table cell for better responsive design
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${theme.components?.MuiTableCell?.styleOverrides?.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontWeight: 600,
    fontSize: '0.875rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
      fontSize: '0.75rem',
    },
  },
  [`&.${theme.components?.MuiTableCell?.styleOverrides?.body}`]: {
    fontSize: '0.875rem',
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
      fontSize: '0.75rem',
    },
  },
}));

// Styled table row with hover effects
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  transition: 'all 0.2s ease',
  
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    transform: 'scale(1.01)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover,
  },
  
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// Mobile card component for responsive display
const MobileCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  transition: 'all 0.2s ease',
  
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
}));

interface Column {
  id: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
  mobilePriority?: boolean; // Whether to show this column on mobile
}

interface ResponsiveTableProps {
  columns: Column[];
  data: any[];
  title?: string;
  onRowClick?: (row: any) => void;
  loading?: boolean;
  emptyMessage?: string;
}

const ResponsiveTable: React.FC<ResponsiveTableProps> = ({
  columns,
  data,
  title,
  onRowClick,
  loading = false,
  emptyMessage = 'No data available',
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Filter columns for mobile display
  const mobileColumns = columns.filter(col => col.mobilePriority !== false);

  if (loading) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>{title}</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {[1, 2, 3].map((i) => (
            <Box key={i} sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
              <Box sx={{ height: 20, bgcolor: 'grey.300', borderRadius: 0.5, mb: 1 }} />
              <Box sx={{ height: 16, bgcolor: 'grey.300', borderRadius: 0.5, width: '60%' }} />
            </Box>
          ))}
        </Box>
      </Box>
    );
  }

  if (data.length === 0) {
    return (
      <Box sx={{ 
        textAlign: 'center', 
        py: 8,
        px: 2 
      }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {emptyMessage}
        </Typography>
      </Box>
    );
  }

  // Mobile view - Card layout
  if (isMobile) {
    return (
      <Box sx={{ p: 2 }}>
        {title && (
          <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
            {title}
          </Typography>
        )}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {data.map((row, index) => (
            <MobileCard
              key={row.id || index}
              onClick={() => onRowClick?.(row)}
              sx={{ 
                cursor: onRowClick ? 'pointer' : 'default',
                '&:hover': onRowClick ? {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                } : {}
              }}
            >
              <CardContent sx={{ p: 2 }}>
                <Grid container spacing={1}>
                  {mobileColumns.map((column) => (
                    <Grid item xs={12} key={column.id}>
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        py: 0.5
                      }}>
                        <Typography 
                          variant="caption" 
                          color="text.secondary"
                          sx={{ fontWeight: 600, textTransform: 'uppercase' }}
                        >
                          {column.label}:
                        </Typography>
                        <Typography variant="body2">
                          {column.render 
                            ? column.render(row[column.id], row)
                            : row[column.id]
                          }
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </MobileCard>
          ))}
        </Box>
      </Box>
    );
  }

  // Desktop view - Table layout
  return (
    <Box sx={{ width: '100%' }}>
      {title && (
        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
          {title}
        </Typography>
      )}
      <Box sx={{ 
        overflowX: 'auto',
        '& .MuiTable-root': {
          minWidth: 600,
        }
      }}>
        <TableContainer component={Paper} elevation={2}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <StyledTableCell key={column.id}>
                    {column.label}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <StyledTableRow
                  key={row.id || index}
                  onClick={() => onRowClick?.(row)}
                  sx={{ 
                    cursor: onRowClick ? 'pointer' : 'default'
                  }}
                >
                  {columns.map((column) => (
                    <StyledTableCell key={column.id}>
                      {column.render 
                        ? column.render(row[column.id], row)
                        : row[column.id]
                      }
                    </StyledTableCell>
                  ))}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default ResponsiveTable;
