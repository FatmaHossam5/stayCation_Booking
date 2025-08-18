import React from 'react'
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import { getDefaultRouteByRole, hasRouteAccess } from '../../../config/routes';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  userData?: any;
}

export default function ProtectedRoute({ children, allowedRoles, userData }: ProtectedRouteProps) {
  const { role, userToken } = useContext(AuthContext);
  const token = localStorage.getItem("userToken");
  
  console.log('ProtectedRoute check:', { role, userToken, token, allowedRoles });
  
  // Check if user is authenticated
  if (!userToken && !token) {
    console.log('User not authenticated, redirecting to signin');
    return <Navigate to="/auth/signin" replace />;
  }
  
  // If allowedRoles is specified, check if user has the required role
  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = role || localStorage.getItem("role");
    
    console.log('Role check:', { userRole, allowedRoles, hasAccess: hasRouteAccess(userRole, allowedRoles) });
    
    if (!userRole || !hasRouteAccess(userRole, allowedRoles)) {
      // Redirect to appropriate default route based on user role
      const defaultRoute = getDefaultRouteByRole(userRole || '');
      console.log('User role not allowed, redirecting to:', defaultRoute);
      return <Navigate to={defaultRoute} replace />;
    }
  }
  
  console.log('User authenticated and authorized, rendering children');
  return <>{children}</>;
}
