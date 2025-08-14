import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Skeleton,
  SxProps,
  Theme,
} from '@mui/material';
import { styled } from '@mui/material/styles';

interface Column {
  id: string;
  label: string;
  align?: 'left' | 'right' | 'center';
  width?: string | number;
  render?: (value: any, row: any) => React.ReactNode;
}

interface EnhancedTableProps {
  columns: Column[];
  data: any[];
  loading?: boolean;
  emptyMessage?: string;
  emptyAction?: React.ReactNode;
  enhancedSx?: SxProps<Theme>;
  hover?: boolean;
  striped?: boolean;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.MuiTableCell-head`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontWeight: 600,
    fontSize: '0.875rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  [`&.MuiTableCell-body`]: {
    fontSize: '0.875rem',
    padding: theme.spacing(2),
  },
}));

const StyledTableRow = styled(TableRow, {
  shouldForwardProp: (prop) => prop !== 'hover' && prop !== 'striped',
})<{ hover?: boolean; striped?: boolean }>(({ theme, hover, striped }) => ({
  transition: 'all 0.2s ease',
  
  ...(hover && {
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      transform: 'scale(1.01)',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
  }),
  
  ...(striped && {
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.action.hover,
    },
  }),
  
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const LoadingRow: React.FC<{ columns: Column[] }> = ({ columns }) => (
  <StyledTableRow>
    {columns.map((column) => (
      <StyledTableCell key={column.id} align={column.align || 'left'}>
        <Skeleton variant="text" width="80%" />
      </StyledTableCell>
    ))}
  </StyledTableRow>
);

const EmptyState: React.FC<{ message: string; action?: React.ReactNode }> = ({ 
  message, 
  action 
}) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      py: 8,
      px: 2,
    }}
  >
    <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
      {message}
    </Typography>
    {action && (
      <Box sx={{ mt: 2 }}>
        {action}
      </Box>
    )}
  </Box>
);

const EnhancedTable: React.FC<EnhancedTableProps> = ({
  columns,
  data,
  loading = false,
  emptyMessage = 'No data available',
  emptyAction,
  enhancedSx,
  hover = true,
  striped = true,
}) => {
  if (loading) {
    return (
      <TableContainer 
        component={Paper} 
        sx={{ 
          borderRadius: 2,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          ...enhancedSx,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell key={column.id} align={column.align || 'left'}>
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {[1, 2, 3].map((index) => (
              <LoadingRow key={index} columns={columns} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  if (data.length === 0) {
    return (
      <TableContainer 
        component={Paper} 
        sx={{ 
          borderRadius: 2,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          ...enhancedSx,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell key={column.id} align={column.align || 'left'}>
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell colSpan={columns.length}>
                <EmptyState message={emptyMessage} action={emptyAction} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <TableContainer 
      component={Paper} 
      sx={{ 
        borderRadius: 2,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        ...enhancedSx,
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <StyledTableCell 
                key={column.id} 
                align={column.align || 'left'}
                style={{ width: column.width }}
              >
                {column.label}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <StyledTableRow 
              key={row.id || index} 
              hover={hover}
              striped={striped}
            >
              {columns.map((column) => (
                <StyledTableCell key={column.id} align={column.align || 'left'}>
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
  );
};

export default EnhancedTable;
