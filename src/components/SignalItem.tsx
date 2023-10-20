import React from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import styled, { DefaultTheme, useTheme } from "styled-components";
import { RiArrowRightSLine } from "react-icons/ri/index.js";

import { Bold, DataMd, DataSm, DataXs, Link, ParLg, Theme } from "@daohaus/ui";

import { getTcrDescription, getTcrTitle } from "../utils/tcrDataHelpers";
import { formatDistanceToNowFromSeconds } from "@daohaus/utils";
import { ListTcr } from "../hooks/useTcrList";

const ListItemContainer = styled.div`
  width: 100%;
  padding: 1rem 0;
  border-top: 1px ${({ theme }) => theme.secondary.step6} solid;
`;

const ListItemLink = styled(Link)`
  text-decoration: none;
  width: 100%;
  color: unset;
  &:hover {
    text-decoration: none;
  }
`;

// old border-radius was ${border.radius}
// ${({ theme }) => theme.border};
const ListItemHoverContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem;
  border-radius: 5px;

  &:hover {
    background: 1px ${({ theme }) => theme.secondary.step3};
  }
`;

const ListItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  word-wrap: break-word;
`;

const Spaced = styled.div`
  margin-top: 2rem;
`;

const StyledIcon = styled(RiArrowRightSLine)`
  fill: ${({ theme }) => theme.primary.step9};
  font-size: 3rem;
`;

export const SignalItem = ({ tcr }: { tcr: ListTcr }) => {
  const theme = useTheme();
  const { daoChain, daoId } = useParams();

  const now = new Date().getTime() / 1000;
  const hasEnded = Number(tcr.endDate) < now;

  return (
    <ListItemContainer>
      <ListItemLink
        showExternalIcon={false}
        href={`https://signal.daohaus.fun/#/${daoChain}/${daoId}/tcr/${tcr.id}`}
      >
        <ListItemHoverContainer>
          <ListItem>
            <ParLg>
              <Bold>{getTcrTitle(tcr.details)}</Bold>
            </ParLg>
            <DataSm>{getTcrDescription(tcr.details)}</DataSm>
            <Spaced>
              {hasEnded && (
                <DataXs>
                  <Bold>
                    Ended {formatDistanceToNowFromSeconds(tcr.endDate)}
                  </Bold>
                </DataXs>
              )}

              {!hasEnded && (
                <DataMd>
                  <Bold color={theme.green10}>
                    Ends {formatDistanceToNowFromSeconds(tcr.endDate)}
                  </Bold>
                </DataMd>
              )}
            </Spaced>
          </ListItem>
          <StyledIcon />
        </ListItemHoverContainer>
      </ListItemLink>
    </ListItemContainer>
  );
};
