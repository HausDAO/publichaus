# Publichaus
This is a onboarder app for PublicHAUS DAO

## Features
- stake haus for loot
- view Champions
- claim rewards
- apply for Champion
- read manifesto


## Details

this is a front end interface to interact with the PublicHaus Onboarder shaman. Which allows depositing HAUS into the main treasury in return for community loot.

Community loot is used to signal in the seasonal way finding and rewards sessions.

Champions can be viewed with some further detail. And anyone can post a message onchain and kick off a proposal to become a Champion (Champions are DAO operators)

Rewards set from staking and retro reward sessions can be claimed through interaction with the StakeClaim Shaman. This shaman transfers HAUS to the treasury in return for Loot

> The onboarder shaman has an expiery so will need to be redeployed and configured for every new season. targetDAO will need to be updated

## Contracts
Contract addresses are in targetDAO.tsx

Onboard Shaman - manager
[op etherscan](https://optimistic.etherscan.io/address/0x8d53663810824716b2baDBc9B5f486b36C13e4bE)


ClaimStake Shaman - manager
[op etherscan](https://optimistic.etherscan.io/address/0x22F09C11De8f059840FD8F60b11b8d60DeA0E011)


