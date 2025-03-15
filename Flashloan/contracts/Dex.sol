// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.27;

import {IERC20} from "@aave/core-v3/contracts/dependencies/openzeppelin/contracts/IERC20.sol";

contract Dex {
address payable public owner ;

IERC20 private dai ;
IERC20 private usdc ;

uint8 dexA = 90 ; //example uniswap
uint8 dexB = 100 ; //example coinbase

mapping(address => uint) public daiBalance ;
mapping(address => uint) public usdcBalance ;

constructor(address _daiAddress , address _usdcAddress){
  owner = payable(msg.sender) ;
  dai = IERC20(_daiAddress) ;
usdc = IERC20(_usdcAddress) ;
}

modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can call this function");
        _;
    }

function depositUsdc (uint256 _amount) external{
    usdcBalance[msg.sender]+=_amount ;
    uint allowance = usdc.allowance(msg.sender , address(this));
    require(allowance >= _amount , "Check the allowance") ;
    usdc.transferFrom(msg.sender , address(this) , _amount);
}

function depositDai (uint _amount) external {
    daiBalance[msg.sender]+=_amount ;
    uint allowance = dai.allowance(msg.sender , address(this)) ;
    require(allowance >=_amount , "Check the allowance");
    dai.transferFrom(msg.sender , address(this) , _amount);
}

function buyDai() external { //buying dai from uniswap
    uint usdcAmnt = usdcBalance[msg.sender];
    require(usdcAmnt>0 , "No usdc balance to swap");

    uint daiToReceive = (usdcAmnt*100*(10**12))/dexA ;

usdcBalance[msg.sender]=0;
daiBalance[msg.sender]+=daiToReceive ;

dai.transfer(msg.sender , daiToReceive);
}

function sellDai() external { //selling to coinbase
 uint daiAmnt = daiBalance[msg.sender] ;
 require(daiAmnt>0 , "No dai to exchange") ;

 uint usdcToReceive = (daiAmnt * dexB)/(100 *(10**12))  ;
 
 daiBalance[msg.sender] = 0 ;
 usdcBalance[msg.sender] += usdcToReceive ;

 usdc.transfer(msg.sender , usdcToReceive);
}

function getBalance(address _tokenAddr) external view returns(uint) {
    return IERC20(_tokenAddr).balanceOf(address(this));
}

function withdraw(address _tokenAddress) external onlyOwner {
        IERC20 token = IERC20(_tokenAddress);
        uint256 balance = token.balanceOf(address(this));
        require(balance > 0, "No tokens to withdraw");

        token.transfer(msg.sender, balance);
    }
    
        receive() external payable {}

}