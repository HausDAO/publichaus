import { useDHConnect } from '@daohaus/connect';
import React from 'react';
import { useERC20 } from '../hooks/useERC20';
import { useOnboarder } from '../hooks/useOnboarder';
import { TARGET_DAO } from '../targetDAO';

export const Join = () => {
  const { address } = useDHConnect();

  const { tokenData } = useERC20({
    tokenAddress: TARGET_DAO.STAKE_TOKEN,
    chainId: TARGET_DAO.CHAIN_ID,
    userAddress: address,
  });
  const { shamanData } = useOnboarder({
    shamanAddress: TARGET_DAO.SHAMAN_ADDRESS,
    chainId: TARGET_DAO.CHAIN_ID,
  });

  console.log('tokenData', tokenData);
  console.log('shamanData', shamanData);
  return null;
};
