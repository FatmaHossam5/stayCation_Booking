import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import Chart from 'react-apexcharts'
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { 
  Home as HomeIcon, 
  Hotel as HotelIcon, 
  People as PeopleIcon,
  TrendingUp as TrendingUpIcon 
} from '@mui/icons-material';
import styles from './Home.module.scss';

export default function Home() {
  const { baseUrl, reqHeaders } = useContext(AuthContext);
  const [ads, setAds] = useState(0);
  const [rooms, setRooms] = useState(0);
  const [facilities, setFacilities] = useState(0);
  const [pending, setPending] = useState(0);
  const [complete, setComplete] = useState(0);
  const [users, setUsers] = useState(0);
  const [admin, setAdmin] = useState(0);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  useEffect(() => {
    setLoading(true);
    axios.get(`${baseUrl}/admin/dashboard` , {
      headers: {
        'Authorization': ` ${localStorage.getItem("userToken")}`,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        const data = response?.data?.data;
        
        setAds(data?.ads || 0);
        setRooms(data?.rooms || 0);
        setFacilities(data?.facilities || 0);
        setPending(data?.bookings?.pending || 0);
        setComplete(data?.bookings?.completed || 0);
        setUsers(data?.users?.user || 0);
        setAdmin(data?.users?.admin || 0);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [baseUrl]);

  const chartHeight = isMobile ? 300 : isTablet ? 400 : 450;

  const commonChartOptions = {
    noData: { text: "No data available" },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
        donut: {
          size: '60%',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '14px',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 600,
              color: theme.palette.text.primary
            },
            value: {
              show: true,
              fontSize: '18px',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 700,
              color: theme.palette.primary.main
            }
          }
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'horizontal',
        shadeIntensity: 0.25,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 0.85,
        stops: [50, 0, 100]
      }
    },
    legend: {
      position: 'bottom' as const,
      fontWeight: 600,
      fontFamily: 'Poppins, sans-serif',
      fontSize: '14px',
      markers: {
        size: 12
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5
      }
    },
    colors: ['#203FC7', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'],
    stroke: {
      width: 0
    }
  };



  if (loading) {
    return (
      <Box className={styles.dashboardContainer} sx={{ p: 3 }}>
        <Box className={styles.loadingContainer}>
          <Box className={styles.loadingSpinner} />
          <Typography className={styles.loadingText}>
            Loading dashboard data...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box className={styles.dashboardContainer} sx={{ p: { xs: 2, md: 3 } }}>
      {/* Header Section */}
      <Box className={styles.headerSection}>
        <Typography 
          variant="h4" 
          component="h1"
          sx={{ 
            fontWeight: 700, 
            color: 'white',
            mb: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <HomeIcon sx={{ color: 'white' }} />
          Dashboard Overview
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
          Monitor your property management metrics and performance
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Box className={styles.statsGrid}>
        <Box className={styles.statCard}>
          <Box className={styles.statIcon} sx={{ backgroundColor: '#203FC7' }}>
            <HotelIcon />
          </Box>
          <Typography className={styles.statValue}>
            {rooms.toLocaleString()}
          </Typography>
          <Typography className={styles.statLabel}>
            Total Rooms
          </Typography>
        </Box>
        
        <Box className={styles.statCard}>
          <Box className={styles.statIcon} sx={{ backgroundColor: '#FF6B6B' }}>
            <TrendingUpIcon />
          </Box>
          <Typography className={styles.statValue}>
            {ads.toLocaleString()}
          </Typography>
          <Typography className={styles.statLabel}>
            Active Ads
          </Typography>
        </Box>
        
        <Box className={styles.statCard}>
          <Box className={styles.statIcon} sx={{ backgroundColor: '#4ECDC4' }}>
            <PeopleIcon />
          </Box>
          <Typography className={styles.statValue}>
            {(users + admin).toLocaleString()}
          </Typography>
          <Typography className={styles.statLabel}>
            Total Users
          </Typography>
        </Box>
        
        <Box className={styles.statCard}>
          <Box className={styles.statIcon} sx={{ backgroundColor: '#45B7D1' }}>
            <HomeIcon />
          </Box>
          <Typography className={styles.statValue}>
            {(pending + complete).toLocaleString()}
          </Typography>
          <Typography className={styles.statLabel}>
            Total Bookings
          </Typography>
        </Box>
      </Box>

      {/* Charts Section */}
      <Box className={styles.chartsGrid}>
        <Box className={styles.chartCard}>
          <Typography className={styles.chartTitle}>
            Property Overview
          </Typography>
          <Chart
            type="donut"
            width="100%"
            height={chartHeight}
            series={[ads, rooms, facilities]}
            options={{
              ...commonChartOptions,
              labels: ['Rooms with Ads', 'Total Rooms', 'Total Facilities'],
              title: {
                text: 'Property Distribution',
                align: 'center',
                style: {
                  fontSize: '16px',
                  fontWeight: 600,
                  fontFamily: 'Poppins, sans-serif'
                }
              }
            }}
          />
        </Box>

        <Box className={styles.chartCard}>
          <Typography className={styles.chartTitle}>
            Booking Status
          </Typography>
          <Chart
            type="donut"
            width="100%"
            height={chartHeight}
            series={[pending, complete]}
            options={{
              ...commonChartOptions,
              labels: ['Pending Bookings', 'Completed Bookings'],
              title: {
                text: 'Booking Analytics',
                align: 'center',
                style: {
                  fontSize: '16px',
                  fontWeight: 600,
                  fontFamily: 'Poppins, sans-serif'
                }
              }
            }}
          />
        </Box>

        <Box className={styles.chartCard}>
          <Typography className={styles.chartTitle}>
            User Distribution
          </Typography>
          <Chart
            type="donut"
            width="100%"
            height={chartHeight}
            series={[users, admin]}
            options={{
              ...commonChartOptions,
              labels: ['Regular Users', 'Administrators'],
              title: {
                text: 'User Analytics',
                align: 'center',
                style: {
                  fontSize: '16px',
                  fontWeight: 600,
                  fontFamily: 'Poppins, sans-serif'
                }
              }
            }}
          />
        </Box>
      </Box>
    </Box>
  );
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