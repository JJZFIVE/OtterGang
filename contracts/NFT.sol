// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address marketplaceAddress;

    constructor(address _marketplaceAddress) ERC721("OtterGang", "OTTER") {
        marketplaceAddress = _marketplaceAddress;
    }

    function createToken(address _player, string memory tokenURI) external returns (uint) {
        _tokenIds.increment();
        uint tokenId = _tokenIds.current();
        _safeMint(_player, tokenId);
        _setTokenURI(tokenId, tokenURI);
        setApprovalForAll(marketplaceAddress, true);
        return tokenId;
    }
}
