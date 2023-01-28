// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./CompanyNFT.sol";

// import "hardhat/console.sol";

contract SafeBuys {
    string public letters = "abcdefghijklmnopqrstuvwxyz";
    uint counter = 1;
    address payable owner;

    struct User {
        address userAdd;
        string name;
        uint256 age;
        bool gender;
        string email;
        string mobileNo;
    }

    struct IPFSFile {
        string cid;
        string fileName;
    }

    struct Company {
        address comAdd;
        string name;
        string cin;
    }

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
        bool isPurchased;
        address owner;
        string pubKey;
        string privateKey;
    }

    struct Keys {
        string publicKey;
        string privateKey;
    }

    uint256 userCount;
    uint256 companyRequestCount;
    uint256 companyCount;
    uint256 productCount;
    uint256 itemCount;

    mapping(uint256 => User) userMapping;
    mapping(uint256 => Company) companyMapping;
    mapping(uint256 => Company) companyRequestMapping;
    mapping(uint256 => Product) productMapping;
    mapping(uint256 => ProductItem) productItemMapping;
    mapping(uint256 => CompanyNFT) companyNFTMapping;

    mapping(address => uint256) userAddressToIdMapping;
    mapping(address => uint256) companyAddressToIdMapping;
    mapping(address => uint256) companyAddressToIdRequestMapping;
    mapping(string => uint256) privateKeyToProductItemMapping;
    mapping(string => string) pubKeyToPrivateKeyMapping;

    receive() external payable {}

    constructor() {
        owner = payable(msg.sender);
    }

    modifier isOwner() {
        require(msg.sender == owner);
        _;
    }

    function registerUser(
        address userAdd,
        string memory name,
        string memory emailId,
        string memory mobileNo,
        bool gender,
        uint256 age
    ) public {
        userMapping[userCount] = User(
            userAdd,
            name,
            age,
            gender,
            emailId,
            mobileNo
        );

        userAddressToIdMapping[msg.sender] = userCount++;
    }

    function registerCompany(
        address comAdd,
        string memory name,
        string memory cin
    ) public {
        companyRequestMapping[companyRequestCount] = Company(comAdd, name, cin);

        companyAddressToIdRequestMapping[msg.sender] = companyRequestCount++;
    }

    function acceptCompany(address companyAdd) public isOwner {
        companyMapping[companyCount] = companyRequestMapping[
            companyAddressToIdRequestMapping[companyAdd]
        ];
        companyCount += 1;
        // CompanyNFT memory companyNFT = new CompanyNFT(
        //     companyMapping[companyCount - 1].name,
        //     companyMapping[companyCount - 1].cin,
        //     companyAdd
        // );

        companyNFTMapping[companyCount - 1] = companyNFT;
        companyRequestMapping[
            companyAddressToIdRequestMapping[companyAdd]
        ] = companyRequestMapping[companyRequestCount - 1];
        companyAddressToIdRequestMapping[
            companyRequestMapping[companyRequestCount - 1].comAdd
        ] = companyAddressToIdRequestMapping[companyAdd];

        delete companyRequestMapping[companyRequestCount - 1];
        companyRequestCount -= 1;
    }

    function rejectCompany(address companyAdd) public isOwner {
        companyRequestMapping[
            companyAddressToIdRequestMapping[companyAdd]
        ] = companyRequestMapping[companyRequestCount - 1];
        companyAddressToIdRequestMapping[
            companyRequestMapping[companyRequestCount - 1].comAdd
        ] = companyAddressToIdRequestMapping[companyAdd];

        delete companyRequestMapping[companyRequestCount - 1];
        companyRequestCount -= 1;
    }

    function fetchUserByAddress(
        address userAdd
    ) public view returns (User memory) {
        return userMapping[userAddressToIdMapping[userAdd]];
    }

    function fetchCompanyByAddress(
        address comAdd
    ) public view returns (Company memory) {
        return companyMapping[companyAddressToIdMapping[comAdd]];
    }

    function addProduct(string memory name, uint256 price) public {
        productMapping[productCount++] = Product(
            productCount,
            name,
            price,
            msg.sender
        );
    }

    function addProductItem(
        uint256 productId,
        string memory man_date,
        string memory ex_date,
        string memory pubKey,
        string memory privateKey
    ) public {
        productItemMapping[itemCount] = ProductItem(
            productId,
            itemCount,
            man_date,
            ex_date,
            false,
            address(0),
            pubKey,
            privateKey
        );
        privateKeyToProductItemMapping[privateKey] = itemCount;
        pubKeyToPrivateKeyMapping[pubKey] = privateKey;

        itemCount++;
    }

    function addBulkProducts(
        uint256 productId,
        string[] memory pubKeys,
        string[] memory privateKeys,
        string[] memory man_date,
        string[] memory ex_date
    ) public {
        for (uint256 i = 0; i < man_date.length; i++) {
            addProductItem(
                productId,
                man_date[i],
                ex_date[i],
                pubKeys[i],
                privateKeys[i]
            );
        }
    }

    function fetchProductById(
        uint256 productId
    ) public view returns (Product memory) {
        return productMapping[productId];
    }

    function fetchAllProductsForCompany()
        public
        view
        returns (Product[] memory)
    {
        uint256 proCount;
        for (uint256 i = 0; i < productCount; i++) {
            if (productMapping[i].company == msg.sender) {
                proCount += 1;
            }
        }

        Product[] memory result = new Product[](proCount);
        proCount = 0;

        for (uint256 i = 0; i < productCount; i++) {
            if (productMapping[i].company == msg.sender) {
                Product storage cur = productMapping[i];
                result[i] = cur;
            }
        }

        return result;
    }

    function fetchAllProductItemsForCompany(
        uint256 productId
    ) public view returns (ProductItem[] memory) {
        uint256 proCount;
        for (uint256 i = 0; i < itemCount; i++) {
            if (
                productItemMapping[i].productId == productId &&
                productMapping[productItemMapping[i].productId].company ==
                msg.sender
            ) {
                proCount += 1;
            }
        }

        ProductItem[] memory result = new ProductItem[](proCount);
        proCount = 0;

        for (uint256 i = 0; i < itemCount; i++) {
            if (
                productItemMapping[i].productId == productId &&
                productMapping[productItemMapping[i].productId].company ==
                msg.sender
            ) {
                ProductItem storage cur = productItemMapping[i];
                result[i] = cur;
            }
        }

        return result;
    }

    function fetchProductItemById(
        uint256 itemId
    ) public view returns (ProductItem memory) {
        return productItemMapping[itemId];
    }

    function fetchProductItemsForUser()
        public
        view
        returns (ProductItem[] memory)
    {
        uint256 proCount;
        for (uint256 i = 0; i < itemCount; i++) {
            if (
                productItemMapping[i].isPurchased == true &&
                productItemMapping[i].owner == msg.sender
            ) {
                proCount += 1;
            }
        }

        ProductItem[] memory result = new ProductItem[](proCount);
        proCount = 0;

        for (uint256 i = 0; i < itemCount; i++) {
            if (
                productItemMapping[i].isPurchased == true &&
                productItemMapping[i].owner == msg.sender
            ) {
                ProductItem storage cur = productItemMapping[i];
                result[i] = cur;
            }
        }

        return result;
    }

    function buyProduct(
        string memory privateKey,
        string memory tokenURI
    ) public {
        require(
            productItemMapping[privateKeyToProductItemMapping[privateKey]]
                .isPurchased == false,
            "Item already purchased!"
        );

        uint256 companyId = companyAddressToIdMapping[
            productMapping[
                productItemMapping[privateKeyToProductItemMapping[privateKey]]
                    .productId
            ].company
        ];

        // companyNFTMapping[companyId].mint(tokenURI, privateKeyToProductItemMapping[privateKey], )

        productItemMapping[privateKeyToProductItemMapping[privateKey]]
            .isPurchased = true;
        productItemMapping[privateKeyToProductItemMapping[privateKey]]
            .owner = msg.sender;
    }

    function checkIfAlreadyPurchased(
        string memory pubKey
    ) public view returns (bool, Company memory) {
        return (
            productItemMapping[
                privateKeyToProductItemMapping[
                    pubKeyToPrivateKeyMapping[pubKey]
                ]
            ].isPurchased,
            companyMapping[
                companyAddressToIdMapping[
                    productMapping[
                        productItemMapping[
                            privateKeyToProductItemMapping[
                                pubKeyToPrivateKeyMapping[pubKey]
                            ]
                        ].productId
                    ].company
                ]
            ]
        );
    }

    function fetchActiveRequests()
        public
        view
        isOwner
        returns (Company[] memory)
    {
        Company[] memory result = new Company[](companyRequestCount);
        for (uint256 i = 0; i < companyRequestCount; i++) {
            Company storage cur = companyRequestMapping[i];
            result[i] = cur;
        }

        return result;
    }

    function fetchAllCompanies()
        public
        view
        isOwner
        returns (Company[] memory)
    {
        Company[] memory result = new Company[](companyCount);
        for (uint256 i = 0; i < companyCount; i++) {
            Company storage cur = companyMapping[i];
            result[i] = cur;
        }

        return result;
    }

    function fetchCompanyUsingCIN(
        string memory cin
    ) public view returns (Company memory) {
        for (uint256 i = 0; i < companyCount; i++) {
            if (
                keccak256(abi.encodePacked(companyMapping[i].cin)) ==
                keccak256(abi.encodePacked(cin))
            ) {
                return companyMapping[i];
            }
        }

        revert();
    }

    function fetchCompanyNFTAddress(
        uint256 companyId
    ) public view returns (address) {
        return address(companyNFTMapping[companyId]);
    }
}
