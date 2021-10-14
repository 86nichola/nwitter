const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv-webpack");

module.exports = {
  mode: "development",
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      components: path.join(__dirname, "./src/components"),
      routes: path.join(__dirname, "./src/routes"),
    },
  },
  devServer: {
    open: true,
  },
  entry: {
    index: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/, // .js, .jsx로 끝나는 babel이 컴파일하게 할 모든 파일
        exclude: /node_module/, // node module 폴더는 babel 컴파일에서 제외
        use: {
          loader: "babel-loader", // babel loader가 파이프를 통해 js 코드를 불러옴
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "myApp",
      template: "./src/index.html", // DOM element를 추가하기 위해 설정
    }),
    new dotenv({
      path: ".env",
    }),
  ],
};
