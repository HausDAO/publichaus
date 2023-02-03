import { MouseEventHandler } from 'react';
import styled from 'styled-components';

import { useDHConnect } from '@daohaus/connect';
import { useTxBuilder } from '@daohaus/tx-builder';
import { Button, ParMd, useToast } from '@daohaus/ui';
import { TXLego } from '@daohaus/utils';

import { TX } from '../legos/tx';
import { ButtonRouterLink } from './ButtonRouterLink';

const DelegationBox = styled.div`
  margin-top: 2rem;
  .spacer {
    margin-bottom: 2rem;
  }
`;

export const DelegationActions = ({
  userAddress,
  memberAddress,
  userDelegatingTo,
  isUserMember,
  onSuccess,
  onError,
}: {
  userAddress?: string | null;
  memberAddress?: string | null;
  userDelegatingTo?: string;
  isUserMember: boolean;
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  const { connectWallet } = useDHConnect();
  const { fireTransaction } = useTxBuilder();
  const { successToast, errorToast, defaultToast } = useToast();
  const isUserProfile =
    memberAddress?.toLowerCase() === userAddress?.toLowerCase();
  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (!memberAddress) return;

    const delegateAddress =
      (e.target as HTMLInputElement).value === 'pageMemberAddress'
        ? memberAddress
        : userAddress;

    if (!delegateAddress) {
      errorToast({ title: 'Delegate Error', description: 'No address found' });
      return;
    }

    fireTransaction({
      tx: {
        ...TX.MANAGE_DELEGATE,
        staticArgs: [delegateAddress],
      } as TXLego,
      lifeCycleFns: {
        onTxError() {
          onError?.();
          errorToast({
            title: 'Delegate Error',
            description: 'Error submitting Delegate transaction',
          });
        },
        onTxSuccess() {
          defaultToast({
            title: 'Delegate Success',
            description: 'Stake succesfully delegated',
          });
        },
        onPollError() {
          onError?.();
          errorToast({
            title: 'Delegate Error',
            description: 'Error indexing Delegate transaction to subgraph',
          });
        },
        onPollSuccess() {
          onSuccess?.();
          successToast({
            title: 'Delegate Success',
          });
        },
      },
    });
  };
  if (!userAddress) {
    return (
      <DelegationBox>
        <ParMd className="spacer">Connect Wallet</ParMd>
        <Button fullWidth onClick={connectWallet}>
          Connect Wallet
        </Button>
      </DelegationBox>
    );
  }

  if (isUserProfile && userDelegatingTo === userAddress) {
    return (
      <DelegationBox>
        <ParMd className="spacer">You are not delegating shares</ParMd>
        <ButtonRouterLink to="/delegates" color="secondary" fullWidth>
          Choose a Champion
        </ButtonRouterLink>
      </DelegationBox>
    );
  }

  if (isUserProfile && userDelegatingTo !== userAddress) {
    return null;
  }

  if (!isUserMember) {
    return (
      <DelegationBox>
        <ParMd className="spacer">Only DAO members can delegate</ParMd>
        <ButtonRouterLink to="/join" fullWidth>
          Join DAO
        </ButtonRouterLink>
      </DelegationBox>
    );
  }

  if (memberAddress === userDelegatingTo) {
    return (
      <DelegationBox>
        <ParMd className="spacer">
          You are already delegating to this member
        </ParMd>
        <Button
          fullWidth
          onClick={handleClick}
          variant="outline"
          value="userAddress"
        >
          Unstake Delegation
        </Button>
      </DelegationBox>
    );
  }

  return (
    <DelegationBox>
      <ParMd className="spacer">Delegate to this Member</ParMd>
      <Button fullWidth onClick={handleClick} value="pageMemberAddress">
        Delegate
      </Button>
    </DelegationBox>
  );
};
