import { BsPlusLg } from "react-icons/bs";

import { ProposalList } from "@daohaus/moloch-v3-macro-ui";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  H2,
  Link,
  ParMd,
  SingleColumnLayout,
} from "@daohaus/ui";
import { DaoContainer } from "../layouts/DaoContainer";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { Link as RouterLink } from "react-router-dom";
import { useDaoData } from "../hooks/useDaoData";
import { EthAddress } from "@daohaus/utils";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { ListTcr, useTcrList } from "../hooks/useTcrList";
import { SignalItem } from "./SignalItem";

const LinkBox = styled.div`
  display: flex;
  gap: 2rem;
  margin: 8rem 0;
`;

const SlimParMd = styled(ParMd)`
  width: 70%;
`;

const StyledRouterLink = styled(RouterLink)`
  text-decoration: none;
`;

// href={"https://signal.daohaus.fun/#/0xa/0xf5d6b637a9185707f52d40d452956ca49018247a"}
export const Signals = () => {
  const { daoChain, daoId } = useParams();
  const { dao } = useDaoData({
    daoid: daoId as EthAddress,
    daochain: daoChain as ValidNetwork,
  });
  const { tcrList } = useTcrList({
    daoId: daoId as EthAddress,
  });

  return (
    <SingleColumnLayout>
      <H2>{dao?.name} Signals</H2>

      {tcrList &&
        tcrList.map((tcr: ListTcr, i: number) => {
          return <SignalItem tcr={tcr} key={i} />;
        })}
      <LinkBox>
        <Link href={`https://signal.daohaus.fun/#/${daoChain}/${daoId}/create`}>
          Create Signal
        </Link>
      </LinkBox>
    </SingleColumnLayout>
  );
};
