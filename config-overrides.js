const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = function override(config, env) {
  // Force webpack to not use eval in development
  config.devtool = false;

  // Disable chunk splitting to ensure single bundle
  config.optimization.splitChunks = {
    cacheGroups: {
      default: false,
    },
  };
  config.optimization.runtimeChunk = false;

  // Ensure webpack doesn't use eval
  if (config.mode === 'development') {
    config.optimization.minimize = true;
    config.optimization.minimizer[0].options.terserOptions = {
      ...config.optimization.minimizer[0].options.terserOptions,
      format: {
        comments: false,
      },
    };
  }

  // Add copy plugin to copy manifest.json
  config.plugins.push(
    new CopyPlugin({
      patterns: [
        {
          from: 'public/manifest.json',
          to: path.resolve(__dirname, 'build/manifest.json'),
        },
      ],
    })
  );

  // Modify output configuration
  config.output = {
    ...config.output,
    filename: 'static/js/[name].js',
    chunkFilename: 'static/js/[name].chunk.js',
  };

  return config;
};