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
      }
    ]
  },
}

module.exports = nextConfig
