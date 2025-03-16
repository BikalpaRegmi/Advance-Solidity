import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config();

const baseSepoliaPrivateKey = process.env.WALLET_KEY!;
const baseScanApiKeyForInteraction = process.env.VERIFY_LINK!;

const config: HardhatUserConfig = {
  solidity: "0.8.27",

  networks: {
    "base-sepolia": {
      url: "https://sepolia.base.org",
      accounts: [baseSepoliaPrivateKey as string],
    },
  },
  etherscan: {
    apiKey: {
      "base-sepolia": baseScanApiKeyForInteraction,
    },
    customChains: [
      {
        network: "base-sepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://api-sepolia.basescan.org/api",
          browserURL: "https://sepolia.basescan.org",
        },
      },
    ],
  },
};

export default config;

