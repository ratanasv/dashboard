angular.module('cs519Assign3.main', [
	'templates-app'
])

.config(function($stateProvider) {
	$stateProvider.state('main', {
		url: '/main',
		views: {
			'main': {
				controller: 'MainCtrl',
				templateUrl: 'main/main.html'
			}
		}
	})
})

.controller('MainCtrl', function($scope) {
	
});