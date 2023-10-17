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


export const Proposals = () => {
    console.log("Proposals");
  return (
    <SingleColumnLayout>
      <Link
            href={"https://signal.daohaus.fun/#/0xa/0xf5d6b637a9185707f52d40d452956ca49018247a"}
            style={{ marginBottom: "2rem" }}
          >
            Community Strategic Signaling
          </Link>
      <ProposalList
        header="Proposals"
        allowLinks={true}

      />
    </SingleColumnLayout>
  );
};