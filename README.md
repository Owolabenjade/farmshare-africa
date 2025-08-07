# FarmShare Africa 🌍🚜

Fractional farm investment platform using blockchain technology on Hedera network.

## 🎯 Project Overview

FarmShare Africa enables fractional ownership of African farms through blockchain tokenization. Farmers can raise capital by issuing farm tokens, while investors can purchase these tokens to earn returns from harvest proceeds.

## 🚀 Live Deployment

**Hedera Testnet Deployment:**
- **FarmRegistry Contract**: `0xa21818C469Dee8788c2a3c77b68817AFD33Aa5f3`
- **Network**: Hedera Testnet (Chain ID: 296)
- **Explorer**: [View on HashScan](https://hashscan.io/testnet/contract/0xa21818C469Dee8788c2a3c77b68817AFD33Aa5f3)

## 🛠 Tech Stack

- **Smart Contracts**: Solidity 0.8.20
- **Blockchain**: Hedera Hashgraph
- **Development**: Hardhat
- **Token Standard**: ERC-20
- **Testing**: Hardhat Test Suite

## 📁 Project Structure

```
farmshare-africa-hardhat/
├── contracts/
│   ├── tokens/
│   │   └── FarmToken.sol           # ERC20 farm ownership tokens
│   └── farms/
│       └── FarmRegistry.sol        # Farm management contract
├── scripts/
│   └── deploy.js                   # Deployment script
├── test/
│   ├── FarmRegistry.test.js        # Registry tests
│   └── FarmToken.test.js          # Token tests
├── hardhat.config.js               # Network configuration
└── package.json                    # Dependencies
```

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Hedera testnet account

### Installation
```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/farmshare-africa.git
cd farmshare-africa

# Install dependencies
npm install

# Copy environment file
cp .env.example .env
# Edit .env with your Hedera testnet credentials
```

### Development Commands
```bash
# Compile contracts
npm run compile

# Run tests
npm run test

# Start local blockchain
npm run node

# Deploy to local network
npm run deploy:local

# Deploy to Hedera testnet
npm run deploy:testnet
```

## 📋 Smart Contracts

### FarmToken.sol
- **Purpose**: ERC-20 token representing fractional farm ownership
- **Features**: 
  - Token purchase with ETH/HBAR
  - Investment tracking
  - Harvest distribution
  - Owner controls

### FarmRegistry.sol
- **Purpose**: Central registry for all farms and farmers
- **Features**:
  - Farmer approval system
  - Farm registration workflow
  - Token creation for approved farms
  - Farm status management

## 🔧 How It Works

1. **Farmer Registration**: Approved farmers register their farms
2. **Farm Approval**: Admin reviews and approves quality farms
3. **Token Creation**: System creates ERC-20 tokens for approved farms
4. **Investment**: Investors purchase farm tokens with crypto
5. **Harvest Distribution**: Farmers share harvest proceeds with token holders

## 📊 Test Results

```
  FarmRegistry
    ✔ Should deploy successfully
    ✔ Should approve farmers
    ✔ Should register a farm
    ✔ Should approve farm and create token

  FarmToken
    ✔ Should set correct farm details
    ✔ Should allow token purchase
    ✔ Should refund excess payment

  7 passing (2s)
```

## 🌍 Impact Goals

- **Financial Inclusion**: Provide farmers access to global capital
- **Investment Democratization**: Enable small-scale agricultural investment
- **Transparency**: Blockchain-based tracking of farm operations
- **Sustainability**: Support sustainable farming practices

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Hedera Network**: [hedera.com](https://hedera.com)
- **HashScan Explorer**: [hashscan.io](https://hashscan.io)
- **OpenZeppelin**: [openzeppelin.com](https://openzeppelin.com)

## 👥 Team

Built with love for African agriculture and blockchain innovation.
