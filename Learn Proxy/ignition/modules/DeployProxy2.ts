import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import upgradeModule from "./UpgradeModule";

const demoV2Module = buildModule("DemoV2Module", (m) => {
  const { proxy } = m.useModule(upgradeModule);

  const demo = m.contractAt("DemoV2", proxy);

  return { demo };
});

export default demoV2Module;