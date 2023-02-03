import { useDHConnect } from "@daohaus/connect";
import { H2, ParMd, SingleColumnLayout, Spinner } from "@daohaus/ui";
import { V2DAO } from "../components/V2DAO";

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
      <H2>Token Claims</H2>

      <V2DAO
        address={address}
        daoAddress={"0x1efe05df1f5e82a4994093b1982c97e3dd404e65"}
        daoName={"The CCO"}
      />

      <ParMd style={{marginTop: '5em'}}>Check back for special claim events</ParMd>
    </SingleColumnLayout>
  );
};
