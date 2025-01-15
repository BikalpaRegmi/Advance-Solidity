import { expect } from "chai";
import { ethers } from "hardhat";
import { Signer, toUtf8Bytes } from "ethers";
import { Classroom } from "../typechain-types";

describe("LEARNING RBAC", () => {
  let owner: Signer, addr1: Signer, addr2: Signer, contract: Classroom;

  beforeEach(async () => {
    const contractFactory = await ethers.getContractFactory("Classroom") ;
    [owner, addr1, addr2] = await ethers.getSigners() ;
    contract = await contractFactory.deploy(await owner.getAddress()) ;
  });

  it("Should only allow owner to assign the address", async () => {
    const TEACHER_ROLE = ethers.keccak256(
      ethers.toUtf8Bytes("TEACHER_ROLE")
    );
    const tx = await contract.connect(owner).assignRoles(TEACHER_ROLE, addr2);
    expect(tx).to.emit(contract, "RoleAssigned");
  });
  
  it("Should let the teachers to create assignment", async () => {
    const TEACHER_ROLE = ethers.keccak256(ethers.toUtf8Bytes("TEACHER_ROLE"));
    await contract.connect(owner).assignRoles(TEACHER_ROLE, addr2);
    const hw = ethers.keccak256(ethers.toUtf8Bytes("Explain Agriculture"));
    await contract.connect(addr2).createAssignment(hw);
    const assignment = await contract.getAllAssignments();
    expect(assignment[0].topic).to.eq(hw);
  });

  it("Should let students to submit their assignments", async () => {
     const TEACHER_ROLE = ethers.keccak256(ethers.toUtf8Bytes("TEACHER_ROLE"));
     await contract.connect(owner).assignRoles(TEACHER_ROLE, addr2);
     const hw = ethers.keccak256(ethers.toUtf8Bytes("Explain Agriculture"));
    await contract.connect(addr2).createAssignment(hw);
   
    const STUDENTROLE = ethers.keccak256(ethers.toUtf8Bytes("STUDENT_ROLE"));
   const tx =  await contract.connect(owner).assignRoles(STUDENTROLE, addr1);
    expect(tx).to.emit(contract, "RoleAssigned");

    const assignmentData = ethers.keccak256(ethers.toUtf8Bytes("Agriculture is an art of farming"));
    await contract.connect(addr1).submitAssignment(assignmentData, 0);

    const allSubmissionData = await contract.getAllSubmissions(0);
    expect(allSubmissionData[0].assignment).eq(assignmentData);
    expect(allSubmissionData[0].student).eq(addr1);
  })
})