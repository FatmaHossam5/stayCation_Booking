import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as React from "react";
import { useAppStore } from "../../../appStore";
import avatar from "../../../assets/avatar.png";
import SearchBar from "../SearchBar/SearchBar";

export default function NavBar() {
  const { dopen, updateOpen } = useAppStore();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Calculate sidebar width based on state using theme spacing
  const getSidebarWidth = () => {
    if (isMobile) {
      return dopen ? 280 : 0;
    }
    return dopen ? 260 : theme.spacing(8) + 1; // Use theme spacing for collapsed width
  };

  const sidebarWidth = getSidebarWidth();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSearch = (query: string) => {
    // Handle search functionality here
  };

  // Add keyboard navigation support
  React.useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'k') {
        event.preventDefault();
        // Focus search bar
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      PaperProps={{
        sx: {
          mt: 1,
          minWidth: 220,
          boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
          borderRadius: 2,
          '& .MuiMenuItem-root': {
            py: 1.5,
            px: 2,
            fontSize: '0.95rem',
            '&:hover': {
              backgroundColor: 'primary.light',
            }
          }
        },
      }}
    >
      <MenuItem onClick={handleMenuClose}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <AccountCircle sx={{ fontSize: 20, color: 'text.secondary' }} />
          <span>View Profile</span>
        </Box>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <SettingsIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
          <span>Account Settings</span>
        </Box>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <LogoutIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
          <span>Sign Out</span>
        </Box>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      PaperProps={{
        sx: {
          mt: 1,
          minWidth: 250,
          maxWidth: '90vw',
          boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
          borderRadius: 2,
          '& .MuiMenuItem-root': {
            py: 2,
            px: 2.5,
            fontSize: '1rem',
            '&:hover': {
              backgroundColor: 'primary.light',
            }
          }
        },
      }}
    >
              <MenuItem>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
            <IconButton size="large" color="inherit">
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Typography variant="body1">Notifications (17)</Typography>
          </Box>
        </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
          <Avatar src={avatar} sx={{ width: 32, height: 32 }} />
          <Typography variant="body1">Profile</Typography>
        </Box>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar 
        position="fixed" 
        role="banner" 
        aria-label="Main navigation"
        sx={{
          backgroundColor: "#E2E5EB",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          borderBottom: "1px solid rgba(0,0,0,0.1)",
          backdropFilter: "blur(8px)",
          left: { xs: 0, md: dopen ? `${sidebarWidth}px` : 0 }, // Position based on sidebar width
          width: { xs: '100%', md: dopen ? `calc(100% - ${sidebarWidth}px)` : '100%' }, // Adjust width
          transition: theme.transitions.create(['left', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          [theme.breakpoints.down('sm')]: {
            boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
          }
        }}
      >
                 <Toolbar 
           role="toolbar" 
           aria-label="Navigation toolbar"
           sx={{ 
             px: { 
               xs: 2, // Mobile: comfortable padding
               sm: 3, // Tablet: moderate padding  
               md: 4  // Desktop: generous padding
             },
             py: { xs: 1.5, sm: 2, md: 2.5 },
             gap: { xs: 1.5, sm: 2, md: 3 },
             minHeight: { xs: 70, md: 80 }, // Better height for touch targets
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'space-between'
           }}
         >
                     {/* Left Section - Hamburger and Brand */}
           <Box sx={{ 
             display: 'flex', 
             alignItems: 'center', 
             gap: { xs: 1.5, sm: 2, md: 3 },
             flexShrink: 0
           }}>
             {/* Responsive hamburger menu - only show when sidebar is collapsed or on mobile */}
             {(isMobile || !dopen) && (
               <IconButton
                 size="large"
                 edge="start"
                 color="inherit"
                 aria-label="open drawer"
                 sx={{ 
                   p: { xs: 1.5, sm: 2 }, // Larger touch target
                   transition: "all 0.2s ease-in-out",
                   "&:hover": {
                     backgroundColor: "rgba(0,0,0,0.08)",
                     transform: "scale(1.05)",
                   }
                 }}
                 onClick={() => updateOpen(!dopen)}
               >
                 <MenuIcon />
               </IconButton>
             )}

                           {/* Brand display - show in both expanded and collapsed states */}
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                minWidth: { sm: 150, md: 180 }
              }}>
                <img 
                  src="/src/assets/Staycation..svg" 
                  alt="StayCation" 
                  style={{ height: 36, maxWidth: '100%' }}
                />
              </Box>
           </Box>

                     {/* Center Section - Search Bar */}
           <Box sx={{ 
             flexGrow: 1, 
             mx: { xs: 2, sm: 3, md: 4 },
             maxWidth: { sm: 450, md: 650, lg: 800 },
             display: 'flex',
             justifyContent: 'center'
           }}>
             <SearchBar 
               onSearch={handleSearch}
               placeholder={isMobile ? "Search..." : "Search rooms, locations, or amenities..."}
               fullWidth
               variant={isMobile ? "filled" : "outlined"}
             />
           </Box>

                     {/* Right Section - Actions */}
           <Box sx={{ 
             display: 'flex', 
             alignItems: 'center', 
             gap: { xs: 1, sm: 1.5, md: 2 },
             flexShrink: 0
           }}>
             {/* Desktop actions */}
             <Box sx={{ 
               display: { xs: "none", md: "flex" }, 
               alignItems: "center", 
               gap: 2
             }}>
               <Tooltip title="Notifications (17 new)" placement="bottom">
                 <IconButton
                   size="large"
                   aria-label="show 17 new notifications"
                   color="inherit"
                   sx={{
                     p: 2, // Larger touch target
                     transition: "all 0.2s ease-in-out",
                     "&:hover": {
                       backgroundColor: "rgba(0,0,0,0.08)",
                       transform: "scale(1.05)",
                     },
                     "&.Mui-focusVisible": {
                       outline: '2px solid #1976d2',
                       outlineOffset: 2,
                     }
                   }}
                 >
                   <Badge 
                     badgeContent={17} 
                     color="error"
                     sx={{
                       '& .MuiBadge-badge': {
                         fontSize: '0.75rem',
                         height: 20,
                         minWidth: 20,
                         fontWeight: 600
                       }
                     }}
                   >
                     <NotificationsIcon />
                   </Badge>
                 </IconButton>
               </Tooltip>
               
               <Tooltip title="User profile" placement="bottom">
                 <Avatar 
                   alt="User Avatar" 
                   src={avatar} 
                   sx={{ 
                     width: 48, 
                     height: 48, // Larger for better visibility
                     cursor: "pointer",
                     transition: "transform 0.2s ease-in-out",
                     border: '2px solid transparent',
                     "&:hover": {
                       transform: "scale(1.05)",
                       border: '2px solid rgba(0,0,0,0.1)',
                     }
                   }}
                   onClick={handleProfileMenuOpen}
                 />
               </Tooltip>
             </Box>

             {/* Tablet actions */}
             <Box sx={{ 
               display: { xs: "none", sm: "flex", md: "none" }, 
               alignItems: "center", 
               gap: 1.5
             }}>
               <Tooltip title="Notifications" placement="bottom">
                 <IconButton
                   size="large"
                   aria-label="notifications"
                   color="inherit"
                   sx={{
                     p: 2,
                     transition: "all 0.2s ease-in-out",
                     "&:hover": {
                       backgroundColor: "rgba(0,0,0,0.08)",
                       transform: "scale(1.05)",
                     }
                   }}
                 >
                   <Badge badgeContent={17} color="error">
                     <NotificationsIcon />
                   </Badge>
                 </IconButton>
               </Tooltip>
             </Box>

             {/* Mobile actions */}
             <Box sx={{ display: { xs: "flex", sm: "none" } }}>
               <Tooltip title="More options" placement="bottom">
                 <IconButton
                   size="large"
                   aria-label="show more"
                   aria-controls={mobileMenuId}
                   aria-haspopup="true"
                   onClick={handleMobileMenuOpen}
                   color="inherit"
                   sx={{ 
                     p: 2, // Larger touch target
                     transition: "all 0.2s ease-in-out",
                     "&:hover": {
                       backgroundColor: "rgba(0,0,0,0.08)",
                       transform: "scale(1.05)",
                     }
                   }}
                 >
                   <MoreIcon />
                 </IconButton>
               </Tooltip>
             </Box>
           </Box>
        </Toolbar>
      </MuiAppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
