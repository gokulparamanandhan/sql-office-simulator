import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@electric-sql/pglite"],
  outputFileTracingIncludes: {
    "/api/**/*": ["./node_modules/@electric-sql/pglite/dist/**/*"],
  },
};

export default nextConfig;
