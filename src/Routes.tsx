import { DHLayout, useDHConnect } from '@daohaus/connect';
import { Routes as Router, Route, useLocation } from 'react-router-dom';
import { Delegates } from './pages/Delegates';
import { Application } from './pages/Application';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { TXBuilder } from '@daohaus/tx-builder';
import { TARGET_DAO } from './targetDAO';

export const Routes = () => {
  const { pathname } = useLocation();
  const { address, provider } = useDHConnect();
  return (
    <TXBuilder
      provider={provider}
      chainId={TARGET_DAO.CHAIN_ID}
      daoId={TARGET_DAO.ADDRESS}
      safeId={TARGET_DAO.SAFE_ADDRESS}
      appState={{
        memberAddress: address,
      }}
    >
      <DHLayout
        pathname={pathname}
        navLinks={[
          { label: 'Home', href: '/' },
          { label: 'Apply', href: '/apply' },
          { label: 'Delegates', href: '/delegates' },
        ]}
      >
        <Router>
          <Route path="/" element={<Home />} />
          <Route path="/apply" element={<Application />} />
          <Route path="/delegates" element={<Delegates />} />
          <Route path="/profile/:memberAddress" element={<Profile />} />
        </Router>
      </DHLayout>
    </TXBuilder>
  );
};
