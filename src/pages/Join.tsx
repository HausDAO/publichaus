import { useDHConnect } from '@daohaus/connect';
import { useERC20 } from '../hooks/useERC20';
import { TARGET_DAO } from '../targetDAO';
import { RiScales3Line } from 'react-icons/ri';
import {
  Button,
  dangerBtn,
  DataIndicator,
  Divider,
  H1,
  H2,
  Input,
  Label,
  Link,
  ParLg,
  ParMd,
  ParSm,
  SingleColumnLayout,
  Spinner,
  Theme,
  useToast,
  widthQuery,
} from '@daohaus/ui';
import { useUserMember } from '../hooks/useUserMember';
import { useEffect, useMemo, useState } from 'react';
import { useTxBuilder } from '@daohaus/tx-builder';
import { MaxUint256 } from '@ethersproject/constants';
import { TX } from '../legos/tx';
import {
  formatDistanceToNowFromSeconds,
  formatValueTo,
  fromWei,
  handleErrorMessage,
  isNumberish,
  toBaseUnits,
  toWholeUnits,
  TXLego,
} from '@daohaus/utils';
import styled from 'styled-components';
import { useOnboarder } from '../hooks/useOnboarder';
import { DelegateData, Member } from '../utils/types';
import { useRecords } from '../hooks/useRecord';
import { isDelegateData } from '../utils/typeguards';

const StakeBox = styled.div`
  width: 53rem;
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
const DataGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  /* justify-content: space-between; */
  padding: 2rem 0;
  margin-bottom: 2rem;
  div {
    margin-right: 4rem;
    @media ${widthQuery.sm} {
      min-width: 100%;
    }
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
  const { shamanData, isLoading: isShamanLoading } = useOnboarder({
    shamanAddress: TARGET_DAO.SHAMAN_ADDRESS,
    chainId: TARGET_DAO.CHAIN_ID,
    fetchShape: {
      expiry: true,
    },
  });
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
  const { expiry } = shamanData || {};

  const [isOptimisticApproved, setIsOptimisticApproved] = useState<
    Record<string, boolean>
  >({});
  const [isLoadingTx, setIsLoadingTx] = useState(false);
  const { successToast, errorToast, defaultToast } = useToast();
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
            description: `Staked ${TARGET_DAO.STAKE_TOKEN_NAME} for DAO Shares`,
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
        <H2>Join Public Haus</H2>
        <ParLg>Stake {TARGET_DAO.STAKE_TOKEN_NAME} to Join</ParLg>
        <DataGrid>
          <DataIndicator
            label="Stake Token:"
            data={TARGET_DAO.STAKE_TOKEN_NAME}
            size="sm"
          />
          <DataIndicator label="Stake Ratio:" data="1:1" size="sm" />
          {expiry && <ExpiryIndicator expiry={expiry} />}
        </DataGrid>
        <Divider className="space" />
        <MembershipSection user={user as Member | null} balance={balance} />
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

const MembershipBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 2rem;
`;

const MembershipSection = ({
  user,
  balance,
}: {
  user?: Member | null;
  balance?: string | null;
}) => {
  const { address } = useDHConnect();
  const { records } = useRecords({
    daoId: TARGET_DAO.ADDRESS,
    chainId: TARGET_DAO.CHAIN_ID,
    recordType: 'credential',
  });

  const userRecords = useMemo(() => {
    if (!records?.length || !address) return [];
    return records
      .filter(
        (record) =>
          isDelegateData(record.parsedContent) &&
          record?.parsedContent?.recipientAddress?.toLowerCase() ===
            address?.toLowerCase()
      )
      .sort((a, b) => (Number(a?.createdAt) > Number(b?.createdAt) ? -1 : 1))
      .map(
        (record) =>
          isDelegateData(record?.parsedContent) && {
            ...record.parsedContent,
            createdAt: record.createdAt,
          }
      ) as DelegateData[];
  }, [records, address]);
  const latestRecord = userRecords?.[0];
  return (
    <MembershipBox>
      {user ? (
        <ParLg>You are a member</ParLg>
      ) : (
        <ParLg>You are not a member of this DAO</ParLg>
      )}
      <DataGrid>
        <DataIndicator
          size="sm"
          label={`Your ${TARGET_DAO.STAKE_TOKEN_NAME} Balance`}
          data={
            balance != null
              ? formatValueTo({
                  value: fromWei(balance),
                  format: 'numberShort',
                })
              : '--'
          }
        />
        <DataIndicator
          size="sm"
          label={'DAO Shares'}
          data={
            user?.shares != null
              ? formatValueTo({
                  value: fromWei(user.shares),
                  decimals: TARGET_DAO.STAKE_TOKEN_DECIMALS,
                  format: 'number',
                })
              : '--'
          }
        />
      </DataGrid>
      <Divider className={user ? 'space' : ''} />
      {user && (
        <>
          <ParLg className="space">Verification Status:</ParLg>
          {latestRecord ? (
            <>
              <ParMd className="small-space">
                The DAO has verified your identity
              </ParMd>
              <Link href={`/profile/${address}`} className="space">
                View your profile here
              </Link>
            </>
          ) : (
            <>
              <ParMd className="small-space">
                You are not yet verified by the DAO.
              </ParMd>
              <Link href={`/apply`} className="space">
                Verify your identity here
              </Link>
            </>
          )}
          <Divider className="space" />
        </>
      )}
    </MembershipBox>
  );
};

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
        <Label>
          <>
            {isApproved ? 'Stake' : 'Approve'} {TARGET_DAO.STAKE_TOKEN_SYMBOL}{' '}
            to Join
          </>
        </Label>
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
          Approve {TARGET_DAO.STAKE_TOKEN_SYMBOL}
        </Button>
      )}
    </>
  );
};

const ExpiryIndicator = ({ expiry }: { expiry: string }) => {
  const expiryDate = formatDistanceToNowFromSeconds(expiry);
  return <DataIndicator label="Expires:" data={expiryDate} size="sm" />;
};
