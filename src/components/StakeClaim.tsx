import { useDHConnect } from "@daohaus/connect";
import { useTxBuilder } from "@daohaus/tx-builder";
import {
  Button,
  H3,
  Loading,
  ParMd,
  SingleColumnLayout,
  useToast,
} from "@daohaus/ui";
import {
  formatDistanceToNowFromSeconds,
  handleErrorMessage,
  toWholeUnits,
  TXLego,
} from "@daohaus/utils";
import React, { useState } from "react";
import { useStakeClaim } from "../hooks/useStakeClaim";
import { TX } from "../legos/tx";
import { TARGET_DAO } from "../targetDAO";

export const StakeClaim = ({
  address,
  contractAddress,
  chainId,
  label,
}: {
  address: string;
  contractAddress: string;
  chainId: string | null | undefined;
  label: string;
}) => {
  const { fireTransaction } = useTxBuilder();
  const [isLoadingTx, setIsLoadingTx] = useState(false);
  const { successToast, errorToast, defaultToast } = useToast();

  const {
    StakeClaimData,
    isLoading: isStakeClaimLoading,
    isError,
  } = useStakeClaim({
    contractAddress: contractAddress,
    userAddress: address || "",
    chainId: TARGET_DAO.CHAIN_ID,
  });
  console.log("StakeClaimData", StakeClaimData);
  

  const handleStakeClaim = () => {
    fireTransaction({
      tx: {
        ...TX.STAKECLAIM,
        staticArgs: [address],
      } as TXLego,
      callerState: { contractAddress },
      lifeCycleFns: {
        onRequestSign() {
          setIsLoadingTx(true);
        },
        onTxSuccess() {
          defaultToast({
            title: "Success",
            description: "Transaction submitted: Syncing data on Subgraph",
          });
        },
        onTxError(err) {
          const errMsg = handleErrorMessage(err as any);
          errorToast({ title: "Error", description: errMsg });
          setIsLoadingTx(false);
        },
        onPollSuccess() {
          setIsLoadingTx(false);
          successToast({
            title: "Success",
            description: `Staked for DAO Loot`,
          });
        },
        onPollError(err) {
          const errMsg = handleErrorMessage(err as any);
          errorToast({ title: "Error", description: errMsg });
          setIsLoadingTx(false);
        },
      },
    });
  };

  if (isStakeClaimLoading) {
    return (
      <SingleColumnLayout>
        <Loading size={20} />
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
      {StakeClaimData?.claim && BigInt(StakeClaimData.claim) > 0 ? (
        <SingleColumnLayout>
          <H3>{label}</H3>
          <ParMd>You have unclaimed PUB Loot that can be claimed</ParMd>
          <ParMd>
            Claim:{" "}
            {toWholeUnits((BigInt(StakeClaimData?.claim) * BigInt(10)).toString())}{" "}
            PUB
          </ParMd>
          <Button
            type="button"
            onClick={handleStakeClaim}
            disabled={chainId != TARGET_DAO.CHAIN_ID}
          >
            Claim
          </Button>
        </SingleColumnLayout>
      ) : (
        <SingleColumnLayout>
          <ParMd>{label}: Currently Not Eligible</ParMd>
        </SingleColumnLayout>
      )}
    </>
  );
};
