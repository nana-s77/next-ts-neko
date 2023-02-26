/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'today-pon.s3.ap-northeast-1.amazonaws.com',
      },
    ],
  },
}

module.exports = nextConfig
