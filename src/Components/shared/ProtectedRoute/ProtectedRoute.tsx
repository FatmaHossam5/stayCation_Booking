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
  const { role } = useContext(AuthContext);
  const token = localStorage.getItem("userToken");
  
  // Check if user is authenticated
  if (!userData && !token) {
    return <Navigate to="/auth/signin" replace />;
  }
  
  // If allowedRoles is specified, check if user has the required role
  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = role || localStorage.getItem("role");
    
    if (!userRole || !hasRouteAccess(userRole, allowedRoles)) {
      // Redirect to appropriate default route based on user role
      const defaultRoute = getDefaultRouteByRole(userRole || '');
      return <Navigate to={defaultRoute} replace />;
    }
  }
  
  return <>{children}</>;
}
