import { Box } from '@mui/material'
import React from 'react'
import SideBar from '../SideBar/SideBar'
import NavBar from '../NavBar/NavBar'
import { Outlet } from 'react-router-dom'

export default function MasterLayout() {
  return (
    <>
    
    <Box>
    <SideBar/>
    </Box>
    <Box>
    <NavBar/>
    <Outlet/>

    </Box>
    
    
    </>
  )
}


