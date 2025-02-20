import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SolidStateDiamond = buildModule("SolidStateDiamond", (m) => {
  const diamond = m.contract("Diamond"); 

  return { diamond };
});

export default SolidStateDiamond;
