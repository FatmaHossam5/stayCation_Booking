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
      {/* sidebar */}
      <Box>
        <SideBar />
      </Box>
      {/* outlet */}
      <Box>
        <Outlet />
      </Box>
    </>
  );
}
