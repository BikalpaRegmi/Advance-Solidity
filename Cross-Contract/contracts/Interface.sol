// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.28;

interface Provider {
    function setter(uint8 _v) external ;
    function getter() external view returns(uint8) ;
}