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


});