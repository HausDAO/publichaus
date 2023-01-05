import { ValidNetwork } from '@daohaus/keychain-utils';
import { EthAddress } from '@daohaus/utils';

export const TARGET_DAO: {
  ADDRESS: EthAddress;
  SAFE_ADDRESS: EthAddress;
  SHARE_ADDRESS: EthAddress;
  STAKE_TOKEN: EthAddress;
  SHAMAN_ADDRESS: EthAddress;
  CHAIN_ID: ValidNetwork;
  STAKE_TOKEN_NAME: string;
  STAKE_TOKEN_SYMBOL: string;
  STAKE_TOKEN_DECIMALS: number;
} = {
  ADDRESS: '0x8dcc8cdbfb97200bd08e05f580c236b3ac655fd8',
  SAFE_ADDRESS: '0xe014057ebe435dbcf0139a9a05b7ee0a05b74ec8',
  CHAIN_ID: '0x64',
  SHARE_ADDRESS: '0x1c301edfa0578f8e982025d102d71f082bc68de6',
  STAKE_TOKEN: '0xe6421e9af92aca6a81c9fd0babace4a9c5691c60',
  STAKE_TOKEN_NAME: 'Weenus 💪',
  STAKE_TOKEN_SYMBOL: 'WEENUS',
  STAKE_TOKEN_DECIMALS: 18,
  SHAMAN_ADDRESS: '0x67615d81b510bc0430eba49cbd8bf9fd5bb5c58b',
};
