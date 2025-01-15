import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const proxyModule = buildModule("ProxyModule", (m) => {
  const deployer = m.getAccount(0);

  const setterImplementation = m.contract("Setter");

  const proxy = m.contract("TransparentUpgradeableProxy", [
    setterImplementation, 
    deployer, 
    "0x", 
  ]);

    const proxyAdminAddress = m.readEventArgument(
      proxy,
      "AdminChanged",
      "newAdmin"
    );
  
    const proxyAdmin = m.contractAt("ProxyAdmin", proxyAdminAddress);


  return { proxy , proxyAdmin };
});

export default proxyModule;
