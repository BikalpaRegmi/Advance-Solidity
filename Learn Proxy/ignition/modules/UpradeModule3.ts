import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import upgradeModule from "./UpgradeModule";

const upgradeModule3 = buildModule("UpgradeModule3", (m) => {
  const { proxyAdmin, proxy } = m.useModule(upgradeModule);

  const demoV3 = m.contract("DemoV3");

  return { proxyAdmin, proxy, demoV3 };
});

export default upgradeModule3;
