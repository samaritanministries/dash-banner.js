var wallabyWebpack = require('wallaby-webpack');
var webpackConfig = require('./webpack.config');
var path = require("path");

const PROJECT_ROOT = path.resolve(__dirname);

module.exports = function (wallaby) {
  webpackConfig.devtool = "eval-source-map"
  return {
    compilers: {
      "scripts/**/*.js": wallaby.compilers.babel(),
      "spec/**/*.js": wallaby.compilers.babel()
    },

    files: [
      {pattern: "bower_components/jquery/dist/jquery.js", load: true},
      {pattern: "bower_components/jasmine-jquery/lib/jasmine-jquery.js", load: true},
      {pattern: "scripts/**/*.ejs", load: false},
      {pattern: "spec/dash_banner/view_spec.js", ignore: true}
    ],

    postprocessor: wallabyWebpack(webpackConfig),

    setup: function () {
      window.__moduleBundler.loadTests();
    },

    tests: [
      {pattern: "spec/dash_banner/view_spec.js", load: false}
    ]
  };

};
