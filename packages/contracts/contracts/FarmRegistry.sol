// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract FarmRegistry {
    struct Farm {
        uint256 id;
        string name;
        string location;
        address farmer;
        uint256 totalValue;
        uint256 totalShares;
        uint256 availableShares;
        bool isActive;
    }
    
    mapping(uint256 => Farm) public farms;
    uint256 public farmCounter;
    
    event FarmRegistered(uint256 indexed farmId, string name, address farmer);
    
    function registerFarm(
        string memory _name,
        string memory _location,
        uint256 _totalValue,
        uint256 _totalShares
    ) external {
        farmCounter++;
        farms[farmCounter] = Farm({
            id: farmCounter,
            name: _name,
            location: _location,
            farmer: msg.sender,
            totalValue: _totalValue,
            totalShares: _totalShares,
            availableShares: _totalShares,
            isActive: true
        });
        
        emit FarmRegistered(farmCounter, _name, msg.sender);
    }
    
    function getFarm(uint256 _farmId) external view returns (Farm memory) {
        return farms[_farmId];
    }
}
