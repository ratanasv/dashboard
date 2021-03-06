module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-html2js');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');

	var build_config = require('./build_config.js');
	var css_target = build_config.build_dir + 'vir.css';

	var filesConfig = {};
	filesConfig[css_target] = build_config.source_less;
	var lessConfig = {
		build: {
			files: filesConfig
		}
	};

	var taskConfig = {
		clean: [
			build_config.build_dir
		],
		copy: {
			build: {
				files: [
					{
						src: build_config.vendor_js.concat(build_config.source_js),
						dest: build_config.build_dir,
						cwd: '.',
						expand: true,
						nonull: true
					}
				]
			}
		},
		assemble: {
			build: {
				src: build_config.source_js,
			}
		},
		html2js: {
			app: {
				options: {
					base: 'app/'
				},
				src: build_config.source_html,
				dest: build_config.build_dir + 'templates-app.js'
			}
		},
		jshint: {
			src: build_config.source_js,
			gruntfile: 'Gruntfile.js',
			options: {
				curly: true,
				immed: true,
				newcap: true,
				noarg: true,
				sub: true,
				boss: true,
				eqnull: true,
				eqeqeq: true,
				freeze: true,
				indent: 4,
				latedef: true,
				quotmark: true,
				unused: false,
				trailing: true
			}	
		},
		karma: {
			options: {
				browsers: ['Chrome'],
				frameworks: ['jasmine'],
				files: build_config.vendor_js.concat([
					build_config.build_dir + 'templates-app.js', 
					'bower_components/angular-mocks/angular-mocks.js'
				]).concat(build_config.source_js)
				.concat(build_config.test_js)
			},
			unit: {
				singleRun: true
			},
			continuous: {
				background: true
			}
		},
		watch: {
			gruntfile: {
				files: 'Gruntfile.js',
				tasks: ['jshint:gruntfile']
			},
			source_js: {
				files: build_config.source_js,
				tasks: ['jshint:src', 'html2js', 'copy:build']
			},
			index: {
				files: 'index.html',
				tasks: ['assemble']
			},
			tpl: {
				files: build_config.source_html,
				tasks: ['html2js']
			},
			less: {
				files: build_config.source_less,
				tasks: ['less:build']
			}
		},
		less: lessConfig
	};
	

	grunt.initConfig(taskConfig);

	grunt.registerMultiTask('assemble', 'Process index.html template', function() {
		var filesSrc = this.filesSrc;
		filesSrc.unshift('templates-app.js');
		grunt.file.copy('./index.html', build_config.build_dir + 'index.html', {
			process: function(contents) {
				return grunt.template.process(contents, {
					data: {
						sources: filesSrc,
						dependencies: build_config.vendor_js
					}
				});
			}
		});
		
	});
	grunt.registerTask('continuous', ['build', 'watch']);
	grunt.registerTask('build', ['jshint', 'clean',  'html2js', 'karma:unit', 'less:build', 'copy:build', 'assemble']);

};

