import { H1 } from '@daohaus/ui';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useMember } from '../hooks/useMember';
import { TARGET_DAO } from '../targetDAO';

export const Profile = () => {
  const { memberAddress } = useParams();

  const { member } = useMember({
    daoId: TARGET_DAO.ADDRESS,
    chainId: TARGET_DAO.CHAIN_ID,
    memberAddress: memberAddress as string,
  });

  console.log('member', member);
  return <H1>{memberAddress}</H1>;
};
