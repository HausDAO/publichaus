import { LOCAL_ABI } from '@daohaus/abis';
import { useQuery } from 'react-query';

import { createContract } from '@daohaus/tx-builder';
import { ValidNetwork, Keychain } from '@daohaus/keychain-utils';

const fetchTokenData = async ({
  tokenAddress,
  userAddress,
  chainId,
  spenderAddress,
  rpcs,
}: {
  tokenAddress: string;
  userAddress?: string | null;
  chainId: ValidNetwork;
  rpcs?: Keychain;
  spenderAddress?: string | null;
}) => {
  const tokenContract = createContract({
    address: tokenAddress,
    abi: LOCAL_ABI.ERC20,
    chainId,
    rpcs,
  });

  try {
    const decimals = await tokenContract.decimals();
    const name = await tokenContract.name();
    const symbol = await tokenContract.symbol();
    const totalSupply = await tokenContract.totalSupply();

    if (spenderAddress && userAddress) {
      const allowance = await tokenContract.allowance(
        userAddress,
        spenderAddress
      );

      const balance = await tokenContract.balanceOf(userAddress);

      return {
        decimals: decimals.toString() as string,
        name,
        symbol,
        balance: balance.toString() as string,
        totalSupply: totalSupply.toString() as string,
        allowance: allowance.toString() as string,
        isApproved: allowance.gt(0),
      };
    }

    if (userAddress) {
      const balance = await tokenContract.balanceOf(userAddress);
      return {
        decimals: decimals.toString() as string,
        name,
        symbol,
        balance: balance.toString() as string,
        totalSupply: totalSupply.toString() as string,
      };
    }

    return {
      decimals: decimals.toString() as string,
      name,
      symbol,
      totalSupply: totalSupply.toString() as string,
    };
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
}: {
  tokenAddress: string;
  userAddress?: string | null;
  spenderAddress?: string | null;
  chainId: ValidNetwork;
  rpcs?: Keychain;
  cacheTime?: number;
  staleTime?: number;
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
      }),
    {
      enabled: !!tokenAddress && !!chainId,
      cacheTime,
      staleTime,
    }
  );
  return { tokenData: data, error: error as Error, ...rest };
};
