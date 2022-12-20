import {
  Bold,
  Button,
  Divider,
  H3,
  H4,
  H5,
  Italic,
  Link,
  ParMd,
  ParSm,
  ParXs,
  TintSecondary,
} from '@daohaus/ui';
import {
  charLimit,
  formatDateFromSeconds,
  formatShortDateTimeFromSeconds,
} from '@daohaus/utils';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useRecords } from '../hooks/useRecord';
import { TARGET_DAO } from '../targetDAO';
import { isDelegateData } from '../utils/typeguards';
import { DelegateData } from '../utils/types';
import { BiPlus, BiMinus } from 'react-icons/bi';

export const PlatformDisplay = ({
  memberAddress,
}: {
  memberAddress: string;
}) => {
  const { records } = useRecords({
    daoId: TARGET_DAO.ADDRESS,
    chainId: TARGET_DAO.CHAIN_ID,
    recordType: 'credential',
  });
  const [showAll, setShowAll] = useState(false);
  const userRecords = useMemo(() => {
    if (!records?.length || !memberAddress) return [];
    return records
      .filter(
        (record) =>
          isDelegateData(record.parsedContent) &&
          record?.parsedContent?.recipientAddress?.toLowerCase() ===
            memberAddress?.toLowerCase()
      )
      .sort((a, b) => (Number(a?.createdAt) > Number(b?.createdAt) ? -1 : 1))
      .map(
        (record) =>
          isDelegateData(record?.parsedContent) && {
            ...record.parsedContent,
            createdAt: record.createdAt,
          }
      ) as DelegateData[];
  }, [records, memberAddress]);

  const latestRecord = userRecords?.[0];
  const toggleShowAll = () => setShowAll(!showAll);
  return (
    <CredentialBox>
      {latestRecord && !showAll ? (
        <Credential
          credTitle={latestRecord.title}
          createdAt={latestRecord.createdAt}
          credDescription={latestRecord.description}
          userDescription={latestRecord.longDescription}
          link={latestRecord.link}
        />
      ) : (
        <>
          {userRecords?.map((record, index) => {
            return (
              <Credential
                key={index}
                credTitle={record.title}
                createdAt={record.createdAt}
                credDescription={record.description}
                userDescription={record.longDescription}
                link={record.link}
              />
            );
          })}
        </>
      )}

      {userRecords?.length > 1 && (
        <Button
          className="see-more"
          justify="flex-start"
          variant="link"
          size="sm"
          IconRight={showAll ? BiMinus : BiPlus}
          onClick={toggleShowAll}
        >
          {showAll ? 'See First Platform' : 'See Previous Platforms'}
        </Button>
      )}
    </CredentialBox>
  );
};

const CredentialBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 3rem;
  .date {
    margin-bottom: 1rem;
  }
  button.see-more {
    padding: 0;
    align-self: flex-start;
  }
  h4,
  .descriptor {
    margin-bottom: 1rem;
  }
  .cred-description {
    margin-bottom: 2rem;
  }
  .section {
    margin-bottom: 2.5rem;
  }
  .divider {
    margin-bottom: 2.5rem;
  }
`;

const Credential = ({
  createdAt,
  credTitle,
  credDescription,
  userDescription,
  link,
}: {
  createdAt?: string;
  credTitle?: string;
  credDescription?: string;
  userDescription?: string;
  link?: string;
}) => {
  return (
    <>
      <ParXs className="date">
        <TintSecondary>
          {formatShortDateTimeFromSeconds(createdAt)}
        </TintSecondary>
      </ParXs>
      <H4>{credTitle}</H4>
      <ParSm className="cred-description">
        <TintSecondary>{credDescription}</TintSecondary>
      </ParSm>
      <CredUserDescription description={userDescription} />
      {link && <CredLink link={link} />}
      <Divider className="divider" />
    </>
  );
};

const CredUserDescription = ({ description }: { description?: string }) => {
  return (
    <div className="section">
      <ParMd className="descriptor">
        <Bold>Platform:</Bold>{' '}
      </ParMd>
      <ParMd>{description}</ParMd>
    </div>
  );
};

const CredLink = ({ link }: { link?: string }) => {
  return (
    <div className="section">
      <ParMd className="descriptor">
        <Bold>Platform Link: </Bold>
      </ParMd>
      <Link href={link} linkType="external">
        {charLimit(link, 30)}
      </Link>
    </div>
  );
};
