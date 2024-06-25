import { ValidNetwork } from "@daohaus/keychain-utils";
import { EthAddress } from "@daohaus/utils";

import { Keychain } from "@daohaus/keychain-utils";

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
  STAKE_PAUSED: boolean;
  STAKE_NEXT_START: number;
} = {
  ADDRESS: "0xf5d6b637a9185707f52d40d452956ca49018247a",
  SAFE_ADDRESS: "0xf84f1ad490029716d8a599613bb8671f56bfbbdc",
  CHAIN_ID: "0xa",
  SHARE_ADDRESS: "0x4950c436f69c8b4f80f688edc814c5ba84aa70f5",
  LOOT_ADDRESS: "0xab6033e3ec2144fb279fe68da92b7ac6a42da6d8",
  STAKE_TOKEN: "0x01b8b6384298d4848e3be63d4c9d17830eee488a",
  STAKE_TOKEN_NAME: "DaoHaus Token",
  STAKE_TOKEN_SYMBOL: "HAUS",
  STAKE_TOKEN_DECIMALS: 18,
  SHAMAN_ADDRESS: "0x40118ac38965a4adfe92e72cced49a151f9f0406", // expiry: 1726531200 //"0xae487435dCF82C764526f7f8805518d8E8b27677",
  STAKE_PAUSED: false,
  STAKE_NEXT_START: 1719866617 // last end 1711976936, // 
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

export const DEFAULT_GRAPH_URL =
  "https://api.thegraph.com/subgraphs/name/hausdao/dh-signal-tcr-optimism";

export const TCR_GRAPH_URL: Keychain = {
  "0x1": "https://api.thegraph.com/subgraphs/name/hausdao/dh-signal-tcr",
  "0x5": "https://api.thegraph.com/subgraphs/name/hausdao/dh-signal-tcr-goerli",
  "0xa": "https://api.thegraph.com/subgraphs/name/hausdao/dh-signal-tcr-optimism",
  "0x64":
    "https://api.thegraph.com/subgraphs/name/hausdao/dh-signal-tcr-gnosis",
};

export const MANIFESTO = {
  title: "The DAOhaus Manifesto",
  sections: [
    {
      bold: "We envision a future where any community can achieve its goals while reinforcing the sovereignty of its members.",
      text: "We build technological and cultural tools empowering communities to coordinate.",
    },
    {
      bold: "We are rebels and visionaries. We rebel by building the future we envision.",
      text: "The rebellion is serious, but we don't take ourselves too seriously. We are comrades more than colleagues. We work with integrity, with people of integrity.",
    },
    {
      bold: "We build for the community, with the community.",
      text: "We build public goods, and empower anyone to contribute. Our way of building coordination tools for communities is with community-owned coordination tools.",
    },
    {
      bold: "We cultivate a culture of good faith governance.",
      text: "We embed our values in our technology. Society is unbundling and DAOs are here to pick up the pieces. We attack the hardest problems to make the largest, scalable, positive impact.",
    },
    {
      bold: "Protocols should support humans, not the other way around.",
      text: "We try to embody the change we want to see without accidentally consolidating power along the way. We build tools that are fundamentally pro-social and enshrine solidarity.",
    },
    {
      bold: "We seek to put every member of a community in power,",
      text: "to distribute power throughout the organization.*We know the infrastructure and tools must be considered alongside the social and cultural elements as they rely upon each other.",
    },
    {
      bold: "We don't take shortcuts.",
      text: "We build for long-term sustainability. We don't concentrate power for convenience.",
    },
    {
      bold: "We are here to empower people,",
      text: "to make their lives better, to give voice to those who did not have a say before. We know we can make a better future beyond all skepticism and cliché. This optimism drives results.",
    },
    {
      bold: "We are explicit about power as a topic of conversation.",
      text: "For us, power isn't an undercurrent or subtext couched in another objective. We preserve the agency of the collective organization and the autonomy of individuals.",
    },
    {
      bold: "We reward contribution",
      text: "to show our appreciation for the community. We support humans willing to commit. We provide opportunity for all who are willing to demonstrate value.",
    },
    {
      bold: "We are opposed to exploitation by obfuscation.",
      text: "We strive for transparency in our objectives and operations. We advocate for governance where the outcome of participation has a provable result. We stretch the bounds of our technology and put activities on-chain, giving governance as much hardness, security, and impact as possible.",
    },
    {
      bold: "We facilitate capture-resistant communities",
      text: "to support coordination without fear that others will extract value.",
    },
    {
      bold: "We design for composability.",
      text: "We build primitives so communities can assemble these modular building blocks around their own values and needs.",
    },
    {
      bold: "We foster pluralism.",
      text: "We avoid becoming too attached to our ideas by encouraging diversity of thought. This makes us resilient, accessible, and stronger together.",
    },
    {
      bold: "We are committed to the long-term.",
      text: "We are here to build the future. We are not here to make a quick buck. We are here to build a better future for all.",
    },
    {
      bold: "We are demonstrating viable alternatives",
      text: "for scalable coordination, collaboration, and value transfer. We continue to challenge the status quo by asking difficult questions. We understand that we have to go further than merely rejecting previous attempts.",
    },
    {
      bold: "We eat our own dog food",
      text: "to demonstrate the power of experimentation. Failure is instructive, not something to avoid.",
    },
    {
      bold: "We ask forgiveness, not permission.",
      text: "Actions speak louder than words. We distinguish ourselves by what we do.",
    },
    {
      bold: "Human coordination is a matter of existential survival.",
      text: "We need these tools. We build them out of necessity.",
    },
    {
      bold: "DAOhaus aligns with Ethereum community values.",
      text: "We are here because we desire fairness and equality. We strive to foster ways of interacting that do not inflict violence, oppress, exploit, or extract. We believe in the power of purpose-driven communities.",
    },
    {
      bold: "We strive first to create value, not extract.",
      text: "",
    },
    {
      bold: "We strive first to collaborate, not compete.",
      text: "",
    },
    {
      bold: "We strive first to coordinate, not control.",
      text: "",
    },
  ],
};

export const ABOUTLINKS = {
  discord: "https://discord.gg/daohaus",
  twitter: "https://twitter.com/nowdaoit",
  github: "https://github.com/HausDAO/",
  githubOnboarder: "https://github.com/HausDAO/publichaus",
  dex: "https://velodrome.finance/liquidity?sort=apr&asc=false&filter=default&query=haus"
};
