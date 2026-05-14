import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
        pathname: "/**", // Mengizinkan semua path gambar dari utfs.io
      },
    ],
  },
  allowedDevOrigins: ["192.168.1.5"],
};

export default nextConfig;
