var data = [4, 8, 15, 16, 8, 42, 40, 2, 10, 17, 4, 8, 15, 16, 8, 42, 40, 2, 10, 17, 4, 8, 15, 16, 8, 42, 40, 2, 10, 17, 4, 8, 15, 16, 8, 42, 40, 2, 10, 17, 4, 8, 15, 16, 8, 42, 40, 2, 10, 17, 4, 8, 15, 16, 8, 42, 40, 2, 10, 17, 4, 8, 15, 16, 8, 42, 40, 2, 10, 17, 4, 8, 15, 16, 8, 42, 40, 2, 10, 17, 4, 8, 15, 16, 8, 42, 40, 2, 10, 17, 4, 8, 15, 16, 8, 42, 40, 2, 10, 17, 4, 8, 15, 16, 8, 42, 40, 2, 10, 17, 4, 8, 15, 16, 8, 42, 40, 2, 10, 17, 4, 8, 15, 16, 8, 42, 40, 2, 10, 17];

angular.module('cs519Assign3.multiLineChart', [

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

.controller('MultiLineChartCtrl', function($scope) {
	$scope.height = 200;
	$scope.width = 800;

	var config = {
		data: data,
		width: $scope.width,
		height: $scope.height
	};


	function multiLineChart(config) {
		var width = 700;
		var height = 200;

		function my() {
			
		}

		my.width = function(value) {
			if (!value) return width;
			width = value;
			return my;
		}

		my.height = function(value) {
			if (!value) return height;
			height = value;
			return my;
		}

		if (config.width) {
			my.width(config.width);
		}
		if (config.height) {
			my.height(config.height);
		}

		return my;
	}
});
