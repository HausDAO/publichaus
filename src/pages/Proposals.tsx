import { BsPlusLg } from "react-icons/bs";

import { ProposalList } from "@daohaus/moloch-v3-macro-ui";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  Link,
  SingleColumnLayout,
} from "@daohaus/ui";
import { DaoContainer } from "../layouts/DaoContainer";
import { Signals } from "../components/Signals";
import { useState } from "react";
import { styled } from "styled-components";
import { useLocation } from "react-router-dom";

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
  Button {
    width: 12rem;
  }
`;

export const Proposals = () => {
  const location = useLocation();
  const [isProposals, setIsProposals] = useState(location.pathname.indexOf("signals") == -1);

  const toggleIsProposals = () => {
    setIsProposals(!isProposals);
  };

  return (
    <SingleColumnLayout>
      <ButtonContainer>
        <Button
          variant={!isProposals ? "outline" : "solid"}
          onClick={toggleIsProposals}
        >
          Proposals
        </Button>
        <Button
          variant={isProposals ? "outline" : "solid"}
          onClick={toggleIsProposals}
        >
          Signals
        </Button>
      </ButtonContainer>

      {isProposals ? (
        <ProposalList header="Proposals" allowLinks={true} />
      ) : (
        <Signals />
      )}
    </SingleColumnLayout>
  );
};
