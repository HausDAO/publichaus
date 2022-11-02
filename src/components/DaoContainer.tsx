import {
  Routes as RoutesDom,
  Route,
  Outlet,
  useLocation,
  useParams,
  useNavigate,
  matchPath,
} from 'react-router-dom';

import {
  HausConnectProvider,
  HausLayout,
  useHausConnect,
} from '@daohaus/connect';
import { useEffect, useLayoutEffect, useState } from 'react';
import { TXBuilder } from '@daohaus/tx-builder';
import { DaoContextProvider, useDao } from '@daohaus/moloch-v3-context';

export const DaoContainer = () => {
  const { daochain, daoid } = useParams();
  const { address } = useHausConnect();

  return (
    <DaoContextProvider
      address={address}
      daoid={daoid}
      daochain={daochain}
      graphApiKeys={{ '0x1': import.meta.env['VITE_GRAPH_API_KEY_MAINNET'] }}
    >
      <Dao />
    </DaoContextProvider>
  );
};

export const Dao = () => {
  const location = useLocation();
  const { provider } = useHausConnect();
  const { dao } = useDao();
  const { daochain, daoid } = useParams();

  console.log('dao', dao);

  return (
    <TXBuilder
      chainId={daochain}
      provider={provider}
      safeId={dao?.safeAddress}
      daoId={daoid}
      appState={{ dao }}
    >
      <HausLayout
        pathname={location.pathname}
        navLinks={[
          { label: 'Home', href: `/` },
          { label: 'DAO-Scoped', href: `/${daochain}/${daoid}` },
        ]}
      >
        <Outlet />
      </HausLayout>
    </TXBuilder>
  );
};
