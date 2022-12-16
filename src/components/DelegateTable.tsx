import { Card, widthQuery } from '@daohaus/ui';
import { useMemo } from 'react';
import { Column } from 'react-table';
import styled from 'styled-components';

import { RegisteredMembers, RegisteredMember } from '../utils/types';
import { DaoTable } from './DaoTable';
import { DelegateOverview } from './DelegateOverview';
import { MemberProfileAvatar } from './MemberProfileAvatar';

const DelegateContainer = styled(Card)`
  padding: 3rem;
  border: none;
  margin-bottom: 3rem;
  min-height: 20rem;
  width: 100%;
  overflow-x: auto;
  th {
    min-width: 10rem;
  }
  .hide-sm {
    button {
      padding-left: 0.5rem;
    }
  }
  @media ${widthQuery.lg} {
    max-width: 100%;
    min-width: 0;
  }
  @media ${widthQuery.md} {
    .hide-sm {
      display: none;
    }
  }
`;

export const DelegateTable = ({
  registeredDelegates,
}: {
  registeredDelegates: RegisteredMembers;
}) => {
  const columns = useMemo<Column<RegisteredMember>[]>(() => {
    return [
      {
        Header: 'Delegate',
        accessor: 'memberAddress',
        Cell: ({ value }) => {
          return (
            <MemberProfileAvatar
              daochain="0x5"
              daoid="0xc035dd7cda32ae73f0f306ed56658527aad47648"
              memberAddress={value}
            />
          );
        },
      },
    ];
  }, []);

  return (
    <DelegateContainer>
      <DelegateOverview registeredDelegates={registeredDelegates} />
      <DaoTable<RegisteredMember>
        tableData={Object.values(registeredDelegates)}
        columns={columns}
        sortableColumns={[]}
      />
    </DelegateContainer>
  );
};
