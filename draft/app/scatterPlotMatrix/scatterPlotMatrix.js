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

		var N = config.data[0].length;

		for (var i=0; i<N*N; i++) {
			var column = i%N;
			var row = Math.floor(i/N);
			shifts.push([column/N*config.width, row/N*config.height]);
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
					return 'translate(' + d[0] + ', ' + d[1]+ ')';
				});

			var row = 0;
			var column = 0;

			var rows = chart.selectAll('g')
				.selectAll('circle')
				.data(config.data)
				.enter()
				.append('circle')
				.attr('r', 3)
				.attr('cx', function(d, i, j) {
					var column = j%N;
					var row = Math.floor(j/N);
					return d[column]*config.width/N;
				})
				.attr('cy', function(d, i, j) {
					var column = j%N;
					var row = Math.floor(j/N);
					return d[row]*config.height/N;
				})
				.style('fill', 'steelblue')
				.style('stroke', 'black')
				
				.attr('i', function(d, i, j) {
					return i;
				})
				.attr('j', function(d, i, j) {
					return j;
				})
				.attr('d', function(d, i, j) {
					return d;
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
