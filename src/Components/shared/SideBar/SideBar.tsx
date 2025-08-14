import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { CSSObject, Theme, styled, useTheme } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router";
import { useContext } from "react";
import { useMediaQuery, Tooltip } from "@mui/material";

import GridViewIcon from '@mui/icons-material/GridView';
import { useAppStore } from "../../../appStore";
import DryCleaningIcon from '@mui/icons-material/DryCleaning';
import { AuthContext } from "../../../Context/AuthContext";
import "./SideBar.css";

// Responsive drawer width
const getDrawerWidth = (isMobile: boolean) => isMobile ? 280 : 260;

const openedMixin = (theme: Theme, isMobile: boolean): CSSObject => ({
  width: getDrawerWidth(isMobile),
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  minHeight: 64,
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "isMobile",
})(({ theme, open, isMobile }: { theme: Theme; open: boolean; isMobile: boolean }) => ({
  width: getDrawerWidth(isMobile),
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme, isMobile),
    "& .MuiDrawer-paper": openedMixin(theme, isMobile),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

// Enhanced ListItem with better styling
const StyledListItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active?: boolean }>(({ theme, active }) => ({
  margin: theme.spacing(0.5, 1),
  borderRadius: theme.spacing(1),
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  position: 'relative',
  
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    transform: 'translateX(4px)',
    '& .MuiListItemIcon-root': {
      color: 'rgba(255, 255, 255, 0.9)',
    },
  },
  
  ...(active && {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: 4,
      backgroundColor: '#ffffff',
      borderRadius: '0 2px 2px 0',
    },
    '& .MuiListItemIcon-root': {
      color: '#ffffff',
    },
    '& .MuiListItemText-primary': {
      fontWeight: 600,
    },
  }),
}));

export default function SideBar() {
  const { role, saveUserData } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const open = useAppStore((state) => state.dopen);
  const updateOpen = useAppStore((state) => state.updateOpen);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const logOut = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');
    saveUserData(); // Update context state after logout
    navigate('/auth/signin');
  };

  // Helper function to check if a route is active
  const isActiveRoute = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  // Admin menu items with better organization
  const adminMenuItems = [
    { 
      text: "Dashboard", 
      icon: <HomeIcon />, 
      onClick: () => navigate('/dashboard'),
      path: '/dashboard'
    },
    { 
      text: "User Management", 
      icon: <PeopleOutlineIcon />, 
      onClick: () => navigate('/dashboard/user'),
      path: '/dashboard/user'
    },
    { 
      text: "Room Management", 
      icon: <RoomServiceIcon />, 
      onClick: () => navigate('/dashboard/rooms'),
      path: '/dashboard/rooms'
    },
    { 
      text: "Advertisement", 
      icon: <CalendarMonthIcon />, 
      onClick: () => navigate('/dashboard/ads'),
      path: '/dashboard/ads'
    },
    { 
      text: "Booking Management", 
      icon: <PeopleOutlineIcon />, 
      onClick: () => navigate('/dashboard/book'),
      path: '/dashboard/book'
    },
    { 
      text: "Facilities", 
      icon: <DryCleaningIcon />, 
      onClick: () => navigate('/dashboard/facilities'),
      path: '/dashboard/facilities'
    },
  ];

  // User menu items with better organization
  const userMenuItems = [
    { 
      text: "Dashboard", 
      icon: <HomeIcon />, 
      onClick: () => navigate('/user'),
      path: '/user'
    },
    { 
      text: "Available Rooms", 
      icon: <RoomServiceIcon />, 
      onClick: () => navigate('/user/available-rooms'),
      path: '/user/available-rooms'
    },
    { 
      text: "My Bookings", 
      icon: <CalendarMonthIcon />, 
      onClick: () => navigate('/user/bookings'),
      path: '/user/bookings'
    },
    { 
      text: "Favorites", 
      icon: <GridViewIcon />, 
      onClick: () => navigate('/user/fav'),
      path: '/user/fav'
    },
  ];

  // Account management items (separated for better organization)
  const accountItems = [
    { 
      text: "Change Password", 
      icon: <LockOpenIcon />, 
      onClick: () => navigate('/auth/change-pass'),
      path: '/auth/change-pass'
    },
    { 
      text: "Sign Out", 
      icon: <LogoutIcon />, 
      onClick: () => logOut(),
      path: '/logout'
    }
  ];

  // Select menu items based on user role
  const mainItems = role === "admin" ? adminMenuItems : userMenuItems;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box height={80} />
      <Drawer 
        variant="permanent" 
        open={open} 
        isMobile={isMobile} 
        theme={theme}
        sx={{
          '& .MuiDrawer-paper': {
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            zIndex: theme.zIndex.drawer,
            backgroundColor: '#1976d2',
            backgroundImage: 'linear-gradient(180deg, #1976d2 0%, #1565c0 100%)',
            border: 'none',
            boxShadow: '2px 0 8px rgba(0,0,0,0.15)',
            overflow: 'hidden',
          }
        }}
      >
        <DrawerHeader>
          <Tooltip 
            title={open ? "Collapse sidebar" : "Expand sidebar"}
            placement="right"
          >
            <IconButton 
              onClick={() => updateOpen(!open)}
              className="sidebar-collapse-button"
              sx={{ 
                color: 'white',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  transform: 'scale(1.05)',
                }
              }}
            >
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </Tooltip>
        </DrawerHeader>
        
        <Divider className="sidebar-divider" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
        
        {/* Main Navigation Items */}
        <List sx={{ pt: 1 }}>
          {mainItems.map((item) => {
            const { text, icon, onClick, path } = item;
            const isActive = isActiveRoute(path);
            
            return (
              <StyledListItem 
                key={text} 
                onClick={onClick} 
                active={isActive}
                className={`sidebar-list-item ${isActive ? 'active' : ''}`}
                sx={{ 
                  minHeight: 48,
                  '& .MuiListItemIcon-root': {
                    minWidth: 40,
                    color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
                  },
                  '& .MuiListItemText-primary': {
                    fontSize: '0.875rem',
                    fontWeight: isActive ? 600 : 400,
                  }
                }}
              >
                {icon && <ListItemIcon className="sidebar-icon">{icon}</ListItemIcon>}
                <ListItemText primary={text} className="sidebar-text" />
              </StyledListItem>
            );
          })}
        </List>

        {/* Account Management Section */}
        <Box className="account-section" sx={{ mt: 'auto', pb: 2 }}>
          <Divider className="sidebar-divider" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', mb: 1 }} />
          <List>
            {accountItems.map((item) => {
              const { text, icon, onClick, path } = item;
              const isActive = isActiveRoute(path);
              
              return (
                <StyledListItem 
                  key={text} 
                  onClick={onClick} 
                  active={isActive}
                  className={`sidebar-list-item ${isActive ? 'active' : ''}`}
                  sx={{ 
                    minHeight: 48,
                    '& .MuiListItemIcon-root': {
                      minWidth: 40,
                      color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
                    },
                    '& .MuiListItemText-primary': {
                      fontSize: '0.875rem',
                      fontWeight: isActive ? 600 : 400,
                    }
                  }}
                >
                  {icon && <ListItemIcon className="sidebar-icon">{icon}</ListItemIcon>}
                  <ListItemText primary={text} className="sidebar-text" />
                </StyledListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
