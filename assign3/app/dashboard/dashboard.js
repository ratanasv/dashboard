angular.module('cs519Assign3.dashboard', [
	'templates-app',
	'cs519Assign3.util',
	'ui.router'
])

.config(function($stateProvider) {
	$stateProvider.state('dashboard', {
		url: '/dashboard',
		views: {
			'main': {
				controller: 'DashboardCtrl',
				templateUrl: 'dashboard/dashboard.html'
			}
		}
	});
})

.controller('DashboardCtrl', 
	['$scope', 'sliderInitHelper', 'calculateMetrics',
		function($scope, sliderInitHelper, calculateMetrics) {
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
					maxValue: 2000,
					value: 600
				},
				sizeSlider: {
					name: 'Size Slider',
					minValue: 0,
					maxValue: 100,
					value: 50
				}
			});

			$scope.getMetrics = calculateMetrics;

			$scope.getBigStyle = function() {
				return {
					position: 'relative',
					width: $scope.widthSlider.value,
					height: $scope.heightSlider.value
				};
			};
		}
	]
)

.factory('mockData', function() {
	return {
		name: 'root',
		children: [
			{
				name: 'pdx',
				children: [
					{
						name: 'apache0',
						children: [
							{
								name: 'cpu',
								value: 0.2
							},
							{
								name: 'memory',
								value: 1.0
							},
							{
								name: 'incoming',
								value: 0.7
							}
						]
					},
					{
						name: 'apache1',
						children: [
							{
								name: 'cpu',
								value: 0.8
							},
							{
								name: 'memory',
								value: 0.2
							}
						]
					}
				]
			},
			{
				name: 'jfk',
				children: [
					{
						name: 'apache0',
						children: [
							{
								name: 'cpu',
								value: 0.8
							},
							{
								name: 'memory',
								value: 0.3
							}
						]
					},
					{
						name: 'apache1',
						children: [
							{
								name: 'cpu',
								value: 0.4
							},
							{
								name: 'memory',
								value: 0.1
							}
						]
					}
				]
			}
		]
	};
})

.factory('getFullyQualifiedName', function() {
	return function getFullyQualifiedNameRecursive(node) {
		if (!node.parent) {
			return node.name;
		}
		return getFullyQualifiedNameRecursive(node.parent) + '.' + node.name;
	};
})

.factory('calculateMetrics', ['mockData', 'getFullyQualifiedName', function(mockData, getFullyQualifiedName) {
	return function(width, height) {
		var treemap = d3.layout.treemap()
			.size([width, height])
			.sticky(true)
			.value(function() { return 1.0; });
		var metrics = treemap.nodes(mockData);
		var metric;
		var color = d3.scale.category20c();

		for (var i=0; i<metrics.length; i++) {
			metric = metrics[i];
			metric.style = {
				left: metric.x + 'px',
				top: metric.y + 'px',
				width: metric.dx + 'px',
				height: metric.dy + 'px',
				position: 'absolute',
				background: color(metric.name),
				border: 'solid ' + (40*Math.pow(0.6, metric.depth)) + 'px white',
				font: '10px sans-serif',
				'text-align': 'center',
				'vertical-align': 'middle',
				'line-height': metric.dy + 'px'
			};
			metric.fullyQualifiedName = getFullyQualifiedName(metric);
		}
		return metrics;
	};
}]);