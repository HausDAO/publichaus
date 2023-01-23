import { Bold, H2, Link, ParLg, ParMd, SingleColumnLayout } from '@daohaus/ui';
import styled from 'styled-components';
import { HausAnimated } from '../components/HausAnimated';
import { TARGET_DAO } from '../targetDAO';

const CenterBox = styled.div`
  display: flex;
  flex-direction: column;
  p {
    margin-bottom: 2rem;
  }
  .space {
    margin-bottom: 2rem;
  }
  max-width: 60rem;
`;

export const Home = () => {
  return (
    <SingleColumnLayout>
      <H2>PublicHaus Onboarder</H2>
      <HausAnimated />
      <CenterBox>
        <ParLg>How to Participate</ParLg>
        <ParMd>
          <Bold>Step 1:</Bold> Read the DAOhaus{' '}
          <Link href="/manifesto">Manifesto</Link> and make sure that you align
          with the values.
        </ParMd>
        <ParMd>
          <Bold>Step 2:</Bold> Stake {TARGET_DAO.STAKE_TOKEN_NAME} for DAO
          shares.
          <Link href="/join">here</Link>
        </ParMd>
        <ParMd>
          <Bold>Step 3:</Bold> Verification requires a DAO vote to ensure you
          are a real person, and you are aligned with the DAOhaus mission.
          Create a DAO proposal <Link href="/apply">here</Link>. <Bold>Or</Bold>{' '}
          delegate your shares to a verified delegate{' '}
          <Link href="/delegates">here</Link>. You can read their platform on
          their profile page.
        </ParMd>
      </CenterBox>
    </SingleColumnLayout>
  );
};
