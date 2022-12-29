import { ValidNetwork } from '@daohaus/keychain-utils';
import { EthAddress } from '@daohaus/utils';

export const TARGET_DAO: {
  ADDRESS: EthAddress;
  SAFE_ADDRESS: EthAddress;
  SHARE_ADDRESS: EthAddress;
  STAKE_TOKEN: EthAddress;
  CHAIN_ID: ValidNetwork;
} = {
  ADDRESS: '0x8dCc8CdbfB97200BD08e05f580C236b3aC655FD8',
  SAFE_ADDRESS: '0xe014057ebe435dbcf0139a9a05b7ee0a05b74ec8',
  CHAIN_ID: '0x64',
  SHARE_ADDRESS: '0x1c301edfa0578f8e982025d102d71f082bc68de6',
  STAKE_TOKEN: '0xa4c3faee8cab2d3a6b87deaaaffb0d481c6bfa92',
};
