import { useParams } from "react-router-dom";
import {
  Card,
  Input,
  ParMd,
  SingleColumnLayout,
  useBreakpoint,
  useToast,
  widthQuery,
} from "@daohaus/ui";
import { BsArrowLeft } from "react-icons/bs";
import { useMember } from "../hooks/useMember";
import { TARGET_DAO } from "../targetDAO";
import styled from "styled-components";
import { useDaoData } from "../hooks/useDaoData";
import { useCallback, useState } from "react";

import { useDHConnect } from "@daohaus/connect";

import { ButtonRouterLink } from "../components/ButtonRouterLink";

import { StatusDisplay } from "../components/StatusDisplay";
import { useUserMember } from "../hooks/useUserMember";
import { DelegationActions } from "../components/DelegationActions";
import { useQueryClient } from "react-query";

export const DelegateTo = () => {
  const client = useQueryClient();
  const { memberAddress } = useParams();
  const { address } = useDHConnect();
  const {
    isLoading: isLoadingMember,
    isIdle: isMemberIdle,
    error: memberError,
    refetch: refetchMember,
    member,
  } = useMember({
    daoId: TARGET_DAO.ADDRESS,
    chainId: TARGET_DAO.CHAIN_ID,
    memberAddress: memberAddress as string,
  });

  const {
    isLoading: isLoadingUser,
    error: userError,
    refetch: refetchUser,
    user,
  } = useUserMember({
    daoId: TARGET_DAO.ADDRESS,
    chainId: TARGET_DAO.CHAIN_ID,
    memberAddress: address as string,
  });

  const {
    isLoading: isLoadingDao,
    isIdle: isDaoIdle,
    error: daoError,
    dao,
  } = useDaoData({
    daoid: TARGET_DAO.ADDRESS,
    daochain: TARGET_DAO.CHAIN_ID,
  });

  const isMobile = useBreakpoint(widthQuery.sm);

  const isLoadingAny =
    isDaoIdle ||
    isLoadingDao ||
    isLoadingUser ||
    isMemberIdle ||
    isLoadingMember;

  const isErrorAny = daoError || memberError || userError;

  const [delegateAcct, setDelegateAcct] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDelegateAcct(e.target.value);
  };

  const onDelegateSuccess = useCallback(() => {
    refetchMember?.();
    refetchUser?.();
    client?.clear();
  }, []);

  if (isLoadingAny) {
    return <StatusDisplay title="Loading " spinner />;
  }

  if (isErrorAny) {
    return (
      <StatusDisplay
        title="Error"
        status="Error:"
        description={
          memberError?.message || daoError?.message || userError?.message
        }
      />
    );
  }

  return (
    <SingleColumnLayout title="Delegate To">
      {member && (
        <>
          <ButtonsContainer>
            <ButtonRouterLink
              to={`/delegates`}
              IconLeft={StyledArrowLeft}
              color="secondary"
              linkType="no-icon-external"
              variant="outline"
              fullWidth={isMobile}
            >
              CHAMPIONS
            </ButtonRouterLink>
          </ButtonsContainer>

          <Input
            id="delegateAcct"
            onChange={handleChange}
            number
            //@ts-ignore
            value={delegateAcct}
            full
            placeholder={"0x..."}
          />

          <DelegationActions
            userAddress={address}
            userDelegatingTo={user?.delegatingTo}
            memberAddress={delegateAcct}
            isUserMember={!!user}
            onSuccess={onDelegateSuccess}
          />
        </>
      )}
    </SingleColumnLayout>
  );
};

const ProfileCard = styled(Card)`
  width: 64rem;
  padding: 2rem;
  border: none;
  margin-bottom: 3.4rem;
  @media ${widthQuery.md} {
    max-width: 100%;
    min-width: 0;
  }
`;

const StyledArrowLeft = styled(BsArrowLeft)`
  height: 1.6rem;
  width: 1.6rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 64rem;
  margin-bottom: 3rem;
  @media ${widthQuery.md} {
    max-width: 100%;
    min-width: 0;
  }
  @media ${widthQuery.sm} {
    flex-direction: column;
    button:first-child {
      margin-bottom: 1rem;
    }
  }
`;

export const DataIndicatorContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DataIndicatorLabelMd = styled(ParMd)`
  margin-bottom: 0.5rem;
  opacity: 0.9;
`;

export const ValueRow = styled.div`
  width: 64rem;
  padding: 3rem 0;
  text-align: left;
`;
