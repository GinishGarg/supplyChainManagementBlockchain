// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplyChain {
    struct Product {
        uint256 id;
        string name;
        address owner;
        uint256 timestamp;
    }

    struct ProductHistory {
        string location;
        uint256 timestamp;
    }

    mapping(uint256 => Product) public products;
    mapping(uint256 => ProductHistory[]) public productHistories;
    uint256 public totalProducts = 0;

    event ProductAdded(uint256 id, string name, string location, address owner, uint256 timestamp);
    event ProductUpdated(uint256 id, string location, uint256 timestamp);

    function addProduct(string memory _name, string memory _location) public {
        totalProducts++;
        products[totalProducts] = Product(totalProducts, _name, msg.sender, block.timestamp);
        productHistories[totalProducts].push(ProductHistory(_location, block.timestamp));
        emit ProductAdded(totalProducts, _name, _location, msg.sender, block.timestamp);
    }

    function updateProduct(uint256 _id, string memory _location) public {
        require(products[_id].id != 0, "Product does not exist");
        productHistories[_id].push(ProductHistory(_location, block.timestamp));
        emit ProductUpdated(_id, _location, block.timestamp);
    }

    function getTotalProducts() public view returns (uint256) {
        return totalProducts;
    }

    function getProduct(uint256 _id) public view returns (uint256, string memory, address, uint256) {
        require(products[_id].id != 0, "Product does not exist");
        Product memory p = products[_id];
        return (p.id, p.name, p.owner, p.timestamp);
    }

    function getProductHistory(uint256 _id) public view returns (ProductHistory[] memory) {
        require(products[_id].id != 0, "Product does not exist");
        return productHistories[_id];
    }
}
