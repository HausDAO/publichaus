import STAKECLAIMABI from "../abis/StakeClaim.json";

import { useQuery } from "react-query";
import { ValidNetwork, Keychain } from "@daohaus/keychain-utils";
import { createViemClient } from "@daohaus/utils";

type FetchShape = {
  claim: string;
  expiry: string;
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
  const client = createViemClient({
    chainId,
  });

  try {
    const memberData =
      fetchShape?.claim && userAddress
        ? await client.readContract({
            abi: STAKECLAIMABI,
            address: contractAddress as `0x${string}`,
            functionName: "claimOf",
            args: [userAddress],
          })
        : null;

    // const claimData = fetchShape?.expiry
    //   ?
    //   (await client.readContract({
    //     abi: STAKECLAIMABI,
    //     address: contractAddress as `0x${string}`,
    //     functionName: "expiry",
    //     args: [],
    //   }))
    //   : null;

    const data = {
      claim: memberData ? (memberData.toString() as string) : null,
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
    expiry: "0",
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
