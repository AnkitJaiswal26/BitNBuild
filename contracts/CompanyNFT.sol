// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract CompanyNFT is ERC721URIStorage {
    using Counters for Counters.Counter;

    Counters.Counter private productItemIds;

    mapping(uint256 => uint256) id_to_currentURI;
    mapping(uint256 => string[]) id_to_ipfsUri;

    struct Product {
        uint256 productId;
        string name;
        uint256 price;
        address company;
    }

    struct ProductItem {
        uint256 productId;
        uint256 itemId;
        string man_date;
        string ex_date;
        address owner;
        string pubKey;
        string privateKey;
        uint256 purchasedAt;
        uint256 validity;
        bool isPurchased;
        string cid;
    }

    address private company;
    string companyName;
    string cin;

    address[] private products;
    uint256 private _totalSupply;
    uint256 private productCount;

    mapping(uint256 => ProductItem) private productItemsMapping;
    mapping(uint256 => Product) private productsMapping;
    mapping(string => uint256) privateKeyToProductItemMapping;
    mapping(string => string) pubKeyToPrivateKeyMapping;

    // mapping(address => uint256[]) private purchasedTickets;

    constructor(
        string memory _companyName,
        string memory _cin,
        string memory companySymbol,
        address owner
    ) ERC721(companyName, companySymbol) {
        company = owner;
        companyName = _companyName;
        cin = _cin;
    }

    modifier isOwner() {
        require(company == msg.sender);
        _;
    }

    function addProduct(string memory name, uint256 price) public {
        productsMapping[productCount++] = Product(
            productCount,
            name,
            price,
            msg.sender
        );
    }

    function fetchCompanyDetails()
        public
        view
        returns (address, string memory, string memory)
    {
        return (company, companyName, cin);
    }

    function mint(
        uint256 productId,
        string memory man_date,
        string memory ex_date,
        string memory pubKey,
        string memory privateKey,
        string memory tokenURI,
        uint256 validity
    ) public {
        productItemIds.increment();
        uint256 newItemId = productItemIds.current();

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);

        id_to_currentURI[newItemId] = 0;

        productItemsMapping[newItemId] = ProductItem({
            productId: productId,
            itemId: newItemId,
            man_date: man_date,
            ex_date: ex_date,
            owner: address(0),
            isPurchased: false,
            pubKey: pubKey,
            privateKey: privateKey,
            purchasedAt: 0,
            validity: validity,
            cid: tokenURI
        });

        privateKeyToProductItemMapping[privateKey] = newItemId;
        pubKeyToPrivateKeyMapping[pubKey] = privateKey;
    }

    function addBulkProducts(
        uint256 productId,
        string[] memory pubKeys,
        string[] memory privateKeys,
        string memory man_date,
        string memory ex_date,
        string[] memory tokenURI,
        uint256 validity
    ) public {
        for (uint256 i = 0; i < pubKeys.length; i++) {
            mint(
                productId,
                man_date,
                ex_date,
                pubKeys[i],
                privateKeys[i],
                tokenURI[i],
                validity
            );
        }
    }

    function fetchProductById(
        uint256 productId
    ) public view returns (Product memory) {
        return productsMapping[productId];
    }

    function fetchAllProducts() public view returns (Product[] memory) {
        Product[] memory result = new Product[](productCount);

        for (uint256 i = 0; i < productCount; i++) {
            Product storage cur = productsMapping[i];
            result[i] = cur;
        }

        return result;
    }

    function fetchAllProductItemsByProductId(
        uint256 productId
    ) public view returns (ProductItem[] memory) {
        uint256 totalCount = productItemIds.current();

        uint256 proCount;
        for (uint256 i = 0; i < totalCount; i++) {
            if (productItemsMapping[i].productId == productId) {
                proCount += 1;
            }
        }

        ProductItem[] memory result = new ProductItem[](proCount);
        proCount = 0;

        for (uint256 i = 0; i < totalCount; i++) {
            if (productItemsMapping[i].productId == productId) {
                ProductItem storage cur = productItemsMapping[i];
                result[proCount++] = cur;
            }
        }

        return result;
    }

    function fetchProductItemById(
        uint256 itemId
    ) public view returns (ProductItem memory) {
        return productItemsMapping[itemId];
    }

    function fetchProductItemByPrivateKey(
        string memory privateKey
    ) public view returns (uint256 id) {
        return privateKeyToProductItemMapping[privateKey];
    }

    function fetchProductItemByPublicKey(
        string memory publicKey
    ) public view returns (uint256 id) {
        return
            privateKeyToProductItemMapping[
                pubKeyToPrivateKeyMapping[publicKey]
            ];
    }

    function growNFT(uint256 tokenId, string memory tokenURI) private {
        require(id_to_currentURI[tokenId] < 1, "It id impossible to grow more");

        _setTokenURI(tokenId, tokenURI);

        productItemsMapping[tokenId].cid = tokenURI;
        id_to_currentURI[tokenId] += 1;
    }

    function buyProduct(
        string memory privateKey,
        string memory tokenURI
    ) public {
        productItemsMapping[privateKeyToProductItemMapping[privateKey]]
            .isPurchased = true;
        productItemsMapping[privateKeyToProductItemMapping[privateKey]]
            .owner = _msgSender();
        productItemsMapping[privateKeyToProductItemMapping[privateKey]]
            .purchasedAt = block.timestamp;

        growNFT(privateKeyToProductItemMapping[privateKey], tokenURI);
    }

    function checkState(string memory pubKey) public view returns (uint256) {
        return
            id_to_currentURI[
                privateKeyToProductItemMapping[
                    pubKeyToPrivateKeyMapping[pubKey]
                ]
            ];
    }

    function checkIfAlreadyPurchased(
        string memory pubKey
    ) public view returns (bool) {
        return
            id_to_currentURI[
                privateKeyToProductItemMapping[
                    pubKeyToPrivateKeyMapping[pubKey]
                ]
            ] > 0;
    }

    // Get all tickets owned by a customer
    function fetchUserItems() public view returns (ProductItem[] memory) {
        uint256 totalItemCount = productItemIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (productItemsMapping[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        ProductItem[] memory items = new ProductItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (productItemsMapping[i + 1].owner == msg.sender) {
                uint256 currentId = i + 1;
                ProductItem storage currentItem = productItemsMapping[
                    currentId
                ];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function fetchAllItems() public view returns (ProductItem[] memory) {
        uint256 count = productItemIds.current();

        ProductItem[] memory items = new ProductItem[](count);
        for (uint256 i = 0; i < count; i++) {
            uint256 currentId = i + 1;
            ProductItem storage currentItem = productItemsMapping[currentId];
            items[currentId-1] = currentItem;
            currentId += 1;
        }
        return items;
    }
}
