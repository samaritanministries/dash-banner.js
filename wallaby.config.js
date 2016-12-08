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
