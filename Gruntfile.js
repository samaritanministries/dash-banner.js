'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    //********************************
    //Tasks in alphabetical order
    //********************************

    clean: {
      tmp: ['.tmp/*'],
      dist: ['dist/*']
    },

    coffee: {
      src: {
        files: [{
          expand: true,
          cwd: 'scripts',
          src: '**/**/*.coffee',
          dest: '.tmp/scripts',
          ext: '.js'
        }]
      },

      spec: {
        files: [{
          expand: true,
          cwd: 'spec',
          src: '**/**/*.coffee',
          dest: '.tmp/spec',
          ext: '.js'
        }]
      }
    },

    copy: {
      namespace: {
        src: 'scripts/namespace.js',
        dest: '.tmp/scripts/namespace.js'
      },
      // css: {
      //   src: '.tmp/styles/dash_banner.css',
      //   dest: 'dist/dash_banner.css'
      // },
      // scss: {
      //   src: 'styles/dash_banner.scss',
      //   dest: 'dist/dash_banner.scss'
      // }
    },

    jst: {
      compile: {
        options: {
          namespace: 'DashBannerJST'
        },
        files: {
          ".tmp/scripts/dash_banner/templates.js": ["scripts/dash_banner/**/*.ejs"]
        }
      }
    },

    // sass: {
    //   dist: {
    //     files: {
    //       ".tmp/styles/dash_banner.css": "styles/dash_banner.scss"
    //     }
    //   }
    // },

    uglify: {
      options: {
        mangle: true
      },

      dist: {
        files: {
          'dist/dash-banner.min.js': [
            '.tmp/scripts/namespace.js',
            '.tmp/scripts/dash_banner/templates.js',
            '.tmp/scripts/dash_banner/foo.js',
          ]
        }
      }
    },
  });

  //********************************
  //Builds
  //********************************

  grunt.registerTask('build:dist', [
                     'clean:tmp',
                     'clean:dist',
                     'jst',
                     'coffee:src',
                     // 'sass',
                     'copy:namespace',
                     // 'copy:css',
                     // 'copy:scss',
                     'uglify'

  ]);

  grunt.registerTask('build:spec', [
                     'clean:tmp',
                     'jst',
                     'coffee:src',
                     // 'sass',
                     'coffee:spec'
  ]);

  grunt.registerTask('default', ['build:dist']);
};
