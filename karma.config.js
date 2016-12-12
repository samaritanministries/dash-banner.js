var webpack = require("karma-webpack");
var webpackConfig = require("./webpack.config");

webpackConfig.entry = undefined
module.exports = function (config) {
  config.set({
    frameworks: [ "jasmine" ],
    files: [
      "bower_components/jquery/dist/jquery.js",
      "bower_components/jasmine-jquery/lib/jasmine-jquery.js",
      "bower_components/underscore/underscore.js",
      "bower_components/backbone/backbone.js",
      "spec/dash_banner/view_spec.js"
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
    phantomjsLauncher: {
      exitOnResourceError: true
    },
    webpack: webpackConfig
  });
};
