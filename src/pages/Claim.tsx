import { useDHConnect } from "@daohaus/connect";
import { H2, ParMd, SingleColumnLayout, Spinner } from "@daohaus/ui";
import { StakeClaim } from "../components/StakeClaim";
import { V2DAOClaim } from "../components/V2DAOClaim";

export const Claim = () => {
  const { address } = useDHConnect();

  if (!address) {
    return (
      <SingleColumnLayout>
        <Spinner size="12rem" />
      </SingleColumnLayout>
    );
  }

  return (
    <SingleColumnLayout>
      <H2>Claims</H2>

      <V2DAOClaim
        address={address}
        daoAddress={"0x1efe05df1f5e82a4994093b1982c97e3dd404e65"}
        label={"The CCO"}
      />

      <StakeClaim
        memberAddress={address}
        contractAddress={"0x6b5bA5A9dDb3EdA7435C55CBc6c354B1381bf178"}
        label={"Champion Rewards"}
        key={"champion-rewards"}
      />

      <StakeClaim
        memberAddress={address}
        contractAddress={"0x35453fBb522E53725c18FcB9901088d3D14009d5"}
        label={"Retro #0"}
        key={"retro#0"}
      />

      <StakeClaim
        memberAddress={address}
        contractAddress={"0x35453fBb522E53725c18FcB9901088d3D14009d5"}
        label={"Uberhaus member distro"}
        key={"uberhaus-member-distro"}
      />

      <StakeClaim
        memberAddress={address}
        contractAddress={"0x35453fBb522E53725c18FcB9901088d3D14009d5"}
        label={"v3 integration and referal distro"}
        key={"v3-integration-and-referal-distro"}
      />

      <ParMd style={{ marginTop: "5em" }}>
        <strong>Check back soon for more special claim events</strong>
      </ParMd>
    </SingleColumnLayout>
  );
};
