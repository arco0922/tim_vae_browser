const routes = require('./routes');

const urlPrefix = process.env.URL_PREFIX
  ? '/' + process.env.URL_PREFIX
  : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  assetPrefix: urlPrefix,
  basePath: urlPrefix,
  trailingSlash: true,
  publicRuntimeConfig: { urlPrefix },
  images: {
    loader: 'custom',
  },
  exportPathMap: async function () {
    return routes;
  },
};

module.exports = nextConfig;
