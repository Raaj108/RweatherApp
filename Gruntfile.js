module.exports = function (grunt) {

  //project config
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          'dest/css/styles.css': 'source/less/main.less'
        }
      }
    },
    
    watch:{
      styles:{
        files:['source/less/*.less'],
        tasks:['less'],
        options:{
          spawn: false
        }
      }
    }
  });

  // Load the plugin that provides the "watch and less" task.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');

  // Default task(s).
  grunt.registerTask('default', ['watch', 'less']);
}
