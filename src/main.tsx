import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { HausThemeProvider } from '@daohaus/ui';
import { HausConnectProvider } from '@daohaus/connect';
import { Routes } from './Routes';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <HausThemeProvider>
        <HausConnectProvider>
          <Routes />
        </HausConnectProvider>
      </HausThemeProvider>
    </HashRouter>
  </React.StrictMode>
);
