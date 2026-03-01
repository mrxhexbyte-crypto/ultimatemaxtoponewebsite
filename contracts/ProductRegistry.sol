// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

contract ProductRegistry is Ownable {
    mapping(uint256 => uint256) public stock;

    function setStock(uint256 _productId, uint256 _stock) public onlyOwner {
        stock[_productId] = _stock;
    }

    function decrementStock(uint256 _productId) public onlyOwner {
        require(stock[_productId] > 0, "Out of stock");
        stock[_productId]--;
    }
}
