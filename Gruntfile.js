/**
 * Pojo Slide Tab Makefile
 */
'use strict';

module.exports = function( grunt ) {

	require( 'matchdep' ).filterDev( 'grunt-*' ).forEach( grunt.loadNpmTasks );

	// Project configuration.
	grunt.initConfig( {
		pkg: grunt.file.readJSON( 'package.json' ),
		
		checktextdomain: {
			standard: {
				options:{
					text_domain: 'pojo-slide-tab',
					correct_domain: true,
					keywords: [
						// WordPress keywords
						'__:1,2d',
						'_e:1,2d',
						'_x:1,2c,3d',
						'esc_html__:1,2d',
						'esc_html_e:1,2d',
						'esc_html_x:1,2c,3d',
						'esc_attr__:1,2d',
						'esc_attr_e:1,2d',
						'esc_attr_x:1,2c,3d',
						'_ex:1,2c,3d',
						'_n:1,2,4d',
						'_nx:1,2,4c,5d',
						'_n_noop:1,2,3d',
						'_nx_noop:1,2,3c,4d'
					]
				},
				files: [ {
					src: [
						'**/*.php',
						'!node_modules/**',
						'!build/**',
						'!tests/**',
						'!vendor/**',
						'!*~'
					],
					expand: true
				} ]
			}
		},

		pot: {
			options:{
				text_domain: 'pojo-slide-tab',
				dest: 'languages/',
				keywords: [
					// WordPress keywords
					'__:1',
					'_e:1',
					'_x:1,2c',
					'esc_html__:1',
					'esc_html_e:1',
					'esc_html_x:1,2c',
					'esc_attr__:1',
					'esc_attr_e:1',
					'esc_attr_x:1,2c',
					'_ex:1,2c',
					'_n:1,2',
					'_nx:1,2,4c',
					'_n_noop:1,2',
					'_nx_noop:1,2,3c'
				]
			},
			files:{
				src: [
					'**/*.php',
					'!node_modules/**',
					'!build/**',
					'!tests/**',
					'!vendor/**',
					'!*~'
				],
				expand: true
			}
		},

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'assets/js/dev/app.dev.js',
				'assets/js/dev/jquery.pojo-slide-tab.js'
			]
		},

		uglify: {
			pkg: grunt.file.readJSON( 'package.json' ),
			options: {},
			dist: {
				files: {
					'assets/js/app.min.js': [
						'assets/js/dev/jquery.pojo-slide-tab.js',
						'assets/js/dev/app.dev.js'
					]
				}
			}
		},

		less: {
			dist: {
				options: {
					cleancss: true
				},
				files: {
					'assets/css/style.css': 'assets/less/style.less'
				}
			}
		},

		watch: {
			js: {
				files: [
					'**/*.js',
					'!**/*.min.js'
				],
				tasks: [
					'jshint',
					'uglify',
					'usebanner'
				],
				options: {}
			},

			less: {

				files: [
					'**/*.less'
				],
				tasks: [
					'less'
				],
				options: {}
			}
		},

		usebanner: {
			dist: {
				options: {
					banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
					'<%= grunt.template.today("dd-mm-yyyy") %> */'
				},
				files: {
					src: [
						'assets/css/style.css',
						'assets/js/app.min.js'
					]
				}
			}
		},

		wp_readme_to_markdown: {
			github: {
				options: {
					gruntDependencyStatusUrl: 'https://david-dm.org/pojome/pojo-slide-tab'
				},
				files: {
					'README.md': 'readme.txt'
				}
			}
		},

		bumpup: {
			options: {
				updateProps: {
					pkg: 'package.json'
				}
			},
			file: 'package.json'
		},

		replace: {
			plugin_main: {
				src: [ 'pojo-slide-tab.php' ],
				overwrite: true,
				replacements: [
					{
						from: /Version: \d{1,1}\.\d{1,2}\.\d{1,2}/g,
						to: 'Version: <%= pkg.version %>'
					}
				]
			},

			readme: {
				src: [ 'readme.txt' ],
				overwrite: true,
				replacements: [
					{
						from: /Stable tag: \d{1,1}\.\d{1,2}\.\d{1,2}/g,
						to: 'Stable tag: <%= pkg.version %>'
					}
				]
			}
		},

		shell: {
			git_add_all : {
				command: [
					'git add --all',
					'git commit -m "Bump to <%= pkg.version %>"'
				].join( '&&' )
			}
		},

		release: {
			options: {
				bump: false,
				npm: false,
				commit: false,
				tagName: 'v<%= version %>',
				commitMessage: 'released v<%= version %>',
				tagMessage: 'Tagged as v<%= version %>'
			}
		},

		copy: {
			main: {
				src: [
					'**',
					'!node_modules/**',
					'!build/**',
					'!bin/**',
					'!.git/**',
					'!tests/**',
					'!.travis.yml',
					'!.jshintrc',
					'!README.md',
					'!phpunit.xml',
					'!vendor/**',
					'!Gruntfile.js',
					'!package.json',
					'!.gitignore',
					'!.gitmodules',
					'!*~'
				],
				expand: true,
				dest: 'build/'
			}
		},

		clean: {
			//Clean up build folder
			main: [
				'build'
			]
		},

		wp_deploy: {
			deploy:{
				options: {
					plugin_slug: '<%= pkg.slug %>',
					svn_user: 'KingYes',
					build_dir: 'build/'
				}
			}
		}
		
	} );

	// Default task(s).
	grunt.registerTask( 'default', [
		'checktextdomain',
		'pot',
		'less',
		'jshint',
		'uglify',
		'usebanner',
		'wp_readme_to_markdown'
	] );

	grunt.registerTask( 'build', [
		'default',
		'clean',
		'copy'
	] );

	grunt.registerTask( 'publish', [
		'default',
		'bumpup',
		'replace',
		'shell:git_add_all',
		'release'
	] );
};