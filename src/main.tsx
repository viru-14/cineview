import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

// Initialize i18n before the app renders
import './Common/core/i18n';
import './Common/ui/styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="bg-gray-900 min-h-screen">
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);