import React, { useState } from 'react'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import IconButton from '@mui/material/IconButton'
import { format } from 'date-fns'
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button, Typography } from '@mui/material';
import {  useNavigate, useParams } from "react-router-dom";
import AvilableRooms from '../AvilableRooms/AvilableRooms';

export default function MyDate() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false)
  const [count, setCount] = useState(0)
  const{startDate:initialStartDate,endDate:initialEndDate}=useParams();
  const [dateRange, setDateRange] = useState([{
    startDate:initialStartDate? new Date(initialStartDate):new Date() ,

    endDate: initialEndDate?new Date(initialEndDate):new Date(),//convert into Date Objects: default current Date
    key: 'selection',
  }])
 
  const handleExplor =()=>{
   const startDate=format(dateRange[0]?.startDate,'YYY-MM-dd')
   const endDate=format(dateRange[0]?.endDate,'YYY-MM-dd')
  //  navigate(`/user/room-details/${roomId}?startDate=${startDate}&endDate=${endDate}`, {
  //   state: { DetailsRoom:response.data, count
   
    
  //  },

  // });

  
    navigate(`/user/available-rooms?startDate=${startDate}&endDate=${endDate}`,{state:{ranges:dateRange,count:count}})



    // navigate(`available-rooms/${startDate}/${endDate}`,{state:{ranges:dateRange,count:count}});
  }
  const handleChange = (ranges) => {
    setDateRange([ranges?.selection])
  }
  const handleClick = () => {
    setOpen((prev) => !prev)
  }
  const handleIncrement = () => {
    setCount(count + 1)
  }
  const handleDecrement = () => {
    setCount(count - 1)
  }
  return (
    <>
    
    <Typography
              variant="h6"
              sx={{
                color: "#152C5B",
                fontSize: "16px",
                fontWeight: 400,
                fontFamily: "Poppins",
              }}
            >
              Pick a Date
            </Typography>
      <div style={{ display: 'flex', alignItems: "center", marginTop: 5, position: "relative" }}>
        <IconButton aria-label="" onClick={handleClick}>
          <EventAvailableIcon sx={{ position: "absolute", left: "100%" }} />
        </IconButton>
        <input
          className='pickDateStyle'
          type="text"
          value={`${format(dateRange[0]?.startDate, 'ddMMM')} - ${format(dateRange[0]?.endDate, 'ddMMM')}`}
          sx={{ textAlign: "center" }}



        />
      </div>
      {open && <DateRangePicker
     ranges={dateRange}
        onChange={handleChange}
        minDate={new Date()}
      />
      }
         <Typography
              variant="h6"
              sx={{
                color: "#152C5B",
                fontSize: "16px",
                fontWeight: 400,
                fontFamily: "Poppins",
              }}
            >
             Capacity
            </Typography>
      <div style={{ marginLeft: "15px", marginTop: 5, position: 'relative' }}>
        <div style={{ position: 'absolute',top:"3%" }}>
          <IconButton sx={{ bgcolor: "red", borderRadius: "5px", width: "60px", height: "30px" }} variant="contained" onClick={handleDecrement}>
            <RemoveIcon sx={{ color: "white" }} />
          </IconButton>
        </div>


        <input
          type="text"
          value={`${count} Person`}
          variant="outlined"
          style={{
            borderRadius: "5px", width: "175px", height: "32px", border: "none", backgroundColor: "#f0f0f0", pointerEvents: "none", paddingLeft: "55PX", paddingRight: "55PX", textAlign: "center",
            color: "black"
          }}

        />
        <div style={{ position: 'absolute', left: "41%", top: "3%" }}>

          <IconButton sx={{ bgcolor: "#1ABC9C", borderRadius: "5px", width: "60px", height: "30px" }} variant="contained" onClick={handleIncrement} >
            <AddIcon sx={{ color: "white" }} />
          </IconButton>
        </div>
        <Button
              sx={{
                color: "#FBFCFC",
                bgcolor: "#3252DF",
                fontFamily: "Poppins",
                marginTop:'20px',
                borderRadius: "4px",
                "&:hover": { color: "#FBFCFC", bgcolor: "#3252DF" },
                position:"absolute",
                top:'100%',
                right:"70%",
                width:"30%"
              
              
              }}
              onClick={handleExplor}
            >
              Explore
            </Button>
      </div>
      
    </>
    
  )
}
