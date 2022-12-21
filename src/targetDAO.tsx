import { ValidNetwork } from '@daohaus/keychain-utils';
import { EthAddress } from '@daohaus/utils';

export const TARGET_DAO: {
  ADDRESS: EthAddress;
  SAFE_ADDRESS: EthAddress;
  SHARE_ADDRESS: EthAddress;
  CHAIN_ID: ValidNetwork;
} = {
  ADDRESS: '0xc035dd7cda32ae73f0f306ed56658527aad47648',
  SAFE_ADDRESS: '0x36824793440d1ab326b9b5634418393d5f5e30a3',
  CHAIN_ID: '0x5',
  SHARE_ADDRESS: '0x26472c3365E1dCbD5841dfB20b339aE91232b5f6',
};
