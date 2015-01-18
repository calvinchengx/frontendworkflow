module.exports = function(grunt) {
  "use strict";

  // task configurations
  var config = {
    concat: {
      app: {
        dest: "generated/js/app.min.js",
        src: [
          // all our js dependencies and frontend js logic
          "vendor/js/jquery.js",
          "js/app.js",
          ]
      }
    },
    sass: {
        dist: {
            files: [{
                expand: true,
                cwd: "styles",
                src: ["*.scss"],
                dest: "../public",
                ext: ".css"
            }]
        }
    },
    watch: {
        js: {
            files: ["<%= concat.app.src %>"],
            tasks: ["concat"]
        },
        sass: {
            files: ["sass/**/*.{scss,sass}", "sass/_partials/**/*.{scss,sass}"],
            tasks: ["sass"]
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

  // creating workflows
  grunt.registerTask("default", ["sass", "concat", "watch"]);

};
