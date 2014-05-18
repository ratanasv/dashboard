module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-html2js');

	var build_config = require('./build_config.js');

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
		}
	}

	grunt.initConfig(taskConfig);

	grunt.registerMultiTask('assemble', 'Process index.html template', function() {
		var filesSrc = this.filesSrc;
		filesSrc.unshift('templates-app.js');
		console.log(filesSrc);
		grunt.file.copy('./index.html', build_config.build_dir + 'index.html', {
			process: function(contents, path) {
				return grunt.template.process(contents, {
					data: {
						sources: filesSrc,
						dependencies: build_config.vendor_js
					}
				});
			}
		});
		
	});

	grunt.registerTask('build', ['clean', 'copy:build', 'html2js', 'assemble']);

};
