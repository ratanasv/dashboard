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
	['$scope', 'linePath', 'randomArray', 'sliderInitHelper', 'noise',
		function($scope, linePath, randomArray, sliderInitHelper, noise) {
			var NUM_MAX_LINES = 6;
			var color = d3.scale.category10();
			var lines = [];
			var data;
			var noiseFunc;

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

			for (var i=1; i<=NUM_MAX_LINES; i++) {
				data = [];
				noiseFunc = noise([0.5, 0.7], i);
				for (var t=0; t<100; t++) {
					data.push(noiseFunc(t/50));
				}
				lines.push({
					data: data,
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
})

.factory('noise', function() {
	function cg0(t) {
		return t-2.0*Math.pow(t,2)+Math.pow(t,3);
	}

	function cg1(t) {
		return -1.0*Math.pow(t,2)+Math.pow(t,3);
	}

	return function(seeds, octave) {
		var baseNoise = function(t) {
			var t0 = Math.floor(t)%seeds.length;
			var tp = (t%seeds.length)-t0;
			var t1 = (t0+1)%seeds.length;

			return cg0(tp)*seeds[t0] + cg1(tp)*seeds[t1];
		};

		return function(t) {
			var result = 0.0;
			for (var i=0; i<octave; i++) {
				result += Math.pow(0.5,i)*baseNoise(t*Math.pow(2,i));
			}
			return result;
		}; 
	};

});
