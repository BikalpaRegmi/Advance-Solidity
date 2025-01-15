import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import proxyModule from "./Lock";

const upgradeModule = buildModule("UpgradeModule", (m) => {
  const { proxy , proxyAdmin } = m.useModule(proxyModule); 

  const getterImplementation = m.contract("Getter"); 

const data = "0x"; 
m.call(proxyAdmin, "upgradeAndCall", [proxy, getterImplementation, data]);

  return { proxy };
});

export default upgradeModule;
