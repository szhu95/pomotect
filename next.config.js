/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
        ]
      }
    ]
  },
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
  async redirects() {
    return [
      {
        source: "/objects/:path",
        destination: "/products/:path",
        permanent: true,
      },
      {
        source: "/objects",
        destination: "/products",
        permanent: true,
      }
    ];
  },
}

module.exports = nextConfig
