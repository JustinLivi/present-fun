module.exports = function( grunt ) {

    [
        'grunt-concurrent',
        'grunt-newer',
        'grunt-auto-install',
        'grunt-contrib-uglify',
        'grunt-contrib-watch',
        'grunt-contrib-cssmin',
        'grunt-contrib-watch',
        'grunt-jsdoc',
        'grunt-nodemon',
        'grunt-karma',
        'grunt-browserify',
        'grunt-mocha-test'
    ]
    .forEach( grunt.loadNpmTasks );

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        pkg: grunt.file.readJSON( 'package.json' ),

        config: grunt.file.readJSON( 'config.json' ),

        concurrent: {
            dev: {
                tasks: ['nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },

        sass: {
            options: {
                sourceMap: true
            },
            target: {
                files: [
                    {
                        expand: true,
                        cwd: "src/client/views/",
                        src: ["**/*.scss"],
                        dest: "src/client/views/",
                        ext: '.css'
                    },
                    { 'src/client/core.css': 'src/client/core.scss' }
                ]
            }
        },

        nodemon: {
            dev: {
                script: 'src/server/app.js',
                options: {
                    nodeArgs: ['--debug'],
                    watch: ['src/server']
                }
            }
        },

        watch: {

            css: {
                files: ['**/*.scss'],
                tasks: ['compileCSS']
            },

            js: {
                files: ['src/client/**/*.js', '!src/client/**/*.es5.js', '!src/client/**/*.min.js'],
                tasks: ['compileJS']
            }

        },

        jsdoc : {
            dist : {
                src : '<%= config.src %>'
            },
            options: {
                destination: 'documentation',
            }
        },

        browserify: {
            dist: {
                options: {
                    transform: [['babelify', { 'sourceMaps': 'inline' }]],
                    browserifyOptions: {
                        debug: true
                    }
                },
                files: '<%= config.compile %>'
            }
        },

        uglify: {
            options: {
                sourceMap: true,
                banner: '/*! <%= pkg.name %> - <%= pkg.version %> - <%= pkg.author.name %> - <%= grunt.config.get( \'git-branch\' ) %> - <%= grunt.config.get( \'git-hash\' ) %> - <%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            core: { files: '<%= config.core %>' },
            views: { files: '<%= config.views %>' },
        },

        auto_install: {
            local: {}
        },

        cssmin: {
            options: {
                sourceMap: true
            },
            target: {
                files: [
                    {
                        expand: true,
                        cwd: "src/client/views/",
                        src: ['**/*.css', '!**/*.min.css'],
                        dest: "src/client/views/",
                        ext: '.min.css'
                    },
                    {
                        'src/client/core.min.css': ['src/client/core.css']
                    }
                ]
            }
        },

        karma: {
            options: {
                files: '<%= config.karmaTestFiles %>'
            },
            test: {
                configFile: 'karma.conf.js',
                singleRun: true,
                autoWatch: false,
                preprocessors: '<%= config.karmaPreprocess %>'
            }
        },

        eslint: {
            options: {
                target: ['src/**/*.js']
            }
        },

        mochaTest: {
            specs: {
                options: {
                    ui: 'bdd',
                    reporter: 'spec',
                    require: './app/test/server/test.spec.js'
                },
                src: ['./app/test/server/*.js']
            }
        }

    });

    grunt.registerTask( 'default', [
        'eslint',
        'compileJS',
        'compileCSS',
        'test',
        //'doc', 
        'concurrent'
    ]);

    grunt.registerTask( 'install', [
        'auto_install'
    ]);

    grunt.registerTask( 'test', [
        'karma'
    ]);

    grunt.registerTask( 'compileJS', [
        'browserify',
        'uglify',

    ]);

    grunt.registerTask( 'compileCSS', [
        'sass',
        'cssmin'
    ]);

    grunt.registerTask( 'doc', [
        'jsdoc'
    ]);

};
