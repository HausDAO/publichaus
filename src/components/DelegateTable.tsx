import { Card, Link, widthQuery } from '@daohaus/ui';
import {
  formatValueTo,
  fromWei,
  sharesDelegatedToMember,
  votingPowerPercentage,
} from '@daohaus/utils';
import { useMemo } from 'react';
import { Column } from 'react-table';
import styled from 'styled-components';
import { useDaoData } from '../hooks/useDaoData';
import { TARGET_DAO } from '../targetDAO';

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
  const { dao } = useDaoData({
    daoid: TARGET_DAO.ADDRESS,
    daochain: TARGET_DAO.CHAIN_ID,
  });

  const columns = useMemo<Column<RegisteredMember>[]>(() => {
    if (!dao) return [];
    return [
      {
        Header: 'Delegate',
        accessor: 'memberAddress',
        Cell: ({ value }) => {
          return (
            <MemberProfileAvatar
              daochain={TARGET_DAO.CHAIN_ID}
              daoid={TARGET_DAO.ADDRESS}
              memberAddress={value}
            />
          );
        },
      },
      {
        Header: 'Voting Power',
        accessor: 'id',
        Cell: ({ row }) => {
          const { delegateShares } = row.original;
          return (
            <>{votingPowerPercentage(dao?.totalShares, delegateShares)} %</>
          );
        },
      },
      {
        Header: 'Shares',
        accessor: 'shares',
        Cell: ({ value }) => {
          return (
            <>
              {formatValueTo({
                value: fromWei(value),
                decimals: 2,
                format: 'number',
              })}
            </>
          );
        },
      },
      {
        Header: 'Delegate Shares',
        accessor: 'delegateShares',
        Cell: ({ value, row }) => {
          const { shares } = row.original;
          const delegatedShares = sharesDelegatedToMember(value, shares);
          return (
            <>
              {formatValueTo({
                value: fromWei(delegatedShares.toString()),
                decimals: 2,
                format: 'number',
              })}
            </>
          );
        },
      },
      {
        Header: 'Delegatees',
        accessor: 'delegateOfCount',
        Cell: ({ value }) => {
          return <>{value}</>;
        },
      },
      {
        Header: 'Platform',
        accessor: 'votes',
        Cell: ({ row }) => {
          const { memberAddress } = row.original;
          return <Link href={`/profile/${memberAddress}`}>See Profile</Link>;
        },
      },
    ];
  }, [dao, registeredDelegates]);

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