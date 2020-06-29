const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bootstrap.js",
  },
  mode: "development",
  plugins: [
    new CopyWebpackPlugin(['index.html'])
  ],
  module: {
    rules:[ 
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
   ],
   preLoaders: [
    // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
    { test: /\.js$/, loader: "source-map-loader" }
   ]
  }
};
