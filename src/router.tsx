import { createBrowserRouter } from 'react-router-dom';
import { PlaceholderPage } from './Common/ui/components/PlaceholderPage';
import { LoginPage, ProtectedRoute, GuestRoute } from './Auth';
import { ShellLayout } from './Common/ui/layouts/ShellLayout';

export const router = createBrowserRouter([
  {
    // 1. The outermost layer for protected routes
    element: <ProtectedRoute />,
    children: [
      {
        // 2. The layout shell that wraps all protected pages
        element: <ShellLayout />,
        children: [
          {
            // 3. The actual pages
            path: '/',
            element: <PlaceholderPage title="Home Page (Coming Soon)" />,
          },
          // Future routes like /movie/:id, /search, etc. will go here!
        ]
      }
    ]
  },

  {
    path: '/login',
    element: <GuestRoute />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
    ],
  },
  
  {
    path: '*',
    element: <PlaceholderPage title="404 - Not Found" />,
  }
]);