import { ValidNetwork } from '@daohaus/keychain-utils';
import { EthAddress } from '@daohaus/utils';

export const TARGET_DAO: {
  ADDRESS: EthAddress;
  SAFE_ADDRESS: EthAddress;
  SHARE_ADDRESS: EthAddress;
  LOOT_ADDRESS: EthAddress;
  STAKE_TOKEN: EthAddress;
  SHAMAN_ADDRESS: EthAddress;
  CHAIN_ID: ValidNetwork;
  STAKE_TOKEN_NAME: string;
  STAKE_TOKEN_SYMBOL: string;
  STAKE_TOKEN_DECIMALS: number;
} = {
  ADDRESS: '0x4f550a8ae11e284687ced8cf07c12a05800fc854',
  SAFE_ADDRESS: '0x1b2b5fb645ed06cf0488bd9b58f11ad6ccd988ea',
  CHAIN_ID: '0x5',
  SHARE_ADDRESS: '0x8a5299e18348ae3e37f9ed72fbaff9a2fcd15c57',
  LOOT_ADDRESS: '0xea0b7cd61ddc82ead013bea4926f7bb1d3fd58c0',
  STAKE_TOKEN: '0xaFF4481D10270F50f203E0763e2597776068CBc5',
  STAKE_TOKEN_NAME: 'WEENUS Token',
  STAKE_TOKEN_SYMBOL: 'WEENUS',
  STAKE_TOKEN_DECIMALS: 18,
  SHAMAN_ADDRESS: '0x25eE6805D651fE04a0baF51Ea7F55f712C729D13',
};

// export const TARGET_DAO: {
//   ADDRESS: EthAddress;
//   SAFE_ADDRESS: EthAddress;
//   SHARE_ADDRESS: EthAddress;
//   STAKE_TOKEN: EthAddress;
//   SHAMAN_ADDRESS: EthAddress;
//   CHAIN_ID: ValidNetwork;
//   STAKE_TOKEN_NAME: string;
//   STAKE_TOKEN_SYMBOL: string;
//   STAKE_TOKEN_DECIMALS: number;
// } = {
//   ADDRESS: '0x6eb82461e1657275cdfe6cc017d8ceef4e561ccb',
//   SAFE_ADDRESS: '0x912844e8c53f3ba80ea13db737bbb25a8bf46467',
//   CHAIN_ID: '0x64',
//   SHARE_ADDRESS: '0xfcca5335cAf1130FCB6a558bc056992bA0fF4Bb3',
//   STAKE_TOKEN: '0xe6421e9af92aca6a81c9fd0babace4a9c5691c60',
//   STAKE_TOKEN_NAME: 'Weenus 💪',
//   STAKE_TOKEN_SYMBOL: 'WEENUS',
//   STAKE_TOKEN_DECIMALS: 18,
//   SHAMAN_ADDRESS: '0xf9d0aBc84c704e25EB73960daB83da1656Ea114b',
// };

export const MANIFESTO = {
  title: 'The FROG Manifesto',
  sections: [
    {
      bold: 'We envision a future of frogs.',
      text: 'frogs!!',
    },
  ],
};
