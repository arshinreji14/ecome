/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

module.exports = {
  images: {
    domains: ['i.postimg.cc'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
    ],
    minimumCacheTTL: 60, // Cache for 60 seconds
    unoptimized: true, // Bypass Next.js optimizer (use direct image)
  },
};
