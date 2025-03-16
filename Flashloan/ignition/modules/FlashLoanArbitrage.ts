import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const FlashLoanModule = buildModule("FlashLoanModule", (m) => { 

  const toDeploy: any = m.contract("FlashLoanArbitrage", [
    "0xe20fcbdbffc4dd138ce8b2e6fbb6cb49777ad64d",
    "0x50c5725949a6f0c72e6c4a641f24049a917db0cb",
    "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
  ]);

  return { toDeploy } ;
});

export default FlashLoanModule ;