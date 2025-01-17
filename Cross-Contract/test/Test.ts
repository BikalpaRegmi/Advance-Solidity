import { expect } from "chai";
import { ethers } from "hardhat";
import { Interact, Main } from "../typechain-types";

describe("Cross contract Interaction Learn", () => {
  let Maincontract:Main, Intcontract:Interact, addr1, addr2, owner;
  beforeEach(async () => {
    const mainFactory = await ethers.getContractFactory("Main");
    Maincontract = await mainFactory.deploy();

    const contractFactory = await ethers.getContractFactory("Interact");
    [owner, addr1, addr2] = await ethers.getSigners();
    Intcontract = await contractFactory.deploy();
  });

  it("Should update the value if called", async () => {
    await Intcontract.updateValue(Maincontract, 9);
    expect(await Intcontract.getValue(Maincontract)).to.eq(9);
  });
  
});