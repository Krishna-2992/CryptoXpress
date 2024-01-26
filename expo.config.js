module.exports = {
  expo: {
    packagerOpts: {
      config: {
        resolver: {
          extraNodeModules: {
            crypto: require.resolve('crypto-browserify'),
          },
        },
      },
    },
  },
};