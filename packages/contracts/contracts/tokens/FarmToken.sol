// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FarmToken
 * @dev ERC20 token representing fractional ownership of a farm
 */
contract FarmToken is ERC20, Ownable {
    // Farm information
    string public farmId;
    string public farmName;
    string public cropType;
    string public location;
    uint256 public fundingGoal;
    uint256 public harvestDate;
    
    // Token economics
    uint256 public immutable maxSupply;
    uint256 public tokenPrice;
    
    // Investment tracking
    mapping(address => uint256) public investmentAmount;
    
    // Events
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
    
    /**
     * @dev Purchase farm tokens with HBAR
     * @param tokenAmount Number of tokens to purchase
     */
    function purchaseTokens(uint256 tokenAmount) external payable {
        require(tokenAmount > 0, "Token amount must be greater than 0");
        require(msg.value >= tokenPrice * tokenAmount, "Insufficient payment");
        require(totalSupply() + tokenAmount <= maxSupply, "Exceeds max supply");
        
        // Track investment
        investmentAmount[msg.sender] += msg.value;
        
        // Mint tokens to investor
        _mint(msg.sender, tokenAmount);
        
        emit TokensPurchased(msg.sender, msg.value, tokenAmount);
        
        // Refund excess payment
        if (msg.value > tokenPrice * tokenAmount) {
            payable(msg.sender).transfer(msg.value - (tokenPrice * tokenAmount));
        }
    }
    
    /**
     * @dev Complete harvest and distribute returns (only owner)
     */
    function completeHarvest() external payable onlyOwner {
        require(msg.value > 0, "No harvest returns");
        emit HarvestCompleted(msg.value);
        // Note: Distribution logic would be implemented here
        // For now, funds remain in contract
    }
    
    /**
     * @dev Withdraw contract funds (only owner)
     */
    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
    
    /**
     * @dev Get farm information
     * @return farmId, farmName, cropType, location, fundingGoal, harvestDate
     */
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
    
    /**
     * @dev Get investor information
     * @param investor Address of the investor
     * @return tokens owned, investment amount
     */
    function getInvestorInfo(address investor) external view returns (uint256, uint256) {
        return (balanceOf(investor), investmentAmount[investor]);
    }
}
