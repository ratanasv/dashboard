angular.module('cs519Assign3.multiLineChart', [
	'ui.router',
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
	});
})

.controller('MultiLineChartCtrl', 
	['$scope', 'linePath', 'randomArray', 'sliderInitHelper', 
		function($scope, linePath, randomArray, sliderInitHelper) {
			var NUM_MAX_LINES = 10;
			var color = d3.scale.category10();
			var lines = [];

			sliderInitHelper($scope, {
				widthSlider: {
					name: 'Width Slider',
					minValue: 0,
					maxValue: 1200,
					value: 800
				},
				heightSlider: {
					name: 'Height Slider',
					minValue: 0,
					maxValue: 500,
					value: 300
				},
				numLinesSlider: {
					name: 'Number of Lines',
					minValue: 1,
					maxValue: NUM_MAX_LINES,
					value: 3
				}
			});

			for (var i=0; i<NUM_MAX_LINES; i++) {
				lines.push({
					data: randomArray(100),
					style: {
						stroke: color(i),
						fill: 'none'
					},
					id: i
				});
			}

			$scope.linePath = linePath;

			$scope.getNLines = function(n) {
				return lines.slice(0, n);
			};
		}
	]
)


.factory('linePath', function() {
	return function(data, width, height) {
		var dataYMax;
		var dataYMin;
		var y;
		var line;


		dataYMax = Math.max.apply(null, data);
		dataYMin = Math.min.apply(null, data);

		if (dataYMin > 0) {
			dataYMin = 0;
		}

			
		y = d3.scale.linear().domain([dataYMin, dataYMax]).range([height, 0]);
		line = d3.svg.line()
			.interpolate('basis')
			.x(function(d, i) {
				return i*width/data.length;
			})
			.y(function(d) {
				return y(d);
			});
		
		return line(data);
	};
});
