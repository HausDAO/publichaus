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
        address={address}
        contractAddress={"0x1efe05df1f5e82a4994093b1982c97e3dd404e65"}
        label={"Retro #0"}
      />

      <StakeClaim
        address={address}
        contractAddress={"0x1efe05df1f5e82a4994093b1982c97e3dd404e65"}
        label={"Champion Rewards"}
      />

      <StakeClaim
        address={address}
        contractAddress={"0x1efe05df1f5e82a4994093b1982c97e3dd404e65"}
        label={"Uberhaus member distro"}
      />

      <StakeClaim
        address={address}
        contractAddress={"0x1efe05df1f5e82a4994093b1982c97e3dd404e65"}
        label={"v3 integration and referal distro"}
      />

      <ParMd style={{marginTop: '5em'}}>Check back soon for more special claim events</ParMd>
    </SingleColumnLayout>
  );
};
