import { LOCAL_ABI } from "@daohaus/abis";
import { useQuery } from "react-query";

import { ValidNetwork, Keychain } from "@daohaus/keychain-utils";
import { createViemClient } from "@daohaus/utils";

type FetchShape = {
  decimals?: boolean;
  name?: boolean;
  symbol?: boolean;
  totalSupply?: boolean;
  balanceOf?: boolean;
  allowance?: boolean;
};

const fetchTokenData = async ({
  tokenAddress,
  userAddress,
  chainId,
  spenderAddress,
  rpcs,
  fetchShape,
}: {
  tokenAddress: string;
  userAddress?: string | null;
  chainId: ValidNetwork;
  rpcs?: Keychain;
  spenderAddress?: string | null;
  fetchShape?: FetchShape;
}) => {

  if (!userAddress) {
    throw new Error("userAddress is required");
  }
  const client = createViemClient({
    chainId,
  });

  const balance = (await client.readContract({
    abi: LOCAL_ABI.ERC20,
    address: tokenAddress as `0x${string}`,
    functionName: "balanceOf",
    args: [userAddress],
  })) as bigint;

  try {
    const decimals = fetchShape?.decimals
      ? ((await client.readContract({
          abi: LOCAL_ABI.ERC20,
          address: tokenAddress as `0x${string}`,
          functionName: "decimals",
          args: [],
        })) as bigint)
      : null;
    const name = fetchShape?.name
      ? await client.readContract({
          abi: LOCAL_ABI.ERC20,
          address: tokenAddress as `0x${string}`,
          functionName: "name",
          args: [],
        })
      : null;
    const symbol = fetchShape?.symbol
      ? await client.readContract({
          abi: LOCAL_ABI.ERC20,
          address: tokenAddress as `0x${string}`,
          functionName: "symbol",
          args: [],
        })
      : null;
    const totalSupply = fetchShape?.totalSupply
      ? ((await client.readContract({
          abi: LOCAL_ABI.ERC20,
          address: tokenAddress as `0x${string}`,
          functionName: "totalSupply",
          args: [],
        })) as bigint)
      : null;
    const balance =
      fetchShape?.balanceOf && userAddress
        ? ((await client.readContract({
            abi: LOCAL_ABI.ERC20,
            address: tokenAddress as `0x${string}`,
            functionName: "balanceOf",
            args: [userAddress],
          })) as bigint)
        : null;
    const allowance =
      fetchShape?.allowance && userAddress && spenderAddress
        ? ((await client.readContract({
            abi: LOCAL_ABI.ERC20,
            address: tokenAddress as `0x${string}`,
            functionName: "allowance",
            args: [userAddress, spenderAddress],
          })) as bigint)
        : null;

    const data = {
      decimals,
      name,
      symbol,
      totalSupply: totalSupply ? (totalSupply?.toString() as string) : null,
      balance: balance ? (balance?.toString() as string) : null,
      allowance: allowance ? (allowance?.toString() as string) : null,
      isApproved: !!allowance && allowance > 0n,
    };

    // console.log('data', data);
    return data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.message as string);
  }
};

export const useERC20 = ({
  tokenAddress,
  userAddress,
  spenderAddress,
  chainId,
  rpcs,
  cacheTime = 1000 * 60 * 20,
  staleTime = 1000 * 60 * 20,
  fetchShape = {
    decimals: true,
    name: true,
    symbol: true,
    totalSupply: true,
    balanceOf: true,
    allowance: true,
  },
}: {
  tokenAddress: string;
  userAddress?: string | null;
  spenderAddress?: string | null;
  chainId: ValidNetwork;
  rpcs?: Keychain;
  cacheTime?: number;
  staleTime?: number;
  fetchShape?: FetchShape;
}) => {
  const { data, error, ...rest } = useQuery(
    [
      `tokenData-${tokenAddress}`,
      { tokenAddress, userAddress, chainId, spenderAddress },
    ],
    () =>
      fetchTokenData({
        tokenAddress,
        userAddress,
        chainId,
        rpcs,
        spenderAddress,
        fetchShape,
      }),
    {
      enabled: !!tokenAddress && !!chainId,
      cacheTime,
      staleTime,
    }
  );
  return { tokenData: data, error: error as Error, ...rest };
};
