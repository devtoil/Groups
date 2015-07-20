module.exports = function(grunt) {
  grunt.initConfig({

    fn: {
      app: ''
    },
    sass: {
      dev: {                            // Target
        options: {                       // Target options
          style: 'compressed',
          sourcemap: 'auto'
        },
        // Dictionary of files
        files: {                         
          // 'destination': 'source'
          'build/assets/css/styles.css': 'build/assets/sass/main.scss'      
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      html: {
        files: ['*.html', 'includes/**/*.html', 'includes/modules/**/*.html'],
        tasks: ['includes']
      },
      js: {
        files: 'build/assets/js/**/*.js'
      },
      sass: {
        files: ['build/assets/**/*.scss', 'includes/modules/**/scss/*.scss', 'build/assets/*.scss'],
        tasks: ['sass']
      }
    },

    connect: {
      options: {
        port: 3000,
        hostname: 'localhost',
        livereload: 35729,
      },
      livereload: {
        options: {
          open: 'http://localhost:3000/app'
        }
      }
    },

    includes: {
      files: {
        src: ['*.html'], // Source files
        dest: 'build', // Destination directory
        flatten: true,
        cwd: '.',
        options: {
          silent: true,
          banner: '<!-- I am a banner <% includes.files.dest %> -->'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-includes');
  grunt.registerTask('default', ['connect:livereload', 'watch']);
};


