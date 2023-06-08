import { LOCAL_ABI } from '@daohaus/abis';
import { ContractLego, EthAddress } from '@daohaus/utils';
import { CONTRACT_KEYCHAINS } from '@daohaus/keychain-utils';
import { TARGET_DAO } from '../targetDAO';
import OnboarderABI from '../abis/Onboarder.json';
import StakeClaimABI from '../abis/StakeClaim.json';

export const CONTRACT: Record<string, ContractLego> = {
  POSTER: {
    type: 'static',
    contractName: 'Poster',
    abi: LOCAL_ABI.POSTER,
    targetAddress: {
      '0x1': '0x000000000000cd17345801aa8147b8d3950260ff',
      '0x5': '0x000000000000cd17345801aa8147b8d3950260ff',
      '0x64': '0x000000000000cd17345801aa8147b8d3950260ff',
      '0xa': '0x000000000000cd17345801aa8147b8d3950260ff',
    },
  },
  ERC_20: {
    type: 'static',
    contractName: 'ERC_20',
    abi: LOCAL_ABI.ERC20,
    targetAddress: TARGET_DAO.STAKE_TOKEN,
  },
  ERC_20_FUNDING: {
    type: 'static',
    contractName: 'ERC20',
    abi: LOCAL_ABI.ERC20,
    targetAddress: '.formValues.paymentTokenAddress',
  },
  CURRENT_DAO: {
    type: 'static',
    contractName: 'Current DAO (Baal)',
    abi: LOCAL_ABI.BAAL,
    targetAddress: '.daoId',
  },
  TRIBUTE_MINION: {
    type: 'static',
    contractName: 'Tribute Minion',
    abi: LOCAL_ABI.TRIBUTE_MINION,
    targetAddress: CONTRACT_KEYCHAINS.TRIBUTE_MINION,
  },
  SHARES_ERC20: {
    type: 'static',
    contractName: 'SHARES_ERC20',
    abi: LOCAL_ABI.SHARES,
    targetAddress: TARGET_DAO.SHARE_ADDRESS,
  },
  LOOT_ERC20: {
    type: 'static',
    contractName: 'LOOT_ERC20',
    abi: LOCAL_ABI.LOOT,
    targetAddress: '.dao.sharesAddress',
  },
  ONBOARDER: {
    type: 'static',
    contractName: 'Onboarder',
    abi: OnboarderABI,
    targetAddress: TARGET_DAO.SHAMAN_ADDRESS,
  },
  STAKECLAIM: {
    type: 'static',
    contractName: 'StakeClaim',
    abi: StakeClaimABI, 
    targetAddress: ".contractAddress",
  },
};
