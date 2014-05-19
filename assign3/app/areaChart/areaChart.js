angular.module('cs519Assign3.areaChart', [
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

.controller('AreaChartCtrl', ['$scope', 'areaChart', 'randomArray', function($scope, areaChart, randomArray) {
	var data = randomArray(100);
	var areaPathWithData = areaChart.bind(undefined, data);

	$scope.heightSlider = {
		name: 'Height Slider',
		value: '200'
	};
	$scope.widthSlider = {
		name: 'Width Slider',
		value: '800'
	};

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
