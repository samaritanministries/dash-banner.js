var webpack = require("webpack");
var path = require("path");

const PROJECT_ROOT = path.resolve(__dirname);

module.exports = {
  entry: [
    "./bower_components/jquery/dist/jquery.js",
    "./bower_components/backbone/backbone.js",
    "./scripts/namespace.js",
    "./scripts/dash_banner/view.js"
  ],
  output: {
    filename: "dash-banner.js",
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
    }, modulesDirectories: [
      path.join(PROJECT_ROOT, "node_modules"),
      path.join(PROJECT_ROOT, "bower_components")
    ]
  }
}
