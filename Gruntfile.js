var grunt = require('grunt');
module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: ';'
            },
            dist: {
                // the files to concatenate
                src: ['src/**/*.js'],
                // the location of the resulting JS file
                dest: 'public/javascripts/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                // the banner is inserted at the top of the output
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'public/javascripts/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        jshint: {
            // define the files to lint
            files: ['Gruntfile.js', 'src/**/*.js'],
            // configure JSHint (documented at http://www.jshint.com/docs/)
            options: {
                // more options here if you want to override JSHint defaults
                globals: {
                    jQuery: true,
                    module: true
                }
            }
        },
        sass: {
            dist: {
                files: {
                    'public/stylesheets/<%= pkg.name %>.css': 'styles/**/*.scss'
                }
            }
        },
        cssmin: {
            target: {
                files: {
                    'public/stylesheets/<%= pkg.name %>.min.css': 'public/stylesheets/<%= pkg.name %>.css'
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint', 'sass']
        },
        clean: {
            js: ['public/javascripts/*.js', '!public/javascripts/*.min.js'], // Deletes all .js files, but skips min.js files
            css: ['public/stylesheets/*.*', '!public/stylesheets/*.min.css', '.sass-cache/']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');


    // the default task can be run just by typing "grunt" on the command line
    grunt.registerTask('default', ['jshint', 'sass', 'concat', 'uglify', 'cssmin', 'clean']);


};