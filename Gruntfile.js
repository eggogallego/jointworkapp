module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    dirs: {
        src: 'src',
        dest: 'dist',
    },


    // clean tasks
    clean: {
        // target all output files
        all: ['dist/*.*']
    },



    //lint tasks
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },


    //copy files over
    copy: {
        main: {
            files: [
                // includes files within path
                {expand: true, flatten: true, src: ['src/*'], dest: 'dist', filter: 'isFile'},
                //example
                {src: ['src/index.html'], dest: 'example/index.html', filter: 'isFile'},
                {src: ['src/questions.json'], dest: 'example/questions.json', filter: 'isFile'}
            ]
        }
    },


    concat: {
        options: {
             banner:
            '/*\n' +
            ' * <%= pkg.title %> -- By <%= pkg.author.name %>\n' +
            ' * \n' +
            ' * Description: <%= pkg.description %>\n' +
            ' * Author: <%= pkg.author.name %>, <<%= pkg.author.email %>> \n' +
            ' * License: <%= pkg.license %>\n' +
            ' * Version: <%= pkg.version %>\n' +
            ' */\n',
            stripBanners: true
        },

        dist: {
            src: ['<%= dirs.src %>/textadventure.js'],
            dest: '<%= dirs.dest %>/textadventure.js',
        }
    },


    //only minify the dist directory
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        files : {
           '<%= dirs.dest %>/textadventure.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },


    //bower requires this in gruntfile
    bower: {
        install: {
           //just run 'grunt bower' and you'll see files from your Bower packages in lib directory
        }
    },


    /* bump version up https://www.npmjs.com/package/grunt-bumpup
     *
     * grunt bumpup:[type]
     *
     * major: Will bump the major x.0.0 part of a version string.
     * minor: Will bump the minor 0.x.0 part of a version string.
     * patch: Will bump the patch 0.0.x part of a version string.
     */
    bumpup: {
        files: [
            'package.json',
            'bower.json'
        ],
    }


  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-bumpup');
  grunt.loadNpmTasks('grunt-bower-task');

  // Default task(s).
  grunt.registerTask('default', ['copy','clean','concat','jshint','uglify']);

};