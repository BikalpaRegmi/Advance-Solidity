// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.27;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFTDEMO is ERC721URIStorage{
uint8 private tokenId ;

    constructor() ERC721("BKL" , "NFTDEMO"){}

function mint(address _receipentId , string memory _tokenUri) external {
    tokenId++ ;
    uint8 currentToken = tokenId;
    _safeMint(_receipentId , currentToken);
    _setTokenURI(tokenId , _tokenUri);
}


}