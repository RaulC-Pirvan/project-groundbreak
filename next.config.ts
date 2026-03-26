import type { NextConfig } from "next";
import "./src/config/runtime-env";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["localhost", "127.0.0.1"],
  output: "standalone",
};

export default nextConfig;
