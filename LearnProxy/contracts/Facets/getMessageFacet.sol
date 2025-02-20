// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.27;

import "../Libraries/MessageLib.sol";

contract GetMessage {
    function getMessage() external view returns(string memory){
  return MessageLib.getMessage(); 
    }
}