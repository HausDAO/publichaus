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
