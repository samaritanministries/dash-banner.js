var wallabyWebpack = require('wallaby-webpack');
var webpackConfig = require('./webpack.config');

module.exports = function (wallaby) {

  // var webpackPostprocessor = wallabyWebpack(webpackConfig);

  return {
    files: [
      "scripts/bower_components/jquery/dist/jquery.js",
      "scripts/bower_components/underscore/underscore.js",
      "scripts/bower_components/backbone/backbone.js",

      "scripts/bower_components/jasmine-jquery/lib/jasmine-jquery.js",

      "scripts/namespace.js",
      "scripts/dash_banner/template.js",
      // {pattern: "scripts/dash_banner/**/*.js", load: false},
      // "scripts/dash_banner/foo.coffee"
      {pattern: "scripts/dash_banner/**/*.coffee"},
      {pattern: "scripts/dash_banner/**/*.ejs"},
      {pattern: "scripts/dash_banner/**/*.js"}
    ],

    tests: [
      {pattern: "spec/**/*_spec.coffee"}
    ],

    postprocessor: wallabyWebpack(webpackConfig)//,

    // setup: function () {
    //   window.__moduleBundler.loadTests();
    // }
  };
};
