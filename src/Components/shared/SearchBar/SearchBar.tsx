import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Fade,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  Hotel as HotelIcon,
  LocationOn as LocationIcon,
  Star as StarIcon
} from '@mui/icons-material';

interface SearchResult {
  id: string;
  type: 'room' | 'location' | 'amenity';
  title: string;
  description: string;
  rating?: number;
}

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  fullWidth?: boolean;
  variant?: 'outlined' | 'filled' | 'standard';
}

const mockSearchResults: SearchResult[] = [
  {
    id: '1',
    type: 'room',
    title: 'Deluxe Suite',
    description: 'Luxury suite with ocean view',
    rating: 4.8
  },
  {
    id: '2',
    type: 'room',
    title: 'Family Room',
    description: 'Spacious room for families',
    rating: 4.6
  },
  {
    id: '3',
    type: 'location',
    title: 'Beachfront Location',
    description: 'Rooms with direct beach access'
  },
  {
    id: '4',
    type: 'amenity',
    title: 'Swimming Pool',
    description: 'Outdoor pool with lounge area'
  },
  {
    id: '5',
    type: 'amenity',
    title: 'Free WiFi',
    description: 'High-speed internet access'
  }
];

export default function SearchBar({ 
  onSearch, 
  placeholder = "Search rooms, locations, or amenities...",
  fullWidth = true,
  variant = "outlined"
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (query.trim()) {
      const filtered = mockSearchResults.filter(result =>
        result.title.toLowerCase().includes(query.toLowerCase()) ||
        result.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredResults(filtered);
      setShowResults(true);
    } else {
      setFilteredResults([]);
      setShowResults(false);
    }
  }, [query]);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleClear = () => {
    setQuery('');
    setShowResults(false);
    if (onSearch) {
      onSearch('');
    }
  };

  const handleResultClick = (result: SearchResult) => {
    setQuery(result.title);
    setShowResults(false);
    if (onSearch) {
      onSearch(result.title);
    }
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'room':
        return <HotelIcon color="primary" />;
      case 'location':
        return <LocationIcon color="secondary" />;
      case 'amenity':
        return <StarIcon color="action" />;
      default:
        return <SearchIcon color="action" />;
    }
  };

  return (
    <Box sx={{ position: 'relative', width: fullWidth ? '100%' : 'auto' }}>
      <TextField
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={placeholder}
        variant={variant}
        fullWidth={fullWidth}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
          endAdornment: query && (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={handleClear}
                sx={{ color: 'text.secondary' }}
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 3,
            backgroundColor: 'background.paper',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              backgroundColor: 'grey.50',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            },
            '&.Mui-focused': {
              backgroundColor: 'background.paper',
              boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)',
            },
          },
          '& .MuiFilledInput-root': {
            borderRadius: 3,
            backgroundColor: 'rgba(255,255,255,0.9)',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,1)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            },
            '&.Mui-focused': {
              backgroundColor: 'rgba(255,255,255,1)',
              boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)',
            },
          },
          '& .MuiInputBase-input': {
            fontSize: '0.95rem',
            '&::placeholder': {
              color: 'rgba(0,0,0,0.6)',
              opacity: 1,
            },
          },
        }}
      />

      {/* Search Results Dropdown */}
      <Fade in={showResults && filteredResults.length > 0}>
        <Paper
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 1000,
            mt: 1,
            maxHeight: 300,
            overflow: 'auto',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <List sx={{ py: 0 }}>
            {filteredResults.map((result) => (
              <ListItem
                key={result.id}
                button
                onClick={() => handleResultClick(result)}
                sx={{
                  '&:hover': {
                    backgroundColor: 'primary.light',
                    '& .MuiListItemText-primary': {
                      color: 'primary.main',
                    },
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {getResultIcon(result.type)}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" fontWeight="500">
                        {result.title}
                      </Typography>
                      {result.rating && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <StarIcon sx={{ fontSize: 16, color: 'warning.main' }} />
                          <Typography variant="caption" color="text.secondary">
                            {result.rating}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  }
                  secondary={
                    <Typography variant="caption" color="text.secondary">
                      {result.description}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Fade>

      {/* No Results Message */}
      <Fade in={showResults && query.trim() && filteredResults.length === 0}>
        <Paper
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 1000,
            mt: 1,
            p: 2,
            textAlign: 'center',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            No results found for "{query}"
          </Typography>
        </Paper>
      </Fade>
    </Box>
  );
}
