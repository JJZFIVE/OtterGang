// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Marketplace is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    Counters.Counter private _itemsSold;

    struct MarketItem {
        uint itemId;
        address nftAddress;
        uint tokenId;
        uint price;
        address payable seller;
        address payable owner;
        bool sold;
        bool soldForOtterDollars;
    }

    event MarketItemCreated (
        uint indexed itemId,
        address indexed nftAddress,
        uint indexed tokenId,
        uint price,
        address seller,
        address owner,
        bool sold,
        bool soldForOtterDollars
    );

    mapping (uint => MarketItem) private idToMarketItem;

    function buyWithOtterDollars(address _otterDollarContract, uint _itemId) public nonReentrant returns (uint)  {
        MarketItem memory item = idToMarketItem[_itemId];
        uint price = item.price;
        require(item.soldForOtterDollars == false, "Item has already been sold for OtterDollars");
        require(IERC20(_otterDollarContract).transfer(msg.sender, price), "OtterDollars did not transfer correctly");
        uint tokenId = item.tokenId;
        IERC721(item.nftAddress).transferFrom(address(this), msg.sender, tokenId);
        item.owner = payable(msg.sender);
        item.sold = true;
        item.soldForOtterDollars = true;
        _itemsSold.increment();
        return tokenId;
    }

    function buyNormal(uint _itemId) payable public nonReentrant returns(uint)  {
        MarketItem memory item = idToMarketItem[_itemId];
        uint price = item.price;
        uint tokenId = item.tokenId;
        require(item.soldForOtterDollars == true, "Item has not been sold for OtterDollars yet");
        require(msg.value == price, "Incorrect value sent");
        item.seller.transfer(msg.value);
        item.owner = payable(msg.sender);
        item.sold = true;
        IERC721(item.nftAddress).transferFrom(address(this), msg.sender, tokenId);
        _itemsSold.increment();
        return tokenId;
    }


}