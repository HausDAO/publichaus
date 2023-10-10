import React, { ReactNode, useMemo } from "react";
import { RegisteredMembers } from "../utils/types";
import { MolochV3Dao } from "@daohaus/moloch-v3-data";
import { Button, Input, useBreakpoint, widthQuery } from "@daohaus/ui";
import styled from "styled-components";
import { SortDropdown } from "./SortDropdown";
import { DelegateCard } from "./DelegateCard";
import { RiGridFill, RiListCheck } from "react-icons/ri/index.js";

import { BiSearch } from "react-icons/bi";
import { DelegateTable } from "./DelegateTable";

const handleSearch = (term: string, delegates: RegisteredMembers) => {
  return Object.values(delegates).filter((delegate) => {
    return (
      delegate?.profile?.ens?.toLowerCase().includes(term.toLowerCase()) ||
      delegate.memberAddress.toLowerCase().includes(term.toLowerCase())
    );
  });
};

type Sortable = "shares" | "delegateShares";

export const DelegateList = ({
  registeredDelegates,
  dao,
}: {
  registeredDelegates: RegisteredMembers;
  dao: MolochV3Dao;
  userAddress?: string;
  userDelegateAddress?: string;
}) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sort, setSort] = React.useState<Sortable>("delegateShares");
  const [isCards, setIsCards] = React.useState(true);

  const isMobile = useBreakpoint(widthQuery.sm);

  const processedDelegates = useMemo(() => {
    if (searchTerm) {
      return handleSearch(searchTerm, registeredDelegates);
    }

    return Object.values(registeredDelegates).sort((a, b) => {
      if (sort === "delegateShares") {
        return Number(b.delegateShares) > Number(a.delegateShares) ? 1 : -1;
      }
      if (sort === "shares") {
        return Number(b.shares) > Number(a.shares) ? 1 : -1;
      }
      return 0;
    });
  }, [registeredDelegates, searchTerm, sort]);

  return (
    <InnerBox>
      <ControlBarBox>
        <Input
          icon={BiSearch}
          id="table-search"
          placeholder={"Search Address or Name"}
          onChange={(e) => setSearchTerm(e.target.value)}
          full={isMobile}
        />
        {isMobile || (
          <Button
            color="secondary"
            onClick={() => setIsCards(!isCards)}
            IconLeft={isCards ? RiListCheck : RiGridFill}
            fullWidth={isMobile}
          >
            {" "}
            {isCards ? "List" : "Cards"}
          </Button>
        )}
        <SortDropdown
          id="delegates-sort"
          label="Sort By"
          value={sort}
          options={[
            {
              name: "Voting Power",
              value: "delegateShares",
            },
            {
              name: "Shares",
              value: "shares",
            },
          ]}
          onChange={(e: any) => setSort(e.target.value)}
        />
      </ControlBarBox>
      <div className="data-display-box">
        {isCards || isMobile ? (
          Object.values(processedDelegates).map((delegate) => (
            <DelegateCard
              delegate={delegate}
              key={delegate.memberAddress}
              dao={dao}
            />
          ))
        ) : (
          <DelegateTable registeredDelegates={processedDelegates} dao={dao} />
        )}
      </div>
    </InnerBox>
  );
};

const ControlBarBox = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 3rem;
  .list-toggle {
    margin-right: auto;
  }
  button {
    width: 12rem;
    margin-left: 2rem;
  }
  @media ${widthQuery.sm} {
    flex-direction: column;
    button {
      margin-left: 0;
      margin-bottom: 2rem;
    }
    input {
      margin-bottom: 2rem;
    }
  }
`;

const InnerBox = styled.div`
  margin-top: 3rem;
  max-width: 122rem;
  .data-display-box {
    display: flex;
    gap: 3rem;
    flex-wrap: wrap;
    width: 100%;
  }
`;
