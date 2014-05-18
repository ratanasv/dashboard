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
	});
})

.controller('AreaChartCtrl', ['$scope', 'areaChart', 'randomArray', function($scope, areaChart, randomArray) {
	var config;
	var myAreaChart;

	$scope.height = 200;
	$scope.width = 800;

	config = {
		data: randomArray(100),
		width: $scope.width,
		height: $scope.height
	};

	myAreaChart = areaChart(config);
	myAreaChart.height(100);
	myAreaChart.render();
}])

.factory('areaChart', ['reusableChart', function(reusableChart) {
	return function(config) {
		var dataYMax;
		var dataYMin;

		var my = {};
		reusableChart(my);

		if (config.width) {
			my.width(config.width);
		}
		if (config.height) {
			my.height(config.height);
		}

		dataYMax = Math.max.apply(null, config.data);
		dataYMin = Math.min.apply(null, config.data);

		if (dataYMin > 0) {
			dataYMin = 0;
		}

		my.render = function() {
			var chart = d3.select('#chart')
				.attr('width', my.width())
				.attr('height', my.height());

			var area;
			var y;
			
			y = d3.scale.linear().domain([dataYMin, dataYMax]).range([my.height(), 0]);
			area = d3.svg.area()
				.x(function(d, i) {
					return i*my.width()/config.data.length;
				})
				.y0(my.height())
				.y1(function(d) {
					return y(d);
				});

			d3.select('#areaChartPath').remove();

			chart.append('path')
				.datum(config.data)
				.attr('class', 'area')
				.attr('id', 'areaChartPath')
				.attr('d', area);
		};
		
		return my;
	};
}]);
