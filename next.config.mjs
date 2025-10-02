/** @type {import('next').NextConfig} */
const nextConfig = { 
  basePath: '/fin-customer',
  experimental: { 
    instrumentationHook: true, 
  },
  async rewrites() {
    return [
      {
        source: '/fin-customer/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
};

export default nextConfig;
