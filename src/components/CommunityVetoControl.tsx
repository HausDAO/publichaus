import {
  Button,
  H2,
  Loading,
  ParLg,
  ParMd,
  Progress,
  SingleColumnLayout,
} from "@daohaus/ui";
import React, { ReactNode } from "react";
import styled from "styled-components";

export const CommunityVetoControl = ({
  proposalId,
}: {
  proposalId: string;
}) => {
    // use community veto shaman
    // verify active shaman
    // veto initiated proposalSnapshots not 0
    // voting progress
    // get total supply at snapshot
    // get staked amount for veto
    // get threshold
    // compute percentage
  return (
    <>
      <ParLg>
        <strong>Community Veto</strong>
      </ParLg>
      <Progress
        backgroundColor="red"
        progressSection={[
          {
            color: "green",
            percentage: "50%",
          },
        ]}
      />
      <Button size="md" variant="solid">
        Stake On Veto
      </Button>
    </>
  );
};
