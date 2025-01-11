// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.27;
import "./LearnProxy2.sol";

contract DemoV3 is DemoV2{
function getName() external view returns(string memory){
    return name ;
}
}