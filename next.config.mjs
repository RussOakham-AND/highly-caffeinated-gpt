/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
    webVitalsAttribution: ["CLS", "FCP", "FID", "LCP", "TTFB"],
  },
};

export default nextConfig;
