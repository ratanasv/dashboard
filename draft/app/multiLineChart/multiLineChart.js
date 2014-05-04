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

.controller('MultiLineChartCtrl', ['$scope', 'multiLineChart', 'randomArray', function($scope, multiLineChart, randomArray) {
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

	config = {
		data: [randomArray(100), randomArray(100), randomArray(100)],
		width: $scope.widthSlider.value,
		height: $scope.heightSlider.value
	};

	
	myMultiLineChart = multiLineChart(config);
	myMultiLineChart.render()
}])


.factory('multiLineChart', ['reusableChart', function(reusableChart) {
	return function(config) {
		var dataYMax;
		var dataYMin;

		var my = {};
		var color = d3.scale.category10();
		reusableChart(my);

		if (config.width) {
			my.width(config.width);
		}
		if (config.height) {
			my.height(config.height);
		}

		dataYMax = Math.max.apply(null, config.data[0]);
		dataYMin = Math.min.apply(null, config.data[0]);

		if (dataYMin > 0) {
			dataYMin = 0;
		}

		my.render = function() {
			var chart = d3.select('#chart')
				.attr('width', my.width())
				.attr('height', my.height());

			var line;
			var y;
			
			y = d3.scale.linear().domain([dataYMin, dataYMax]).range([my.height(), 0]);
			line = d3.svg.line()
				.interpolate('basis')
				.x(function(d, i) {
					return i*my.width()/config.data[0].length;
				})
				.y(function(d, i) {
					return y(d);
				});

			chart.selectAll('path')
				.data(config.data)
				.enter()
				.append('path')
				.attr('class', 'line')
				.attr('d', line)
				.style('stroke', function(d, i) {
					return color(i);
				})
				.style('fill', 'none');

		};
		
		return my;
	};
}]);
