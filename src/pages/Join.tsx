import { useDHConnect } from '@daohaus/connect';
import { useERC20 } from '../hooks/useERC20';
import { TARGET_DAO } from '../targetDAO';
import { RiScales3Line } from 'react-icons/ri';
import { Button, H1, Input, ParMd, SingleColumnLayout } from '@daohaus/ui';
import { useUserMember } from '../hooks/useUserMember';
import { useState } from 'react';
export const Join = () => {
  const { address } = useDHConnect();

  const { tokenData, isLoading: isTokenLoading } = useERC20({
    tokenAddress: TARGET_DAO.STAKE_TOKEN,
    chainId: TARGET_DAO.CHAIN_ID,
    userAddress: address,
    spenderAddress: TARGET_DAO.SHAMAN_ADDRESS,
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
      {<StakeTokenSection isApproved={isApproved} />}
    </SingleColumnLayout>
  );
};

const StakeTokenSection = ({ isApproved }: { isApproved: boolean }) => {
  const [stkAmt, setStkAmt] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStkAmt(e.target.value);
  };

  const handleStake = () => {
    console.log('stake', stkAmt);
  };

  const handleApprove = () => {
    console.log('approve');
  };

  if (isApproved) {
    return (
      <>
        <Input id="stkAmt" onChange={handleChange} />
        <Button type="button" onClick={handleStake}>
          Stake
        </Button>
      </>
    );
  } else {
    return <Button onClick={handleApprove}>Approve</Button>;
  }
};
