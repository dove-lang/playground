const CopyWebpackPlugin = require("copy-webpack-plugin");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const path = require('path');

const browserConfig = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bootstrap.js",
    globalObject: 'this'
  },
  mode: "development",
  plugins: [
    new CopyWebpackPlugin(['index.html']),
    new MonacoWebpackPlugin()
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.wasm', '...'],
  },
  module: {
    rules:[
      // {
      //   test: /\.worker\.ts$/,
      //   loader: 'worker-loader',
      // },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        test: /\.js$/,
        loader: "source-map-loader",
        enforce: 'pre'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.ttf$/,
        use: ['file-loader']
      },
      {
        test: /\.wasm$/,
        type: "webassembly/experimental"
      }
   ],
  },
};

// Config for web workers
const workerConfig = {
  entry: "./src/worker.js",
  target: "webworker",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "worker.js"
  },
  mode: "development",
};

module.exports = [browserConfig, workerConfig];
