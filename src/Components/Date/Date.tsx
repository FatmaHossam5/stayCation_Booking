import { Box, Button, Popover, TextField } from '@mui/material';
import { DateRangeCalendar } from "@mui/x-date-pickers-pro/DateRangeCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react';
import CalendarMonth from '@mui/icons-material/CalendarMonth';

interface DateProps {
    onDateRangeChange: (dateRange: [Dayjs | null, Dayjs | null]) => void;
}

export default function Date({ onDateRangeChange }: DateProps) {
  const [selectedDateRange, setSelectedDateRange] = useState<[Dayjs | null, Dayjs | null]>([null, null]);
  const [anchorEL, setAnchorEL] = useState<HTMLElement | null>(null);
  const today = dayjs().startOf('day');
  const formatDate = (date: Dayjs | null) => date ? date.format("YYYY-MM-DD") : '';
  const displayStartDate = selectedDateRange[0] ? formatDate(selectedDateRange[0]) : formatDate(today);
  const displayEndDate = selectedDateRange[1] ? formatDate(selectedDateRange[1]) : formatDate(today);

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
    <Box className="calendarContainer">
      <Button
        sx={{
          fontSize: { xs: "1px", sm: "1px", md: "1px" },
          padding: { xs: "8px 16px", sm: "10px 20px", md: "12px 24px" },
          width: { xs: "15rem", sm: "50px" },
          height: { xs: "40px", sm: "50px" },
          borderRadius: "12px",
          p: "8px",
          mr: { xs: "5px", sm: "10px" },
          ml: "5px",
        }}
        onClick={handleButtonClick}
        variant="contained"
        color="primary"
      >
        <CalendarMonth />
      </Button>

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
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateRangeCalendar"]}>
            <DateRangeCalendar
              value={selectedDateRange}
              onChange={handleCalenderChange}
            />
          </DemoContainer>
        </LocalizationProvider>
      </Popover>

      <TextField
        className="calendarField"
        label="Selected Date Range"
        value={`${displayStartDate} - ${displayEndDate}`}
      />
    </Box>
  );
}
