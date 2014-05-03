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

.controller('MultiLineChartCtrl', ['$scope', 'multiLineChart', function($scope, multiLineChart) {
	var config;
	var myMultiLineChart;

	$scope.heightSlider = {
		name: 'Height Slider',
		value: '200'
	}
	$scope.widthSlider = {
		name: 'Width Slider',
		value: '800'
	}

	$scope.height = 200;
	$scope.width = 800;

	config = {
		data: data,
		width: $scope.width,
		height: $scope.height
	};

	/*
	myMultiLineChart = multiLineChart(config);
	myMultiLineChart.height(100);
	myMultiLineChart.render()
	*/
}])

.factory('multiLineChart', ['reusableChart', function(reusableChart) {
	return {
		yomama: 'isfat'
	};
}]);
