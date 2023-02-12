import React, { ReactNode } from 'react';
import { RegisteredMembers } from '../utils/types';
import { MolochV3Dao } from '@daohaus/moloch-v3-data';
import { SingleColumnLayout, widthQuery } from '@daohaus/ui';
import styled from 'styled-components';
import SearchInput from './SearchInput';
import { SortDropdown } from './SortDropdown';
import { DelegateCard } from './DelegateCard';

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
  return (
    <ListControl>
      {Object.values(registeredDelegates).map((delegate) => (
        <DelegateCard delegate={delegate} />
      ))}
    </ListControl>
  );
};

const ControlBarBox = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 1.6rem;
  .list-toggle {
    margin-right: auto;
  }
  @media ${widthQuery.sm} {
    flex-direction: column;
  }
`;

const ListControl = ({ children }: { children: ReactNode }) => {
  return (
    <SingleColumnLayout>
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
      {children}
    </SingleColumnLayout>
  );
};
