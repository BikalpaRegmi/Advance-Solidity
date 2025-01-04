import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const proxyModule = buildModule("DEPLOYPROXY", (m) => {
    const proxyAdminOwner = m.getAccount(0);

    const contract = m.contract("LearnProxy");

    const proxy = m.contract("TransparentUpgradeableProxy", [contract, proxyAdminOwner, '0x']);

    const proxyAdminAddress: any = m.readEventArgument(proxy, "AdminChanged", "newAdmin");

    const proxyAdmin = m.contractAt("ProxyAdmin", proxyAdminAddress);

    return { proxyAdmin, proxy };
});

export default proxyModule;