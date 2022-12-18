import { findMember } from '@daohaus/moloch-v3-data';
import { ValidNetwork, Keychain } from '@daohaus/keychain-utils';
import { useQuery } from 'react-query';
import { fetchProfile } from '../utils/cacheProfile';
import { MolochV3Member } from '@daohaus/moloch-v3-data';
import { AccountProfile } from '@daohaus/utils';
import { MemberWithProfile } from '../utils/types';
const defaultGraphKeys = { '0x1': import.meta.env.VITE_GRAPH_API_KEY_MAINNET };

const fetchMember = async ({
  chainId,
  daoId,
  memberAddress,
  graphApiKeys,
  withProfile,
}: {
  chainId: ValidNetwork;
  daoId: string;
  graphApiKeys: Keychain;
  memberAddress: string;
  withProfile: boolean;
}) => {
  try {
    const data = await findMember({
      networkId: chainId,
      graphApiKeys,
      dao: daoId,
      memberAddress,
    });
    // if (withProfile) {
    const profile = await fetchProfile(memberAddress);
    if (!data?.data?.member || !profile)
      throw new Error('No member or profile found');

    return { ...(data.data.member as MolochV3Member), profile };
    // }
    // return data?.data?.member;
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
  withProfile = false,
}: {
  chainId: ValidNetwork;
  daoId: string;
  graphApiKeys?: Keychain;
  memberAddress: string;
  withProfile?: boolean;
}) => {
  const { data, ...rest } = useQuery(
    [`MolochV3Member/${memberAddress}`, { chainId, daoId, memberAddress }],
    () =>
      fetchMember({ chainId, daoId, memberAddress, graphApiKeys, withProfile }),
    { enabled: !!chainId && !!daoId && !!memberAddress }
  );
  return { member: data, ...rest };
};
