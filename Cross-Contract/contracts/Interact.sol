// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.28;
import "./Interface.sol";

contract Interact{
function updateValue(address _mainAddr , uint8 _val) external{
    Provider(_mainAddr).setter(_val);
}

function getValue(address _mainAddr) external view returns(uint8){
  Provider addr = Provider(_mainAddr);
  return addr.getter();
}
}