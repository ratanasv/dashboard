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
			$scope.perlins = [{
				x: 0,
				y: 0,
				slope: 45.5
			},
			{
				x: 1,
				y: 0,
				slope: -90.7
			}
			];

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

			function generateData(octave) {
				return function() {
					var noiseFunc = noise($scope.perlins, octave);
					var result = [];
					for (var t=0; t<100; t++) {
						result.push(noiseFunc(t*$scope.perlins.length/100));
					}
					return result;
				};
			}

			for (var i=1; i<=NUM_MAX_LINES; i++) {
				lines.push({
					data: generateData(i),
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

	function cn0(t) {
		return 1.0-3.0*Math.pow(t,2)+2.0*Math.pow(t,3);
	}

	function cn1(t) {
		return 1.0-cn0(t);
	}

	return function(seeds, octave) {
		var baseNoise = function(t) {
			var i0 = Math.floor(t)%seeds.length;
			var i1 = (i0+1)%seeds.length;
			var tp = t%seeds.length-seeds[i0].x;

			return cn0(tp)*seeds[i0].y + cn1(tp)*seeds[i1].y + 
				cg0(tp)*seeds[i0].slope + cg1(tp)*seeds[i1].slope;
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
