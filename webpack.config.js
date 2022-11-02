const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const options = {
  mode: process.env.NODE_ENV,
  entry: {
    content: [
      path.resolve(__dirname, "src/content/index.js"),
      path.resolve(__dirname, "src/content/index.scss"),
    ],
    inject: path.resolve(__dirname, "src/inject.js"),
    background: path.resolve(__dirname, "src/background/index.js"),
    options: path.resolve(__dirname, "src/options/options.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            presets: [
              ["@babel/preset-env", { useBuiltIns: "entry", corejs: 3 }],
            ],
            plugins: [
              "@babel/plugin-transform-runtime",
              "@babel/plugin-proposal-optional-chaining",
            ],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: { loader: "html-loader" },
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "manifest.json"),
          to: "manifest.json",
          force: true,
          transform: function (content) {
            return Buffer.from(
              JSON.stringify({
                version: process.env.npm_package_version,
                description: process.env.npm_package_description,
                ...JSON.parse(content.toString()),
              })
            );
          },
        },
        {
          from: path.resolve(__dirname, "src/options/options.html"),
          to: "options.html",
          force: true,
        },
        {
          from: path.resolve(__dirname, "public/icon-16.png"),
          to: "icons",
        },
        {
          from: path.resolve(__dirname, "public/icon-32.png"),
          to: "icons",
        },
        {
          from: path.resolve(__dirname, "public/icon-48.png"),
          to: "icons",
        },
        {
          from: path.resolve(__dirname, "public/icon-128.png"),
          to: "icons",
        },
      ],
    }),
  ],
};

if (process.env.NODE_ENV === "development") {
  options.devtool = "cheap-module-source-map";
} else {
  options.optimization = {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  };
}

module.exports = options;
