const config = {
  mode: 'production', // "production" | "development" | "none"
  resolve: {
      extensions: ['*', '.mjs', '.js', '.json'],
      fallback: {
          "buffer": require.resolve("buffer/"),
          "crypto": require.resolve("crypto-browserify"),
          "util": require.resolve("util/"),
          "stream": require.resolve("stream-browserify")
      }
  },
  module: {
      rules: [
          {
              test: /\.mjs$/,
              include: /node_modules/,
              type: 'javascript/auto'
          }
      ]
  }
};

module.exports = config;
