import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import proxyModule from "./ProxyModule";

const upgradeModule = buildModule("UpgradeModule", (m) => {

  const { proxyAdmin, proxy } = m.useModule(proxyModule);

  const demoV2 = m.contract("DemoV2");

  return { proxyAdmin, proxy ,demoV2 };
});

export default upgradeModule;
