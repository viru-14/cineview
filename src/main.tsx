import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { reaction } from 'mobx';
import { router } from './router';
import { preferencesStore } from './Preferences';

import i18n from './Common/core/i18n' 
import './Common/ui/styles/global.css';

reaction(
  () => preferencesStore.language,
  (newLanguage) => {
    i18n.changeLanguage(newLanguage);
  }
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);