// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.27;
import "../Libraries/MessageLib.sol" ;

contract SetMsg {

   function setMessage(string calldata _msg) external  {
        MessageLib.setMessage(_msg);
    }
    
}