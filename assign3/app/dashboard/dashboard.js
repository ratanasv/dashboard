angular.module('cs519Assign3.dashboard', [
	'templates-app'
])

.config(function($stateProvider) {
	$stateProvider.state('dashboard', {
		url: '/dashboard',
		views: {
			'main': {
				controller: 'DashboardCtrl',
				templateUrl: 'dashboard/dashboard.html'
			}
		}
	});
})

.controller('DashboardCtrl', function() {
	
});