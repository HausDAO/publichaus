import { Outlet, Route, Routes, useLocation, useParams } from "react-router-dom";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { CurrentDaoProvider } from "@daohaus/moloch-v3-hooks";
import { Proposals } from "../pages/Proposals";
import { Proposal } from "../pages/Proposal";

export const DaoContainer = () => {
  const { proposalId, memberAddress, daoChain, daoId } = useParams<{
    daoChain: ValidNetwork;
    daoId: string;
    proposalId: string;
    memberAddress: string;
  }>();

  const location = useLocation();

  console.log("Dao COntainer", location, proposalId, memberAddress, daoChain, daoId);

  if (!daoId || !daoChain) return null;

  return (
    <>
      <CurrentDaoProvider
        targetDao={{
          daoChain: daoChain,
          daoId: daoId,
          proposalId,
          memberAddress,
        }}
      >
        <Outlet />
      </CurrentDaoProvider>
    </>
  );
};
