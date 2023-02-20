import { DHLayout, useDHConnect } from '@daohaus/connect';
import { Routes as Router, Route, useLocation } from 'react-router-dom';
import { Delegates } from './pages/Delegates';
import { Application } from './pages/Application';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { TXBuilder } from '@daohaus/tx-builder';
import { TARGET_DAO } from './targetDAO';
import { Join } from './pages/Join';
import { Manifesto } from './pages/Manifesto';
import { Unstake } from './pages/Unstake';
import { Delegate } from './pages/Delegate';
import { Claim } from './pages/Claim';
import { useDaoData } from './hooks/useDaoData';
import { HeaderAvatar } from './components/HeaderAvatar';
import { HeaderClaim } from './components/HeaderClaim';
import { Button } from '@daohaus/ui';
import { About } from './pages/About';


export const Routes = () => {
  const { pathname } = useLocation();

  const { address, provider } = useDHConnect();
  const { dao } = useDaoData({
    daoid: TARGET_DAO.ADDRESS,
    daochain: TARGET_DAO.CHAIN_ID,
  });

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
          { label: 'Manifesto', href: '/manifesto' },
          { label: 'Stake', href: '/join' },
          { label: 'Delegate', href: '/delegates' },
          { label: 'Become a Champion', href: '/apply' },
          { label: 'Next', href: '/about' },
        ]}
        leftNav={
          dao?.name &&
          dao?.id && (
            <HeaderAvatar
              name={dao.name}
              address={dao.id}
              imgUrl={dao?.avatarImg}
            />
          )
        }
        
      >
        <Router>
          <Route path="/" element={<Home />} />
          <Route path="/manifesto" element={<Manifesto />} />
          <Route path="/apply" element={<Application />} />
          <Route path="/delegates" element={<Delegates />} />
          <Route path="/join" element={<Join />} />
          <Route path="/profile/:memberAddress" element={<Profile />} />
          <Route path="/unstake" element={<Unstake />} />
          <Route path="/delegate" element={<Delegate />} />
          <Route path="/claim" element={<Claim />} />
          <Route path="/about" element={<About />} />
        </Router>
      </DHLayout>
    </TXBuilder>
  );
};
