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
        <ParMd>Go to your member profile on the DAO admin portal and ragequit.</ParMd>
        <Link
          href={`https://admin.daohaus.fun/#/molochv3/${TARGET_DAO.CHAIN_ID}/${TARGET_DAO.ADDRESS}/members/ragequit`}
          linkType="external"
        >
          Profile
        </Link>
        <ParMd>{" "}</ParMd>
        <ParMd>* When you unstake you burn your Shares/Loot in the DAO{" "}
            and receive your fair share of the staking treasury.{" "} 
            You can unstake a potion or the full amount. If you have{" "} 
            no Shares or Loot in the DAO you are no longer a member. {" "}
            This process is called ragequit and can be found in the 3 vertical{" "}
            dot menu on your profile page.
            </ParMd>
      </CenterBox>
    </SingleColumnLayout>
  );
};
