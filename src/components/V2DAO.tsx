import { H3, Link, ParMd, SingleColumnLayout, Spinner } from "@daohaus/ui";
import React from "react";
import { useV2DAO } from "../hooks/useV2DAO";
import { TARGET_DAO } from "../targetDAO";

export const V2DAO = ({
  address,
  daoAddress,
  daoName,
}: {
  address: string;
  daoAddress: string;
  daoName: string;
}) => {
  const { v2DAOData, isLoading: isV2DAOLoading } = useV2DAO({
    daoAddress: daoAddress,
    userAddress: address || "",
    chainId: TARGET_DAO.CHAIN_ID,
  });
  if (isV2DAOLoading) {
    return (
      <SingleColumnLayout>
        <Spinner size="12rem" />
        <ParMd>Checking {daoName}...</ParMd>
      </SingleColumnLayout>
    );
  }
  return (
    <>
      {v2DAOData?.shares &&
      v2DAOData?.loot &&
      (parseInt(v2DAOData.shares) > 0 || parseInt(v2DAOData.loot) > 0) ? (
        <>
          <H3>{daoName}</H3>
          <ParMd>You have unclaimed tokens that can be claimed</ParMd>
          <ParMd>
            Go to your profile in the V2 interface and ragequit to claim
          </ParMd>
          <ParMd>Shares: {v2DAOData?.shares}</ParMd>
          <ParMd>Loot: {v2DAOData?.loot}</ParMd>

          <Link
            href={`https://app.daohaus.club/dao/0x64/${daoAddress}`}
            linkType="external"
          >
            V2 DAO Interface
          </Link>
        </>
      ) : (
        <ParMd>
          You are not a member of {daoName} and have no unclaimed tokens
        </ParMd>
      )}
    </>
  );
};
