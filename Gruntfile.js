module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    replace : {
      build: {
        options : {
          usePrefix : false,
          force : true,
          patterns : [
            {
              match : /this\._super\(\s*([\w\.]+)\s*,\s*["'](\w+)["']\s*(,\s*)?/g,
              replacement : '$1.prototype.$2.apply(this$3'
            },
          ],
        },
        files : [
          {
            src : [ 'js/**/*.js' ],
            dest : 'build/',
            expand: true
          }
        ]
      },
    },

    copy: {
      build: {
        files: [{
          src: 'node_modules/melonjs/dist/*.js',
          dest: 'build/lib/melon/',
          expand: true,
          flatten: true
        },{
          cwd: 'node_modules/melonjs/',
          src: 'plugins/debug/**/*',
          dest: 'build/lib/melon/',
          expand: true
        },{
          cwd: 'node_modules/',
          src: ['es?-shim/*.js', 'es?-shim/*.map'],
          dest: 'build/lib/',
          expand: true
        },{
          src: 'index.css',
          dest: 'build/index.css'
        },{
          src: 'package.json',
          dest: 'build/package.json'
        },{
          src: 'data/**/*',
          dest: 'build/',
          expand: true
        },{
          src: 'icons/*',
          dest: 'build/',
          expand: true
        }],
      },
    },

    concat: {
      dist: {
        src: [
          'build/js/fix/*.js',
          'build/js/game.js',
          'build/js/resources.js',
          'build/js/**/*.js',
        ],
        dest: 'build/js/app.js'
      }
    },

    processhtml: {
      dev: {
        options: {
          process: true,
          data: {
            title: '<%= pkg.name %> - DEV',
          }
        },
        files: {
          'build/index.html': ['index.html']
        }
      },
      dist: {
        options: {
          process: true,
          data: {
            title: '<%= pkg.name %>',
          }
        },
        files: {
          'build/index.html': ['index.html']
        }
      },
    },

    uglify: {
      options: {
        report: 'min',
        preserveComments: 'some'
      },
      dist: {
        files: {
          'build/js/app.min.js': [
            'build/js/app.js'
          ]
        }
      }
    },

    clean: {
      app: ['build/js/app.js'],
      build: ['build/js/**/*', '!**/*.min.js'],
      dist: ['build/','bin/'],
    },

    connect: {
      server: {
        options: {
          port: 8000,
          keepalive: false,
          base: './build/'
        }
      }
    },

    resources: {
      build: {
        options: {
          dest: 'build/js/resources.js',
          varname: 'game.resources',
        },
        files: [{
          src: ['data/bgm/**/*', 'data/sfx/**/*'],
          type: 'audio'
        },{
          src: ['data/fnt/**/*.fnt'],
          type: 'binary'
        },{
          src: ['data/img/**/*.png', 'data/fnt/**/*.png'],
          type: 'image'
        },{
          src: ['data/img/**/*.json'],
          type: 'json'
        },{
          src: ['data/map/**/*.tmx', 'data/map/**/*.json'],
          type: 'tmx'
        },{
          src: ['data/map/**/*.tsx'],
          type: 'tsx'
        }]
      }
    },

    watch: {
      resources: {
        files: ['data/**/*'],
        tasks: ['resources', 'copy'],
        options: {
          spawn: false,
        },
      },
      dev: {
        files: ['js/**/*'],
        tasks: ['replace']
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Custom Tasks
  grunt.loadTasks('tasks');

  grunt.registerTask('default', [
    'resources',
    'copy',
    'replace',
    'concat',
    'uglify',
    'processhtml:dist',
    'clean:app',
  ]);
  grunt.registerTask('dist', ['default']);
  grunt.registerTask('build', ['resources', 'copy', 'replace', 'processhtml:dev']);
  grunt.registerTask('serve', ['build', 'connect', 'watch']);
}
