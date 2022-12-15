import { POSTER_TAGS } from '@daohaus/utils';
import { buildMultiCallTX } from '@daohaus/tx-builder';
import { CONTRACT } from './contract';

export enum ProposalTypeIds {
  Signal = 'SIGNAL',
  IssueSharesLoot = 'ISSUE',
  AddShaman = 'ADD_SHAMAN',
  TransferErc20 = 'TRANSFER_ERC20',
  TransferNetworkToken = 'TRANSFER_NETWORK_TOKEN',
  UpdateGovSettings = 'UPDATE_GOV_SETTINGS',
  UpdateTokenSettings = 'TOKEN_SETTINGS',
  TokensForShares = 'TOKENS_FOR_SHARES',
  GuildKick = 'GUILDKICK',
  WalletConnect = 'WALLETCONNECT',
}

export const DELEGATE_TABLE_REF = 'publicHausDelegate';

export const TX = {
  VERIFY_DELEGATE: buildMultiCallTX({
    id: 'VERIFY_DELEGATE',
    JSONDetails: {
      type: 'JSONDetails',
      jsonSchema: {
        title: `.formValues.title`,
        description: `.formValues.description`,
        contentURI: `.formValues.link`,
        contentURIType: { type: 'static', value: 'url' },
        proposalType: { type: 'static', value: ProposalTypeIds.Signal },
      },
    },
    actions: [
      {
        contract: CONTRACT.POSTER,
        method: 'post',
        args: [
          {
            type: 'JSONDetails',
            jsonSchema: {
              daoId: '.daoId',
              table: { type: 'static', value: 'credential' },
              queryType: { type: 'static', value: 'list' },
              recipientAddress: '.memberAddress',
              credentialIdentifier: {
                type: 'static',
                value: DELEGATE_TABLE_REF,
              },
              title: {
                type: 'static',
                value: 'Public Haus Delegate',
              },
              description: {
                type: 'static',
                value:
                  'Verified Delegate of Public Haus. The DAO has verified that this member is a registered delegate of Public Haus.',
              },
              longDescription: `.formValues.delegateDescription`,
              link: `.formValues.delegateLink`,
            },
          },
          { type: 'static', value: POSTER_TAGS.daoDatabaseProposal },
        ],
      },
    ],
  }),
};
