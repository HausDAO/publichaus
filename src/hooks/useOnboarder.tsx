import { LOCAL_ABI } from "@daohaus/abis";
import OnboarderABI from "../abis/Onboarder.json";
import { ValidNetwork, Keychain } from "@daohaus/keychain-utils";
import { useQuery } from "react-query";
import { createViemClient } from "@daohaus/utils";

type FetchShape = {
  baal?: boolean;
  expiery?: boolean;
  token?: boolean;
};

const fetchOnboarder = async ({
  shamanAddress,
  chainId,
  rpcs,
  fetchShape = {
    baal: true,
    expiery: true,
    token: true,
  },
}: {
  shamanAddress: string;
  chainId: ValidNetwork;
  rpcs?: Keychain;
  fetchShape?: FetchShape;
}) => {
  const client = createViemClient({
    chainId,
  });

  try {
    const baal = fetchShape?.baal
      ? await client.readContract({
          abi: OnboarderABI,
          address: shamanAddress as `0x${string}`,
          functionName: "baal",
          args: [],
        })
      : null;
    const expiery = fetchShape?.expiery
      ? ((await client.readContract({
          abi: OnboarderABI,
          address: shamanAddress as `0x${string}`,
          functionName: "expiery",
          args: [],
        })) as bigint)
      : null;
    const token = fetchShape?.token
      ? await client.readContract({
          abi: OnboarderABI,
          address: shamanAddress as `0x${string}`,
          functionName: "token",
          args: [],
        })
      : null;

    return {
      baal,
      expiery: expiery?.toString(),
      token,
    };
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.message as string);
  }
};

export const useOnboarder = ({
  shamanAddress,
  chainId,
  rpcs,
  fetchShape = {
    baal: true,
    expiery: true,
    token: true,
  },
}: {
  shamanAddress: string;
  chainId: ValidNetwork;
  rpcs?: Keychain;
  fetchShape?: FetchShape;
}) => {
  const { data, error, ...rest } = useQuery(
    "OnboarderShaman",
    () => {
      return fetchOnboarder({
        shamanAddress,
        chainId,
        rpcs,
        fetchShape,
      });
    },
    {
      enabled: !!shamanAddress && !!chainId,
    }
  );

  return {
    shamanData: data,
    error: error as Error,
    ...rest,
  };
};
