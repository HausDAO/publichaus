import STAKECLAIMABI from "../abis/StakeClaim.json";

import { useQuery } from "react-query";
import { createContract } from "@daohaus/tx-builder";
import { ValidNetwork, Keychain } from "@daohaus/keychain-utils";

type FetchShape = {
  claim: string;
  expiery: string;
};

const fetchStakeClaimData = async ({
  contractAddress,
  userAddress,
  chainId,
  rpcs,
  fetchShape,
}: {
  contractAddress: string;
  userAddress: string;
  chainId: ValidNetwork;
  rpcs?: Keychain;
  fetchShape?: FetchShape;
}) => {
  const stakeClaimContract = createContract({
    address: contractAddress,
    abi: STAKECLAIMABI,
    chainId,
    rpcs,
  });

  try {
    const memberData =
      fetchShape?.claim && userAddress
        ? await stakeClaimContract.claimOf(userAddress)
        : null;

    const claimData = fetchShape?.expiery
      ? await stakeClaimContract.expiery()
      : null;

    const data = {
      claim: memberData ? (memberData.toString() as string) : null,
      expiery: claimData ? (claimData.toString() as string) : null,
    };

    // console.log("Data", data);
    // console.log("contractAddress", contractAddress);
    return data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.message as string);
  }
};

export const useStakeClaim = ({
  contractAddress,
  userAddress,
  chainId,
  rpcs,
  fetchShape = {
    claim: "0",
    expiery: "0",
  },
}: {
  contractAddress: string;
  userAddress: string;
  chainId: ValidNetwork;
  rpcs?: Keychain;
  fetchShape?: FetchShape;
}) => {
  const { data, error, ...rest } = useQuery(
    `StakeClaimData-${contractAddress}`,
    () => {
      return fetchStakeClaimData({
        contractAddress,
        userAddress,
        chainId,
        rpcs,
        fetchShape,
      });
    },
    {
      enabled: !!contractAddress && !!chainId,
    }
  );

  return {
    StakeClaimData: data,
    error: error as Error,
    ...rest,
  };
};
