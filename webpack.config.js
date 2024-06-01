const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, "/dist"), // the bundle output path
    filename: "bundle.js", // the name of the bundle
    publicPath: "/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html", // to import index.html file inside index.js
    }),
  ],
  devServer: {
    historyApiFallback: true,
    port: 8080, // you can change the port
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader", exclude: /node_modules/ },
      {
        test: /\.(js|jsx)$/, // USE THE babel-loader FOR THESE FILE EXTENSIONS
        include: path.resolve(__dirname, "src"),
        use: ["babel-loader"],
      },
      {
        test: /\.(sa|sc|c)ss$/, // styles files
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/, // to import images and fonts
        loader: "url-loader",
        options: { limit: false },
      },
    ],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
    modules: [path.resolve("./src"), path.resolve("./node_modules")],
    extensions: [".tsx", ".ts", ".js"],
  },
};
