import { DHConnectProvider } from '@daohaus/connect';
import { HausThemeProvider } from '@daohaus/ui';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { Routes } from './Routes';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <HausThemeProvider>
        <DHConnectProvider>
          <Routes />
        </DHConnectProvider>
      </HausThemeProvider>
    </HashRouter>
  </React.StrictMode>
);
