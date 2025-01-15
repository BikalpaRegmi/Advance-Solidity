// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract Classroom is AccessControl {
    bytes32 public constant PRINCIPLE_ROLE = keccak256("PRINCIPLE_ROLE");
    bytes32 public constant TEACHER_ROLE = keccak256("TEACHER_ROLE");
    bytes32 public constant STUDENT_ROLE = keccak256("STUDENT_ROLE");

    struct Assignment {
        uint8 id;
        bytes32 topic;
        address teacher;
    }

    struct Submit {
        bytes32 assignment;
        address student;
    }

    mapping(uint8 => Assignment) private assignments;
    uint8 private assignmentCounter;

    mapping(uint8 => mapping(uint8 => Submit)) private submissions;
    mapping(uint8 => uint8) private submissionCounter;

    event RoleAssigned(address indexed individual, bytes32 role);

    constructor(address principle) {
        _grantRole(PRINCIPLE_ROLE, principle);//assigns principle role to owner
        _setRoleAdmin(TEACHER_ROLE, PRINCIPLE_ROLE);//only lets principle to assign teacherrole
        _setRoleAdmin(STUDENT_ROLE, PRINCIPLE_ROLE);//only lets principle to assign studentrole
    }

    function assignRoles(bytes32 role, address individual) external onlyRole(PRINCIPLE_ROLE) {
        require(role == TEACHER_ROLE || role == STUDENT_ROLE, "Invalid role to assign");
        grantRole(role, individual);
        emit RoleAssigned(individual, role);
    }

    function createAssignment(bytes32 topic) external onlyRole(TEACHER_ROLE) {
        assignments[assignmentCounter] = Assignment(assignmentCounter, topic, msg.sender);
        assignmentCounter++;
    }

    function submitAssignment(bytes32 assignmentData, uint8 assignmentId) external onlyRole(STUDENT_ROLE) {
        submissions[assignmentId][submissionCounter[assignmentId]] = Submit(assignmentData, msg.sender);
        submissionCounter[assignmentId]++;
    }

    function getAllAssignments() external view returns (Assignment[] memory) {
        Assignment[] memory allAssignments = new Assignment[](assignmentCounter);
        for (uint8 i = 0; i < assignmentCounter; ++i) {
            allAssignments[i] = assignments[i];
        }
        return allAssignments;
    }

    function getAllSubmissions(uint8 assignmentId) external view returns (Submit[] memory) {
        uint totalSubmissions = submissionCounter[assignmentId];
        Submit[] memory allSubmissions = new Submit[](totalSubmissions);
        for (uint8 i = 0; i < totalSubmissions; ++i) {
            allSubmissions[i] = submissions[assignmentId][i];
        }
        return allSubmissions;
    }
}
