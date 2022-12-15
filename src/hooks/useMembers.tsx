import { useQuery } from 'react-query';

import { ValidNetwork } from '@daohaus/keychain-utils';
import {
  listMembers,
  Member_OrderBy,
  Member_Filter,
} from '@daohaus/moloch-v3-data';
import { Paging, Ordering } from '@daohaus/data-fetch-utils';
const graphApiKeys = { '0x1': import.meta.env.VITE_GRAPH_API_KEY_MAINNET };

const fetchMembers = async ({
  chainId,
  filter,
  paging,
  ordering,
}: {
  chainId: ValidNetwork;
  ordering?: Ordering<Member_OrderBy>;
  filter: Member_Filter;
  paging: Paging;
}) => {
  try {
    const data = await listMembers({
      networkId: chainId,
      graphApiKeys: graphApiKeys,
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
  ordering,
}: {
  daoId: string;
  chainId: ValidNetwork;
  ordering?: Ordering<Member_OrderBy>;
  filter?: Member_Filter;
  paging?: Paging;
}) => {
  const { data, ...rest } = useQuery(
    ['molochV3Members', { daoId, chainId }],
    () =>
      fetchMembers({
        chainId,
        filter: filter || { dao: daoId },
        paging,
        ordering,
      }),
    { enabled: !!daoId && !!chainId && !!filter && !!ordering }
  );

  return { data, ...rest };
};
