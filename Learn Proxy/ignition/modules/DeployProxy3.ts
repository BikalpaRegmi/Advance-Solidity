import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import upgradeModule3 from "./UpradeModule3";

const demoV3Module = buildModule("DemoV3Module", (m) => {
  const { proxy } = m.useModule(upgradeModule3);

  const demo3 = m.contractAt("DemoV3", proxy);

  return { demo3 };
});

export default demoV3Module;
