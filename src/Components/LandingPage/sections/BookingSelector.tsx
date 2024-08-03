import { Box, Button, Grid, IconButton, TextField, Typography, createTheme, useTheme } from '@mui/material';
import React, { useState } from 'react';
import Date from '../../Date/Date';
import { Add, Remove } from "@mui/icons-material";
import { useNavigate } from 'react-router';
import { Dayjs } from 'dayjs';
import bannar from '../../../assets/banner.png';

interface BookingSelectorProps {
    selectedDateRange: [Dayjs | null, Dayjs | null];
}

export const Theme = createTheme({
    typography: {
        
        h3: {
            fontSize: '2rem',
            fontWeight:'500'

            
        },
        h5:{
            fontWeight:'500'
        },
        body1:{
            fontWeight:'500'
        },
        caption: {
            fontSize:'1rem',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        }
    }
});

export default function BookingSelector({ selectedDateRange }: BookingSelectorProps) {
    const [bookingGuestCount, setBookingGuestCount] = useState(1);
    const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>(selectedDateRange);
    const navigate = useNavigate();
    const theme = useTheme();
    
    const handleIncrease = () => {
        setBookingGuestCount(bookingGuestCount + 1);
    };

    const handleDecrease = () => {
        if (bookingGuestCount > 1) {
            setBookingGuestCount(bookingGuestCount - 1);
        }
    };

    const handleExplore = () => {
        if (dateRange && dateRange[0] && dateRange[1]) {
            const startDate = dateRange[0]?.format('YYYY-MM-DD');
            const endDate = dateRange[1]?.format('YYYY-MM-DD');
            navigate(`/user/available-rooms?startDate=${startDate}&endDate=${endDate}`, {
                state: {
                    ranges: dateRange,
                    count: bookingGuestCount
                }
            });
        } else {
            alert("Please select a valid date range.");
        }
    };

    const handleDateRangeChange = (newDateRange: [Dayjs | null, Dayjs | null]) => {
        setDateRange(newDateRange);
    };

    return (
        <>
            <Grid container  spacing={2} sx={{display:'flex'}}>
                <Grid item sm={12} md={5} lg={5} sx={{ marginTop:'20px',marginLeft:'55px' }} >
                    <Typography sx={{paddingLeft:'60px', paddingBottom:'10px'}} variant="h3" color="darkblue">
                        Forget Busy Work, Start Next Vacation
                    </Typography>
                    <Typography   variant="caption" color="GrayText" sx={{ paddingLeft:'60px',paddingBottom:'10px' }}>
                        We provide what you need to enjoy your holiday with family. Time to make another memorable moments.
                    </Typography>

                    <Typography sx={{paddingLeft:'60px',paddingBottom:'10px'}} variant="h5" color="darkblue">
                        Start Booking
                    </Typography>
                    <Box sx={{paddingLeft:'60px',paddingBottom:'10px'}} >
                        <Typography sx={{paddingBottom:'10px'}} variant="h5" color="Highlight">
                            Pick a Date
                        </Typography>
                        <Date onDateRangeChange={handleDateRangeChange} />
                        <Box sx={{paddingLeft:'7px',paddingTop:'20px'}} >
                            <IconButton     sx={{
                     backgroundColor: theme.palette.primary.main,
                     color:"white",
         fontSize: { xs: "1px", sm: "1px", md: "1px" },
          padding: { xs: "8px 16px", sm: "10px 20px", md: "12px 24px" },
          width: { xs: "15rem", sm: "50px" },
          height: { xs: "40px", sm: "50px" },
          borderRadius: "12px",
          p: "8px",
          mr: { xs: "5px", sm: "10px" },
          ml: "5px",
          "&:hover": {
            backgroundColor: theme.palette.primary.main, 
            color: theme.palette.secondary.contrastText, 
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', 
            transform: 'scale(1.05)', 
        }
        }} aria-label="increase" onClick={handleIncrease}  >
                                <Add />
                            </IconButton>
                            <TextField
                                id="person"
                                label="Capacity"
                                value={`${bookingGuestCount} person`}
                                sx={
                                    {
                                        marginLeft:'6px'
                                    }
                                }
                            />
                            <IconButton   sx={{
                                backgroundColor:theme.palette.error.main,
                                color:'white'
,          fontSize: { xs: "1px", sm: "1px", md: "1px" },
          padding: { xs: "8px 16px", sm: "10px 20px", md: "12px 24px" },
          width: { xs: "15rem", sm: "50px" },
          height: { xs: "40px", sm: "50px" },
          borderRadius: "12px",
          p: "8px",
          mr: { xs: "5px", sm: "10px" },
          ml: "12px",
          "&:hover": {
            backgroundColor: theme.palette.error.main, 
            color: theme.palette.secondary.contrastText, 
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', 
            transform: 'scale(1.05)', 
        },
        }} aria-label="decrease" onClick={handleDecrease}>
                                <Remove />
                            </IconButton>
                        </Box>
                    
                        <Button onClick={handleExplore} variant='contained' sx={{
                            marginTop:"20px",
                            padding:"12px 140px",
                            marginLeft:'12px'
                         
                          
                        }}>
                            Explore
                        </Button>
             
               
                    </Box>
                </Grid>
                <Grid item sx={{margin:{sm:'20px'},marginLeft:{lg:'100px'}}} sm={12} md={5} lg={5} >
                    <img src={bannar} alt="pic" />
                </Grid>
            </Grid>
        </>
    );
}
