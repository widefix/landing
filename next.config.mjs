/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/showcase-1-stripe-integration',
        destination: '/showcases/stripe-integration',
        permanent: true
      },
      {
        source: '/showcase-2-prevent-account-sharing',
        destination: '/showcases/prevent-account-sharing',
        permanent: true
      }
    ];
  },
};

export default nextConfig;
