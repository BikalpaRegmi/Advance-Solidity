// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.28;

contract Setter {
    string value ;

    function toSet(string memory _toSet) external {
    value = _toSet ;
    }

}