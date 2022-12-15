import { useQuery } from 'react-query';

import { ValidNetwork, Keychain } from '@daohaus/keychain-utils';
import { listRecords } from '@daohaus/moloch-v3-data';

const defaultGraphApiKeys = {
  '0x1': import.meta.env.VITE_GRAPH_API_KEY_MAINNET,
};

const fetchRecords = async ({
  daoId,
  chainId,
  recordType,
  pageSize,
  offset,
  graphApiKeys,
  credentialType,
}: {
  daoId: string;
  chainId: ValidNetwork;
  recordType: string;
  pageSize: number;
  offset: number;
  graphApiKeys: Keychain;
  credentialType?: string;
}) => {
  try {
    const data = await listRecords({
      networkId: chainId,
      graphApiKeys: graphApiKeys,
      filter: { dao: daoId, table: recordType },
      paging: { pageSize, offset },
    });
    if (credentialType) {
      return data.items.filter(
        (item: any) =>
          item?.parsedContent?.credentialIdentifier === credentialType
      );
    }
    return data.items;
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.message as string);
  }
};

export const useRecords = ({
  daoId,
  chainId,
  recordType,
  pageSize = 20,
  offset = 0,
  graphApiKeys = defaultGraphApiKeys,
  credentialType,
}: {
  daoId: string;
  chainId: ValidNetwork;
  recordType: string;
  pageSize?: number;
  offset?: number;
  graphApiKeys?: Keychain;
  credentialType?: string;
}) => {
  const { data, ...rest } = useQuery(
    [credentialType || recordType, { daoId, chainId }],
    () =>
      fetchRecords({
        daoId,
        chainId: chainId as ValidNetwork,
        recordType,
        pageSize,
        offset,
        graphApiKeys,
        credentialType,
      }),
    { enabled: !!daoId && !!chainId }
  );

  return { records: data, ...rest };
};
