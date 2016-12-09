var webpack = require("webpack");
var path = require("path");

const PROJECT_ROOT = path.resolve(__dirname);

module.exports = {
  entry: [
    "./bower_components/underscore/underscore.js",
    "./bower_components/backbone/backbone.js",
    "./scripts/dash_banner/templates.js",
    "./scripts/dash_banner/foo.js",
  ],
  module: {
    loaders: [{
      include: [
        path.join(PROJECT_ROOT, "scripts"),
        path.join(PROJECT_ROOT, "spec")
      ],
      loader: "babel-loader",
      test: /\.js$/
    }]
  },
  output: {
    filename: "new-dash-banner.js",
    path: "dist"
  }, plugins: [
    new webpack.ProvidePlugin({
      templates: "dash_banner/templates"
    }),
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(".bower.json", ["main"])
    )
  ], resolve: {
    modulesDirectories: [
      path.join(PROJECT_ROOT, "node_modules"),
      path.join(PROJECT_ROOT, "bower_components")
    ]
  }
}
