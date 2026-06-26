import { createBrowserRouter } from 'react-router-dom';
import { PlaceholderPage } from './Common/ui/components/PlaceholderPage';
import { LoginPage, ProtectedRoute, GuestRoute } from './Auth';
import { ShellLayout } from './Common/ui/layouts/ShellLayout';
import { HomePage } from './Movies';
import { SearchPage } from './Search';

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
            element: <HomePage />,
          },
          {
            path: '/search',
            element: <SearchPage />,
          },
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