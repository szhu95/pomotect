/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      {
        protocol: "https",
        hostname: "postmodern-tectonics.ghost.io",
      },
      {
        protocol: "https",
        hostname: "**",
      }
    ]
  },
}

module.exports = nextConfig
