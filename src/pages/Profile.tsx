import { H1 } from '@daohaus/ui';
import React from 'react';
import { useParams } from 'react-router-dom';

export const Profile = () => {
  const { memberAddress } = useParams();

  return <H1>{memberAddress}</H1>;
};
