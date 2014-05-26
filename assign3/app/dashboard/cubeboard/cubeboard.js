angular.module('cs519Assign3.cubeboard', [
	'templates-app',
	'cs519Assign3.util',
	'ui.router'
])

.config(function($stateProvider) {
	$stateProvider.state('dashboard.cubeboard', {
		url: '/cubeboard',
		views: {
			'cubeboard': {
				controller: 'CubeboardCtrl',
				templateUrl: 'dashboard/cubeboard/cubeboard.html'
			}
		}
	});
})

.controller('CubeboardCtrl', function() {
	var CUBISM_SIZE = 800;
	var CUBISM_STEP = 1000;
	var context = cubism.context()
		.serverDelay(5 * 1000)
		.step(CUBISM_STEP) 
		.size(CUBISM_SIZE); 
	var horizon = context.horizon();

	cube = context.cube('http://128.193.36.250:1080');
	var metrics = [
		cube.metric('cs519'),
		cube.metric('sum(cs519)')
	];

	d3.select('body').selectAll('.horizon')
		.data(metrics)
		.enter()
		.append('div')
		.attr('class', 'horizon')
		.call(horizon);


});