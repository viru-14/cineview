import { Navigate, Outlet } from 'react-router-dom';
import { SessionService } from '../../data/services/SessionService';

export const ProtectedRoute = () => {
  // If no valid session is found, redirect to login and replace the history state
  // so the user can't click the "Back" button to return to the protected route.
  if (!SessionService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the child routes!
  return <Outlet />;
};