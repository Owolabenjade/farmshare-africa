// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FarmToken is ERC20, Ownable {
    uint256 public immutable maxSupply;
    uint256 public tokenPrice;
    
    // Farm details
    string public farmId;
    string public farmName;
    string public cropType;
    string public location;
    uint256 public fundingGoal;
    uint256 public harvestDate;
    
    // Investment tracking
    mapping(address => uint256) public investmentAmount;
    
    event TokensPurchased(address indexed investor, uint256 amount, uint256 tokens);
    event HarvestCompleted(uint256 totalReturn);
    
    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _maxSupply,
        uint256 _tokenPrice,
        string memory _farmId,
        string memory _farmName,
        string memory _cropType,
        string memory _location,
        uint256 _fundingGoal,
        uint256 _harvestDate
    ) ERC20(_name, _symbol) Ownable(msg.sender) {
        maxSupply = _maxSupply;
        tokenPrice = _tokenPrice;
        farmId = _farmId;
        farmName = _farmName;
        cropType = _cropType;
        location = _location;
        fundingGoal = _fundingGoal;
        harvestDate = _harvestDate;
    }
    
    function purchaseTokens(uint256 tokenAmount) external payable {
        require(tokenAmount > 0, "Token amount must be greater than 0");
        require(msg.value >= tokenAmount * tokenPrice, "Insufficient payment");
        require(totalSupply() + tokenAmount <= maxSupply, "Exceeds max supply");
        
        investmentAmount[msg.sender] += msg.value;
        _mint(msg.sender, tokenAmount);
        
        emit TokensPurchased(msg.sender, msg.value, tokenAmount);
        
        // Refund excess
        if (msg.value > tokenAmount * tokenPrice) {
            payable(msg.sender).transfer(msg.value - (tokenAmount * tokenPrice));
        }
    }
    
    function completeHarvest() external onlyOwner payable {
        require(msg.value > 0, "No harvest returns");
        emit HarvestCompleted(msg.value);
    }
    
    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
    
    function getFarmInfo() external view returns (
        string memory,
        string memory,
        string memory,
        string memory,
        uint256,
        uint256
    ) {
        return (farmId, farmName, cropType, location, fundingGoal, harvestDate);
    }
}
