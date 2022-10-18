/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['avatars.dicebear.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
}

module.exports = nextConfig
