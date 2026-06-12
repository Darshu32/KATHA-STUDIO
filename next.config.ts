import type { NextConfig } from "next";

const nextConfig: NextConfig = {
     allowedDevOrigins: ['127.0.0.1'],
     async redirects() {
          return [
               { source: "/notes", destination: "/journal", permanent: true },
          ];
     },
};

export default nextConfig;
