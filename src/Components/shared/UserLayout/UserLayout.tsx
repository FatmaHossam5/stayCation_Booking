import { Box } from '@mui/material'
import React from 'react'
import Navbar from '../../Navbar/Navbar'
import { Outlet } from 'react-router'
import Footer from '../Footer/Footer'

export default function UserLayout() {
  return (
   
    
    <Box >
<Navbar/>
<Box sx={{marginTop:3}}>

<Outlet/>

</Box>
<Box>

<Footer/>
</Box>

    </Box>
 
  )
}
