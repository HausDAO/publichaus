import { Card, DataIndicator, ParMd, Theme, widthQuery } from '@daohaus/ui';
import { useMemo } from 'react';
import styled from 'styled-components';
import { TARGET_DAO } from '../targetDAO';
import { RegisteredMembers } from '../utils/types';
import { MemberProfileAvatar } from './MemberProfileAvatar';

const DataGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-content: space-between;
  padding: 2rem 0;
  div {
    width: 19.7rem;
    @media ${widthQuery.sm} {
      min-width: 100%;
    }
  }
`;

const SpacedIndicator = styled(DataIndicator)`
  padding: 2rem 0;
  width: 19.7rem;

  @media ${widthQuery.sm} {
    min-width: 100%;
  }
`;

const DelegatesOverviewCard = styled(Card)`
  background-color: ${({ theme }: { theme: Theme }) => theme.secondary.step3};
  border: none;
  padding: 3rem;
  width: 100%;
`;
const DataIndicatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  button {
    padding: 0;
  }
`;
export const DataIndicatorLabelMd = styled(ParMd)`
  opacity: 0.9;
`;

export const DelegateOverview = ({
  registeredDelegates,
  userDelegateAddress,
  userAddress,
}: {
  registeredDelegates: RegisteredMembers;
  userAddress?: string;
  userDelegateAddress?: string;
}) => {
  const userDelegateData = useMemo(() => {
    if (
      !userDelegateAddress ||
      !userAddress ||
      userDelegateAddress.toLowerCase() === userAddress.toLowerCase()
    )
      return null;
    return userDelegateAddress;
  }, [userDelegateAddress, userAddress]);

  return (
    <DelegatesOverviewCard>
      <DataGrid>
        <SpacedIndicator
          label="Delegates"
          data={Object.keys(registeredDelegates).length}
        />
        <DataIndicatorContainer>
          <DataIndicatorLabelMd>Delegating To</DataIndicatorLabelMd>
          {userDelegateData ? (
            <MemberProfileAvatar
              daochain={TARGET_DAO.CHAIN_ID}
              daoid={TARGET_DAO.ADDRESS}
              memberAddress={userDelegateData}
            />
          ) : (
            'SELF'
          )}
        </DataIndicatorContainer>
      </DataGrid>
    </DelegatesOverviewCard>
  );
};
