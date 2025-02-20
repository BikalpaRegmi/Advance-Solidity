import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config();

const baseSepoliaPrivateKey: string = process.env.Verify_Link!;
const metamaskPrivateKey: string = process.env.Wallet_Key!;

const config: HardhatUserConfig = {
  solidity: "0.8.27",

  networks: {
    "base-sepolia": {
      url: "https://sepolia.base.org",
      accounts: [metamaskPrivateKey as string],
    },
  },

  etherscan: {
    apiKey: {
      "base-sepolia": baseSepoliaPrivateKey,
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
