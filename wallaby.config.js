var wallabyWebpack = require('wallaby-webpack');
var webpackConfig = require('./webpack.config');

module.exports = function (wallaby) {

  var webpackPostprocessor = wallabyWebpack({
    resolve: webpackConfig.resolve
  });

  return {
    files: [
      'scripts/dash_banner/foo.coffee'
    ],

    tests: [
      'spec/dash_banner/foo_spec.coffee'
    ],

    postprocessor: webpackPostprocessor//,

    // setup: function () {
    //   window.__moduleBundler.loadTests();
    // }
  };
};
