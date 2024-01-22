

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import AuthLayout from './Components/shared/AuthLayout/AuthLayout'
import NotFound from './Components/shared/NotFound/NotFound'
import LandingPage from './Components/LandingPage/LandingPage'
import SignIn from './Components/SignIn/SignIn'
import SignUp from './Components/SignUp/SignUp'
import ForgetPassword from './Components/ForgetPassword/ForgetPassword'
import RestPassword from './Components/ResetPassword/RestPassword'
import MasterLayout from './Components/shared/MasterLayout/MasterLayout'
import Home from './Components/Home/Home'
import ContactInfo from './Components/ContactInfo/ContactInfo'
import PaymentInfo from './Components/PaymentInfo/PaymentInfo'
import StatusInfo from './Components/StatusInfo/StatusInfo'
import User from './Components/User/User'
import Ads from './Components/Ads/Ads'
import Bookings from './Components/Bookings/Bookings'
import Rooms from './Components/Rooms/Rooms'
import AddRoom from './Components/AddRoom/AddRoom'
import Navbar from './Components/Navbar/Navbar'
import { AuthContext } from './Context/AuthContext'
import { useContext } from 'react'
import ChangePassword from './Components/ChangePassword/ChangePassword'
import ProtectedRoute from './Components/shared/ProtectedRoute/ProtectedRoute'
import AddAds from './Components/AddAds/AddAds'


function App() {
 
  let {userData,saveUserData,role}:any=useContext(AuthContext)
const routes =createBrowserRouter([
  {
    path:"/",element:<AuthLayout/>,errorElement:<NotFound/>,
    children:[
      {index:true,element:<SignIn saveUserData={saveUserData}/>},
      {path:"signin",element:<SignIn saveUserData={saveUserData}/>},
      {path:"signup",element:<SignUp/>},
      {path:"forget-pass",element:<ForgetPassword/>},
      {path:"reset-pass",element:<RestPassword/>},
      {path:"change-pass",element:<ChangePassword/>}

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
      {path:"rooms",element:<Rooms/>},
      {path:"rooms/add-room",element:<AddRoom/>},







    ]
  },
  {
    path:"user",
    errorElement:<NotFound/>,
    children:[
      {index:true,element:<LandingPage/>},

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