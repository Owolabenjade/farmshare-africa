# FarmShare Africa 🌍🚜

**Fractional farm investment platform on Hedera blockchain**

[![Hedera](https://img.shields.io/badge/Hedera-Testnet-green)](https://hashscan.io/testnet)
[![Contract](https://img.shields.io/badge/Contract-0.0.6514484-blue)](https://hashscan.io/testnet/contract/0xa21818c469dee8788c2a3c77b68817afd33aa5f3)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 🎯 Project Overview

FarmShare Africa democratizes agricultural investment by enabling fractional ownership of African farms through blockchain tokenization on the Hedera network.

## 🏗 Monorepo Structure

```
farmshare-africa/
├── packages/
│   ├── contracts/          # Smart contracts (Hardhat + Solidity)
│   ├── frontend/           # Next.js React application  
│   ├── backend/            # Node.js API server
│   └── shared/             # Shared types and utilities
├── docs/                   # Documentation
└── scripts/               # Deployment scripts
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Hedera testnet account
- HashPack wallet (for frontend testing)

### Installation
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/farmshare-africa.git
cd farmshare-africa

# Install all dependencies
npm run install:all
```

### Development
```bash
# Start all services (contracts, backend, frontend)
npm run dev

# Or start individually:
npm run dev:contracts    # Hardhat node on :8545
npm run dev:backend      # API server on :8000  
npm run dev:frontend     # Next.js app on :3000
```

### Testing
```bash
# Test smart contracts
npm run test

# Deploy to testnet
npm run deploy:testnet
```

## 📦 Package Details

### 🔗 Smart Contracts (`packages/contracts`)
- **FarmRegistry**: Central registry for farms and farmers
- **FarmToken**: ERC-20 tokens for farm ownership
- **Deployed on**: Hedera Testnet (Contract ID: 0.0.6514484)

```bash
cd packages/contracts
npm run compile
npm run test
npm run deploy:testnet
```

### 🎨 Frontend (`packages/frontend`)
- **Framework**: Next.js 14 + TypeScript
- **Styling**: Tailwind CSS
- **Wallet**: HashConnect integration
- **Features**: Farm browsing, investment, portfolio

```bash
cd packages/frontend
npm run dev     # http://localhost:3000
npm run build
```

### ⚙️ Backend (`packages/backend`)
- **Framework**: Express.js + TypeScript
- **Features**: API endpoints, blockchain integration
- **Endpoints**: Health check, contract info

```bash
cd packages/backend
npm run dev     # http://localhost:8000
npm run build
```

### 📚 Shared (`packages/shared`)
- **Common types and utilities**
- **Contract interfaces**
- **Shared constants**

## 🌐 Live Deployment

- **Smart Contract**: [0.0.6514484 on HashScan](https://hashscan.io/testnet/contract/0xa21818c469dee8788c2a3c77b68817afd33aa5f3)
- **Network**: Hedera Testnet
- **Frontend**: Coming Soon
- **API**: Coming Soon

## 🧪 Testing Guide

### User Testing Flow:
1. **Start all services**: `npm run dev`
2. **Visit frontend**: http://localhost:3000
3. **Connect HashPack wallet**
4. **Browse farms**: Real data from blockchain
5. **Test investment**: Simulate token purchase
6. **Check portfolio**: View your investments

### Contract Testing:
```bash
# Run comprehensive test suite
cd packages/contracts
npm run test

# Deploy and verify on testnet
npm run deploy:testnet
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Hedera Network](https://hedera.com)
- [HashScan Explorer](https://hashscan.io/testnet)
- [HashPack Wallet](https://www.hashpack.app/)

---

**Built with ❤️ for African agriculture and blockchain innovation.**
