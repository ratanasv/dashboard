angular.module('cs519Assign3.dashboard', [
	'templates-app',
	'cs519Assign3.util',
	'ui.router',
	'cs519Assign3.cubeboard'
])

.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.when('/dashboard', '/dashboard/cubeboard');
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
				paddingSlider: {
					name: 'Padding',
					minValue: 0,
					maxValue: 20,
					value: 2
				}
			});

			$scope.getMetrics = calculateMetrics;

			$scope.getBigStyle = function() {
				return {
					position: 'relative',
					width: $scope.widthSlider.value + 'px',
					height: $scope.heightSlider.value + 'px'
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
				name: 'west',
				children: [
					{
						name: 'apache0',
						children: [
							{
								name: 'cpu',
								metricValue: 0.2
							},
							{
								name: 'memory',
								metricValue: 1.0
							},
							{
								name: 'incoming',
								metricValue: 0.7
							}
						]
					},
					{
						name: 'apache1',
						children: [
							{
								name: 'cpu',
								metricValue: 0.8
							},
							{
								name: 'memory',
								metricValue: 0.2
							}
						]
					},
					{
						name: 'nodejs0',
						children: [
							{
								name: 'cpu',
								metricValue: 0.6
							},
							{
								name: 'memory',
								metricValue: 0.4
							},
							{
								name: 'util',
								metricValue: 0.9
							}
						]
					},
					{
						name: 'nodejs1',
						children: [
							{
								name: 'cpu',
								metricValue: 0.6
							},
							{
								name: 'memory',
								metricValue: 0.4
							},
							{
								name: 'util',
								metricValue: 0.9
							}
						]
					},
					{
						name: 'nodejs2',
						children: [
							{
								name: 'cpu',
								metricValue: 0.6
							},
							{
								name: 'memory',
								metricValue: 0.4
							},
							{
								name: 'util',
								metricValue: 0.9
							}
						]
					}
				]
			},
			{
				name: 'east',
				children: [
					{
						name: 'apache0',
						children: [
							{
								name: 'cpu',
								metricValue: 0.8
							},
							{
								name: 'memory',
								metricValue: 0.3
							}
						]
					},
					{
						name: 'apache1',
						children: [
							{
								name: 'cpu',
								metricValue: 0.4
							},
							{
								name: 'memory',
								metricValue: 0.1
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

/*.factory('createD3TreemapRepresentation', function() {
	return function createD3TreemapRepresentation(metricsList) {
		var hierarchy = {
			name: '_root',
			children: []
		};

		var children = hierarchy.children;
		var metric;
		var foundDelimiter;
		var subMetric;
		var restOfMetric;

		for (var i=0; i<metricsList.length; i++) {
			metric = metricsList[i];
			foundDelimiter = metric.indexOf('_');
			subMetric = metric.substring(0, foundDelimiter + 1);
			restOfMetric = metric.substring(foundDelimiter + 2);
			console.log(metric + ', ' + subMetric + ', ' + restOfMetric);
		}
	};
})*/

.factory('calculateMetrics', function(mockData, getFullyQualifiedName) {
	return function(width, height, padding) {
		padding = parseInt(padding);
		var TEXT_SIZE = 10;
		var treemap = d3.layout.treemap()
			.size([width, height])
			.sticky(true)
			.value(function() { return 1.0; })
			.padding([TEXT_SIZE*2.0, padding, padding, padding]);
		var metrics = treemap.nodes(mockData);
		var metric;
		var color = d3.scale.ordinal()
			.domain([0.0, 0.7, 1.0])
			.range(['#009900', '#FFFF33', '#CC0000']);
		var backgroundColor = d3.scale.linear()
			.domain([0, 3])
			.range(['black', 'grey']);
		

		for (var i=0; i<metrics.length; i++) {
			metric = metrics[i];
			if (metric.depth === 3) {
				metric.color = color(metric.metricValue);
				metric.opacity = 1.0;
			} else {
				metric.color = backgroundColor(metric.depth);
				metric.opacity = 1.0;
			}		
			metric.textX = 4.0;
			metric.textY = TEXT_SIZE*1.3;
			metric.fullyQualifiedName = getFullyQualifiedName(metric);
		}
		return metrics;
	};
});
