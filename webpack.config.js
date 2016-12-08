var webpack = require("webpack");
var path = require("path");

const PROJECT_ROOT = path.resolve(__dirname);

module.exports = {
  entry: [
    "./scripts/dash_banner/foo.js",
  ],
  output: {
    filename: "new-dash-banner.js",
    path: "dist"
  }
}
