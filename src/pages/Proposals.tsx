import { BsPlusLg } from "react-icons/bs";

import { ProposalList } from "@daohaus/moloch-v3-macro-ui";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  SingleColumnLayout,
} from "@daohaus/ui";
import { DaoContainer } from "../layouts/DaoContainer";


export const Proposals = () => {
    console.log("Proposals");
  return (
    <SingleColumnLayout>
      <ProposalList
        header="Proposals"
        allowLinks={true}

      />
    </SingleColumnLayout>
  );
};