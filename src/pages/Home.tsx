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
import { StyledRouterLink } from "../Routes";

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
        <H3>What is PublicHAUS?</H3>
        <ParMd>
          PublicHAUS is the first opensource protocol maintained and owned by
          it's users. We use a process of seasonal iterations, to lay the
          foundations for the orginizations of the future.
        </ParMd>
        <ParLg>How to Participate</ParLg>
        <H3>JOIN:</H3>
        <ParMd>
          Stake <StyledRouterLink to="/about">{TARGET_DAO.STAKE_TOKEN_SYMBOL}</StyledRouterLink> for a community share which
          gives you power to guide the future of DAOs and DAO tooling.{" "}
          <StyledRouterLink to="/join">here</StyledRouterLink>
        </ParMd>
        <H3>CONTRIBUTE:</H3>
        <ParMd>
          Through participation in seasonal "signal sessions" we manage a
          community treasury to fund direct action, and recognize each others
          hard work.
        </ParMd>
      </CenterBox>
    </SingleColumnLayout>
  );
};
