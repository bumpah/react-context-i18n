const path = require("path")

module.exports = (baseConfig, env) => {
  baseConfig.module = {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/, /__tests__/],
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
    ],
  }
  return baseConfig
}