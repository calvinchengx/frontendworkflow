module.exports = function(grunt) {

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
    }
  };

  // initializing task configuration
  grunt.initConfig(config);

  // loading local tasks
  grunt.loadTasks("tasks");

  // loading external tasks (aka: plugins)
  grunt.loadNpmTasks("grunt-contrib-concat");

  // creating workflows
  grunt.registerTask("default", ["concat"]);


};
