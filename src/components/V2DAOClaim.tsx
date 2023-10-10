import { H3, Link, Loading, ParMd, SingleColumnLayout } from "@daohaus/ui";
import React from "react";
import { useV2DAO } from "../hooks/useV2DAO";
import { TARGET_DAO } from "../targetDAO";

export const V2DAOClaim = ({
  address,
  daoAddress,
  label,
}: {
  address: string;
  daoAddress: string;
  label: string;
}) => {
  const { v2DAOData, isLoading: isV2DAOLoading } = useV2DAO({
    daoAddress: daoAddress,
    userAddress: address || "",
    chainId: TARGET_DAO.CHAIN_ID,
  });
  if (isV2DAOLoading) {
    return (
      <SingleColumnLayout>
        <Loading size={100} />
        <ParMd>Checking {label}...</ParMd>
      </SingleColumnLayout>
    );
  }
  return (
    <>
      {v2DAOData?.shares &&
      v2DAOData?.loot &&
      (parseInt(v2DAOData.shares) > 0 || parseInt(v2DAOData.loot) > 0) ? (
        <>
          <H3>{label}</H3>
          <ParMd>Looks like you have unclaimed HAUS that can be claimed</ParMd>
          <ParMd>
            Go to your profile in the V2 interface and ragequit to withdraw.
          </ParMd>
          <ParMd>Then you can come back to this app and stake.</ParMd>
          <ParMd>Shares: {v2DAOData?.shares}</ParMd>
          <ParMd>Loot: {v2DAOData?.loot}</ParMd>

          <Link href={`https://app.daohaus.club/dao/0x1/${daoAddress}`}>
            V2 DAO Interface
          </Link>
        </>
      ) : (
        <ParMd>
          You are not a member of {label} and have no unclaimed tokens
        </ParMd>
      )}
    </>
  );
};
