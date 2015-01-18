module.exports = function(grunt) {
  "use strict";

  // task configurations
  var config = {
    // files that our tasks will use
    files: {
      html: {
        src: "index.html"
      },
      js: {
        src: [
          "vendor/js/jquery.js",
          "js/app.js"
        ]
      },
      sass: {
        src: [
            "sass/**/*.{scss,sass}", 
            "sass/_partials/**/*.{scss,sass}"
        ]
      }
    },
    // our tasks
    concat: {
      app: {
        dest: "generated/js/app.min.js",
        src: "<%= files.js.src %>"
      }
    },
    sass: {
        dist: {
          dest: "generated/css/styles.css",
          src: "<%= files.sass.src %>"
        }
    },
    copy: {
      html: {
        dest: "generated/index.html",
        src: "<%= files.html.src %>"
      }
    },
    server: {
        base: "generated",
        web: {
            port: 8000
        }
    },
    watch: {
        options: {
            livereload: true
        },
        html: {
            files: ["<%= files.html.src %>"],
            tasks: ["copy"]
        },
        js: {
            files: ["<%= files.js.src %>"],
            tasks: ["concat"]
        },
        sass: {
            files: ["<%= files.sass.src %>"],
            tasks: ["sass:dist"]
        }
    },
    // one-off task "grunt clean", which clears our generated files and build files.
    clean: {
        workspaces: ["dist", "generated"]
    }
  };

  // initializing task configuration
  grunt.initConfig(config);

  // loading local tasks
  grunt.loadTasks("tasks");

  // loading external tasks (aka: plugins)
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-sass");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-clean");

  // creating workflows
  grunt.registerTask("default", ["copy", "sass:dist", "concat", "server", "watch"]);

};
