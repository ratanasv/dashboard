module.exports = {
	build_dir: 'build/',
	vendor_js: [
		'bower_components/angular/angular.js',
		'bower_components/angular-ui-router/release/angular-ui-router.js',
		'bower_components/underscore/underscore.js',
		'bower_components/d3/d3.js',
		'bower_components/socket.io-client/dist/socket.io.js'
	],
	source_js: [
		'app/**/*.js', '!app/**/*.spec.js'
	],
	source_html: [
		'app/**/*.html'
	],
	test_js: [
		'app/**/*.spec.js'
	]
};