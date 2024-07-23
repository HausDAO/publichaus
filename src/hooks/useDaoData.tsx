import React from 'react';

import { MolochV3Dao, findDao } from '@daohaus/moloch-v3-data';
import { Keychain, ValidNetwork } from '@daohaus/keychain-utils';
import { useQuery } from 'react-query';
import { handleErrorMessage } from '@daohaus/utils';

const defaultGraphKeys = { 
  '0x1': import.meta.env.VITE_GRAPH_API_KEY_MAINNET,
  '0xa': import.meta.env.VITE_GRAPH_API_KEY_MAINNET
 };

export const fetchDao = async ({
  daoid,
  daochain,
  graphApiKeys,
}: {
  daoid: string;
  daochain: keyof Keychain;
  graphApiKeys: Keychain;
}) => {
  try {
    const daoRes = await findDao({
      networkId: daochain,
      dao: daoid,
      includeTokens: true,
      graphApiKeys,
    });

    if (daoRes?.data?.dao) {
      return daoRes.data.dao as MolochV3Dao;
    } else {
      console.error('no dao found');
    }
  } catch (error) {
    console.error(error);
    throw new Error(
      handleErrorMessage({ error, fallback: 'Error fetching DAO' })
    );
  }
};

export const useDaoData = ({
  daoid,
  daochain,
  graphApiKeys = defaultGraphKeys,
}: {
  daoid: string;
  daochain: keyof Keychain;
  graphApiKeys?: Keychain;
}) => {
  const { data, error, ...rest } = useQuery(
    ['MolochV3DAO', { daoid, daochain }],
    () => fetchDao({ daoid, daochain, graphApiKeys }),
    { enabled: !!daoid && !!daochain }
  );

  return { dao: data, error: error as Error, ...rest };
};
