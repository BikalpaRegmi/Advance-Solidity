// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.27;

library  MessageLib {
    bytes32 internal constant NAMESPACE = keccak256("MSGLIB.Block");

    struct Storage {
        string message ;
        uint count ;
    }

    function getStorage() internal pure returns(Storage storage s){
        bytes32 position = NAMESPACE ;
        assembly {
            s.slot := position 
        }
    }

    function getMessage() internal view returns(string memory){
return getStorage().message ;
    }

    function setMessage(string calldata _msg) internal {
       Storage storage s = getStorage();
       s.message = _msg ;
       s.count++;
    }

    function getMessageCount() internal view returns(uint){
        return getStorage().count;
    }
}