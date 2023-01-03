import { LOCAL_ABI } from '@daohaus/abis';
import { useQuery } from 'react-query';

import { createContract } from '@daohaus/tx-builder';
import { ValidNetwork, Keychain } from '@daohaus/keychain-utils';

const fetchTokenData = async ({
  tokenAddress,
  userAddress,
  chainId,
  rpcs,
}: {
  tokenAddress: string;
  userAddress?: string | null;
  chainId: ValidNetwork;
  rpcs?: Keychain;
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
  chainId,
  rpcs,
}: {
  tokenAddress: string;
  userAddress?: string | null;
  chainId: ValidNetwork;
  rpcs?: Keychain;
}) => {
  const { data, error, ...rest } = useQuery(
    [`tokenData-${tokenAddress}`, { tokenAddress, userAddress, chainId }],
    () => fetchTokenData({ tokenAddress, userAddress, chainId, rpcs }),
    {
      enabled: !!tokenAddress && !!chainId,
    }
  );
  return { tokenData: data, error: error as Error, ...rest };
};
