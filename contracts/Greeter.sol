//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/utils/math/SafeMath.sol';

import "hardhat/console.sol";

contract MintExample is ERC721Enumerable,Ownable {
    mapping(address=>uint) public balances;

    constructor() ERC721("Minter",'MINT'){

    }

    function mint(uint numOfMint) public payable{
        uint supply = totalSupply();
        for(uint i; i<numOfMint;i++){
            _safeMint(msg.sender,supply + i );
            balances[msg.sender]++;
        }

    }
}
