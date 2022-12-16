import { useQuery } from 'react-query';

import { ValidNetwork, Keychain } from '@daohaus/keychain-utils';
import {
  listMembers,
  Member_OrderBy,
  Member_Filter,
} from '@daohaus/moloch-v3-data';
import { Paging, Ordering } from '@daohaus/data-fetch-utils';
import { Member } from '../utils/types';

const defaultGraphKeys = { '0x1': import.meta.env.VITE_GRAPH_API_KEY_MAINNET };

const fetchMembers = async ({
  chainId,
  filter,
  paging,
  ordering,
  graphApiKeys,
}: {
  chainId: ValidNetwork;
  ordering?: Ordering<Member_OrderBy>;
  filter: Member_Filter;
  paging: Paging;
  graphApiKeys: Keychain;
}) => {
  try {
    const data = await listMembers({
      networkId: chainId,
      graphApiKeys,
      filter,
      paging,
      ordering,
    });
    return data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.message as string);
  }
};

export const useMembers = ({
  daoId,
  chainId,
  filter,
  paging = { pageSize: 500, offset: 0 },
  ordering = { orderDirection: 'desc', orderBy: 'shares' },
  graphApiKeys = defaultGraphKeys,
}: {
  daoId: string;
  chainId: ValidNetwork;
  ordering?: Ordering<Member_OrderBy>;
  filter?: Member_Filter;
  paging?: Paging;
  graphApiKeys?: Keychain;
}) => {
  const defaultFilter = filter || { dao: daoId };

  const { data, ...rest } = useQuery(
    ['molochV3Members', { daoId, chainId }],
    () =>
      fetchMembers({
        chainId,
        filter: defaultFilter,
        paging,
        ordering,
        graphApiKeys,
      }),
    { enabled: !!daoId && !!chainId && !!defaultFilter && !!ordering }
  );

  return { members: data?.items as Member[], ...data, ...rest };
};
