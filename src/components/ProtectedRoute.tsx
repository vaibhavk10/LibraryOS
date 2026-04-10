import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export default function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
  const { user, loading, emailVerified } = useAuthContext();

  if (loading) {
    return (
      <div className="min-h-screen bg-[hsl(220,20%,7%)] flex items-center justify-center">
        <LoadingSpinner message="Checking your session..." />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (!emailVerified) return <Navigate to="/login?verify=1" replace />;
  if (adminOnly && user.role !== 'admin') return <Navigate to="/dashboard" replace />;

  return <>{children}</>;
}