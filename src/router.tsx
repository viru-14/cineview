import { createBrowserRouter } from 'react-router-dom';
import { PlaceholderPage } from './Common/ui/components/PlaceholderPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PlaceholderPage title="Home Page (Coming Soon)" />,
  },
  {
    path: '/login',
    element: <PlaceholderPage title="Login Page (Coming Soon)" />,
  },
  {
    path: '*',
    element: <PlaceholderPage title="404 - Not Found" />,
  }
]);