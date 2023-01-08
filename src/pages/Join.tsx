import { useDHConnect } from '@daohaus/connect';
import { useERC20 } from '../hooks/useERC20';
import { TARGET_DAO } from '../targetDAO';
import { RiScales3Line } from 'react-icons/ri';
import {
  Button,
  dangerBtn,
  DataIndicator,
  H1,
  Input,
  Label,
  ParMd,
  ParSm,
  SingleColumnLayout,
  Theme,
  useToast,
  widthQuery,
} from '@daohaus/ui';
import { useUserMember } from '../hooks/useUserMember';
import { useEffect, useState } from 'react';
import { useTxBuilder } from '@daohaus/tx-builder';
import { MaxUint256 } from '@ethersproject/constants';
import { TX } from '../legos/tx';
import {
  handleErrorMessage,
  isNumberish,
  nowInSeconds,
  toBaseUnits,
  TXLego,
} from '@daohaus/utils';
import styled, { useTheme } from 'styled-components';
import { useOnboarder } from '../hooks/useOnboarder';

const StakeBox = styled.div`
  width: 53rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  input {
    margin-bottom: 2rem;
  }
  p {
    margin-bottom: 2rem;
  }
  svg {
    margin-bottom: 2rem;
  }
  h1 {
    margin-bottom: 2rem;
  }
  label {
    margin-bottom: 1rem;
  }
  .input-box {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .err {
    margin-top: -1rem;
    color: ${({ theme }: { theme: Theme }) => theme.danger.step9};
  }
`;
const DataGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
  padding: 2rem 0;
  div {
    margin-right: 2rem;
    @media ${widthQuery.sm} {
      min-width: 100%;
    }
  }
`;

export const Join = () => {
  const { address } = useDHConnect();
  const { fireTransaction } = useTxBuilder();
  const {
    tokenData,
    isLoading: isTokenLoading,
    isRefetching,
  } = useERC20({
    tokenAddress: TARGET_DAO.STAKE_TOKEN,
    chainId: TARGET_DAO.CHAIN_ID,
    userAddress: address,
    spenderAddress: TARGET_DAO.SHAMAN_ADDRESS,
    fetchShape: {
      allowance: true,
    },
  });

  const { shamanData, isLoading: isShamanLoading } = useOnboarder({
    shamanAddress: TARGET_DAO.SHAMAN_ADDRESS,
    chainId: TARGET_DAO.CHAIN_ID,
    fetchShape: {
      expiry: true,
    },
  });
  const { expiry } = shamanData || {};
  console.log('expiry', expiry);
  const { isApproved } = tokenData || {};
  const {
    user,
    isLoading: isUserLoading,
    isMember,
    refetch: refetchUser,
  } = useUserMember({
    daoId: TARGET_DAO.ADDRESS,
    chainId: TARGET_DAO.CHAIN_ID,
    memberAddress: address,
  });

  const [isOptimisticApproved, setIsOptimisticApproved] = useState<
    Record<string, boolean>
  >({});
  const [isLoadingTx, setIsLoadingTx] = useState(false);
  const { successToast, errorToast } = useToast();
  const userOptimisticApproved = address && isOptimisticApproved?.[address];

  const isLoadingAll = isTokenLoading || isUserLoading || isShamanLoading;

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
          setIsLoadingTx(false);
          successToast({
            title: 'Success',
            description: 'Successfully Staked Tokens',
          });
          refetchUser();
        },
        onTxError(err) {
          const errMsg = handleErrorMessage(err as any);
          errorToast({ title: 'Error', description: errMsg });
          setIsLoadingTx(false);
        },
      },
    });
  };

  if (isLoadingAll) return <div>Loading...</div>;
  return (
    <SingleColumnLayout>
      <StakeBox>
        <H1>Join Public Haus</H1>
        {/* <ParMd>
          Stake 1 {TARGET_DAO.STAKE_TOKEN_NAME} for 1 Public Haus share
        </ParMd> */}
        <RiScales3Line size="12rem" />
        {!isMember && <ParMd>You are not yet a member of Public Haus</ParMd>}

        <DataGrid>
          <DataIndicator
            label="Stake Token"
            data={TARGET_DAO.STAKE_TOKEN_NAME}
            size="sm"
          />
          <DataIndicator label="Stake Ratio" data="1:1" size="sm" />
        </DataGrid>
        <StakeTokenSection
          isApproved={isApproved || userOptimisticApproved}
          handleApprove={handleApprove}
          handleStake={handleStake}
          isLoading={isLoadingTx || isRefetching}
        />
      </StakeBox>
    </SingleColumnLayout>
  );
};

const ApprovalSection = () => {};

const StakeTokenSection = ({
  isApproved,
  handleApprove,
  isLoading,
  handleStake,
}: {
  isLoading: boolean;
  isApproved: boolean;
  handleApprove: () => void;
  handleStake: (wholeAmt: string) => void;
}) => {
  const [stkAmt, setStkAmt] = useState<string>('');
  const [valMsg, setValMsg] = useState<string | null>();

  useEffect(() => {
    if (isNumberish(stkAmt) || !stkAmt) {
      setValMsg(null);
    } else {
      setValMsg('Please enter a valid number');
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStkAmt(e.target.value);
  };

  const handleLocalStake = () => {
    handleStake(stkAmt);
  };

  return (
    <>
      <div className="input-box">
        <Label>Stake Amount</Label>
        <Input
          id="stkAmt"
          onChange={handleChange}
          number
          //@ts-ignore
          value={stkAmt}
          disabled={!isApproved || isLoading}
          full
          placeholder={isApproved ? '0' : 'Approve first'}
        />
        {valMsg && <ParSm className="err">{valMsg}</ParSm>}
      </div>
      {isApproved ? (
        <Button
          type="button"
          onClick={handleLocalStake}
          fullWidth
          disabled={isLoading}
        >
          Stake
        </Button>
      ) : (
        <Button
          type="button"
          onClick={handleApprove}
          variant="outline"
          fullWidth
          disabled={isLoading}
        >
          Approve
        </Button>
      )}
    </>
  );
};

const ExpiryIndicator = (expiry: { expiry: string }) => {
  return <DataIndicator label="Time Left" data={'Expired'} size="sm" />;
};
