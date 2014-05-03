var data = [4, 8, 15, 16, 8, 42, 40, 2, 10, 17, 4, 8, 15, 16, 8, 42, 40, 2, 10, 17, 4, 8, 15, 16, 8, 42, 40, 2, 10, 17, 4, 8, 15, 16, 8, 42, 40, 2, 10, 17, 4, 8, 15, 16, 8, 42, 40, 2, 10, 17, 4, 8, 15, 16, 8, 42, 40, 2, 10, 17, 4, 8, 15, 16, 8, 42, 40, 2, 10, 17, 4, 8, 15, 16, 8, 42, 40, 2, 10, 17, 4, 8, 15, 16, 8, 42, 40, 2, 10, 17, 4, 8, 15, 16, 8, 42, 40, 2, 10, 17, 4, 8, 15, 16, 8, 42, 40, 2, 10, 17, 4, 8, 15, 16, 8, 42, 40, 2, 10, 17, 4, 8, 15, 16, 8, 42, 40, 2, 10, 17];

angular.module('cs519Assign3.areaChart', [
	'cs519Assign3.util'
])

.config(function($stateProvider) {
	$stateProvider.state('areaChart', {
		url: '/areaChart',
		views: {
			'main': {
				controller: 'AreaChartCtrl',
				templateUrl: 'areaChart/areaChart.html'
			}
		}
	})
})

.controller('AreaChartCtrl', ['$scope', 'reusableChart', function($scope, reusableChart) {
	$scope.height = 200;
	$scope.width = 800;

	var config = {
		data: data,
		width: $scope.width,
		height: $scope.height
	};

	var configurableChart = reusableChart.bind(undefined, function() {
		var chart = d3.select('#chart')
			.attr('width', this.width)
			.attr('height', this.height);

		var area;

		var dataYMax = Math.max.apply(null, data);
		var dataYMin = Math.min.apply(null, data);

		if (dataYMin > 0) {
			dataYMin = 0;
		}

		var y = d3.scale.linear().domain([dataYMin, dataYMax]).range([this.height, 0]);

		area = d3.svg.area()
		.x(function(d, i) {
			return i*this.width/data.length;
		})
		.y0(this.height)
		.y1(function(d, i) {
			return y(d);
		});

		chart.append('path')
			.datum(config.data)
			.attr('class', 'area')
			.attr('d', area);
	});

	var myAreaChart = configurableChart(config);
	myAreaChart.height(100);
	myAreaChart();
}]);
