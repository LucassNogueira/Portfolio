/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: true, // Cloudflare Pages doesn't support Next.js Image Optimization
  },
}

module.exports = nextConfig
