

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const NFTMODULE = buildModule("NFTDEMOMODULE", (m) => {
  

  const toDeploy = m.contract("NFTDEMO");

  return { toDeploy };
});

export default NFTMODULE;
