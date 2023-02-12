import React, { ReactNode, useMemo } from 'react';
import { RegisteredMember, RegisteredMembers } from '../utils/types';
import { MolochV3Dao } from '@daohaus/moloch-v3-data';
import { SingleColumnLayout, widthQuery } from '@daohaus/ui';
import styled from 'styled-components';
import SearchInput from './SearchInput';
import { SortDropdown } from './SortDropdown';
import { DelegateCard } from './DelegateCard';

const handleSearch = (term: string, delegates: RegisteredMembers) => {
  return Object.values(delegates).filter((delegate) => {
    return (
      delegate?.profile?.name?.toLowerCase().includes(term.toLowerCase()) ||
      delegate?.profile?.ens?.toLowerCase().includes(term.toLowerCase()) ||
      delegate.memberAddress.toLowerCase().includes(term.toLowerCase())
    );
  });
};

export const DelegateCards = ({
  registeredDelegates,
  dao,
  userAddress,
  userDelegateAddress,
}: {
  registeredDelegates: RegisteredMembers;
  dao?: MolochV3Dao;
  userAddress?: string;
  userDelegateAddress?: string;
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [sort, setSort] = React.useState<'shares' | 'delegateShares'>('shares');

  const processedDelegates = useMemo(() => {
    if (searchTerm) {
      return handleSearch(searchTerm, registeredDelegates);
    }

    return Object.values(registeredDelegates).sort((a, b) => {
      if (sort === 'shares') {
        return Number(b.shares) > Number(a.shares) ? 1 : -1;
      }
      if (sort === 'delegateShares') {
        return Number(b.delegateShares) > Number(a.delegateShares) ? 1 : -1;
      }
      return 0;
    });
  }, [registeredDelegates]);

  return (
    <ListControl>
      {Object.values(processedDelegates).map((delegate) => (
        <DelegateCard delegate={delegate} />
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

const ListControl = ({ children }: { children: ReactNode }) => {
  return (
    <CardBox>
      <ControlBarBox>
        <SearchInput
          searchTerm=""
          setSearchTerm={() => null}
          noun={{ singular: 'Delegate', plural: 'Delegates' }}
          totalItems={0}
        />
        <SortDropdown
          id="delegates-sort"
          label="Sort By"
          options={[]}
          onChange={() => null}
        />
      </ControlBarBox>
      <div className="inner-card-box">{children}</div>
    </CardBox>
  );
};
