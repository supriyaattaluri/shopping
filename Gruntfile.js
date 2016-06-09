

module.exports = function(grunt) {

  grunt.initConfig({

    // JS TASKS ================================================================
    jshint: {
      all: ['server/**/*.js'] 
    },

    uglify: {
      build: {
        files: {
          'public/dist/js/app.min.js': ['server/**/*.js', 'server/*.js']
        }
      }
    },

    

    // COOL TASKS ==============================================================
    watch: {
      
      js: {
        files: ['server/**/*.js'],
        tasks: ['jshint', 'uglify']
      }
    },

    nodemon: {
      dev: {
        script: 'app.js'
      }
    },
     

    /*concurrent: {
      options: {
        logConcurrentOutput: true
      },
      tasks: ['nodemon','browserSync', 'watch']
    }   */
    open: {
    delayed: {
      path: 'http://localhost/shopping'
     // app: 'Google Chrome'
         }
  }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-open');

  
  grunt.registerTask('server', function () {
  var server = require('myServer');
  server.listen(2016, function (err) {
    if (!err) {
      grunt.log.writeln('Server started');
      grunt.event.emit('serverListening'); // triggers open:delayed 
    }
  });
});
 grunt.registerTask('default', ['jshint','open','nodemon', 'uglify']); 
};
