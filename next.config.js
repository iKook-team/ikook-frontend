/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    domains: [
      "api.builder.io",
      "cdn.builder.io",
      "images.unsplash.com",
      "www.svgrepo.com",
    ],
  },
};

module.exports = nextConfig;
