angular.module('cs519Assign3', [
	'ui.router',
	'cs519Assign3.areaChart',
	'cs519Assign3.main'
])

.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/main');
})

.run(function() {
})

.controller('AppCtrl', function AppCtrl($scope, $location) {
	$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
		if (angular.isDefined(toState.data.pageTitle)) {
			$scope.pageTitle = toState.data.pageTitle + ' | ngBoilerplate' ;
		}
	});
});

