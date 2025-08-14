import { Add, Remove, Search, Star } from "@mui/icons-material";
import { Box, Button, Chip, Grid, IconButton, Typography, useTheme } from '@mui/material';
import { Dayjs } from 'dayjs';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import bannar from '../../../assets/banner.png';
import Date from '../../Date/Date';

interface BookingSelectorProps {
    selectedDateRange?: [Dayjs | null, Dayjs | null];
}

export default function BookingSelector({ selectedDateRange = [null, null] }: BookingSelectorProps) {
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
        <Box sx={{ py: { xs: 4, md: 8 } }}>
            <Grid container spacing={{ xs: 3, md: 6 }} alignItems="flex-start">
                {/* Content Column */}
                <Grid item xs={12} md={6} lg={5}>
                    <Box sx={{ 
                        maxWidth: { md: '500px' },
                        mx: 'auto',
                        textAlign: { xs: 'center', md: 'left' }
                    }}>
                        <Typography 
                            variant="h2" 
                            color="primary"
                            sx={{ 
                                mb: 2,
                                fontWeight: 'bold',
                                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                                lineHeight: 1.2
                            }}
                        >
                            Forget Busy Work, Start Next Vacation
                        </Typography>
                        
                        <Typography 
                            variant="h6" 
                            sx={{ 
                                mb: 4,
                                color: 'text.secondary',
                                lineHeight: 1.5,
                                fontSize: { xs: '1rem', md: '1.1rem' }
                            }}
                        >
                            We provide what you need to enjoy your holiday with family. Time to make another memorable moments.
                        </Typography>

                        {/* Compact Stats Section */}
                        <Box sx={{ 
                            display: 'flex', 
                            gap: { xs: 2, md: 3 }, 
                            mb: 4,
                            justifyContent: { xs: 'center', md: 'flex-start' },
                            flexWrap: 'wrap'
                        }}>
                            <Chip 
                                icon={<Star sx={{ color: '#FFD700' }} />}
                                label="4.8★ Rating"
                                variant="filled"
                                sx={{ 
                                    fontSize: { xs: '0.9rem', md: '1rem' },
                                    fontWeight: '600',
                                    backgroundColor: '#FFF3E0',
                                    color: '#E65100',
                                    border: '1px solid #FFB74D',
                                    '&:hover': {
                                        backgroundColor: '#FFE0B2'
                                    }
                                }}
                            />
                            <Chip 
                                label="1000+ Happy Guests"
                                variant="filled"
                                sx={{ 
                                    fontSize: { xs: '0.9rem', md: '1rem' },
                                    fontWeight: '600',
                                    backgroundColor: '#E8F5E8',
                                    color: '#2E7D32',
                                    border: '1px solid #81C784',
                                    '&:hover': {
                                        backgroundColor: '#C8E6C9'
                                    }
                                }}
                            />
                            <Chip 
                                label="50+ Luxury Rooms"
                                variant="filled"
                                sx={{ 
                                    fontSize: { xs: '0.9rem', md: '1rem' },
                                    fontWeight: '600',
                                    backgroundColor: '#F3E5F5',
                                    color: '#7B1FA2',
                                    border: '1px solid #BA68C8',
                                    '&:hover': {
                                        backgroundColor: '#E1BEE7'
                                    }
                                }}
                            />
                        </Box>

                        {/* Booking Form */}
                        <Box sx={{ 
                            p: { xs: 3, md: 4 },
                            border: '1px solid',
                            borderColor: 'grey.200',
                            borderRadius: 2,
                            backgroundColor: 'background.paper',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                        }}>
                            <Typography 
                                variant="h5" 
                                sx={{ 
                                    mb: 3,
                                    textAlign: 'center',
                                    fontSize: { xs: '1.2rem', md: '1.4rem' },
                                    fontWeight: '600'
                                }}
                            >
                                Find Your Perfect Stay
                            </Typography>
                            
                            <Date onDateRangeChange={handleDateRangeChange} />
                            
                            {/* Guest Counter */}
                            <Box sx={{ 
                                mt: 3,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                justifyContent: 'space-between'
                            }}>
                                <Typography variant="body1" sx={{ fontWeight: '500' }}>
                                    Number of Guests
                                </Typography>
                                
                                <Box sx={{ 
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    border: '1px solid',
                                    borderColor: 'grey.300',
                                    borderRadius: 1,
                                    p: 1
                                }}>
                                    <IconButton
                                        onClick={handleDecrease}
                                        disabled={bookingGuestCount <= 1}
                                        size="small"
                                        sx={{ width: 32, height: 32 }}
                                    >
                                        <Remove fontSize="small" />
                                    </IconButton>
                                    
                                    <Typography sx={{ 
                                        minWidth: '60px',
                                        textAlign: 'center',
                                        fontSize: '0.9rem',
                                        fontWeight: '500'
                                    }}>
                                        {bookingGuestCount}
                                    </Typography>
                                    
                                    <IconButton
                                        onClick={handleIncrease}
                                        size="small"
                                        sx={{ width: 32, height: 32 }}
                                    >
                                        <Add fontSize="small" />
                                    </IconButton>
                                </Box>
                            </Box>

                            {/* Search Button */}
                            <Button 
                                onClick={handleExplore} 
                                variant="contained" 
                                size="large"
                                fullWidth
                                startIcon={<Search />}
                                sx={{
                                    mt: 3,
                                    py: 1.5,
                                    fontSize: { xs: '1rem', md: '1.1rem' },
                                    fontWeight: '600',
                                    borderRadius: 2
                                }}
                                disabled={!dateRange[0] || !dateRange[1]}
                            >
                                Search Available Rooms
                            </Button>
                        </Box>
                    </Box>
                </Grid>

                {/* Image Column */}
                <Grid item xs={12} md={6} lg={7}>
                    <Box sx={{ 
                        display: 'flex',
                        justifyContent: { xs: 'center', md: 'flex-end' },
                        alignItems: 'flex-start',
                        pt: { xs: 2, md: 0 }
                    }}>
                        <Box
                            component="img"
                            src={bannar}
                            alt="Vacation destination"
                            sx={{
                                width: { xs: '100%', md: '90%', lg: '85%' },
                                height: 'auto',
                                transition: 'all 0.3s ease-in-out',
                                '&:hover': {
                                    transform: 'scale(1.02)'
                                }
                            }}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
