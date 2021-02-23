var path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/frontend/frontend",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".wasm", ".mjs", ".js", ".jsx", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        resolve: {
          fullySpecified: false
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.png|jpg$/,
        exclude: /node_modules/,
        loader: "file-loader"
      }
    ]
  }
};
