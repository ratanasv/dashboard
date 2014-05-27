angular.module('cs519Assign3', [
	'ui.router',
	'cs519Assign3.areaChart',
	'cs519Assign3.main',
	'cs519Assign3.multiLineChart',
	'cs519Assign3.scatterPlotMatrix',
	'cs519Assign3.dashboard'
])

.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/main');
})

.run(function() {
})

.controller('AppCtrl', function AppCtrl($scope) {
	$scope.$on('$stateChangeSuccess', function(event, toState){
		if (angular.isDefined(toState.data.pageTitle)) {
			$scope.pageTitle = toState.data.pageTitle + ' | ngBoilerplate' ;
		}
	});
});

