angular.module('cs519Assign3.scatterPlotMatrix', [
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
	})
})

.controller('ScatterPlotMatrixCtrl', ['$scope', 'randomNDimArray', 'scatterPlotMatrix', function($scope, randomNDimArray, scatterPlotMatrix) {
	var config;
	var myScatterPlotMatrix;

	$scope.heightSlider = {
		name: 'Height Slider',
		value: '600'
	}
	$scope.widthSlider = {
		name: 'Width Slider',
		value: '800'
	}

	config = {
		data: randomNDimArray(20, 4),
		width: $scope.widthSlider.value,
		height: $scope.heightSlider.value
	};

	
	myScatterPlotMatrix = scatterPlotMatrix(config);
	myScatterPlotMatrix.render()
}])

.factory('scatterPlotMatrix', ['reusableChart', 'scatterPlot', function(reusableChart, scatterPlot) {
	return function(config) {
		var dataYMax;
		var dataYMin;

		var shifts = [];

		var my = {};

		var N = Object.keys(config.data[0]).length;

		for (var i=0; i<N; i++) {
			for (var j=0; j<N; j++) {
				shifts.push({
					x: j/N*config.width,
					y: (N-i-1)/N*config.height
				});
			}
		}
		reusableChart(my);

		if (config.width) {
			my.width(config.width);
		}
		if (config.height) {
			my.height(config.height);
		}


		my.render = function() {
			var chart = d3.select('#chart')
				.attr('width', my.width())
				.attr('height', my.height());

			chart.selectAll('g')
				.data(shifts)
				.enter()
				.append('g')
				.attr('transform', function(d, i) {
					return 'translate(' + d.x + ', ' + d.y + ')';
				});
		};	
		return my;
	}
}])

.factory('scatterPlot', function() {
	return function(config) {
		var selection = config.selection;
		selection.selectAll('circle')
			.data(config.data)
			.enter()
			.append('circle')
			.attr('r', 2)
			.attr('cx', function(d) {
				return d['0']*config.width;
			})
			.attr('cy', function(d) {
				return (1.0-d['1'])*config.height;
			});
	}
});
