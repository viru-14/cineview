import { createBrowserRouter } from 'react-router-dom';
import { PlaceholderPage } from './Common/ui/components/PlaceholderPage';
import { LoginPage, ProtectedRoute, GuestRoute } from './Auth';
import { ShellLayout } from './Common/ui/layouts/ShellLayout';
import { HomePage, MovieDetailPage } from './Movies';
import { SearchPage } from './Search';
import { TVShowDetailPage, SeasonDetail } from './TVShows';
import { SettingsPage } from './Preferences';
import {
  WatchlistPage,
  CollectionsPage,
  CollectionDetailPage,
} from './Collection';

export const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <ShellLayout />,
        children: [
          {
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
              {
                path: 'season/:seasonNumber',
                element: <SeasonDetail />,
              },
            ],
          },
          {
            path: '/settings',
            element: <SettingsPage />,
          },
          {
            path: '/watchlist',
            element: <WatchlistPage />,
          },
          {
            path: '/collections',
            element: <CollectionsPage />,
          },
          {
            path: '/collections/:id',
            element: <CollectionDetailPage />,
          },
        ],
      },
    ],
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
  },
]);