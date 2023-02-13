import {
  Bold,
  H2,
  H3,
  Link,
  ParLg,
  ParMd,
  SingleColumnLayout,
} from "@daohaus/ui";
import styled from "styled-components";
import { HausAnimated } from "../components/HausAnimated";
import { TARGET_DAO } from "../targetDAO";

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
        <H3>Step 1: READ</H3> 
        <ParMd>
          Read the DAOhaus{" "}
          <Link href="/manifesto">Manifesto</Link> and make sure that you align
          with the values. Read the{" "}
          <Link
            href={`https://publichaus.club`}
            linkType="external"
            style={{ marginBottom: "2rem" }}
          >
            PublicHAUS docs
          </Link>{" "}
          and make sure you understand what this is all about.
        </ParMd>

          <H3>Step 2: STAKE</H3> 
          <ParMd>
          Stake {TARGET_DAO.STAKE_TOKEN_SYMBOL} for DAO
          shares. <Link href="/join">here</Link>
          </ParMd>
          <H3>Step 3: DELEGATE</H3>
        <ParMd>
          Delegate your shares to a DAO Champion <Bold>OR</Bold> apply to be a
          Champion yourself. You can read Champion platforms on their profile
          page. <Link href="/delegates">here</Link>
        </ParMd>
        <ParMd>
          * Championship requires a DAO vote to ensure you are a real person,
          and you are aligned with the DAOhaus mission. If you are ready for
          this resposibility create a DAO proposal{" "}
          <Link href="/apply">here</Link>.
        </ParMd>
      </CenterBox>
    </SingleColumnLayout>
  );
};
