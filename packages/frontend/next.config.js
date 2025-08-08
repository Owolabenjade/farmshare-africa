/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@farmshare/shared'],
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
