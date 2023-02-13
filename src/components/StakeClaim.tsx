import { Button, H3, Link, ParMd, SingleColumnLayout, Spinner } from "@daohaus/ui";
import React from "react";
import { useStakeClaim } from "../hooks/useStakeClaim";
import { TARGET_DAO } from "../targetDAO";

export const StakeClaim = ({
  address,
  contractAddress,
  label,
}: {
  address: string;
  contractAddress: string;
  label: string;
}) => {
  const { StakeClaimData, isLoading: isStakeClaimLoading, isError } = useStakeClaim({
    contractAddress: contractAddress,
    userAddress: address || "",
    chainId: TARGET_DAO.CHAIN_ID,
  });
  if (isStakeClaimLoading) {
    return (
      <SingleColumnLayout>
        <Spinner size="12rem" />
        <ParMd>Checking {label}...</ParMd>
      </SingleColumnLayout>
    );
  }
  if (isError) {
    return (
      <SingleColumnLayout>
        <ParMd>Coming Soon {label}...</ParMd>
      </SingleColumnLayout>
    );
  }
  return (
    <>
      {StakeClaimData?.claim &&
      (parseInt(StakeClaimData.claim) > 0) ? (
        <>
          <H3>{label}</H3>
          <ParMd>You have unclaimed tokens that can be claimed</ParMd>
          <ParMd>Claim: {StakeClaimData?.claim}</ParMd>
          <Button>Stake Claim</Button>
        </>
      ) : (
        <ParMd>
          {label} has no unclaimed tokens for you
        </ParMd>
      )}
    </>
  );
};
