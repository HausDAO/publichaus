import { LOCAL_ABI } from '@daohaus/abis';
import OnboarderABI from '../abis/Onboarder.json';
import { createContract } from '@daohaus/tx-builder';
import { ValidNetwork, Keychain } from '@daohaus/keychain-utils';
import { useQuery } from 'react-query';

const fetchOnboarder = async ({
  shamanAddress,
  chainId,
  rpcs,
}: {
  shamanAddress: string;
  chainId: ValidNetwork;
  rpcs?: Keychain;
}) => {
  const shamanContract = createContract({
    address: shamanAddress,
    abi: OnboarderABI,
    chainId,
    rpcs,
  });
  console.log('shamanContract', shamanContract);
  try {
    const baal = await shamanContract.baal();
    const expiery = await shamanContract.expiery();
    const token = await shamanContract.token();

    return {
      baal,
      expiery: expiery.toString() as string,
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
}: {
  shamanAddress: string;
  chainId: ValidNetwork;
  rpcs?: Keychain;
}) => {
  const { data, error, ...rest } = useQuery(
    'OnboarderShaman',
    () => {
      return fetchOnboarder({
        shamanAddress,
        chainId,
        rpcs,
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
