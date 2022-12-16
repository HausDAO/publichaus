import { Card, DataIndicator, Theme, widthQuery } from '@daohaus/ui';
import React from 'react';
import styled from 'styled-components';
import { RegisteredMembers } from '../utils/types';

const DataGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-content: space-between;
  div {
    padding: 2rem 0;
    width: 19.7rem;

    @media ${widthQuery.sm} {
      min-width: 100%;
    }
  }
`;

const DelegatesOverviewCard = styled(Card)`
  background-color: ${({ theme }: { theme: Theme }) => theme.secondary.step3};
  border: none;
  padding: 3rem;
  width: 100%;
`;

export const DelegateOverview = ({
  registeredDelegates,
}: {
  registeredDelegates: RegisteredMembers;
}) => {
  return (
    <DelegatesOverviewCard>
      <DataGrid>
        <DataIndicator
          label="Delegates"
          data={Object.keys(registeredDelegates).length}
        />
      </DataGrid>
      <DataIndicator />
    </DelegatesOverviewCard>
  );
};
