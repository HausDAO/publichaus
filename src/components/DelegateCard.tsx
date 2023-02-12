import {
  Avatar,
  Bold,
  border,
  Button,
  Card,
  Italic,
  ParLg,
  ParMd,
  ParSm,
  ProfileAvatar,
} from '@daohaus/ui';
import {
  charLimit,
  formatValueTo,
  fromWei,
  handlePluralNoun,
  sharesDelegatedToMember,
  truncateAddress,
} from '@daohaus/utils';
import React from 'react';
import styled from 'styled-components';
import { useMemberProfile } from '../hooks/useMemberProfile';
import { RegisteredMember } from '../utils/types';
import { ButtonRouterLink } from './ButtonRouterLink';

const DelegateCardBox = styled(Card)`
  width: 100%;
  max-width: 28rem;
  min-width: 24rem;
  margin-bottom: 2rem;
  .top-box {
    display: flex;
    /* justify-content: space-between; */
    margin-bottom: 2rem;
    align-items: center;
    p {
      margin-left: 2rem;
    }
  }
  .stats-box {
    display: flex;
    flex-direction: column;
    /* margin-bottom: 2.4rem; */
    p {
      margin-bottom: 0.6rem;
    }
    margin-bottom: 2rem;
  }
  .platform {
    margin-bottom: 1rem;
  }
  .description {
    height: 6rem;
    border-radius: ${border.radius};
    padding: 1rem;
    background: ${(props) => props.theme.secondary.step5};
    margin-bottom: 2rem;
  }
`;

export const DelegateCard = ({ delegate }: { delegate: RegisteredMember }) => {
  const { profile } = useMemberProfile({ address: delegate.memberAddress });

  const readableShares = formatValueTo({
    value: fromWei(delegate.shares),
    decimals: 2,
    format: 'number',
  });

  const readableDelShares = formatValueTo({
    value: fromWei(
      sharesDelegatedToMember(
        delegate.delegateShares,
        delegate.shares
      ).toString()
    ),
    decimals: 2,
    format: 'number',
  });

  const recentPlatform = delegate.records[0]?.longDescription;

  return (
    <DelegateCardBox>
      <div className="top-box">
        <ProfileAvatar
          size="xl"
          address={delegate.memberAddress}
          image={profile?.image}
        />
        <ParLg>
          {charLimit(profile?.name || profile?.ens, 13) ||
            truncateAddress(delegate?.memberAddress)}
        </ParLg>
      </div>
      <ParSm className="platform">Platform:</ParSm>
      <ParSm className="description">
        {recentPlatform ? (
          `"${charLimit(recentPlatform, 42)}"`
        ) : (
          <Italic>No Platform Description</Italic>
        )}
      </ParSm>
      <div className="stats-box">
        <ParMd>
          <Bold>{readableShares}</Bold>{' '}
          {handlePluralNoun(
            { singular: 'Share', plural: 'Shares' },
            Number(readableShares)
          )}
        </ParMd>
        <ParMd>
          <Bold>{readableDelShares}</Bold>{' '}
          {handlePluralNoun(
            { singular: 'Delegate Share', plural: 'Delegate Shares' },
            Number(readableDelShares)
          )}
        </ParMd>
        <ParMd>
          <Bold>{delegate.delegateOfCount}</Bold>{' '}
          {handlePluralNoun(
            { singular: 'Delegatee', plural: 'Delegatees' },
            Number(delegate.delegateOfCount)
          )}
        </ParMd>
      </div>
      <ButtonRouterLink
        to={`/profile/${delegate.memberAddress}`}
        fullWidth
        size="sm"
      >
        See Delegate
      </ButtonRouterLink>
    </DelegateCardBox>
  );
};
