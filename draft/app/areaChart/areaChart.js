var data = [4, 8, 15, 16, 8, 42, 40, 2, 10, 17, 4, 8, 15, 16, 8, 42, 40, 2, 10, 17, 4, 8, 15, 16, 8, 42, 40, 2, 10, 17, 4, 8, 15, 16, 8, 42, 40, 2, 10, 17, 4, 8, 15, 16, 8, 42, 40, 2, 10, 17, 4, 8, 15, 16, 8, 42, 40, 2, 10, 17, 4, 8, 15, 16, 8, 42, 40, 2, 10, 17, 4, 8, 15, 16, 8, 42, 40, 2, 10, 17, 4, 8, 15, 16, 8, 42, 40, 2, 10, 17, 4, 8, 15, 16, 8, 42, 40, 2, 10, 17, 4, 8, 15, 16, 8, 42, 40, 2, 10, 17, 4, 8, 15, 16, 8, 42, 40, 2, 10, 17, 4, 8, 15, 16, 8, 42, 40, 2, 10, 17];

angular.module('cs519Assign3.areaChart', [

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

.controller('AreaChartCtrl', function($scope) {
	function areaChart(config) {
		var width = 700;
		var height = 200;

		function my() {
			var chart = d3.select('#chart')
			.attr('width', width)
			.attr('height', height);

			var area;

			var dataYMax = Math.max.apply(null, data);
			var dataYMin = Math.min.apply(null, data);

			if (dataYMin > 0) {
				dataYMin = 0;
			}

			var y = d3.scale.linear().domain([dataYMin, dataYMax]).range([height, 0]);

			area = d3.svg.area()
			.x(function(d, i) {
				return i*width/data.length;
			})
			.y0(height)
			.y1(function(d, i) {
				return y(d);
			});

			chart.append('path')
			.datum(config.data)
			.attr('class', 'area')
			.attr('d', area);
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

		return my;
	}

	function initD3() {
		var config = {
			data: data
		};

		var myAreaChart = areaChart(config);
		myAreaChart.height(100);
		myAreaChart();
	}
})

.controller('SliderCtrl', function($scope) {
	$scope.height = 200;
	$scope.width = 800;
});
