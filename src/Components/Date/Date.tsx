import React, { useRef, useState } from 'react'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import IconButton from '@mui/material/IconButton'
import { format } from 'date-fns'
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, Button, Card, Grid, Typography } from '@mui/material';
import {  useNavigate, useParams } from "react-router-dom";
import AvilableRooms from '../AvilableRooms/AvilableRooms';
import banner from "../../assets/banner.png";
export default function MyDate() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false)
  const [count, setCount] = useState(1)
  const{startDate:initialStartDate,endDate:initialEndDate}=useParams();
  const [dateRange, setDateRange] = useState([{
    startDate:initialStartDate? new Date(initialStartDate):new Date() ,

    endDate: initialEndDate?new Date(initialEndDate):new Date(),//convert into Date Objects: default current Date
    key: 'selection',
  }])
  const [showCapacity, setShowCapacity] = useState(true)

  const handleExplor =()=>{
   const startDate=format(dateRange[0]?.startDate,'YYY-MM-dd')
   const endDate=format(dateRange[0]?.endDate,'YYY-MM-dd')
    navigate(`/user/available-rooms?startDate=${startDate}&endDate=${endDate}`,{state:{ranges:dateRange,count:count}})
  }
  const handleChange = (ranges) => {
    setDateRange([ranges?.selection])
  }
  const handleClick = () => {
    setShowCapacity((prevShowCapacity) => !prevShowCapacity);
    setOpen((prev) => !prev)

  }
  const handleIncrement = () => {
    setCount(count + 1)
  }
  const handleDecrement = () => {
    setCount((prevCount) => Math.max(prevCount - 1, 1))// to keep the count at 1 when attempting to decrement below it
  }
  return (
    <>
    <Box sx={{display:"flex",justifyContent:"space-around"}}>
    <Box>
      {/* Title and Description */}
    <Grid item xs={12} sx={{marginTop:3}} >
            <Typography
              sx={{
                color: "#152C5B",
                fontSize: "40px",
                fontWeight: 400,
                fontFamily: "Poppins",
                maxWidth:"400px"
              }}
              variant="h1"
            >
              Forget Busy Work,Start Next Vacation
            </Typography>
            <Typography
              sx={{
                color: "#B0B0B0",
                fontSize: "16px",
                fontWeight: 300,
                fontFamily: "Poppins",
                maxWidth:'400px',
                overflow:'hidden'
              }}
              variant="body1"
            >
              We provide what you need to enjoy your holiday with family. Time
              to make another memorable moments.
            </Typography>
          </Grid>
          {/* Start Booking */}
          <Grid item xs={6}>
            <Typography
              variant="h6"
              sx={{
                color: "#152C5B",
                fontSize: "20px",
                fontWeight: 500,
                fontFamily: "Poppins",
              }}
            >
              Start Booking
            </Typography>


        
          
          </Grid>
          {/* Pick a Date */}
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
         
      <Box  style={{ display: 'flex', alignItems: "center", marginTop: 5, position: "relative" }}>
        <IconButton aria-label="" onClick={handleClick}>
          <EventAvailableIcon sx={{ position: "absolute", left: "100%" }} />
        </IconButton>
        <input
          className='pickDateStyle'
          type="text"
          value={`${format(dateRange[0]?.startDate, 'ddMMM')} - ${format(dateRange[0]?.endDate, 'ddMMM')}`}
        />
      </Box>
  
      {open && <DateRangePicker
     ranges={dateRange}
        onChange={handleChange}
        minDate={new Date()}
        className="custom-date-range-picker"
      />
      }
     
         {/* Capacity */}
         {showCapacity&&(<>
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
      <div style={{ marginLeft: "15px", marginTop: 3, position: 'relative' }}>
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
            borderRadius: "5px", width: "275px", height: "32px", border: "none", backgroundColor: "#f0f0f0", pointerEvents: "none", paddingLeft: "55PX", paddingRight: "55PX", textAlign: "center",
            color: "black"
          }}

        />
        <div style={{ position: 'absolute',left:'60%', top: "3%" }}>

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
                right:"30%",
                width:"65%"
              
              
              }}
              onClick={handleExplor}
            >
              Explore
            </Button>
      </div>
         </>)}
      
        
    </Box>
    
      <Box>
        
        <Grid container spacing={2} sx={{ boxShadow: "none",marginTop:2,marginRight:5}}>
        
          <Grid item xs={12}>
            <Card sx={{ boxShadow: "none"}}>
              <img src={banner} alt="banner" />
            </Card>
          </Grid>
        </Grid>
    
      </Box>
      </Box>
    </>
    
  )
}

<Grid item xs={12}>
  <Typography variant="h1" sx={{ color: '#152C5B', fontSize: '40px', fontWeight: 400, fontFamily: 'Poppins', maxWidth: '400px' }}>
    Forget Busy Work, Start Next Vacation
  </Typography>
  <Typography variant="body1" sx={{ color: '#B0B0B0', fontSize: '16px', fontWeight: 300, fontFamily: 'Poppins', maxWidth: '400px', overflow: 'hidden' }}>
    We provide what you need to enjoy your holiday with family. Time to make another memorable moment.
  </Typography>
</Grid>


