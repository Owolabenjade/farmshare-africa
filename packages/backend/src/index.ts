import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://*.netlify.app',
    'https://farmshare-africa.netlify.app',
    'https://6896409c8a765a7a599d0d22--farmshare-africa.netlify.app',
    'https://689640f58a765a7b829d0cb9--farmshare-africa.netlify.app'
  ],
  credentials: true
}));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'FarmShare Africa API',
    version: '1.0.0'
  });
});

// Contract info endpoint
app.get('/api/contract-info', (req, res) => {
  res.json({
    contractId: process.env.CONTRACT_ID || '0.0.6514484',
    network: process.env.HEDERA_NETWORK || 'testnet',
    accountId: process.env.HEDERA_ACCOUNT_ID
  });
});

// API endpoints for farms
app.get('/api/farms', (req, res) => {
  const farms = [
    {
      id: '1',
      name: 'Green Valley Coffee Farm',
      location: 'Kenya',
      description: 'Sustainable coffee and maize farming in the highlands of Kenya',
      totalValue: 50000,
      availableShares: 100,
      totalShares: 500,
      pricePerShare: 100,
      imageUrl: 'https://images.unsplash.com/photo-1447278404491-43cab4ca1ed1?w=400',
      farmerId: 'farmer1',
      roi: 12.5,
      riskLevel: 'Medium'
    },
    {
      id: '2', 
      name: 'Sahel Grain Farm',
      location: 'Nigeria',
      description: 'Large-scale grain production with modern irrigation systems',
      totalValue: 75000,
      availableShares: 150,
      totalShares: 750,
      pricePerShare: 100,
      imageUrl: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=400',
      farmerId: 'farmer2',
      roi: 15.2,
      riskLevel: 'Low'
    },
    {
      id: '3',
      name: 'Nile Valley Vegetables',
      location: 'Egypt',
      description: 'Organic vegetable farming using traditional Nile irrigation',
      totalValue: 30000,
      availableShares: 200,
      totalShares: 300,
      pricePerShare: 100,
      imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400',
      farmerId: 'farmer3',
      roi: 18.7,
      riskLevel: 'High'
    }
  ];
  
  res.json(farms);
});

// Get single farm
app.get('/api/farms/:id', (req, res) => {
  const { id } = req.params;
  const farm = {
    id,
    name: 'Green Valley Coffee Farm',
    location: 'Kenya',
    description: 'Sustainable coffee and maize farming in the highlands of Kenya',
    totalValue: 50000,
    availableShares: 100,
    totalShares: 500,
    pricePerShare: 100,
    imageUrl: 'https://images.unsplash.com/photo-1447278404491-43cab4ca1ed1?w=400',
    farmerId: 'farmer1',
    roi: 12.5,
    riskLevel: 'Medium'
  };
  
  res.json(farm);
});

// Investment endpoint
app.post('/api/invest', (req, res) => {
  const { farmId, shares, amount } = req.body;
  
  res.json({
    success: true,
    transactionId: `tx_${Date.now()}`,
    farmId,
    shares,
    amount,
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
});
