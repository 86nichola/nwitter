const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackCdnPlugin = require("webpack-cdn-plugin");
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
    clean: {
      keep: /ignored\/dir\//, // 애셋을 'ignored/dir' 아래에 유지합니다.
    },
    path: path.resolve(__dirname, "build"),
    publicPath: "/nwitter/",
    filename: "[name].[chunkhash].js",
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
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "myApp",
      template: "./public/index.html", // DOM element를 추가하기 위해 설정
    }),
    new dotenv({
      path: ".env",
    }),
    new WebpackCdnPlugin({
      modules: [
        {
          name: "reset-min",
          var: "Reset-min",
          path: "https://cdn.jsdelivr.net/npm/reset-css@5.0.1/reset.min.css",
        },
      ],
    }),
  ],
};
