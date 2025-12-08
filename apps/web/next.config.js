const withNextIntl = require('next-intl/plugin')();

const nextConfig = {
    output: 'standalone',
    transpilePackages: ["ui"],
    eslint: {
        ignoreDuringBuilds: true,
    },
};

module.exports = withNextIntl(nextConfig);
