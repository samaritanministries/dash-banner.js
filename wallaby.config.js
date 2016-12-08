module.exports = function (wallaby) {

  return {
    files: [
      "bower_components/jquery/dist/jquery.js",
      "bower_components/underscore/underscore.js",
      "bower_components/backbone/backbone.js",
      "bower_components/jasmine-jquery/lib/jasmine-jquery.js",
      "scripts/namespace.js",
      ".tmp/scripts/dash_banner/templates.js",
      "scripts/dash_banner/view.coffee"
    ],

    tests: [
      "spec/**/*.coffee"
    ],
  };

};
