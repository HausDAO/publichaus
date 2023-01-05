import { DHConnectProvider } from '@daohaus/connect';
import { HausThemeProvider } from '@daohaus/ui';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HashRouter } from 'react-router-dom';
import { Routes } from './Routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 60 * 20,
      staleTime: 1000 * 60 * 20,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <HausThemeProvider>
        <DHConnectProvider>
          <QueryClientProvider client={queryClient}>
            <Routes />
          </QueryClientProvider>
        </DHConnectProvider>
      </HausThemeProvider>
    </HashRouter>
  </React.StrictMode>
);
