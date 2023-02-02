import { useDHConnect } from "@daohaus/connect";
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

export const Unstake = () => {
  const { address } = useDHConnect();
  return (
    <SingleColumnLayout>
      <H2>Unstake shares</H2>
      <CenterBox>
        <ParLg>Native UI coming soon but for now this is how to unstake.</ParLg>
        <ParMd>Go to your member profile on the DAO and ragequit.</ParMd>
        <Link
          href={`https://admin.daohaus.fun/#/molochv3/${TARGET_DAO.CHAIN_ID}/${TARGET_DAO.ADDRESS}/members/${address}`}
          linkType="external"
          style={{ marginBottom: "2rem" }}
        >
          Profile
        </Link>
      </CenterBox>
    </SingleColumnLayout>
  );
};
