import { Box } from "@mui/material";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";
import { Box } from '@mui/material'
import SideBar from '../SideBar/SideBar'
import NavBar from '../NavBar/NavBar'
import { Outlet } from 'react-router-dom'

export default function MasterLayout() {

  return (
    <>
      {/* navbar */}
      <Box>
        <NavBar />
      </Box>
      {/* sidebar */}
      <Box>
        <SideBar />
      </Box>
      {/* outlet */}
      <Box>
        <Outlet />
      <NavBar />
      <Box height={80} />
      <Box sx={{ display: "flex" }}>
        <SideBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
}
