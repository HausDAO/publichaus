import { useTxBuilder } from '@daohaus/tx-builder';
import { Button, ParMd, useToast } from '@daohaus/ui';
import { TXLego } from '@daohaus/utils';
import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';
import { TX } from '../legos/tx';

const DelegationBox = styled.div`
  margin-top: 4rem;
`;

export const DelegationActions = ({
  userAddress,
  memberAddress,
  userDelegatingTo,
  isUserMember,
}: {
  userAddress?: string | null;
  memberAddress?: string | null;
  userDelegatingTo?: string;
  isUserMember: boolean;
}) => {
  const { fireTransaction } = useTxBuilder();
  const { successToast } = useToast();

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (!memberAddress) return;

    const delegateAddress =
      (e.target as HTMLInputElement).value === 'pageMemberAddress'
        ? memberAddress
        : userAddress;

    fireTransaction({
      tx: {
        ...TX.MANAGE_DELEGATE,
        staticArgs: [delegateAddress],
      } as TXLego,
      lifeCycleFns: {
        onPollSuccess() {
          successToast({
            title: 'Delegate Success',
          });
        },
      },
    });
  };

  if (memberAddress?.toLowerCase() === userAddress?.toLowerCase()) {
    return null;
  }

  if (!userAddress) {
    return (
      <DelegationBox>
        <ParMd>You are not Connected</ParMd>;
      </DelegationBox>
    );
  }

  if (!isUserMember) {
    return (
      <DelegationBox>
        <ParMd>You are not a member</ParMd>;
      </DelegationBox>
    );
  }

  if (memberAddress === userDelegatingTo) {
    return (
      <DelegationBox>
        <ParMd>You are already delegating to this member</ParMd>
      </DelegationBox>
    );
  }

  return (
    <DelegationBox>
      <Button fullWidth onClick={handleClick} value="pageMemberAddress">
        Delegate
      </Button>
    </DelegationBox>
  );
};
