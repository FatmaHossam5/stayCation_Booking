import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box, Divider, useTheme, useMediaQuery, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NavPhoto from '../../../src/assets/Staycation..svg'
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';

export default function Navbar() {
  const { role, userToken, saveUserData } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleSignOut = () => {
    localStorage.removeItem('userToken')
    localStorage.removeItem('role')
    localStorage.removeItem('userName')
    saveUserData(); // Update context state after logout
    navigate('/')
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isLoggedIn = userToken && (role === 'user' || role === 'admin');
  const isAdmin = role === 'admin';
  const isUser = role === 'user';

  const NavButton = ({ to, children, onClick }: { to?: string; children: React.ReactNode; onClick?: () => void }) => (
    <Button
      component={to ? Link : 'button'}
      to={to}
      onClick={onClick}
      sx={{
        color: 'primary.main',
        px: 2,
        py: 1,
        fontFamily: 'cairo',
        fontWeight: '500',
        fontSize: '0.9rem',
        textTransform: 'none',
        borderRadius: 2,
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          backgroundColor: 'primary.light',
          color: 'primary.contrastText',
          transform: 'translateY(-1px)',
        }
      }}
    >
      {children}
    </Button>
  );

  return (
    <>
      <Box>
        <AppBar 
          position="static" 
          sx={{
            bgcolor: '#FFFF',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            borderBottom: '1px solid',
            borderColor: 'divider'
          }}
        >
          <Toolbar sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            px: { xs: 2, md: 4 },
            py: 1
          }}>
            {/* Logo */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              flexShrink: 0
            }}>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <Box
                  component="img"
                  src={NavPhoto}
                  alt="StayCation Logo"
                  sx={{
                    height: { xs: 32, md: 40 },
                    width: 'auto',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    }
                  }}
                />
              </Link>
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                gap: 1
              }}>
                <NavButton to="/">Home</NavButton>
                
                {isLoggedIn ? (
                  <>
                    {isAdmin && (
                      <NavButton to="/dashboard">Dashboard</NavButton>
                    )}
                    {isUser && (
                      <>
                        <NavButton to="/user/fav">Favorites</NavButton>
                        <NavButton to="/user/bookings">Your Bookings</NavButton>
                      </>
                    )}
                    <Button
                      onClick={handleSignOut}
                      variant="outlined"
                      sx={{
                        color: 'error.main',
                        borderColor: 'error.main',
                        px: 2,
                        py: 1,
                        fontWeight: '500',
                        textTransform: 'none',
                        borderRadius: 2,
                        '&:hover': {
                          backgroundColor: 'error.main',
                          color: 'error.contrastText',
                          borderColor: 'error.main',
                        }
                      }}
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <NavButton to="/auth/signin">Sign In</NavButton>
                )}
              </Box>
            )}

            {/* Mobile Navigation */}
            {isMobile && (
              <Box>
                <IconButton
                  onClick={handleMenuOpen}
                  sx={{
                    color: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'primary.light',
                    }
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{
                    sx: {
                      mt: 1,
                      minWidth: 200,
                      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                      borderRadius: 2,
                    }
                  }}
                >
                  <MenuItem 
                    component={Link} 
                    to="/" 
                    onClick={handleMenuClose}
                    sx={{ py: 1.5 }}
                  >
                    Home
                  </MenuItem>
                  
                  {isLoggedIn ? (
                    <>
                      {isAdmin && (
                        <MenuItem 
                          component={Link} 
                          to="/dashboard" 
                          onClick={handleMenuClose}
                          sx={{ py: 1.5 }}
                        >
                          Dashboard
                        </MenuItem>
                      )}
                      {isUser && (
                        <>
                          <MenuItem 
                            component={Link} 
                            to="/user/fav" 
                            onClick={handleMenuClose}
                            sx={{ py: 1.5 }}
                          >
                            Favorites
                          </MenuItem>
                          <MenuItem 
                            component={Link} 
                            to="/user/bookings" 
                            onClick={handleMenuClose}
                            sx={{ py: 1.5 }}
                          >
                            Your Bookings
                          </MenuItem>
                        </>
                      )}
                      <MenuItem 
                        onClick={() => {
                          handleSignOut();
                          handleMenuClose();
                        }}
                        sx={{ 
                          py: 1.5,
                          color: 'error.main',
                          fontWeight: '500'
                        }}
                      >
                        Sign Out
                      </MenuItem>
                    </>
                  ) : (
                    <MenuItem 
                      component={Link} 
                      to="/auth/signin" 
                      onClick={handleMenuClose}
                      sx={{ py: 1.5 }}
                    >
                      Sign In
                    </MenuItem>
                  )}
                </Menu>
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}