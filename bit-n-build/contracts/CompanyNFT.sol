// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract CompanyNFT is ERC721URIStorage {
    using Counters for Counters.Counter;

    Counters.Counter private _warantyIds;

    struct WarrantyCard {
        uint256 productItemId;
        uint256 purchasedAt;
        address owner;
        uint256 validity;
    }

    address private company;
    address[] private products;
    uint256 private _totalSupply;

    mapping(uint256 => WarrantyCard) private _warantyCards;
    mapping(address => uint256[]) private purchasedTickets;

    constructor(
        string memory companyName,
        string memory companySymbol,
        address owner
    ) ERC721(companyName, companySymbol) {
        company = owner;
    }

    modifier isOwner() {
        require(company == msg.sender);
        _;
    }

    function mint(
        string memory tokenURI,
        uint256 _productItemId,
        uint256 purchasedAt,
        uint256 validity
    ) public returns (uint256) {
        _warantyIds.increment();
        uint256 newCardId = _warantyIds.current();

        _mint(msg.sender, newCardId);
        _setTokenURI(newCardId, tokenURI);

        _warantyCards[newCardId] = WarrantyCard({
            productItemId: _productItemId,
            purchasedAt: purchasedAt,
            owner: msg.sender,
            validity: validity
        });

        return newCardId;
    }

    // Get ticket details
    function getWarantyDetails(
        uint256 cardId
    ) public view returns (WarrantyCard memory) {
        return _warantyCards[cardId];
    }

    // Get all tickets owned by a customer
    function fetchMyWarantyCards() public view returns (WarrantyCard[] memory) {
        uint256 totalItemCount = _warantyIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (_warantyCards[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        WarrantyCard[] memory items = new WarrantyCard[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (_warantyCards[i + 1].owner == msg.sender) {
                uint256 currentId = i + 1;
                WarrantyCard storage currentItem = _warantyCards[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function fetchAllCards() public view returns (WarrantyCard[] memory) {
        uint256 count = _warantyIds.current();

        WarrantyCard[] memory items = new WarrantyCard[](count);
        for (uint256 i = 0; i < count; i++) {
            uint256 currentId = i + 1;
            WarrantyCard storage currentItem = _warantyCards[currentId];
            items[currentId] = currentItem;
            currentId += 1;
        }
        return items;
    }
}
