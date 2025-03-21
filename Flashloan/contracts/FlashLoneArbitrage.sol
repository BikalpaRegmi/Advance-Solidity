// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

import {FlashLoanSimpleReceiverBase} from "@aave/core-v3/contracts/flashloan/base/FlashLoanSimpleReceiverBase.sol";
import {IPoolAddressesProvider} from "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";
import {IERC20} from "@aave/core-v3/contracts/dependencies/openzeppelin/contracts/IERC20.sol";

interface IDex {
    function depositUsdc(uint256 _amount) external;

    function depositDai(uint256 _amount) external;

    function buyDai() external;

    function sellDai() external;
}

contract FlashLoanArbitrage is FlashLoanSimpleReceiverBase {
    address payable owner;
    address private dexContractAddress =
        0xce3C14ad8e35faC16849dB3c07dbD1c0035474f7 ;

    IERC20 private dai;
    IERC20 private usdc;
    IDex private dexContract;

    constructor(address _addressProvider,address  _daiAddress, address _usdcAddress)
        FlashLoanSimpleReceiverBase(IPoolAddressesProvider(_addressProvider))
    {
        owner = payable(msg.sender);

        dai = IERC20(_daiAddress);
        usdc = IERC20(_usdcAddress);
        dexContract = IDex(dexContractAddress);
    }

    
    function executeOperation(
        address asset,
        uint256 amount,
        uint256 premium,
        address initiator,
        bytes calldata params
    ) external override returns (bool) {
       
        dexContract.depositUsdc(1000000000); 
        dexContract.buyDai();
        dexContract.depositDai(dai.balanceOf(address(this)));
        dexContract.sellDai();

        
        uint256 amountOwed = amount + premium;
        IERC20(asset).approve(address(POOL), amountOwed);

        return true;
    }

    function requestFlashLoan(address _token, uint256 _amount) public {
        address receiverAddress = address(this);
        address asset = _token;
        uint256 amount = _amount;
        bytes memory params = "";
        uint16 referralCode = 0;

        POOL.flashLoanSimple(
            receiverAddress,
            asset,
            amount,
            params,
            referralCode
        );
    }

    function approveUSDC(uint256 _amount) external returns (bool) {
        return usdc.approve(dexContractAddress, _amount);
    }

    function allowanceUSDC() external view returns (uint256) {
        return usdc.allowance(address(this), dexContractAddress);
    }

    function approveDAI(uint256 _amount) external returns (bool) {
        return dai.approve(dexContractAddress, _amount);
    }

    function allowanceDAI() external view returns (uint256) {
        return dai.allowance(address(this), dexContractAddress);
    }

    function getBalance(address _tokenAddress) external view returns (uint256) {
        return IERC20(_tokenAddress).balanceOf(address(this));
    }

    function withdraw(address _tokenAddress) external onlyOwner {
        IERC20 token = IERC20(_tokenAddress);
        token.transfer(msg.sender, token.balanceOf(address(this)));
    }

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only the contract owner can call this function"
        );
        _;
    }

    receive() external payable {}
}