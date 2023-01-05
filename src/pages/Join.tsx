import { useDHConnect } from '@daohaus/connect';
import { useERC20 } from '../hooks/useERC20';
import { TARGET_DAO } from '../targetDAO';
import { RiScales3Line } from 'react-icons/ri';
import { Button, H1, Input, ParMd, SingleColumnLayout } from '@daohaus/ui';
import { useUserMember } from '../hooks/useUserMember';
import { useState } from 'react';
import { useTxBuilder } from '@daohaus/tx-builder';
import { MaxUint256 } from '@ethersproject/constants';
import { TX } from '../legos/tx';
import { TXLego } from '@daohaus/utils';
export const Join = () => {
  const { address } = useDHConnect();
  const { fireTransaction } = useTxBuilder();

  const {
    tokenData,
    isLoading: isTokenLoading,
    isRefetching,
    // refetch,
  } = useERC20({
    tokenAddress: TARGET_DAO.STAKE_TOKEN,
    chainId: TARGET_DAO.CHAIN_ID,
    userAddress: address,
    spenderAddress: TARGET_DAO.SHAMAN_ADDRESS,
    fetchShape: {
      balanceOf: true,
      allowance: true,
      name: true,
      decimals: true,
    },
  });

  const { balance, isApproved, allowance } = tokenData || {};
  const {
    user,
    isLoading: isUserLoading,
    isMember,
  } = useUserMember({
    daoId: TARGET_DAO.ADDRESS,
    chainId: TARGET_DAO.CHAIN_ID,
    memberAddress: address,
  });

  const [isLoadingTx, setIsLoadingTx] = useState(false);

  const handleApprove = () => {
    fireTransaction({
      tx: {
        ...TX.APPROVE_TOKEN,
        staticArgs: [TARGET_DAO.SHAMAN_ADDRESS, MaxUint256],
      } as TXLego,
      lifeCycleFns: {
        onTxSuccess() {
          // refetch();
          setIsLoadingTx(false);
          console.log('success');
        },
      },
    });
  };

  // const { shamanData, isLoading: isShamanLoading } = useOnboarder({
  //   shamanAddress: TARGET_DAO.SHAMAN_ADDRESS,
  //   chainId: TARGET_DAO.CHAIN_ID,
  // });

  if (isTokenLoading || isUserLoading) return <div>Loading...</div>;

  return (
    <SingleColumnLayout>
      <H1>Join Public Haus</H1>
      {!isMember && <ParMd>You are not yet a member of Public Haus</ParMd>}
      <RiScales3Line size="12rem" />
      <ParMd>Stake 1 {tokenData?.name} for 1 Public Haus share</ParMd>
      {
        <StakeTokenSection
          isApproved={isApproved}
          handleApprove={handleApprove}
          isLoading={isLoadingTx || isRefetching}
        />
      }
    </SingleColumnLayout>
  );
};

const ApprovalSection = () => {};

const StakeTokenSection = ({
  isApproved,
  handleApprove,
  isLoading,
}: {
  isLoading: boolean;
  isApproved: boolean;
  handleApprove: () => void;
}) => {
  const [stkAmt, setStkAmt] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStkAmt(e.target.value);
  };

  const handleStake = () => {
    console.log('stake', stkAmt);
  };

  if (isApproved) {
    return (
      <>
        <Input
          id="stkAmt"
          onChange={handleChange}
          number
          //@ts-ignore
          value={stkAmt}
        />
        <Button type="button" onClick={handleStake}>
          Stake
        </Button>
      </>
    );
  } else {
    return <Button onClick={handleApprove}>Approve</Button>;
  }
};
