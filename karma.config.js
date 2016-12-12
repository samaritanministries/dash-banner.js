var webpack = require("karma-webpack");
var webpackConfig = require("./webpack.config");
// var path = require("path");

// const PROJECT_ROOT = path.resolve(__dirname);
webpackConfig.entry = webpackConfig.entry - ["./scripts/dash_banner/templates.js"]
// webpackConfig.entry = []
// webpackConfig.module.loaders.push({
//   test: /\.js$/,
//   include: path.join(PROJECT_ROOT, "test"),
//   loader: "babel-loader"
// })
// webpackConfig.resolve.alias["fakes"] = path.join(PROJECT_ROOT, "test", "fakes");
module.exports = function (config) {
  // "use strict";
  config.set({
    frameworks: [ "jasmine" ],
    files: [
      "scripts/dash_banner/templates.js",
      "scripts/dash_banner/simple.js",
      "spec/dash_banner/simple_spec.js"
    ],
    plugins: [
      "karma-jasmine",
      "karma-phantomjs-launcher",
      "karma-spec-reporter",
      webpack
    ],
    browsers: [ "PhantomJS" ],
    preprocessors: {
      "spec/**/*_spec.js": ["webpack"],
      "scripts/**/*.js": ["webpack"]
    },
    logLevel: config.LOG_INFO,
    reporters: ["spec"],
    singleRun: false,
    // phantomjsLauncher: {
    //   exitOnResourceError:true
    // },
    webpack: webpackConfig
    // webpackMiddleware: { noInfo: true }
  });
};
