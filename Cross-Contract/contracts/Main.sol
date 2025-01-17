// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.28;

contract Main {
    uint8 private value ; 

    function setter(uint8 _val) external {
        value = _val ;
    }

    function getter() external view returns(uint8){
        return value ;
    }

}