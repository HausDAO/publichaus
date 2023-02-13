import { useDHConnect } from "@daohaus/connect";
import { SingleColumnLayout } from "@daohaus/ui";
import { DelegateTo } from "../components/DelegateTo";

import { FORM } from "../legos/forms";

export const Delegate = () => {
  const { provider } = useDHConnect();

  return (
    <SingleColumnLayout>
      <DelegateTo />
    </SingleColumnLayout>
  );
};
