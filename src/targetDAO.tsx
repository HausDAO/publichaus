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
  ADDRESS: '0xb3515130d594a83571f37861c0e9d8de1c1ae893',
  SAFE_ADDRESS: '0x5fb1557dae297dc508eea1bb613307dd76531cb9',
  CHAIN_ID: '0x5',
  SHARE_ADDRESS: '0x9ff01db42ad737b1e907d21d2f1c105423d324ed',
  LOOT_ADDRESS: '0x8a7aacce7b0336c7c4986fc11533200105e73fa2',
  STAKE_TOKEN: '0xaFF4481D10270F50f203E0763e2597776068CBc5',
  STAKE_TOKEN_NAME: 'WEENUS Token',
  STAKE_TOKEN_SYMBOL: 'WEENUS',
  STAKE_TOKEN_DECIMALS: 18,
  SHAMAN_ADDRESS: '0xbeC36d44523DF7E8062E8A5a29C9433e91633Fdd',
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
