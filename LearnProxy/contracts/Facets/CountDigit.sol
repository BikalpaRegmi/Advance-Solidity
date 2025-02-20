// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.27;
import "../Libraries/MessageLib.sol";

contract Count {

    function getMsgCount() external view returns(uint){
    return MessageLib.getMessageCount();
    }

}