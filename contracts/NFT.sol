// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// https://ipfs.io/ipfs/Qmd9MCGtdVz2miNumBHDbvj8bigSgTwnr4SbyH6DNnpWdt?filename=1-PUG.json


contract NFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address public marketplaceAddress;

    event NFTCreated (
        uint indexed tokenId
    );

    constructor(address _marketplaceAddress) ERC721("OtterGang", "OTTER") {
        marketplaceAddress = _marketplaceAddress;
    }

    function createToken(string memory tokenURI) external onlyOwner returns (uint) {
        _tokenIds.increment();
        uint tokenId = _tokenIds.current();
        _safeMint(owner(), tokenId);
        _setTokenURI(tokenId, tokenURI);
        setApprovalForAll(marketplaceAddress, true);
        emit NFTCreated(tokenId);
        return tokenId;
    }
}
