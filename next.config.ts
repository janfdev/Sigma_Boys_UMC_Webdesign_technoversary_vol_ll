import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
  },
  compress: true,
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async rewrites() {
    return [
      {
        source: "/carousel-hero/:path*",
        destination: "/images/hero/:path*",
      },
      {
        source: "/image-lomba/Gunung Ciremai.webp",
        destination: "/images/gallery/gunung-ciremai.webp",
      },
      {
        source: "/image-lomba/Kolase Daur Ulang Plastik Menjadi Paving.webp",
        destination: "/images/gallery/kolase-daur-ulang-paving.webp",
      },
      {
        source: "/image-lomba/Lentera Bunga PET di Senja Hari.webp",
        destination: "/images/gallery/lentera-bunga-pet.webp",
      },
      {
        source: "/image-lomba/Organizer Alat Tulis Botol Daur Ulang.webp",
        destination: "/images/gallery/organizer-alat-tulis-botol.webp",
      },
      {
        source: "/image-lomba/:path*",
        destination: "/images/gallery/:path*",
      },
    ];
  },
};

export default nextConfig;
