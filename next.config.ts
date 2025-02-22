import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com'
    ],
  },
  serverExternalPackages: ["pdf-parse", "sequelize"]

};

export default nextConfig;
