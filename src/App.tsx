

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import AuthLayout from './Components/shared/AuthLayout/AuthLayout'
import NotFound from './Components/shared/NotFound/NotFound'
import LandingPage from './Components/LandingPage/LandingPage'

import MasterLayout from './Components/shared/MasterLayout/MasterLayout'
import Home from './Components/Home/Home'
import ContactInfo from './Components/ContactInfo/ContactInfo'
import PaymentInfo from './Components/BookingInfo/BookingInfo'
import StatusInfo from './Components/StatusInfo/StatusInfo'
import User from './Components/User/User'
import Ads from './Components/Ads/Ads'
import Bookings from './Components/Bookings/Bookings'
import Rooms from './Components/Rooms/Rooms'
import AddRoom from './Components/AddRoom/AddRoom'
import { AuthContext } from './Context/AuthContext'
import { useContext } from 'react'
import RoomDetails from './Components/RoomDetails/RoomDetails'

import Facilities from './Components/Facilities/Facilities'
import ProtectedRoute from './Components/shared/ProtectedRoute/ProtectedRoute'
import AddAds from './Components/AddAds/AddAds'
import AvilableRooms from './Components/AvilableRooms/AvilableRooms'
import UserLayout from './Components/shared/UserLayout/UserLayout'
import BookingInfo from './Components/BookingInfo/BookingInfo'

import PaymentWrapper from './Components/Pay/PaymentWrapper'

import FavoriteList from './Components/FavoriteList/FavoriteList'
import BookingDetails from './Components/BookingDetails/BookingDetails'
import ChangePassword from './Components/Authentication/ChangePassword/ChangePassword'
import SignIn from './Components/Authentication/SignIn/SignIn'
import SignUp from './Components/Authentication/SignUp/SignUp'
import ForgetPassword from './Components/Authentication/ForgetPassword/ForgetPassword'
import RestPassword from './Components/Authentication/ResetPassword/RestPassword'

function App() {
 
  let {userData,saveUserData}:any=useContext(AuthContext)
  

 
const routes =createBrowserRouter([
  {
    path:"/",element:<LandingPage/>,errorElement:<NotFound/>
  },
  
  {
    path:"/auth",element:<AuthLayout/>,errorElement:<NotFound/>,
    children:[
      {index:true,element:<>
       <LandingPage saveUserData:any={saveUserData}/>
      </>
   },
      {path:"signin",element:<SignIn saveUserData:any={saveUserData}/>},
      {path:"signup",element:<SignUp/>},
      {path:"forget-pass",element:<ForgetPassword/>},
      {path:"reset-pass",element:<RestPassword/>},
      {path:"roomdetails",element:<RoomDetails/>},
      {path:"change-pass",element:<ChangePassword/>},


    ]
  },
  {
    path:"dashboard",
    element:<ProtectedRoute userData={userData} >
    <MasterLayout userData={userData}/>
    </ProtectedRoute>,
    errorElement:<NotFound/>,
    children:[
      {index:true,element:<Home/>},
      {path:"contact",element:<ContactInfo/>},
      {path:"payment",element:<PaymentInfo/>},
      {path:"status",element:<StatusInfo/>},
      {path:"user",element:<User/>},
      {path:"ads",element:<Ads/>},
      {path:"ads/add-ads",element:<AddAds/>},
  

      {path:"book",element:<Bookings/>},
      {path:"facilities",element:<Facilities/>},
      {path:"rooms",element:<Rooms/>},
      {path:"rooms/add-room",element:<AddRoom/>},







    ]
  },
  {
    path:"user",
    element:<UserLayout userData={userData}/>,
    errorElement:<NotFound/>,
    children:[
     
  
      

      {path:"available-rooms",element:<AvilableRooms/>},
      {path:"room-details/:roomId/",element:<RoomDetails/>},
      {path:"create-booking/:roomId/",element:<BookingInfo/>},
      {path:"pay-booking/:bookingId/",element:<PaymentWrapper/>},
      {path:"booking-details/:bookingId/",element:<BookingDetails/>},

      {path:"fav",element:<FavoriteList/>},






    ]
  }
])

  return (
    <>
 <RouterProvider router={routes}/>
    </>
  )
}

export default App