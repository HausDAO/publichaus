import { useDHConnect } from "@daohaus/connect";
import { H2, ParMd, SingleColumnLayout, Spinner } from "@daohaus/ui";
import { StakeClaim } from "../components/StakeClaim";
import { V2DAOClaim } from "../components/V2DAOClaim";
import { TARGET_DAO } from "../targetDAO";

export const Claim = () => {
  const { address, chainId } = useDHConnect();

  if (!address) {
    return (
      <SingleColumnLayout>
        <ParMd>Please connect your wallet to view your claims.</ParMd>
      </SingleColumnLayout>
    );
  }

  return (
    <SingleColumnLayout>
      <H2>Claims</H2>

      <StakeClaim
        address={address}
        contractAddress={"0x204454Fda20F57a67E034662388c3fe3C66287fa"}
        chainId={chainId}
        label={"Retro #1"}
        key={"retro#1"}
      />

      <ParMd style={{ marginTop: "5em" }}>
        <strong>Check back soon for more special claim events</strong>
      </ParMd>
    </SingleColumnLayout>
  );
};
