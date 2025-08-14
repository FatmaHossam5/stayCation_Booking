import { Box, Button, Popover, TextField, Typography, useTheme, useMediaQuery } from '@mui/material';
import { DateRangeCalendar } from "@mui/x-date-pickers-pro/DateRangeCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react';
import CalendarMonth from '@mui/icons-material/CalendarMonth';
import { format } from 'date-fns';

interface DateProps {
    onDateRangeChange: (dateRange: [Dayjs | null, Dayjs | null]) => void;
}

export default function Date({ onDateRangeChange }: DateProps) {
  const [selectedDateRange, setSelectedDateRange] = useState<[Dayjs | null, Dayjs | null]>([null, null]);
  const [anchorEL, setAnchorEL] = useState<HTMLElement | null>(null);
  const today = dayjs().startOf('day');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const formatDate = (date: Dayjs | null) => date ? date.format("MMM DD, YYYY") : '';
  const displayStartDate = selectedDateRange[0] ? formatDate(selectedDateRange[0]) : 'Check-in';
  const displayEndDate = selectedDateRange[1] ? formatDate(selectedDateRange[1]) : 'Check-out';

  const handleCalenderChange = (newDateRange: [Dayjs | null, Dayjs | null]) => {
    setSelectedDateRange(newDateRange);
    onDateRangeChange(newDateRange);
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEL(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEL(null);
  };

  const open = Boolean(anchorEL);
  
  return (
    <Box sx={{ width: '100%' }}>
      {/* Date Range Display */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 1, sm: 2 },
        mb: 2
      }}>
        <TextField
          label="Check-in Date"
          value={displayStartDate}
          variant="outlined"
          fullWidth
          InputProps={{
            readOnly: true,
            endAdornment: (
              <Button
                onClick={handleButtonClick}
                variant="text"
                size="small"
                sx={{
                  minWidth: 'auto',
                  p: 1,
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'primary.light',
                    color: 'primary.contrastText',
                  }
                }}
              >
                <CalendarMonth />
              </Button>
            )
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'background.paper',
              '&:hover': {
                backgroundColor: 'grey.50',
              },
              '&.Mui-focused': {
                backgroundColor: 'background.paper',
              }
            }
          }}
        />
        
        <TextField
          label="Check-out Date"
          value={displayEndDate}
          variant="outlined"
          fullWidth
          InputProps={{
            readOnly: true,
            endAdornment: (
              <Button
                onClick={handleButtonClick}
                variant="text"
                size="small"
                sx={{
                  minWidth: 'auto',
                  p: 1,
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'primary.light',
                    color: 'primary.contrastText',
                  }
                }}
              >
                <CalendarMonth />
              </Button>
            )
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'background.paper',
              '&:hover': {
                backgroundColor: 'grey.50',
              },
              '&.Mui-focused': {
                backgroundColor: 'background.paper',
              }
            }
          }}
        />
      </Box>

      {/* Calendar Popover */}
      <Popover
        open={open}
        anchorEl={anchorEL}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            overflow: 'hidden'
          }
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateRangeCalendar"]}>
            <DateRangeCalendar
              value={selectedDateRange}
              onChange={handleCalenderChange}
              sx={{
                '& .MuiDateRangeCalendar-root': {
                  backgroundColor: 'background.paper',
                },
                '& .MuiPickersDay-root': {
                  borderRadius: 2,
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    }
                  }
                }
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
      </Popover>

      {/* Selected Range Summary */}
      {selectedDateRange[0] && selectedDateRange[1] && (
        <Box sx={{ 
          mt: 2, 
          p: 2, 
          backgroundColor: 'primary.light', 
          borderRadius: 2,
          textAlign: 'center'
        }}>
          <Typography variant="body2" color="primary.contrastText" fontWeight="500">
            {selectedDateRange[1].diff(selectedDateRange[0], 'day')} night stay
          </Typography>
        </Box>
      )}
    </Box>
  );
}
