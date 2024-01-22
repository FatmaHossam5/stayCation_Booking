import { Box } from "@mui/material";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";

export default function MasterLayout() {
  return (
    <>
      {/* navbar */}
      <Box>
        <NavBar />
      </Box>
      <Box sx={{ display: "flex" }}>
        {/* sidebar */}
        <Box>
          <SideBar />
        </Box>
        {/* main content area */}
        <Box component="main" sx={{ flexGrow: 1, p: 3,marginTop:"4rem", paddingLeft: "3rem" }}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
}
