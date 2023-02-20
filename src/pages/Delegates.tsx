import { useMemo } from 'react';
import { H2, Link, ParMd, widthQuery } from '@daohaus/ui';

import { useMembers } from '../hooks/useMembers';
import { useRecords } from '../hooks/useRecord';
import { DELEGATE_TABLE_REF } from '../legos/tx';
import { isDelegateData } from '../utils/typeguards';
import { RegisteredMembers } from '../utils/types';
import { TARGET_DAO } from '../targetDAO';
import { StatusDisplay } from '../components/StatusDisplay';
import { useDaoData } from '../hooks/useDaoData';
import { useUserMember } from '../hooks/useUserMember';
import { useDHConnect } from '@daohaus/connect';
import styled from 'styled-components';
import { DelegateList } from '../components/DelegateList';
import { MolochV3Dao } from '@daohaus/moloch-v3-data';
import { MemberProfileAvatar } from '../components/MemberProfileAvatar';

const DataRow = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  .delegating-to {
    display: flex;
    align-items: center;
    p {
      margin-right: 1rem;
    }
  }
  .p-box {
    height: 6rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .link-box {
    padding-bottom: 0.3rem;
    height: 6rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  @media ${widthQuery.sm} {
    /* flex-direction: column; */
    /* justify-content: flex-start; */
    /* width: fit-content; */

    flex-wrap: wrap;
    .delegating-to {
      flex-wrap: wrap;
    }
    .p-box {
      margin-bottom: 2rem;
      height: fit-content;
    }
  }
`;

const ExpandedLayout = styled.div`
  width: 100%;
  max-width: 122rem;
  h2 {
    margin-bottom: 2rem;
    margin-top: 3.6rem;
  }
`;

export const Delegates = () => {
  const { address } = useDHConnect();
  const {
    isIdle: isRecordsIdle,
    isLoading: isLoadingRecords,
    records,
    error: recordsError,
  } = useRecords({
    daoId: TARGET_DAO.ADDRESS,
    chainId: TARGET_DAO.CHAIN_ID,
    recordType: 'credential',
    credentialType: DELEGATE_TABLE_REF,
  });

  const {
    isIdle: isMembersIdle,
    isLoading: isLoadingMembers,
    members,
    error: membersError,
  } = useMembers({
    daoId: TARGET_DAO.ADDRESS,
    chainId: TARGET_DAO.CHAIN_ID,
  });

  const {
    dao,
    isLoading: isLoadingDao,
    error: daoError,
  } = useDaoData({
    daoid: TARGET_DAO.ADDRESS,
    daochain: TARGET_DAO.CHAIN_ID,
  });

  const {
    isLoading: isLoadingUser,
    error: userError,
    user,
  } = useUserMember({
    daoId: TARGET_DAO.ADDRESS,
    chainId: TARGET_DAO.CHAIN_ID,
    memberAddress: address as string,
  });

  const isLoadingAny =
    isLoadingUser ||
    isLoadingMembers ||
    isLoadingRecords ||
    isRecordsIdle ||
    isMembersIdle ||
    isLoadingDao;
  const isErrorAny = recordsError || membersError || userError || daoError;

  const registeredDelegates = useMemo(() => {
    if (!records?.length || !members?.length) return {};

    // console.log(records)

    return records.reduce((acc, record) => {
      // If the record is not valid, skip it
      const { parsedContent, createdAt } = record;
      if (!isDelegateData(parsedContent)) {
        console.warn('Delegate data is not valid', parsedContent);
        return acc;
      }
      const delegateAddress = parsedContent.recipientAddress.toLowerCase();

      // If the delegate is already in the accumulator, add the record to the array

      if (acc[delegateAddress]) {
        return {
          ...acc,
          [delegateAddress]: {
            ...acc[delegateAddress],
            records: [
              ...acc[delegateAddress].records,
              { ...parsedContent, createdAt },
            ],
          },
        };
      }

      // If the delegate is not in the accumulator, add the delegate and the record

      const delegateMemberData = members.find(
        (member) =>
          member.memberAddress.toLowerCase() === delegateAddress.toLowerCase()
      );

      // If the delegate is not a member of the DAO, skip it

      if (!delegateMemberData) {
        console.warn(
          'Delegate is not a member of the DAO',
          delegateAddress,
          members
        );
        return acc;
      }

      return {
        ...acc,
        [delegateAddress]: {
          ...delegateMemberData,
          records: [{ ...parsedContent, createdAt }],
        },
      };
    }, {} as RegisteredMembers);
  }, [members, records]);

  if (isLoadingAny) return <StatusDisplay title="Loading Champions" spinner />;
  if (isErrorAny)
    return (
      <StatusDisplay
        status="Error"
        description={
          recordsError?.message ||
          membersError?.message ||
          userError?.message ||
          daoError?.message
        }
      />
    );

  return (
    <ExpandedLayout>
      <H2>Hall of Champions</H2>
      <DataRow>
        <div className="p-box">
          <ParMd>Champions: {Object.keys(registeredDelegates).length}</ParMd>

          <div className="delegating-to">
            <ParMd>You are delegating to: </ParMd>{' '}
            {user?.delegatingTo ? (
              <MemberProfileAvatar
                daochain={TARGET_DAO.CHAIN_ID}
                daoid={TARGET_DAO.ADDRESS}
                memberAddress={user?.delegatingTo}
              />
            ) : (
              <ParMd>--</ParMd>
            )}
          </div>
        </div>
        <div className="link-box">
          <Link
            href={`https://admin.daohaus.fun/#/molochv3/${TARGET_DAO.CHAIN_ID}/${TARGET_DAO.ADDRESS}/members`}
            linkType="external"
            style={{ marginBottom: '2rem' }}
          >
            See all Members
          </Link>
          <Link href={`/delegate`} style={{ marginBottom: '2rem' }}>
            Delegate to a non-Champion
          </Link>
        </div>
      </DataRow>

      <DelegateList
        registeredDelegates={registeredDelegates}
        dao={dao as MolochV3Dao}
        userAddress={user?.memberAddress}
        userDelegateAddress={user?.delegatingTo}
      />
    </ExpandedLayout>
  );
};
