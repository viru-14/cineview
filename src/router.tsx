import { createBrowserRouter } from 'react-router-dom';
import { PlaceholderPage } from './Common/ui/components/PlaceholderPage';
import { LoginPage, ProtectedRoute, GuestRoute } from './Auth';
import { ShellLayout } from './Common/ui/layouts/ShellLayout';
import { HomePage, MovieDetailPage } from './Movies';
import { SearchPage } from './Search';
import { TVShowDetailPage, SeasonDetail } from './TVShows';
import { SettingsPage } from './Preferences';
import { WatchlistPage } from './Collection';

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
          {
            path: '/movie/:id',
            element: <MovieDetailPage />,
          },
          {
            path: '/tv/:id',
            element: <TVShowDetailPage />,
            children: [
              // This tells React Router: "When the URL matches /tv/:id/season/:number, 
              // render SeasonDetail inside the <Outlet /> of TVShowDetailPage"
              {
                path: 'season/:seasonNumber',
                element: <SeasonDetail />,
              }
            ]
            },
            {
                path: '/settings',
                element: <SettingsPage />,
            },
            {
                path: '/watchlist',
                element: <WatchlistPage />,
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