/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    domains: ["cdn.builder.io", "images.unsplash.com"],
  },
};

module.exports = nextConfig;
