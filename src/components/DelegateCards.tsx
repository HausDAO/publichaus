import React, { ReactNode, useMemo } from 'react';
import { RegisteredMembers } from '../utils/types';
import { MolochV3Dao } from '@daohaus/moloch-v3-data';
import { Input, widthQuery } from '@daohaus/ui';
import styled from 'styled-components';
import { SortDropdown } from './SortDropdown';
import { DelegateCard } from './DelegateCard';
import { ReactSetter } from '@daohaus/utils';
import { BiSearch } from 'react-icons/bi';

const handleSearch = (term: string, delegates: RegisteredMembers) => {
  return Object.values(delegates).filter((delegate) => {
    return (
      delegate?.profile?.name?.toLowerCase().includes(term.toLowerCase()) ||
      delegate?.profile?.ens?.toLowerCase().includes(term.toLowerCase()) ||
      delegate.memberAddress.toLowerCase().includes(term.toLowerCase())
    );
  });
};

type Sortable = 'shares' | 'delegateShares';

export const DelegateCards = ({
  registeredDelegates,
  dao,
  userAddress,
  userDelegateAddress,
}: {
  registeredDelegates: RegisteredMembers;
  dao: MolochV3Dao;
  userAddress?: string;
  userDelegateAddress?: string;
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [sort, setSort] = React.useState<Sortable>('delegateShares');

  const processedDelegates = useMemo(() => {
    if (searchTerm) {
      return handleSearch(searchTerm, registeredDelegates);
    }

    return Object.values(registeredDelegates).sort((a, b) => {
      if (sort === 'delegateShares') {
        return Number(b.delegateShares) > Number(a.delegateShares) ? 1 : -1;
      }
      if (sort === 'shares') {
        return Number(b.shares) > Number(a.shares) ? 1 : -1;
      }
      return 0;
    });
  }, [registeredDelegates, searchTerm, sort]);

  return (
    <ListControl
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      sort={sort}
      setSort={setSort}
    >
      {Object.values(processedDelegates).map((delegate) => (
        <DelegateCard
          delegate={delegate}
          key={delegate.memberAddress}
          dao={dao}
        />
      ))}
    </ListControl>
  );
};

const ControlBarBox = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 3rem;
  .list-toggle {
    margin-right: auto;
  }
  @media ${widthQuery.sm} {
    flex-direction: column;
  }
`;

const CardBox = styled.div`
  margin-top: 3rem;
  max-width: 122rem;
  .inner-card-box {
    display: flex;
    gap: 3rem;
    flex-wrap: wrap;
    width: 100%;
  }
`;

const ListControl = ({
  children,
  searchTerm,
  setSearchTerm,
  sort,
  setSort,
}: {
  children: ReactNode;
  searchTerm: string;
  setSearchTerm: ReactSetter<string>;
  sort: Sortable;
  setSort: ReactSetter<Sortable>;
}) => {
  return (
    <CardBox>
      <ControlBarBox>
        <Input
          icon={BiSearch}
          id="table-search"
          placeholder={'Search'}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SortDropdown
          id="delegates-sort"
          label="Sort By"
          value={sort}
          options={[
            {
              name: 'Voting Power',
              value: 'delegateShares',
            },
            {
              name: 'Shares',
              value: 'shares',
            },
          ]}
          onChange={(e: any) => setSort(e.target.value)}
        />
      </ControlBarBox>
      <div className="inner-card-box">{children}</div>
    </CardBox>
  );
};
