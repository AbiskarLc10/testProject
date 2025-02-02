const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "../proto/bundle.js"),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "../public/dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
      },
    ],
  },
};
