import V2DAOABI from "../abis/V2DAO.json";

import { useQuery } from "react-query";
import { createContract } from "@daohaus/tx-builder";
import { ValidNetwork, Keychain } from "@daohaus/keychain-utils";

type FetchShape = {
    shares: string;
    loot:  string;
    // delegateKey: string;
    // exists:   boolean;
    // highestIndexYesVote:  string;
    // jailed: string;
};

const fetchV2DAOData = async ({
  daoAddress,
  userAddress,
  chainId,
  rpcs,
  fetchShape,
}: {
  daoAddress: string;
  userAddress: string;
  chainId: ValidNetwork;
  rpcs?: Keychain;
  fetchShape?: FetchShape;
}) => {

  const v2DAOContract = createContract({
    address: daoAddress,
    abi: V2DAOABI,
    chainId,
    rpcs,
  });

  try {
    
    const memberData = 
      fetchShape?.shares && userAddress
        ? await v2DAOContract.members(userAddress)
        : null;
    
    const data = {
      shares: memberData ? (memberData.shares?.toString() as string) : null,
      loot: memberData ? (memberData.loot?.toString() as string) : null,
    };

    return data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.message as string);
  }
};

export const useV2DAO = ({
    daoAddress,
    userAddress,
    chainId,
    rpcs,
    fetchShape = {
      shares: "0",
      loot: "0",
    },
  }: {
    daoAddress: string;
    userAddress: string; 
    chainId: ValidNetwork;
    rpcs?: Keychain;
    fetchShape?: FetchShape;
  }) => {
    const { data, error, ...rest } = useQuery(
      'V2DAOData',
      () => {
        return fetchV2DAOData({
          daoAddress,
          userAddress,
          chainId,
          rpcs,
          fetchShape,
        });
      },
      {
        enabled: !!daoAddress && !!chainId,
      }
    );
  
    return {
      v2DAOData: data,
      error: error as Error,
      ...rest,
    };
  };
  
