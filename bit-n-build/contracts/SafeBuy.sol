// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

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
        uint256 itemId;
        string man_date;
        string ex_date;
        bool isPurchased;
        address owner;
        string productName;
    }

    struct Keys {
        string publicKey;
        string privateKey;
    }

    uint256 userCount = 0;
    uint256 companyCount = 0;
    uint256 productCount = 0;
    uint256 itemCount = 0;

    mapping(address => User) addressToUserMapping;
    mapping(address => Company) addressToCompanyMapping;
    mapping(uint256 => address) userCountToAddressMapping;
    mapping(uint256 => address) companyCountToAddressMapping;
    mapping(uint256 => address) productIdToUserAddressMapping;
    mapping(uint256 => Product) itemToProductMapping;
    mapping(uint256 => ProductItem) itemCountToItemMapping;
    mapping(uint256 => Product) productCountToProductMapping;
    mapping(string => Product) nameToProductMapping;
    mapping(uint256 => Keys) itemIdToKeysMapping;
    mapping(uint256 => User) itemIdToUserMapping;
    mapping(string => ProductItem) pubKeyToProductItemMapping;
    mapping(string => ProductItem) privateKeyToProductItemMapping;

    // mapping(string => User)

    receive() external payable {}

    constructor() {
        owner = payable(msg.sender);
    }

    function isOwner() public view returns (bool) {
        return owner == msg.sender;
    }

    // address polyAdd;
    // string name;
    // uint256 age;
    // string gender;
    // string email;
    function registerUser(
        address userAdd,
        string memory name,
        string memory emailId,
        string memory mobileNo,
        bool gender,
        uint256 age
    ) public {
        addressToUserMapping[userAdd] = User(
            userAdd,
            name,
            age,
            gender,
            emailId,
            mobileNo
        );

        userCount++;

        userCountToAddressMapping[userCount] = userAdd;
    }

    function registerCompany(
        address comAdd,
        string memory name,
        string memory cin
    ) public {
        addressToCompanyMapping[comAdd] = Company(comAdd, name, cin);

        companyCount++;

        companyCountToAddressMapping[companyCount] = comAdd;
    }

    function fetchUserByAddress(
        address userAdd
    ) public view returns (User memory) {
        for (uint256 i = 0; i < userCount; i++) {
            if (
                addressToUserMapping[userCountToAddressMapping[i]].userAdd ==
                userAdd
            ) {
                return addressToUserMapping[userCountToAddressMapping[i]];
            }
        }
        revert();
    }

    function fetchCompanyByAddress(
        address comAdd
    ) public view returns (Company memory) {
        for (uint256 i = 0; i < companyCount; i++) {
            if (
                addressToCompanyMapping[companyCountToAddressMapping[i]]
                    .comAdd == comAdd
            ) {
                return addressToCompanyMapping[companyCountToAddressMapping[i]];
            }
        }
        revert();
    }

    function addProduct(string memory name, uint256 price) public {
        productCount++;
        productCountToProductMapping[productCount] = Product(
            productCount,
            name,
            price,
            msg.sender
        );
    }

    function addProductItem(
        // uint256 itemID,
        string memory productName,
        string memory man_date,
        string memory ex_date
    ) public {
        itemCount++;
        itemCountToItemMapping[itemCount] = ProductItem(
            itemCount,
            man_date,
            ex_date,
            false,
            address(0),
            productName
        );

        itemToProductMapping[itemCount] = nameToProductMapping[productName];
    }

    function addBulkProducts(
        string memory productName,
        string[] memory man_date,
        string[] memory ex_date
    ) public {
        for (uint256 i = 0; i < man_date.length; i++) {
            addProductItem(productName, man_date[i], ex_date[i]);
        }
    }

    // function fetchProductUsers(string memory productName) public view returns (User[] memory) {
    //     uint256 uCount;
    //     for(uint256 i=0; i<productCount; i++) {
    //         if(nameToProductMapping[productName] )
    //     }
    // }

    // size is length of word
    function randomString(uint size) public payable returns (string memory) {
        bytes memory randomWord = new bytes(size);

        // since we have 26 letters
        bytes memory chars = new bytes(26);
        chars = "abcdefghijklmnopqrstuvwxyz";
        for (uint i = 0; i < size; i++) {
            uint randomNumber = random(26);
            // Index access for string is not possible
            randomWord[i] = chars[randomNumber];
        }
        return string(randomWord);
    }

    function random(uint number) public payable returns (uint) {
        counter++;
        return
            uint(
                keccak256(
                    abi.encodePacked(
                        block.timestamp,
                        block.difficulty,
                        msg.sender,
                        counter
                    )
                )
            ) % number;
    }

    function addKeys(uint256 itemId) public {
        string memory pubKey = string.concat(
            itemCountToItemMapping[itemId].productName,
            itemCountToItemMapping[itemId].man_date,
            randomString(5)
        );
        string memory priKey = randomString((12));
        itemIdToKeysMapping[itemId] = Keys(pubKey, priKey);
        pubKeyToProductItemMapping[pubKey] = itemCountToItemMapping[itemId];
        privateKeyToProductItemMapping[priKey] = itemCountToItemMapping[itemId];
    }

    function scanPublicKeyToGetProductDetails(
        string memory publicKey
    ) public view returns (ProductItem memory) {
        return pubKeyToProductItemMapping[publicKey];
    }

    function scanPrivateKeyToVerifyPurchase(
        address userAdd,
        string memory privateKey
    ) public {
        itemIdToUserMapping[
            privateKeyToProductItemMapping[privateKey].itemId
        ] = addressToUserMapping[userAdd];
        privateKeyToProductItemMapping[privateKey].isPurchased = true;
        // Add NFT Logic
    }

    // function payForVerification() public payable {
    //     require(msg.value >= 1 ether);
    //     owner.transfer(msg.value);
    // }
}
