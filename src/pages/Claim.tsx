import { useDHConnect } from "@daohaus/connect";
import { H2, ParMd, SingleColumnLayout } from "@daohaus/ui";
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
        contractAddress={"0x22F09C11De8f059840FD8F60b11b8d60DeA0E011"}
        chainId={chainId}
        label={"Retro #2"}
        key={"retro21"}
      />

      <ParMd style={{ marginTop: "5em" }}>
        <strong>Check back soon for more special claim events</strong>
      </ParMd>
    </SingleColumnLayout>
  );
};
