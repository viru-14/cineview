import { Navigate, Outlet } from 'react-router-dom';
import { SessionService } from '../../data/services/SessionService';

export const GuestRoute = () => {
  if (SessionService.isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};