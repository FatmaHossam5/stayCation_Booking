import { Box } from "@mui/material";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";

export default function MasterLayout() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <SideBar />
      
      {/* Main content area with navbar */}
      <Box sx={{ 
        flexGrow: 1, 
        display: "flex", 
        flexDirection: "column",
      }}>
        {/* Navbar */}
        <NavBar />
        
        {/* Main content */}
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            p: 3,
            mt: { xs: "64px", md: "72px" }, // Account for navbar height
            minHeight: "calc(100vh - 72px)", // Full height minus navbar
            backgroundColor: "#f5f5f5",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

