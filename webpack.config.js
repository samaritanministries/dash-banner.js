var webpack = require("webpack");
var path = require("path");

const PROJECT_ROOT = path.resolve(__dirname);

module.exports = {
  entry: {
    "dist/dash-banner.js": "./scripts/dash_banner/load.js",
    ".tmp/dash-banner-with-dashing-core.css": "./styles/dash-banner-with-dashing-core.scss",
    ".tmp/sample-app.js": "./scripts/sample_app/main.js"
  },
  output: {
    filename: "[name]"
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
    }, {
      include: path.join(PROJECT_ROOT, "bower_components", "dashing"),
      loader: "url-loader?limit=30000&name=[name]-[hash].[ext]",
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/
    }, {
      include: path.join(PROJECT_ROOT, "styles"),
      loader: "style!css!sass",
      test: /\.scss$/
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
      "sample_app": path.join(PROJECT_ROOT, "scripts", "sample_app")
    }, modulesDirectories: [
      path.join(PROJECT_ROOT, "node_modules"),
      path.join(PROJECT_ROOT, "bower_components")
    ]
  }
}
