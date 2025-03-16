import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const DEXModule = buildModule("DexDemo", (m) => {
  const toDeploy: any = m.contract("Dex", [
    '0x50c5725949a6f0c72e6c4a641f24049a917db0cb',
    '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
  ]) ;

  return { toDeploy };
});

export default DEXModule;
