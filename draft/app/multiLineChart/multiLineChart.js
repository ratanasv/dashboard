var data = [4, 8, 15, 16, 8, 42, 40, 2, 10, 17, 4, 8, 15, 16, 8, 42, 40, 2, 10, 17, 4, 8, 15, 16, 8, 42, 40, 2, 10, 17, 4, 8, 15, 16, 8, 42, 40, 2, 10, 17, 4, 8, 15, 16, 8, 42, 40, 2, 10, 17, 4, 8, 15, 16, 8, 42, 40, 2, 10, 17, 4, 8, 15, 16, 8, 42, 40, 2, 10, 17, 4, 8, 15, 16, 8, 42, 40, 2, 10, 17, 4, 8, 15, 16, 8, 42, 40, 2, 10, 17, 4, 8, 15, 16, 8, 42, 40, 2, 10, 17, 4, 8, 15, 16, 8, 42, 40, 2, 10, 17, 4, 8, 15, 16, 8, 42, 40, 2, 10, 17, 4, 8, 15, 16, 8, 42, 40, 2, 10, 17];

angular.module('cs519Assign3.multiLineChart', [
	'cs519Assign3.util'
])

.config(function($stateProvider) {
	$stateProvider.state('multiLineChart', {
		url: '/multiLineChart',
		views: {
			'main': {
				controller: 'MultiLineChartCtrl',
				templateUrl: 'multiLineChart/multiLineChart.html'
			}
		}
	})
})

.controller('MultiLineChartCtrl', ['$scope', 'reusableFactory', function($scope, reusableFactory) {
	$scope.height = 200;
	$scope.width = 800;

	var config = {
		data: data,
		width: $scope.width,
		height: $scope.height
	};

}]);
