// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.28;
import './Setter.sol';

contract Getter is Setter {
    function GetValue() external view returns (string memory){
        return value ;
    }
}