// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "../tokens/FarmToken.sol";

/**
 * @title FarmRegistry
 * @dev Central registry for managing farms and farmers on the FarmShare Africa platform
 */
contract FarmRegistry is Ownable {
    enum FarmStatus { Pending, Approved, Funding, Growing, Completed }
    
    struct Farm {
        string farmId;
        string name;
        string cropType;
        string location;
        address farmer;
        address tokenAddress;
        uint256 fundingGoal;
        FarmStatus status;
        uint256 createdAt;
    }
    
    // State variables
    mapping(address => bool) public approvedFarmers;
    mapping(string => Farm) public farms;
    string[] public farmIds;
    
    // Events
    event FarmerApproved(address indexed farmer);
    event FarmRegistered(string indexed farmId, address indexed farmer);
    event FarmApproved(string indexed farmId, address tokenAddress);
    
    constructor() Ownable(msg.sender) {}
    
    /**
     * @dev Approve a farmer to register farms
     * @param _farmer Address of the farmer to approve
     */
    function approveFarmer(address _farmer) external onlyOwner {
        approvedFarmers[_farmer] = true;
        emit FarmerApproved(_farmer);
    }
    
    /**
     * @dev Register a new farm (only approved farmers)
     * @param _farmId Unique identifier for the farm
     * @param _name Name of the farm
     * @param _cropType Type of crop being grown
     * @param _location Geographic location of the farm
     * @param _fundingGoal Amount of funding needed
     * @param _harvestDate Expected harvest date
     */
    function registerFarm(
        string memory _farmId,
        string memory _name,
        string memory _cropType,
        string memory _location,
        uint256 _fundingGoal,
        uint256 _harvestDate
    ) external {
        require(approvedFarmers[msg.sender], "Not approved farmer");
        require(bytes(farms[_farmId].farmId).length == 0, "Farm exists");
        
        farms[_farmId] = Farm({
            farmId: _farmId,
            name: _name,
            cropType: _cropType,
            location: _location,
            farmer: msg.sender,
            tokenAddress: address(0),
            fundingGoal: _fundingGoal,
            status: FarmStatus.Pending,
            createdAt: block.timestamp
        });
        
        farmIds.push(_farmId);
        emit FarmRegistered(_farmId, msg.sender);
    }
    
    /**
     * @dev Approve a farm and create its token (only owner)
     * @param _farmId ID of the farm to approve
     * @param _tokenName Name for the farm token
     * @param _tokenSymbol Symbol for the farm token
     * @param _tokenPrice Price per token in wei
     * @param _maxSupply Maximum number of tokens
     */
    function approveFarm(
        string memory _farmId,
        string memory _tokenName,
        string memory _tokenSymbol,
        uint256 _tokenPrice,
        uint256 _maxSupply
    ) external onlyOwner {
        Farm storage farm = farms[_farmId];
        require(farm.status == FarmStatus.Pending, "Not pending");
        
        // Create new FarmToken contract
        FarmToken token = new FarmToken(
            _tokenName,
            _tokenSymbol,
            _maxSupply,
            _tokenPrice,
            farm.farmId,
            farm.name,
            farm.cropType,
            farm.location,
            farm.fundingGoal,
            0 // harvestDate - can be set later
        );
        
        farm.tokenAddress = address(token);
        farm.status = FarmStatus.Approved;
        
        emit FarmApproved(_farmId, address(token));
    }
    
    /**
     * @dev Get details of a specific farm
     * @param _farmId ID of the farm
     * @return Farm struct
     */
    function getFarm(string memory _farmId) external view returns (Farm memory) {
        return farms[_farmId];
    }
    
    /**
     * @dev Get all farm IDs
     * @return Array of farm IDs
     */
    function getAllFarms() external view returns (string[] memory) {
        return farmIds;
    }
}
