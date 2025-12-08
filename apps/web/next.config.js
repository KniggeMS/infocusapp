const withNextIntl = require('next-intl/plugin')('../../i18n.ts');

const nextConfig = {
    output: 'standalone',
    transpilePackages: ["ui"],
    eslint: {
        ignoreDuringBuilds: true,
    },
};

module.exports = withNextIntl(nextConfig);
