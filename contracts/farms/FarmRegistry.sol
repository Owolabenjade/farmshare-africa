// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "../tokens/FarmToken.sol";

contract FarmRegistry is Ownable {
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
    
    enum FarmStatus { Pending, Approved, Funding, Growing, Completed }
    
    mapping(string => Farm) public farms;
    mapping(address => bool) public approvedFarmers;
    string[] public farmIds;
    
    event FarmRegistered(string indexed farmId, address indexed farmer);
    event FarmApproved(string indexed farmId, address tokenAddress);
    event FarmerApproved(address indexed farmer);
    
    constructor() Ownable(msg.sender) {}
    
    modifier onlyApprovedFarmer() {
        require(approvedFarmers[msg.sender], "Not approved farmer");
        _;
    }
    
    function approveFarmer(address _farmer) external onlyOwner {
        approvedFarmers[_farmer] = true;
        emit FarmerApproved(_farmer);
    }
    
    function registerFarm(
        string memory _farmId,
        string memory _name,
        string memory _cropType,
        string memory _location,
        uint256 _fundingGoal,
        uint256 _harvestDate
    ) external onlyApprovedFarmer {
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
    
    function approveFarm(
        string memory _farmId,
        string memory _tokenName,
        string memory _tokenSymbol,
        uint256 _tokenPrice,
        uint256 _maxSupply
    ) external onlyOwner {
        Farm storage farm = farms[_farmId];
        require(farm.status == FarmStatus.Pending, "Not pending");
        
        FarmToken farmToken = new FarmToken(
            _tokenName,
            _tokenSymbol,
            _maxSupply,
            _tokenPrice,
            _farmId,
            farm.name,
            farm.cropType,
            farm.location,
            farm.fundingGoal,
            0 // harvest date - can be updated later
        );
        
        farm.tokenAddress = address(farmToken);
        farm.status = FarmStatus.Approved;
        
        emit FarmApproved(_farmId, address(farmToken));
    }
    
    function getAllFarms() external view returns (string[] memory) {
        return farmIds;
    }
    
    function getFarm(string memory _farmId) external view returns (Farm memory) {
        return farms[_farmId];
    }
}
