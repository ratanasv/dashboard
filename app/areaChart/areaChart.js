angular.module('cs519Assign3.areaChart', [
	'ui.router',
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

.controller('AreaChartCtrl', ['$scope', 'areaChart', 'randomArray', 'sliderInitHelper', function($scope, areaChart, randomArray, sliderInitHelper) {
	var data = randomArray(100);
	var areaPathWithData = areaChart.bind(undefined, data);

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
		}
	});

	$scope.areaPath = areaPathWithData;
}])

.factory('areaChart', function() {
	return function(data, width, height) {
		var dataYMax;
		var dataYMin;
		var area;
		var y;

		dataYMax = Math.max.apply(null, data);
		dataYMin = Math.min.apply(null, data);

		if (dataYMin > 0) {
			dataYMin = 0;
		}
		
		
		y = d3.scale.linear().domain([dataYMin, dataYMax]).range([height, 0]);
		area = d3.svg.area()
			.x(function(d, i) {
				return i*width/data.length;
			})
			.y0(height)
			.y1(function(d) {
				return y(d);
			});
		
		return area(data);
	};
});
