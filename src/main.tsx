import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import AuthContextProvider from './Context/AuthContext.tsx'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@emotion/react'
import { Theme } from './Components/LandingPage/sections/BookingSelector.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>

      <ToastContainer/>
      <ThemeProvider theme={Theme}>
    <App />
    </ThemeProvider>
    </AuthContextProvider>
   
    
  </React.StrictMode>,
)
