module.exports = function(grunt) {
  "use strict";

  // task configurations
  var config = {
    // files that our tasks will use
    files: {
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
        src: "index.html"    
      }
    },
    server: {
        base: "generated",
        web: {
            port: 8000
        }
    },
    watch: {
        js: {
            files: ["<%= files.js.src %>"],
            tasks: ["concat"]
        },
        sass: {
            files: ["<%= files.sass.src %>"],
            tasks: ["sass:dist"]
        }
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

  // creating workflows
  grunt.registerTask("default", ["copy", "sass:dist", "concat", "server", "watch"]);

};
