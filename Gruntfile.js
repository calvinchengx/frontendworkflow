module.exports = function(grunt) {
  'use strict';

  // task configurations
  var config = {
    // meta data from package.json
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today(\'yyyy-mm-dd\') %>\n' +
      '<%= pkg.homepage ? \'* \' + pkg.homepage + \'\\n\' : \'\' %>' +
      '* Copyright (c) <%= grunt.template.today(\'yyyy\') %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, \'type\').join(\', \') %> */\n',
    // files that our tasks will use
    files: {
      html: {
        src: 'index.html'
      },
      js: {
        vendor: [
          'bower_components/mithril/mithril.min.js'
        ],
        app: {
          main: 'js/app.js',
          compiled: 'generated/js/app.min.js'
        }
      },
      sass: {
        src: [
            'sass/**/*.{scss,sass}', 
            'sass/_partials/**/*.{scss,sass}'
        ]
      },
    },
    // our tasks
    browserify: {
      app: {
        files: {
          'generated/js/app.min.js': ['js/app.js'],
        }
      },
      options: {
        debug: true
      }
    },
    concat: {
      app: {
        dest: 'generated/js/vendor.min.js',
        src: ['<%= files.js.vendor %>']
      }
    },
    sass: {
        dev: {
          options: {
            sourceMap: true,
            includePaths: ['bower_components/susy/sass']
          },
          dest: 'generated/css/styles.css',
          src: '<%= files.sass.src %>'
        },
        dist: {
          options: {
            outputStyle: 'compressed',
            includePaths: ['bower_components/susy/sass']
          },
          dest: 'dist/css/styles.css',
          src: '<%= files.sass.src %>'
        }
    },
    copy: {
      html: {
        files: {
          'generated/index.html': '<%= files.html.src %>',
          'dist/index.html': '<%= files.html.src %>'
        }
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.app.dest %>',
        dest: 'dist/js/vendor.min.js'
      }
    },
    server: {
        base: (process.env.SERVER_BASE || 'generated'),
        web: {
            port: 8000
        }
    },
    open: {
        dev: {
            path: 'http://localhost:<%= server.web.port %>'
        }
    },
    watch: {
        options: {
            livereload: true
        },
        html: {
            files: ['<%= files.html.src %>'],
            tasks: ['copy']
        },
        js: {
            files: ['<%= files.js.vendor %>'],
            tasks: ['concat']
        },
        app: {
            files: ['<%= files.js.app.main =>'],
            tasks: ['browserify', 'concat']
        },
        sass: {
            files: ['<%= files.sass.src %>'],
            tasks: ['sass:dev']
        }
    },
    // one-off task 'grunt clean', which clears our generated files and build files.
    clean: {
        workspaces: ['dist', 'generated']
    }
  };

  // initializing task configuration
  grunt.initConfig(config);

  // loading local tasks
  grunt.loadTasks('tasks');

  // loading external tasks (aka: plugins)
  require('matchdep').filterAll('grunt-*').forEach(grunt.loadNpmTasks);

  // creating workflows
  grunt.registerTask('default', ['copy', 'sass:dev', 'browserify', 'concat', 'server', 'open', 'watch']);
  grunt.registerTask('build', ['copy', 'sass:dist', 'browserify', 'concat', 'uglify']);
  grunt.registerTask('prodsim', ['build', 'server', 'open', 'watch']);

};
