/** @type {import('next').NextConfig} */
module.exports = {
    experimental: { serverComponentsExternalPackages: ["mongoose"] },
    webpack(config) {
        config.experiments = { ...config.experiments, topLevelAwait: true };
        return config;
    },
    transpilePackages: ['@mui/x-charts'],
    
    // Next.js can automatically create a standalone folder that copies only the 
    // necessary files for a production deployment including select files in node_modules.
    // see https://nextjs.org/docs/pages/api-reference/next-config-js/output
    //output: 'standalone', 
};


