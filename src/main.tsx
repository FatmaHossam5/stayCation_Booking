import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';
import ToastContextProvider from './Context/ToastContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <ToastContextProvider>
     <ToastContainer/>
    <App />
    </ToastContextProvider>
  </React.StrictMode>,
)
