module.exports = function(grunt) {
  "use strict";

  // task configurations
  var config = {
    // meta data from package.json
    pkg: grunt.file.readJSON("package.json"),
    banner: "/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - " +
      "<%= grunt.template.today(\"yyyy-mm-dd\") %>\n" +
      "<%= pkg.homepage ? \"* \" + pkg.homepage + \"\\n\" : \"\" %>" +
      "* Copyright (c) <%= grunt.template.today(\"yyyy\") %> <%= pkg.author.name %>;" +
      " Licensed <%= _.pluck(pkg.licenses, \"type\").join(\", \") %> */\n",
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
        dev: {
          options: {
            sourceMap: true
          },
          dest: "generated/css/styles.css",
          src: "<%= files.sass.src %>"
        },
        dist: {
          options: {
            outputStyle: "compressed"
          },
          dest: "dist/css/styles.css",
          src: "<%= files.sass.src %>"
        }
    },
    copy: {
      html: {
        files: {
          "generated/index.html": "<%= files.html.src %>",
          "dist/index.html": "<%= files.html.src %>"
        }
      }
    },
    uglify: {
      options: {
        banner: "<%= banner %>"
      },
      dist: {
        src: "<%= concat.app.dest %>",
        dest: "dist/js/app.min.js"
      }
    },
    server: {
        base: "generated",
        web: {
            port: 8000
        }
    },
    open: {
        dev: {
            path: "http://localhost:<%= server.web.port %>"
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
            tasks: ["sass:dev"]
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
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-open");

  // creating workflows
  grunt.registerTask("default", ["copy", "sass:dev", "concat", "server", "open", "watch"]);
  grunt.registerTask("build", ["copy", "sass:dist", "concat", "uglify"]);

};
