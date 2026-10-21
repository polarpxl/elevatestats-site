import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/support/set-up-your-lines",
        destination: "/support/plus-minus-and-who-was-on-the-ice",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
