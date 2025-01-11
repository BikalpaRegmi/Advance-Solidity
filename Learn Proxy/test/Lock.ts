import { expect } from "chai";
import { ignition, ethers } from "hardhat";

import ProxyModule from "../ignition/modules/ProxyModule";
import UpgradeModule from "../ignition/modules/UpgradeModule";
import { Demo } from "../typechain-types";
import { DemoV2 } from "../typechain-types";

describe("Demo Proxy", function () {
  describe("Proxy interaction", async function () {
    it("Should be interactable via proxy", async function () {
      const [, otherAccount] = await ethers.getSigners();

        const { demo } = await ignition.deploy(ProxyModule);
        
        
    const contract: Demo = await ethers.getContractAt("Demo", demo);

      expect(await contract.connect(otherAccount).version()).to.equal("1.0");
    });
  });

  describe("Upgrading", function () {
    it("Should have upgraded the proxy to DemoV2", async function () {
      const [, otherAccount] = await ethers.getSigners();

        const { demoV2 } = await ignition.deploy(UpgradeModule);
        
            const contract: DemoV2 = await ethers.getContractAt("DemoV2", demoV2);


      expect(await contract.connect(otherAccount).version()).to.equal("2.0.0");
    });

    it("Should have set the name during upgrade", async function () {
      const [, otherAccount] = await ethers.getSigners();

        const { demoV2 } = await ignition.deploy(UpgradeModule);
        
                    const contract: DemoV2 = await ethers.getContractAt(
                      "DemoV2",
                      demoV2
                    );

        await contract.setName("Example Name");
      expect(await contract.connect(otherAccount).name()).to.equal("Example Name");
    });
  });
});
