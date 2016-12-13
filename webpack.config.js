var webpack = require("webpack");
var path = require("path");

const PROJECT_ROOT = path.resolve(__dirname);

module.exports = {
  entry: {
    "dash-banner": "./scripts/dash_banner/load.js",
    "sample-app": "./scripts/sample_app/main.js"
  },
  output: {
    filename: "[name].js",
    path: "dist"
  },
  module: {
    loaders: [{
      include: [
        path.join(PROJECT_ROOT, "scripts"),
        path.join(PROJECT_ROOT, "spec")
      ],
      loader: "babel-loader",
      test: /\.js$/
    }, {
      include: path.join(PROJECT_ROOT, "scripts/dash_banner"),
      loader: "ejs-compiled",
      test: /\.ejs$/
    }]
  }, plugins: [
    new webpack.ProvidePlugin({
      $: "jquery"
    }), new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(".bower.json", ["main"])
    )
  ], resolve: {
    alias: {
      "dash_banner": path.join(PROJECT_ROOT, "scripts", "dash_banner"),
      "sample_app": path.join(PROJECT_ROOT, "scripts", "sample_app"),
    }, modulesDirectories: [
      path.join(PROJECT_ROOT, "node_modules"),
      path.join(PROJECT_ROOT, "bower_components")
    ]
  }
}
