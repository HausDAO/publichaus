import { findMember } from '@daohaus/moloch-v3-data';
import { ValidNetwork, Keychain } from '@daohaus/keychain-utils';
import { useQuery } from 'react-query';

const defaultGraphKeys = { '0x1': import.meta.env.VITE_GRAPH_API_KEY_MAINNET };

const fetchMember = async ({
  chainId,
  daoId,
  memberAddress,
  graphApiKeys,
}: {
  chainId: ValidNetwork;
  daoId: string;
  graphApiKeys: Keychain;
  memberAddress: string;
}) => {
  try {
    const data = await findMember({
      networkId: chainId,
      graphApiKeys,
      dao: daoId,
      memberAddress,
    });
    return data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.message as string);
  }
};

export const useMember = ({
  chainId,
  daoId,
  memberAddress,
  graphApiKeys = defaultGraphKeys,
}: {
  chainId: ValidNetwork;
  daoId: string;
  graphApiKeys?: Keychain;
  memberAddress: string;
}) => {
  const { data, ...rest } = useQuery(
    [`MolochV3Member/${memberAddress}`, { chainId, daoId, memberAddress }],
    () => fetchMember({ chainId, daoId, memberAddress, graphApiKeys }),
    { enabled: !!chainId && !!daoId && !!memberAddress }
  );
  return { member: data?.data?.member, ...rest };
};
