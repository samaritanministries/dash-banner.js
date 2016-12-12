'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({

    clean: {
      sass: ['dist/*.scss'],
      tmp: ['.tmp/*']
    },

    copy: {
      css: {
        src: '.tmp/styles/dash-banner.css',
        dest: 'dist/dash-banner.css'
      },
      scss: {
        src: 'styles/dash-banner.scss',
        dest: 'dist/dash-banner.scss'
      }
    },

    sass: {
      dist: {
        files: {
          ".tmp/styles/dash-banner-with-dashing-core.css": "styles/dash-banner-with-dashing-core.scss"
        }
      }
    },

  });

  grunt.registerTask("build:dist", [
    "clean",
    "sass",
    "copy:scss"
  ]);

  grunt.registerTask("default", ["build:dist"]);

};
