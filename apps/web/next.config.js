/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ['ui'],
  images: {
    domains: ['cdn.discordapp.com'], //Domain of image host
  },
};

module.exports = nextConfig;
