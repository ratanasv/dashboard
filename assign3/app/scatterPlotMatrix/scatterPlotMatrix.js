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
	});
})

.controller('ScatterPlotMatrixCtrl', ['$scope', 'randomNDimArray', 'scatterPlotMatrix', function($scope, randomNDimArray, scatterPlotMatrix) {
	var config;
	var myScatterPlotMatrix;

	$scope.heightSlider = {
		name: 'Height Slider',
		value: '600'
	};
	$scope.widthSlider = {
		name: 'Width Slider',
		value: '800'
	};

	config = {
		data: randomNDimArray(100, 6),
		width: $scope.widthSlider.value,
		height: $scope.heightSlider.value
	};

	
	myScatterPlotMatrix = scatterPlotMatrix(config);
	myScatterPlotMatrix.render();
}])

.factory('scatterPlotMatrix', ['reusableChart', function(reusableChart) {
	return function(config) {
		var shifts = [];

		var my = {};

		var N = config.data[0].length;

		var color = d3.scale.category10();

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
				.attr('transform', function(d) {
					return 'translate(' + d[0] + ', ' + d[1]+ ')';
				});

			

			chart.selectAll('g')
				.selectAll('circle')
				.data(config.data)
				.enter()
				.append('circle')
				.attr('r', 3)
				.attr('cx', function(d, i, j) {
					var column = j%N;
					return d[column]*config.width/N;
				})
				.attr('cy', function(d, i, j) {
					var row = Math.floor(j/N);
					return d[row]*config.height/N;
				})
				.style('fill', function(d, i, j) {
					return color(j);
				})
				.style('stroke', 'black')
				
				.attr('i', function(d, i) {
					return i;
				})
				.attr('j', function(d, i, j) {
					return j;
				})
				.attr('d', function(d) {
					return d;
				});
				
			
		};	
		return my;
	};
}]);
