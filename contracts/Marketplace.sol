// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Marketplace is ReentrancyGuard, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    Counters.Counter private _itemsSold;
    uint256 listingPrice = 0.025 ether;
    address public otterDollarAddress;

    constructor(address _otterDollarAddress) {
        otterDollarAddress = _otterDollarAddress;
    }

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
    mapping (uint => bool) private tokenIdToSoldForOtterDollars;

    function createMarketItemForOtterDollars(address _nftAddress, uint _otterDollarPrice, uint _tokenId) public onlyOwner {
        require(_otterDollarPrice > 0, "Price must be 1 or more OtterDollars");
        require(_nftAddress != address(0), "Nft address cannot be the zero address");
        tokenIdToSoldForOtterDollars[_tokenId] = false;
        _itemIds.increment();
        uint itemId = _itemIds.current();
        idToMarketItem[itemId] = MarketItem(itemId, _nftAddress, _tokenId, _otterDollarPrice, payable(msg.sender), payable(address(0)), false, false);
        emit MarketItemCreated(itemId, _nftAddress, _tokenId, _otterDollarPrice, msg.sender, address(0), false, false);
        IERC721(_nftAddress).transferFrom(msg.sender, address(this), _tokenId);
    }

    function createMarketItemNormal(address _nftAddress, uint _price, uint _tokenId) public payable {
        require(_price > 0, "Price must be at least 1 wei");
        require(msg.value == listingPrice, "Price must be equal to listing price");
        require(_nftAddress != address(0), "Nft address cannot be the zero address");
        require(tokenIdToSoldForOtterDollars[_tokenId] == true, "Item has not sold for OtterDollars yet");
        _itemIds.increment();
        uint itemId = _itemIds.current();
        idToMarketItem[itemId] = MarketItem(itemId, _nftAddress, _tokenId, _price, payable(msg.sender), payable(address(0)), false, true);
        emit MarketItemCreated(itemId, _nftAddress, _tokenId, _price, msg.sender, address(0), false, true);
        IERC721(_nftAddress).transferFrom(msg.sender, address(this), _tokenId);
        
    }

    // First need to call approve for OtterDollar contract so that this contract can transfer tokens
    function buyWithOtterDollars(uint _itemId) public nonReentrant returns (uint)  {
        MarketItem memory item = idToMarketItem[_itemId];
        uint price = item.price;
        address nftAddress = item.nftAddress;
        require(item.soldForOtterDollars == false, "Item has already been sold for OtterDollars");
        require(IERC20(otterDollarAddress).transfer(owner(), price), "OtterDollars did not transfer correctly");
        uint tokenId = item.tokenId;
        IERC721(nftAddress).transferFrom(address(this), msg.sender, tokenId);
        item.owner = payable(msg.sender);
        item.sold = true;
        item.soldForOtterDollars = true;
        tokenIdToSoldForOtterDollars[tokenId] = true;
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
        payable(owner()).transfer(listingPrice);
        return tokenId;
    }

    function fetchAllUnsold() public view returns (MarketItem[] memory) {
        uint lenArray = 0;
        uint numIds = _itemIds.current();
        for (uint i = 1; i <= numIds; i++) {
            if (idToMarketItem[i].sold == false) {
                lenArray++;
            }
        }
        uint count = 0;
        MarketItem[] memory ret = new MarketItem[](lenArray);
        for (uint i = 1; i <= numIds; i++) {
            if (idToMarketItem[i].sold == false) {
                ret[count] = idToMarketItem[i];
                count++;
            }
        }
        return ret;
    }

    function fetchOnlyOtterDollar() public view returns(MarketItem[] memory) {
        uint lenArray = 0;
        uint numIds = _itemIds.current();
        for (uint i = 1; i <= numIds; i++) {
            if (idToMarketItem[i].soldForOtterDollars == false) {
                lenArray++;
            }
        }
        uint count = 0;
        MarketItem[] memory ret = new MarketItem[](lenArray);
        for (uint i = 1; i <= numIds; i++) {
            if (idToMarketItem[i].soldForOtterDollars == false) {
                ret[count] = idToMarketItem[i];
                count++;
            }
        }
        return ret;
    }

    function fetchOnlyNormal() public view returns (MarketItem[] memory) {
        uint lenArray = 0;
        uint numIds = _itemIds.current();
        for (uint i = 1; i <= numIds; i++) {
            MarketItem storage item = idToMarketItem[i];
            if (item.soldForOtterDollars == true && item.sold == false) {
                lenArray++;
            }
        }
        uint count = 0;
        MarketItem[] memory ret = new MarketItem[](lenArray);
        for (uint i = 1; i <= numIds; i++) {
            MarketItem storage item = idToMarketItem[i];
            if (item.soldForOtterDollars == true && item.sold == false) {
                ret[count] = idToMarketItem[i];
                count++;
            }
        }
        return ret;
    }

    function fetchMyNFTs() public view returns(MarketItem[] memory) {
        uint lenArray = 0;
        uint numIds = _itemIds.current();
        for (uint i = 1; i <= numIds; i++) {
            if (idToMarketItem[i].owner == msg.sender) {
                lenArray++;
            }
        }
        uint count = 0;
        MarketItem[] memory myNFTs = new MarketItem[](lenArray);
        for (uint i = 1; i <= numIds; i++) {
            if (idToMarketItem[i].owner == msg.sender) {
                myNFTs[count] = idToMarketItem[i];
                count++;
            }
        }
        return myNFTs;
    }
}