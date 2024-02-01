import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import Chart from 'react-apexcharts'
import { Box } from '@mui/material';

export default function Home() {
  const{baseUrl,reqHeaders}=useContext(AuthContext);
  const [ads,setAds]=useState(0);
  const [rooms,setRooms]=useState(0);
  const [facilities,setFacilities]=useState(0);
  const[pending,setPending]=useState(0);
  const[complete,setComplete]=useState(0)
  const[users,setUsers]=useState(0)
  const[admin,setAdmin]=useState(0)
  useEffect(()=>{
axios.get(`${baseUrl}/admin/dashboard`,{headers:reqHeaders}).then((response)=>{
  console.log(response);
  const data=response?.data?.data
setAds(data?.ads);
setRooms(data.rooms);
setFacilities(data.facilities)
setPending(data.bookings.pending);
setComplete(data.bookings.completed)
setUsers(data.users.user)
setAdmin(data.users.admin)
  
}).catch((error)=>{
  console.log(error);
  
})
  },[])
  return (<>
    <>
    <Box sx={{display:"flex" ,justifyContent:"space-between",marginTop:5}}>
    <Box>
    <Chart
    type='donut'
    width={'100%'}
    height={550}
    series={[ads,rooms,facilities]}
    options={{
      labels:['Rooms have Ads','Number of Rooms',' Number of Facilities'],
   
      noData:{text:"Empty Data"},
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270
        }
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        type: 'gradient',
      },
      legend: {
        formatter: function(val, opts) {
          return val + " - " + opts.w.globals.series[opts.seriesIndex]
          
        },
      
        position:"bottom",
      
     fontWeight:900,
     fontFamily:'cairo',
     fontSize:'15px',
   
      
  
      
      },
      
      title: {
        text: 'Rooms details'
      },
     
    
    }
    }/>
    </Box>
    <Box>
    <Chart
    type='donut'
    width={'100%'}
    height={550}
    series={[pending,complete]}
    options={{
      labels:['pendingBooking','completed Booking'],
   
      noData:{text:"Empty Data"},
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270
        }
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        type: 'gradient',
      },
      legend: {
        formatter: function(val, opts) {
          return val + " - " + opts.w.globals.series[opts.seriesIndex]
          
        },
        position:"bottom",
     
        fontWeight:900,
        fontFamily:'cairo',
        fontSize:'15px',
  
      
      },
      title: {
        text: 'Booking Status'
      },
     
    
    }
    }/>
    </Box>
    <Box>
    <Chart
    type='donut'
    width={'100%'}
    height={550}
    series={[users,admin]}
    options={{
      labels:['Users','Admin'],
   
      noData:{text:"Empty Data"},
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270
        }
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        type: 'gradient',
      },
      legend: {
        formatter: function(val, opts) {
          return val + " - " + opts.w.globals.series[opts.seriesIndex]
          
        },
        position:"bottom",
     
       
        fontWeight:900,
        fontFamily:'cairo',
        fontSize:'15px',
      
      },
      title: {
        text: 'stuff',
     

      },
     
    
    }
    }/>
    </Box>
    </Box>
 
  
    </>
  </>
  )
}



// export default function BasicPie() {
//   return (
//     <PieChart
//       series={[
//         {
//           data: [
//             { id: 0, value: 10, label: 'series A' },
//             { id: 1, value: 15, label: 'series B' },
//             { id: 2, value: 20, label: 'series C' },
//           ],
//         },
//       ]}
//       width={400}
//       height={200}
//     />
//   );
// }