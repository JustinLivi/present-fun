module.exports = function( grunt ) {

    [
        'grunt-auto-install',
        'grunt-contrib-jshint',
        'grunt-contrib-clean',
        'grunt-git-describe',
        'grunt-replace',
        'grunt-contrib-concat',
        'grunt-contrib-uglify',
        'grunt-contrib-watch',
        'grunt-jsdoc',
        'grunt-contrib-copy',
        'grunt-karma',
        'grunt-browserify'
    ]
    .forEach( grunt.loadNpmTasks );

    grunt.initConfig({

        pkg: grunt.file.readJSON( 'package.json' ),

        config: grunt.file.readJSON( 'config.json' ),

        'git-describe': {
            options: {
                prop: 'git-version'
            },
            dist : {}
        },

        jsdoc : {
            dist : {
                src : '<%= config.src %>'
            },
            options: {
                destination: 'documentation',
            }
        },

        jshint: {
            src: '<%= config.src %>'
        },

        clean: {
            build: 'build'
        },

        replace: {
            build: {
                options: {
                    patterns: [
                        {
                            match: /(\"version\")(.*?)(\")(.{1,}?)(\")/i,
                            replacement: '\"version\": \"<%= pkg.version %>\"'
                        },
                        {
                            match: /(\"main\")(.*?)(\")(.{1,}?)(\")/i,
                            replacement: '\"main\": \"<%= BUILD %>\"'
                        }
                    ]
                },
                files: [
                    {
                        src: 'package.json',
                        dest: 'package.json'
                    },
                    {
                        src: 'bower.json',
                        dest: 'bower.json'
                    }
                ]
            }
        },

        watch: {
            debug: {
                files: '<%= config.src %>',
                tasks: [ 'debug' ]
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
        }

    });

    grunt.registerTask( 'setBuildName' , function() {
        var version = grunt.config.get( 'pkg.version' );
        var prefix = grunt.config.get( 'pkg.name' );
        var name = prefix + '-' + version;
        grunt.config.set( 'releaseName' , 'build/' + name + '.min.js' );
        grunt.config.set( 'devName' , 'build/' + name + '.js' );
    });

    grunt.registerTask( 'default', [
        'install',
        'jshint',
        'test',
        'build',
        'doc'
    ]);

    grunt.registerTask( 'install', [
        'auto_install'
    ]);

    grunt.registerTask( 'test', [
        'karma'
    ]);

    grunt.registerTask( 'build', [
        'clean',
        'git-describe',
        'setBuildName',
        'replace',
        'browserify',
        'uglify',
    ]);

    grunt.registerTask( 'doc', [
        'jsdoc'
    ]);

    grunt.registerTask( 'debug', [
        'jshint',
        'test',
        'watch'
    ]);

};
