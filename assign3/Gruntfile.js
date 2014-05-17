module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	var build_config = require('./build_config.js');

	var taskConfig = {
		clean: [
			build_config.build_dir
		],
		copy: {
			build: {
				files: [
					{
						src: build_config.vendor_js,
						dest: build_config.build_dir,
						cwd: '.',
						expand: true
					}
				]
			}
		}
	}

	grunt.initConfig(taskConfig);

	grunt.registerTask('build', ['clean', 'copy:build']);
};

