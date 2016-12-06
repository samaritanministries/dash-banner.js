var webpack = require("webpack");
var path = require("path");

const PROJECT_ROOT = path.resolve(__dirname);

module.exports = {
  entry: [
    "./scripts/bower_components/backbone/backbone.js",
    "./scripts/namespace.js",
    "./scripts/dash_banner/action_template.ejs",
    "./scripts/dash_banner/flash_template.ejs",
    "./scripts/dash_banner/show_template.ejs",
    "./scripts/dash_banner/view.coffee",

    "./scripts/sample_app/show_banner_view.coffee",
    "./scripts/sample_app/main.coffee"
  ],
  output: {
    filename: "new-dash-banner.js",
    path: "dist"
  },
  module: {
    loaders: [{
      include: [
        path.join(PROJECT_ROOT, "scripts/dash_banner"),
        path.join(PROJECT_ROOT, "scripts/sample_app")
      ],
      loader: "coffee-loader",
      test: /\.coffee$/
    }, {
      include: path.join(PROJECT_ROOT, "scripts/dash_banner"),
      loader: "ejs-compiled",
      test: /\.ejs$/
    }]
  }, plugins: [
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(".bower.json", ["main"])
    )
  ], resolve: {
    alias: {
      "dash_banner": path.join(PROJECT_ROOT, "scripts", "dash_banner"),
    }, modulesDirectories: [
      path.join(PROJECT_ROOT, "node_modules"),
      path.join(PROJECT_ROOT, "scripts", "bower_components")
    ]
  }
}
