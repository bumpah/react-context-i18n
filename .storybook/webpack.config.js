const path = require("path")

module.exports = (baseConfig, env) => {

  baseConfig.resolve = {
    extensions: ['.js', '.ts', '.tsx']
  }

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