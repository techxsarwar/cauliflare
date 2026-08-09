import React from 'react';
import { useAuth } from '../clerk';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();
  const location = useLocation();

  if (!isLoaded) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        backgroundColor: 'var(--surface)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div className="font-display-xl" style={{ fontSize: '28px', marginBottom: '12px' }}>CAULIFLARE</div>
          <div className="font-code-md" style={{ color: 'var(--on-surface-variant)' }}>Verifying authentication...</div>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
