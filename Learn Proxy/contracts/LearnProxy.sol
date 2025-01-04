// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.27;


contract LearnProxy {
string version;

function setVersion() external {
    version = "1.0";
}

function getVersion() external view returns(string memory){
    return version ;
}

}