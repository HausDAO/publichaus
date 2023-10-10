import { DHConnectProvider } from "@daohaus/connect";
import { Banner, HausThemeProvider } from "@daohaus/ui";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { HashRouter } from "react-router-dom";
import { Routes } from "./Routes";
import { TARGET_DAO } from "./targetDAO";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 60 * 20,
      staleTime: 1000 * 60 * 20,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <HausThemeProvider>
        {new Date(TARGET_DAO.STAKE_NEXT_START * 1000) > (new Date()) && (
          <Banner
            bannerText={`Open staking is paused, next round begins ${new Date(
              TARGET_DAO.STAKE_NEXT_START * 1000
            ).toDateString()}`}
          />
        )}
        <DHConnectProvider daoChainId={TARGET_DAO.CHAIN_ID}>
          <QueryClientProvider client={queryClient}>
            <Routes />
          </QueryClientProvider>
        </DHConnectProvider>
      </HausThemeProvider>
    </HashRouter>
  </React.StrictMode>
);
