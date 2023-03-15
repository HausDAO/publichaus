import { useDHConnect } from '@daohaus/connect';
import { useERC20 } from '../hooks/useERC20';
import { TARGET_DAO } from '../targetDAO';
import {
  DataIndicator,
  Divider,
  H2,
  ParLg,
  ParMd,
  ParSm,
  SingleColumnLayout,
  Spinner,
  Theme,
  useToast,
} from '@daohaus/ui';
import { useUserMember } from '../hooks/useUserMember';
import { useState } from 'react';
import { useTxBuilder } from '@daohaus/tx-builder';
import { MaxUint256 } from '@ethersproject/constants';
import { TX } from '../legos/tx';
import {
  formatDistanceToNowFromSeconds,
  handleErrorMessage,
  toBaseUnits,
  TXLego,
} from '@daohaus/utils';
import styled from 'styled-components';
import { useOnboarder } from '../hooks/useOnboarder';
import { Member } from '../utils/types';
import { StakeTokenSection } from '../components/StakeTokenSection';
import { DataGrid } from '../components/DataGrid';
import { MembershipSection } from '../components/MembershipSection';

const StakeBox = styled.div`
  max-width: 70rem;
  width: 100%;
  display: flex;
  flex-direction: column;

  input {
    margin-bottom: 2rem;
  }
  .space {
    margin-bottom: 2rem;
  }
  .small-space {
    margin-bottom: 1rem;
  }
  svg {
    margin-bottom: 2rem;
  }
  h2 {
    margin-bottom: 4rem;
  }
  label {
    margin-bottom: 1rem;
  }
  .input-box {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 2rem;
  }
  .err {
    margin-top: 1rem;
    color: ${({ theme }: { theme: Theme }) => theme.danger.step9};
  }
`;

const SpinnerBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
export const Join = () => {
  const { address } = useDHConnect();
  const { fireTransaction } = useTxBuilder();
  const {
    tokenData,
    isLoading: isTokenLoading,
    isRefetching,
    refetch: refetchToken,
  } = useERC20({
    tokenAddress: TARGET_DAO.STAKE_TOKEN,
    chainId: TARGET_DAO.CHAIN_ID,
    userAddress: address,
    spenderAddress: TARGET_DAO.SHAMAN_ADDRESS,
    fetchShape: {
      allowance: true,
      balanceOf: true,
    },
  });
  // const { shamanData, isLoading: isShamanLoading } = useOnboarder({
  //   shamanAddress: TARGET_DAO.SHAMAN_ADDRESS,
  //   chainId: TARGET_DAO.CHAIN_ID,
  //   fetchShape: {
  //     expiry: true,
  //   },
  // });
  const {
    user,
    isLoading: isUserLoading,
    refetch: refetchUser,
  } = useUserMember({
    daoId: TARGET_DAO.ADDRESS,
    chainId: TARGET_DAO.CHAIN_ID,
    memberAddress: address,
  });
  const { isApproved, balance } = tokenData || {};
  // const { expiry } = shamanData || {};

  const [isOptimisticApproved, setIsOptimisticApproved] = useState<
    Record<string, boolean>
  >({});
  const [isLoadingTx, setIsLoadingTx] = useState(false);
  const { successToast, errorToast, defaultToast } = useToast();
  const userOptimisticApproved = address && isOptimisticApproved?.[address];
  const isLoadingAll = isTokenLoading || isUserLoading;

  const handleApprove = () => {
    if (!address) return;
    fireTransaction({
      tx: {
        ...TX.APPROVE_TOKEN,
        staticArgs: [TARGET_DAO.SHAMAN_ADDRESS, MaxUint256],
      } as TXLego,
      lifeCycleFns: {
        onRequestSign() {
          setIsLoadingTx(true);
        },
        onTxSuccess() {
          setIsLoadingTx(false);
          setIsOptimisticApproved({ [address]: true });
          successToast({ title: 'Success', description: 'Approved' });
          setIsLoadingTx(false);
        },
        onTxError(err) {
          const errMsg = handleErrorMessage(err as any);
          console.error(err);
          errorToast({ title: 'Error', description: errMsg });
          setIsLoadingTx(false);
        },
      },
    });
  };

  const handleStake = (wholeAmt: string) => {
    if (!wholeAmt) {
      errorToast({ title: 'Error', description: 'Please enter an amount' });
      return;
    }
    const baseAmt = toBaseUnits(
      wholeAmt,
      TARGET_DAO.STAKE_TOKEN_DECIMALS
    ).toString();

    fireTransaction({
      tx: {
        ...TX.STAKE,
        staticArgs: [baseAmt],
      } as TXLego,
      lifeCycleFns: {
        onRequestSign() {
          setIsLoadingTx(true);
        },
        onTxSuccess() {
          defaultToast({
            title: 'Success',
            description: 'Transaction submitted: Syncing data on Subgraph',
          });
          refetchUser();
        },
        onTxError(err) {
          const errMsg = handleErrorMessage(err as any);
          errorToast({ title: 'Error', description: errMsg });
          setIsLoadingTx(false);
        },
        onPollSuccess() {
          setIsLoadingTx(false);
          successToast({
            title: 'Success',
            description: `Staked ${TARGET_DAO.STAKE_TOKEN_SYMBOL} for DAO Shares`,
          });
          refetchUser();
          refetchToken();
        },
        onPollError(err) {
          const errMsg = handleErrorMessage(err as any);
          errorToast({ title: 'Error', description: errMsg });
          setIsLoadingTx(false);
        },
      },
    });
  };

  if (isLoadingAll)
    return (
      <SingleColumnLayout>
        <StakeBox>
          <H2>Loading</H2>
          <ParMd className="space">
            Fetching Data from RPC. Load times may be longer than usual.{' '}
          </ParMd>
          <SpinnerBox>
            <Spinner size="12rem" />
          </SpinnerBox>
        </StakeBox>
      </SingleColumnLayout>
    );
  return (
    <SingleColumnLayout>
      <StakeBox>
        <H2>Join Frog</H2>
        <ParLg>Stake {TARGET_DAO.STAKE_TOKEN_SYMBOL} to Join</ParLg>
        <ParSm>You can get up to 100 shares all further stake is represented as LOOT</ParSm>
        <DataGrid>
          <DataIndicator
            label="Stake Token:"
            data={TARGET_DAO.STAKE_TOKEN_SYMBOL}
            size="sm"
          />
          <DataIndicator label="Stake Ratio:" data={`1:10`} size="sm" />
          <DataIndicator
            label="Stake Shares Cap:"
            data={'1000'}
            size="sm"
          />
        </DataGrid>
        <Divider className="space" />
        <MembershipSection user={user as Member | null} balance={balance} />
        <StakeTokenSection
          balance={balance}
          isApproved={isApproved || userOptimisticApproved}
          handleApprove={handleApprove}
          handleStake={handleStake}
          isLoading={isLoadingTx || isRefetching}
        />
      </StakeBox>
    </SingleColumnLayout>
  );
};

const ExpiryIndicator = ({ expiry }: { expiry: string }) => {
  const expiryDate = formatDistanceToNowFromSeconds(expiry);
  return <DataIndicator label="Expires:" data={expiryDate} size="sm" />;
};
