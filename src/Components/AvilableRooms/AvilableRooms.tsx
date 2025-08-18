import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  TablePagination,
  IconButton,
  Grid,
  Card,
  CardMedia,
  Typography,
  CardActionArea,
  Box,
  Skeleton,
  Chip,
  CardContent,
  Stack,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Container } from "@mui/system";
import FavoriteIcon from '@mui/icons-material/Favorite';
import InfoIcon from '@mui/icons-material/Info';
import { AuthContext } from "../../Context/AuthContext";
import { format } from "date-fns";
import { toast } from "react-toastify";
import ReviewsSummary from "../Reviews/ReviewsSummary";

function AvailableRooms() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [roomsList, setRoomsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesArray, setPagesArray] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate()
  const location = useLocation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [favoriteRooms, setFavoriteRooms] = useState<any[]>([]);
  const { baseUrl, reqHeaders, role } = useContext(AuthContext) as any
  const count = location?.state?.count
  const dateRange = location?.state?.ranges
  const startDate = dateRange && dateRange[0] ? format(new Date(dateRange[0]), 'dd MMM') : null;
  const endDate = dateRange && dateRange[1] ? format(new Date(dateRange[1]), 'dd MMM') : null;

  const fetchAvailableRooms = (page: number) => {
    const params: any = {
      page,
      size: rowsPerPage,
    };
    
    // Only add date parameters if they exist
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    
    axios
      .get(`${baseUrl}/portal/rooms/available`, {
        params,
      })
      .then((response) => {


        setPagesArray(response?.data?.data?.totalCount || 0);
        setRoomsList(response.data.data.rooms);
      })
      .catch((error) => {

        toast.error(error?.response?.data?.message)
      });
  };

  const addToFavorites = (roomId: string) => {

    axios
      .post(`${baseUrl}/portal/favorite-rooms`, {
        roomId,

      }, { headers: { Authorization: `${localStorage.getItem("userToken")}` } })
      .then((response) => {
        if (role === 'user') {
        setFavoriteRooms((prevFavorites) => [...prevFavorites, roomId]);

        toast.success(response?.data?.message)} 
        else{

          toast.error("You have to sign In  !")
          navigate('/signin');
        }
      })
   
      .catch((error) => {

        toast.error(error?.response?.data?.message)

      });
  };
  const handleChangePage = (event: any, newPage: number) => {
    setCurrentPage(newPage + 1);
    fetchAvailableRooms(newPage + 1);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setCurrentPage(1);
    fetchAvailableRooms(1);
  };
  const handleDetails = (roomId: string) => {
    // Check if dates are selected
    if (!startDate || !endDate) {
      toast.error("Please select check-in and check-out dates first!");
      return;
    }

    const params: any = {};
    
    // Only add date parameters if they exist
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;

    axios
      .get(`${baseUrl}/portal/rooms/${roomId}`, {
        params,
      })
      .then((response) => {
        if (role === 'user') {
          navigate(`/user/room-details/${roomId}?startDate=${startDate}&endDate=${endDate}`, {
            state: {
              DetailsRoom: response.data,
              count,
              ranges: dateRange
            }
          });
        } else {
          // For non-authenticated users, redirect to sign in with return URL
          navigate('/auth/signin', {
            state: {
              returnUrl: `/user/room-details/${roomId}?startDate=${startDate}&endDate=${endDate}`,
              returnState: {
                DetailsRoom: response.data,
                count,
                ranges: dateRange
              }
            }
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching room details:", error);
        toast.error("Failed to load room details. Please try again.");
      });
  };

  useEffect(() => {

    fetchAvailableRooms(1);

  }, [startDate, endDate]);

  return (
    <Box sx={{ py: 4, minHeight: '100vh' }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        {/* Header Section */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              mb: 2,
              fontWeight: 600,
              color: 'text.primary'
            }}
          >
            Available Rooms
          </Typography>
          {dateRange && (
            <Chip 
              label={`${startDate} - ${endDate}`}
              color="primary"
              variant="outlined"
              sx={{ fontSize: '1rem', py: 1 }}
            />
          )}
          {!dateRange && (
            <Box sx={{ mt: 2 }}>
              <Typography 
                variant="body1" 
                color="text.secondary" 
                sx={{ mb: 2 }}
              >
                Please select dates to view available rooms
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/')}
                sx={{
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  textTransform: 'none',
                  fontSize: '1rem',
                }}
              >
                Select Dates
              </Button>
            </Box>
          )}
        </Box>

        {/* Rooms Grid */}
        <Grid 
          container 
          spacing={{ xs: 2, sm: 3, md: 4 }} 
          sx={{ mb: 4 }}
        >
          {(roomsList.length === 0 ? Array.from({ length: 10 }) : roomsList).map((room, index) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={4} 
              lg={3} 
              key={index}
              sx={{ display: 'flex' }}
            >
              {room ? (
                <Card
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.shadows[8],
                    },
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <CardActionArea sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ position: 'relative' }}>
                      <CardMedia
                        component="img"
                                                 alt={(room as any)?.roomNumber ? `Room ${(room as any).roomNumber}` : `Room ${index + 1}`}
                        height={isMobile ? "200" : "240"}
                                                 image={(room as any)?.images[0]}
                        sx={{
                          objectFit: 'cover',
                          width: '100%',
                        }}
                      />
                      
                      {/* Price Badge */}
                      <Chip
                                                 label={`$${(room as any)?.price} / night`}
                        color="primary"
                        sx={{
                          position: 'absolute',
                          top: 16,
                          right: 16,
                          fontWeight: 600,
                          fontSize: '0.875rem',
                          backgroundColor: 'rgba(25, 118, 210, 0.9)',
                          color: 'white',
                          '& .MuiChip-label': {
                            px: 2,
                          }
                        }}
                      />

                      {/* Hover Overlay */}
                      {hoveredIndex === index && (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.4)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 2,
                            transition: 'all 0.3s ease-in-out',
                          }}
                        >
                          <IconButton 
                            sx={{ 
                              color: "white",
                              backgroundColor: 'rgba(255, 255, 255, 0.2)',
                              '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                              }
                            }} 
                                                         onClick={(e) => {
                               e.stopPropagation();
                               addToFavorites((room as any)?._id);
                             }}
                            aria-label="Add to favorites"
                          >
                                                         {favoriteRooms.includes((room as any)?._id) ? (
                              <FavoriteIcon color="error" />
                            ) : (
                              <FavoriteIcon />
                            )}
                          </IconButton>
                          <IconButton 
                            sx={{ 
                              color: "white",
                              backgroundColor: 'rgba(255, 255, 255, 0.2)',
                              '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                              }
                            }} 
                                                         onClick={(e) => {
                               e.stopPropagation();
                               handleDetails((room as any)?._id);
                             }}
                            aria-label="View details"
                          >
                            <InfoIcon />
                          </IconButton>
                        </Box>
                      )}
                    </Box>

                    {/* Room Info */}
                    <CardContent sx={{ flex: 1, p: 2 }}>
                      <Stack spacing={1}>
                        <Typography
                          variant="h6"
                          component="h3"
                          sx={{
                            fontWeight: 600,
                            fontSize: '1.1rem',
                            color: 'text.primary',
                          }}
                        >
                                                     {(room as any)?.roomNumber ? `Room ${(room as any).roomNumber}` : `Room ${index + 1}`}
                        </Typography>
                        
                        {/* Reviews Summary */}
                        <ReviewsSummary roomId={(room as any)?._id || ''} compact={true} />
                        
                                                 {(room as any)?.capacity && (
                           <Typography
                             variant="body2"
                             color="text.secondary"
                             sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                           >
                             <span>👥</span> Up to {(room as any).capacity} guests
                           </Typography>
                         )}

                                                 {(room as any)?.facilities && (room as any).facilities.length > 0 && (
                           <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                             {(room as any).facilities.slice(0, 3).map((facility: any, idx: number) => (
                              <Chip
                                key={facility._id || idx}
                                label={facility.name || String(facility)}
                                size="small"
                                variant="outlined"
                                sx={{ fontSize: '0.75rem' }}
                              />
                            ))}
                                                         {(room as any).facilities.length > 3 && (
                               <Chip
                                 label={`+${(room as any).facilities.length - 3} more`}
                                size="small"
                                variant="outlined"
                                sx={{ fontSize: '0.75rem' }}
                              />
                            )}
                          </Box>
                        )}
                      </Stack>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ) : (
                <Skeleton 
                  variant="rounded" 
                  height={isMobile ? 300 : 360} 
                  animation="wave"
                  sx={{ width: '100%' }}
                />
              )}
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center',
          mt: 4,
          mb: 2
        }}>
          <TablePagination
            rowsPerPageOptions={[6, 12, 24]}
            colSpan={3}
            count={pagesArray}
            rowsPerPage={rowsPerPage}
            page={currentPage - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                fontSize: { xs: '0.875rem', sm: '1rem' },
              },
              '& .MuiTablePagination-select': {
                fontSize: { xs: '0.875rem', sm: '1rem' },
              }
            }}
          />
        </Box>
      </Container>
    </Box>
  );
}

export default AvailableRooms;
