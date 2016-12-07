var wallabyWebpack = require('wallaby-webpack');
var webpackConfig = require('./webpack.config');

module.exports = function (wallaby) {

  webpackConfig.devtool = "source-map";
  // var webpackPostprocessor = wallabyWebpack(webpackConfig);
  // webpackConfig.module.loaders = [{
  //   test: /\.ejs$/,
  //   loader: "ejs-compiled"
  // }];

  return {
    compilers: {
      // 'scripts/dash_banner/**/*.js': wallaby.compilers.babel({
      //   // babel options
      //   // like `stage: n` for Babel 5.x or `presets: [...]` for Babel 6
      //   // (no need to duplicate .babelrc, if you have it, it'll be automatically loaded)
      // }),

      'scripts/dash_banner/**/*.coffee': wallaby.compilers.coffeeScript({
        // CoffeeScript compiler specific options
      }),
      'spec/**/*.coffee': wallaby.compilers.coffeeScript({
        // CoffeeScript compiler specific options
      })
    },

    files: [
      {pattern: "scripts/namespace.js"},//}, load: false},
      {pattern: "scripts/dash_banner/foo.coffee"}
      // "scripts/bower_components/jquery/dist/jquery.js",
      // "scripts/bower_components/underscore/underscore.js",
      // "scripts/bower_components/backbone/backbone.js",
      //
      // "scripts/bower_components/jasmine-jquery/lib/jasmine-jquery.js",
      //
      // "scripts/dash_banner/template.js",
      // // {pattern: "scripts/dash_banner/**/*.js", load: false},
      // // "scripts/dash_banner/foo.coffee"
      // {pattern: "scripts/dash_banner/**/*.coffee"},
      // {pattern: "scripts/dash_banner/**/*.ejs"},
      // {pattern: "scripts/dash_banner/**/*.js"}
    ],

    tests: [
      {pattern: "spec/dash_banner/foo_spec.coffee", load: false}
    ],

    postprocessor: wallabyWebpack(webpackConfig),

    setup: function () {
      window.__moduleBundler.loadTests();
    }
  };
};
