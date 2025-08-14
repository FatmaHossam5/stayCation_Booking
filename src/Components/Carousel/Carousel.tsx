import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Box, IconButton, Typography, useTheme, useMediaQuery, Chip, Rating } from '@mui/material';
import { ChevronLeft, ChevronRight, KeyboardArrowLeft, KeyboardArrowRight, People, Hotel } from '@mui/icons-material';
import rooms, { Room } from './images';
import './Carousel.css';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === rooms.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? rooms.length - 1 : prevIndex - 1
    );
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      handlePrev();
    } else if (event.key === 'ArrowRight') {
      handleNext();
    }
  };

  // Calculate the maximum scroll position to prevent empty space
  const cardWidth = 320; // Card width
  const gap = 24; // Gap between cards
  const totalCardWidth = cardWidth + gap;
  const maxScrollPosition = (rooms.length - 1) * totalCardWidth;

  return (
    <Box 
      sx={{ 
        py: { xs: 4, md: 6 },
        px: { xs: 1, md: 2 }
      }}
    >
      {/* Section Header */}
      <Box sx={{ 
        textAlign: 'center', 
        mb: { xs: 3, md: 4 },
        maxWidth: '1000px',
        mx: 'auto'
      }}>
        <Typography 
          variant="h3" 
          component="h2"
          sx={{ 
            mb: 2,
            fontWeight: 'bold',
            fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' },
            color: 'primary.main',
            lineHeight: 1.2
          }}
        >
          Featured Accommodations
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            color: 'text.secondary',
            lineHeight: 1.6,
            fontSize: { xs: '1rem', md: '1.1rem' }
          }}
        >
          Discover our handpicked selection of premium rooms and suites
        </Typography>
      </Box>

      {/* Carousel Container */}
      <Box 
        sx={{ 
          position: 'relative',
          maxWidth: '1400px',
          mx: 'auto'
        }}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-label="Room carousel"
      >
        {/* Navigation Buttons */}
        <IconButton
          onClick={handlePrev}
          sx={{
            position: 'absolute',
            left: { xs: 4, md: -24 },
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            backgroundColor: 'background.paper',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            width: { xs: 44, md: 56 },
            height: { xs: 44, md: 56 },
            '&:hover': {
              backgroundColor: 'background.paper',
              boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
              transform: 'translateY(-50%) scale(1.05)'
            },
            '&:focus-visible': {
              outline: `2px solid ${theme.palette.primary.main}`,
              outlineOffset: 2
            }
          }}
          aria-label="Previous room"
        >
          {isMobile ? <KeyboardArrowLeft /> : <ChevronLeft />}
        </IconButton>

        <IconButton
          onClick={handleNext}
          sx={{
            position: 'absolute',
            right: { xs: 4, md: -24 },
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            backgroundColor: 'background.paper',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            width: { xs: 44, md: 56 },
            height: { xs: 44, md: 56 },
            '&:hover': {
              backgroundColor: 'background.paper',
              boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
              transform: 'translateY(-50%) scale(1.05)'
            },
            '&:focus-visible': {
              outline: `2px solid ${theme.palette.primary.main}`,
              outlineOffset: 2
            }
          }}
          aria-label="Next room"
        >
          {isMobile ? <KeyboardArrowRight /> : <ChevronRight />}
        </IconButton>

        {/* Carousel Content */}
        <Box 
          className='carousel' 
          ref={carouselRef}
          sx={{
            overflow: 'hidden',
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
          }}
        >
          <motion.div 
            className='inner-carousel'
            drag='x' 
            dragConstraints={{ right: 0, left: -maxScrollPosition }}
            animate={{ x: -currentIndex * totalCardWidth }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 25,
              mass: 0.8
            }}
            style={{ display: 'flex', gap: '24px', padding: '24px' }}
          >
            {rooms.map((room: Room, index: number) => (
              <motion.div 
                key={room.id}
                className='item'
                whileHover={{ 
                  scale: 1.03,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                onClick={() => setCurrentIndex(index)}
                role="button"
                tabIndex={0}
                aria-label={`${room.name} - ${room.type}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setCurrentIndex(index);
                  }
                }}
              >
                <img 
                  src={room.image} 
                  alt={room.name}
                  style={{
                    width: '100%',
                    height: '220px',
                    borderRadius: '12px',
                    objectFit: 'cover',
                    marginBottom: '16px'
                  }}
                />
                
                {/* Room Info */}
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: '600',
                      color: 'primary.main',
                      mb: 1,
                      fontSize: { xs: '1rem', md: '1.1rem' }
                    }}
                  >
                    {room.name}
                  </Typography>
                  
                  <Chip 
                    label={room.type}
                    size="small"
                    sx={{ 
                      alignSelf: 'flex-start',
                      mb: 2,
                      backgroundColor: 'grey.100',
                      color: 'text.secondary',
                      fontWeight: '500'
                    }}
                  />
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Rating 
                      value={room.rating} 
                      precision={0.1} 
                      size="small" 
                      readOnly
                      sx={{ mr: 1 }}
                    />
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'text.secondary',
                        fontSize: '0.875rem'
                      }}
                    >
                      {room.rating}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <People sx={{ fontSize: '1rem', color: 'text.secondary' }} />
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'text.secondary',
                          fontSize: '0.875rem'
                        }}
                      >
                        {room.guests}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Hotel sx={{ fontSize: '1rem', color: 'text.secondary' }} />
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'text.secondary',
                          fontSize: '0.875rem'
                        }}
                      >
                        {room.beds}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Chip 
                    label={room.price}
                    size="small"
                    sx={{ 
                      alignSelf: 'flex-start',
                      backgroundColor: 'primary.main',
                      color: 'white',
                      fontWeight: '600',
                      fontSize: '0.875rem'
                    }}
                  />
                </Box>
              </motion.div>
            ))}
          </motion.div>
        </Box>

        {/* Room Counter */}
        <Box sx={{ 
          textAlign: 'center', 
          mt: 2,
          color: 'text.secondary',
          fontWeight: '500'
        }}>
          {currentIndex + 1} of {rooms.length} • {rooms[currentIndex].name}
        </Box>
      </Box>
    </Box>
  );
};

export default Carousel;
