angular.module('cs519Assign3.scatterPlotMatrix', [
	'ui.router',
	'cs519Assign3.util'
])

.config(function($stateProvider) {
	$stateProvider.state('scatterPlotMatrix', {
		url: '/scatterPlotMatrix',
		views: {
			'main': {
				controller: 'ScatterPlotMatrixCtrl',
				templateUrl: 'scatterPlotMatrix/scatterPlotMatrix.html'
			}
		}
	});
})

.controller('ScatterPlotMatrixCtrl', 
	['$scope', 'randomNDimArray', 'sliderInitHelper', 
		function($scope, randomNDimArray, sliderInitHelper) {
			var MAX_DATA_DIMENSION = 3;
			var NUM_CIRCLES = 30;
			var data = randomNDimArray(MAX_DATA_DIMENSION, NUM_CIRCLES);
			var color = d3.scale.category10();
			var i;

			sliderInitHelper($scope, {
				widthSlider: {
					name: 'Width Slider',
					minValue: 0,
					maxValue: 1000,
					value: 800
				},
				heightSlider: {
					name: 'Height Slider',
					minValue: 0,
					maxValue: 1000,
					value: 800
				},
				dataDimension: {
					name: 'Data Dimension',
					minValue: 1,
					maxValue: MAX_DATA_DIMENSION,
					value: 3
				}
			});
			
			$scope.circles = [];
			for (i=0; i<NUM_CIRCLES; i++) {
				$scope.circles.push({
					id: i
				});
			}

			$scope.translates = [];
			for (i=0; i<MAX_DATA_DIMENSION*MAX_DATA_DIMENSION; i++) {
				$scope.translates.push({
					i: Math.floor(i/MAX_DATA_DIMENSION),
					j: i%MAX_DATA_DIMENSION
				});
			}

			$scope.computeTranslate = function(i, j) {
				var transformString = 'translate(';
				transformString = transformString.concat(j*$scope.widthSlider.value/MAX_DATA_DIMENSION, 
					', ', i*$scope.heightSlider.value/MAX_DATA_DIMENSION, ')');
				return transformString;	
			};

			$scope.computePositionX = function(i, j, id) {
				if (i >= MAX_DATA_DIMENSION) {
					throw 'i out of bound';
				}
				if (id >= NUM_CIRCLES) {
					throw 'id out of bound';
				}
				return data[i][id]*$scope.widthSlider.value/MAX_DATA_DIMENSION;
			};

			$scope.computePositionY = function(i, j, id) {
				return data[j][id]*$scope.heightSlider.value/MAX_DATA_DIMENSION;
			};

			$scope.computeStyle = function(i, j) {
				return {
					fill: color(j),
					stroke: 'black'
				};
			};
		}
	]
);
