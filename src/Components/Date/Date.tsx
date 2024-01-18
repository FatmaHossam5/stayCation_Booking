import React, { useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";
import format from "date-fns/format";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Box, Button, Fade, TextField } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export default function DateComponent() {
  const today = new Date();
  const endDate = addDays(today, 7);

  const [open, setOpen] = useState(true);

  const [dateRange, setDateRange] = useState([
    {
      startDate: today,
      endDate: endDate,
      key: "selection",
    },
  ]);

  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box>
        {open && (
          <DateRange
            onChange={(item) => setDateRange([item.selection])}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
            months={1}
            direction="horizontal"
          />
        )}
  
          <AccessTimeIcon onClick={handleClose} />
      
      </Box>
    </>
  );
}
