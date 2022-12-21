import { useParams } from 'react-router-dom';
import {
  AddressDisplay,
  Button,
  Card,
  DataIndicator,
  DataMd,
  H1,
  H2,
  ParMd,
  SingleColumnLayout,
  Spinner,
  useBreakpoint,
  useToast,
  widthQuery,
} from '@daohaus/ui';
import { BsShareFill, BsArrowLeft } from 'react-icons/bs';
import { useMember } from '../hooks/useMember';
import { TARGET_DAO } from '../targetDAO';
import styled from 'styled-components';
import { useDaoData } from '../hooks/useDaoData';
import {
  MolochV3Dao,
  FindMemberQuery,
  DaoVault,
} from '@daohaus/moloch-v3-data';
import { useMemo } from 'react';
import {
  AccountProfile,
  charLimit,
  formatValueTo,
  memberTokenBalanceShare,
  memberUsdValueShare,
  NETWORK_TOKEN_ETH_ADDRESS,
} from '@daohaus/utils';
import { useDHConnect } from '@daohaus/connect';
import { Column } from 'react-table';
import { ButtonRouterLink } from '../components/ButtonRouterLink';
import { DaoTable } from '../components/DaoTable';
import { ProfileDisplay } from '../components/ProfileDisplay';
import { MemberWithProfile } from '../utils/types';
import { CredentialDisplay } from '../components/CredentialDisplay';

type TokenTableType = {
  token: {
    address: string;
    name: string | undefined;
  };
  balance: string;
  fiatBalance: string;
};

export const Profile = () => {
  const { memberAddress } = useParams();
  const { networks } = useDHConnect();
  const { successToast } = useToast();
  const {
    isLoading: isLoadingMember,
    isIdle: isMemberIdle,
    error: memberError,
    member,
  } = useMember({
    daoId: TARGET_DAO.ADDRESS,
    chainId: TARGET_DAO.CHAIN_ID,
    memberAddress: memberAddress as string,
    withProfile: true,
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

  const treasury: MolochV3Dao['vaults'][number] | undefined = useMemo(() => {
    if (!dao) return;

    return (
      dao.vaults.find((v: DaoVault) => v.safeAddress === dao.safeAddress) ||
      undefined
    );
  }, [dao]);

  const isLoadingAny =
    isDaoIdle || isLoadingDao || isMemberIdle || isLoadingMember;

  const isErrorAny = daoError || memberError;

  const tableData: TokenTableType[] | null = useMemo(() => {
    if (dao && member && treasury) {
      return treasury.tokenBalances
        .filter((bal) => Number(bal.balance))
        .map((bal) => {
          return {
            token: {
              address: bal.tokenAddress || NETWORK_TOKEN_ETH_ADDRESS,
              name: charLimit(bal.token?.name, 21),
            },
            fiatBalance: formatValueTo({
              value: memberUsdValueShare(
                bal.fiatBalance,
                dao.totalShares || 0,
                dao.totalLoot || 0,
                member.shares || 0,
                member.loot || 0
              ),
              decimals: 2,
              format: 'currency',
            }),
            balance: formatValueTo({
              value: memberTokenBalanceShare(
                bal.balance,
                dao.totalShares || 0,
                dao.totalLoot || 0,
                member.shares || 0,
                member.loot || 0,
                bal.token?.decimals || 18
              ),
              format: 'number',
            }),
          };
        });
    } else {
      return null;
    }
  }, [dao, member, treasury]);

  const columns = useMemo<Column<TokenTableType>[]>(
    () => [
      {
        Header: 'Token',
        accessor: 'token',
        Cell: ({ value }: { value: TokenTableType['token'] }) => {
          return value.address === NETWORK_TOKEN_ETH_ADDRESS ? (
            <DataMd>{networks?.[TARGET_DAO.CHAIN_ID]?.symbol}</DataMd>
          ) : (
            <AddressDisplay
              address={value.address}
              textOverride={value.name}
              truncate
              copy
              explorerNetworkId={TARGET_DAO.CHAIN_ID}
            />
          );
        },
      },
      {
        Header: 'Amount',
        accessor: 'balance',
        Cell: ({ value }: { value: string }) => {
          return <div>{value}</div>;
        },
      },
      {
        Header: () => {
          return <div>USD Value</div>;
        },
        accessor: 'fiatBalance',
        Cell: ({ value }: { value: string }) => {
          return <div>{value}</div>;
        },
      },
    ],
    [networks]
  );

  const handleOnClick = () => {
    navigator.clipboard.writeText(`${window.location.href}`);
    successToast({
      title: 'URL copied to clipboard',
    });
  };

  if (isLoadingAny) {
    return (
      <SingleColumnLayout title="Delegate Profile">
        <H2>Loading Member Data</H2>
        <Spinner size="12rem" />
      </SingleColumnLayout>
    );
  }

  if (isErrorAny) {
    return (
      <SingleColumnLayout title="Delegate Profile">
        <H2>Error</H2>
        <ParMd>{daoError?.message || memberError?.message}</ParMd>
      </SingleColumnLayout>
    );
  }

  return (
    <SingleColumnLayout title="Delegate Profile">
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
              DELEGATES
            </ButtonRouterLink>
            <Button
              IconLeft={BsShareFill}
              onClick={handleOnClick}
              fullWidth={isMobile}
            >
              SHARE PROFILE
            </Button>
          </ButtonsContainer>
          <ProfileCard>
            {member?.profile && dao && (
              <>
                <ProfileDisplay
                  dao={dao}
                  profile={member.profile}
                  membership={member as MemberWithProfile}
                />
                {memberAddress && (
                  <CredentialDisplay memberAddress={memberAddress} />
                )}
                <ValueRow>
                  <DataIndicator
                    label="Total Exit Amount"
                    data={formatValueTo({
                      value: memberUsdValueShare(
                        dao?.fiatTotal || 0,
                        dao?.totalShares || 0,
                        dao?.totalLoot || 0,
                        member.shares || 0,
                        member.loot || 0
                      ),
                      decimals: 2,
                      format: 'currency',
                    })}
                  />
                </ValueRow>
              </>
            )}
            {treasury && tableData && columns && (
              <DaoTable<TokenTableType>
                tableData={tableData}
                columns={columns}
                sortableColumns={[]}
              />
            )}
          </ProfileCard>
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
