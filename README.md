# FarmShare Africa

Fractional farm investment platform on Hedera blockchain

## Overview

FarmShare Africa democratizes agricultural investment by enabling fractional ownership of African farms through blockchain tokenization on the Hedera network.

## Project Structure

```
farmshare-africa/
├── packages/
│   ├── contracts/     # Smart contracts (Hardhat + Solidity)
│   ├── frontend/      # Next.js React application
│   ├── backend/       # Node.js API server
│   └── shared/        # Shared types and utilities
├── docs/              # Documentation
└── scripts/           # Deployment scripts
```

## Prerequisites

- Node.js 18+
- npm or yarn
- Hedera testnet account
- HashPack wallet (for frontend testing)

## Quick Start

```bash
# Install all dependencies
npm run install:all

# Start all services
npm run dev

# Or start individually:
npm run dev:contracts  # Hardhat node on :8545
npm run dev:backend    # API server on :8000
npm run dev:frontend   # Next.js app on :3000
```

## Development

### Smart Contracts
```bash
cd packages/contracts
npm run compile
npm run test
npm run deploy:testnet
```

### Frontend
```bash
cd packages/frontend
npm run dev     # http://localhost:3000
npm run build
```

### Backend
```bash
cd packages/backend
npm run dev     # http://localhost:8000
npm run build
```

## Testing

```bash
# Run all tests
npm run test

# Test specific package
npm run test --workspace=packages/contracts
```

## Deployment

- Smart Contract: [0.0.6514484 on HashScan](https://hashscan.io/testnet/contract/0xa21818c469dee8788c2a3c77b68817afd33aa5f3)
- Network: Hedera Testnet

## License

MIT License - see [LICENSE](LICENSE) file for details.

Built with ❤️ for African agriculture and blockchain innovation.
