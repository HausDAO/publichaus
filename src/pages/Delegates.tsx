import {
  Card,
  DataIndicator,
  SingleColumnLayout,
  Theme,
  widthQuery,
} from '@daohaus/ui';
import { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useRecords } from '../hooks/useRecord';
import { DELEGATE_TABLE_REF } from '../legos/tx';

export const Delegates = () => {
  const { isLoading, records } = useRecords({
    daoId: '0xc035dd7cda32ae73f0f306ed56658527aad47648',
    chainId: '0x5',
    recordType: 'credential',
    credentialType: DELEGATE_TABLE_REF,
  });

  const registeredDelegates = useEffect(() => {}, [records]);

  return (
    <SingleColumnLayout>
      <DelegateTable />
    </SingleColumnLayout>
  );
};

const DelegateTable = () => {
  return null;
};
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

const DelegateOverview = () => {
  return (
    <DelegatesOverviewCard>
      <DataIndicator label="Delegates" data={2} />
      <DataIndicator />
    </DelegatesOverviewCard>
  );
};
