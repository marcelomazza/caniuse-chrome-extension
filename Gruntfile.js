module.exports = function(grunt) {

  grunt.initConfig({
    watch: {
      options: {
        livereload: {
          host: 'localhost'
        },
      },
      files: ['**/*']
    },
  });

  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);

};
