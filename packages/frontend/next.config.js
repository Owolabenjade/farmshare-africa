/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    NEXT_PUBLIC_HEDERA_NETWORK: process.env.NEXT_PUBLIC_HEDERA_NETWORK,
    NEXT_PUBLIC_CONTRACT_ID: process.env.NEXT_PUBLIC_CONTRACT_ID,
    NEXT_PUBLIC_FARM_REGISTRY_ADDRESS: process.env.NEXT_PUBLIC_FARM_REGISTRY_ADDRESS,
    NEXT_PUBLIC_HEDERA_ACCOUNT_ID: process.env.NEXT_PUBLIC_HEDERA_ACCOUNT_ID,
    NEXT_PUBLIC_NETWORK_CHAIN_ID: process.env.NEXT_PUBLIC_NETWORK_CHAIN_ID,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  images: {
    domains: ['localhost', 'farmshare-africa.com'],
  },
};

module.exports = nextConfig;
