import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import AuthContextProvider from './Context/AuthContext.tsx'
import ToastProvider from './Context/ToastContext.tsx'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ToastProvider>
        <ToastContainer />
        <App />
      </ToastProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
