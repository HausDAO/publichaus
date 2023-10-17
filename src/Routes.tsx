import { DHLayout, useDHConnect } from "@daohaus/connect";
import {
  Routes as Router,
  Route,
  useLocation,
  matchPath,
} from "react-router-dom";
import { Delegates } from "./pages/Delegates";
import { Application } from "./pages/Application";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { TXBuilder } from "@daohaus/tx-builder";
import { TARGET_DAO } from "./targetDAO";
import { Join } from "./pages/Join";
import { Manifesto } from "./pages/Manifesto";
import { Unstake } from "./pages/Unstake";
import { Delegate } from "./pages/Delegate";
import { Claim } from "./pages/Claim";
import { useDaoData } from "./hooks/useDaoData";
import { HeaderAvatar } from "./components/HeaderAvatar";
import { About } from "./pages/About";
import { Banner, LinkStyles } from "@daohaus/ui";
import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";
import { Proposals } from "./pages/Proposals";

import { Proposal } from "./pages/Proposal";
import { DaoContainer } from "./layouts/DaoContainer";

export const StyledRouterLink = styled(RouterLink)`
  ${LinkStyles}
`;

export const Routes = () => {
  const { pathname } = useLocation();

  const { address, publicClient } = useDHConnect();
  const { dao } = useDaoData({
    daoid: TARGET_DAO.ADDRESS,
    daochain: TARGET_DAO.CHAIN_ID,
  });

  return (
    <TXBuilder
      publicClient={publicClient}
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
          { label: "Home", href: "/" },
          // { label: 'Manifesto', href: '/manifesto' },
          { label: "Stake", href: "/join" },
          { label: "Champions", href: "/delegates" },
          // { label: 'Become a Champion', href: '/apply' },
          { label: "Next", href: "/about" },
          { label: "DAO", href: `/molochv3/${TARGET_DAO.CHAIN_ID}/${TARGET_DAO.ADDRESS}/proposals` },

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
          <Route path={`/molochv3/:daoChain/:daoId`} element={<DaoContainer />}>
            <Route path={`proposals`} element={<Proposals />} />
            <Route path={`proposal/:proposalId`} element={<Proposal />} />
          </Route>
        </Router>
      </DHLayout>
    </TXBuilder>
  );
};
