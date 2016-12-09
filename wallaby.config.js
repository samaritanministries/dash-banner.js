var wallabyWebpack = require('wallaby-webpack');
var webpackConfig = require('./webpack.config');

module.exports = function (wallaby) {
  webpackConfig.module = {}
  return {
    compilers: {
      "scripts/dash_banner/**/*.js": wallaby.compilers.babel(),
      "spec/**/*.js": wallaby.compilers.babel()
    },

    files: [
      {pattern: "bower_components/underscore/underscore.js", load: true},
      {pattern: "bower_components/jquery/dist/jquery.js", load: true},
      {pattern: "bower_components/backbone/backbone.js", load: true},
      {pattern: "scripts/dash_banner/foo.js", load: true}
    ],

    postprocessor: wallabyWebpack(webpackConfig),

    setup: function () {
      window.__moduleBundler.loadTests();
    },

    tests: [
      {pattern: "spec/dash_banner/foo_spec.js", load: false}
    ]
  };

};
