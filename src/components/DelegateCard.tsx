import {
  Bold,
  Card,
  Italic,
  ParLg,
  ParMd,
  ParSm,
  ProfileAvatar,
} from "@daohaus/ui";
import {
  charLimit,
  formatValueTo,
  fromWei,
  handlePluralNoun,
  truncateAddress,
  votingPowerPercentage,
} from "@daohaus/utils";
import { MolochV3Dao } from "@daohaus/moloch-v3-data";

import { sharesDelegatedToMember } from "../utils/conversion";

import styled from "styled-components";
import { RegisteredMember } from "../utils/types";
import { ButtonRouterLink } from "./ButtonRouterLink";

const DelegateCardBox = styled(Card)`
  width: 100%;
  max-width: 28rem;
  min-width: 24rem;

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

    p {
      margin-bottom: 0.6rem;
    }
    margin-bottom: 2rem;
  }

  .description {
    height: 6rem;
    border-radius: ${({ theme }) => theme.card.radius};
    padding: 1rem;
    background: ${(props) => props.theme.secondary.step3};
    margin-bottom: 2rem;
  }
`;

export const DelegateCard = ({
  delegate,
  dao,
}: {
  delegate: RegisteredMember;
  dao: MolochV3Dao;
}) => {
  const { profile } = delegate;

  const readableShares = formatValueTo({
    value: fromWei(delegate.shares),
    decimals: 2,
    format: "number",
  });
  const delegatedShares = sharesDelegatedToMember(
    delegate.delegateShares,
    delegate.shares
  );

  const readableDelShares = formatValueTo({
    value: fromWei(delegatedShares),
    decimals: 2,
    format: "number",
  });

  const votingPower = votingPowerPercentage(
    dao.totalShares,
    delegate.delegateShares
  );

  const recentPlatform = delegate.records[0]?.longDescription;

  return (
    <DelegateCardBox>
      <div className="top-box">
        <ProfileAvatar
          size="xl"
          address={delegate.memberAddress}
          image={profile?.avatar}
        />
        <ParLg>
          {charLimit(profile?.ens, 10) ||
            truncateAddress(delegate?.memberAddress)}
        </ParLg>
      </div>

      <ParSm className="description">
        {recentPlatform ? (
          `"${charLimit(recentPlatform, 42)}"`
        ) : (
          <Italic>No Platform Description</Italic>
        )}
      </ParSm>
      <div className="stats-box">
        <ParMd>
          <Bold>{votingPower}%</Bold> Voting Power
        </ParMd>
        <ParMd>
          <Bold>{readableShares}</Bold>{" "}
          {handlePluralNoun(
            { singular: "Share", plural: "Shares" },
            Number(readableShares)
          )}
        </ParMd>
        <ParMd>
          <Bold>{readableDelShares}</Bold>{" "}
          {handlePluralNoun(
            { singular: "Delegate Share", plural: "Delegate Shares" },
            Number(readableDelShares)
          )}
        </ParMd>
        <ParMd>
          <Bold>{delegate.delegateOfCount}</Bold>{" "}
          {handlePluralNoun(
            { singular: "Delegatee", plural: "Delegatees" },
            Number(delegate.delegateOfCount)
          )}
        </ParMd>
      </div>
      <ButtonRouterLink
        to={`/profile/${delegate.memberAddress}`}
        fullWidth
        size="sm"
        color="secondary"
      >
        See Champion
      </ButtonRouterLink>
    </DelegateCardBox>
  );
};
