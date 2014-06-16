angular.module('cs519Assign3.dashboard', [
	'templates-app',
	'cs519Assign3.util',
	'ui.router',
	'cs519Assign3.cubeboard',
	'ui.bootstrap',
	'ngAnimate'
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

.controller('DashboardCtrl', function($scope, sliderInitHelper, initCalculateMetrics, mockData, attachRealtimeData) {

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
			value: 6
		}
	});

	attachRealtimeData($scope, mockData, '');
	$scope.calculateMetrics = initCalculateMetrics(mockData);
	$scope.selectedMetric = null;

	$scope.getBigStyle = function() {
		return {
			position: 'relative',
			width: $scope.widthSlider.value + 'px',
			height: $scope.heightSlider.value + 'px'
		};
	};

	$scope.onMetricOver = function(metric) {
		if (metric.children) { //node is a non-leaf one.
			return;
		}
		
		metric.isMouseOver = true;
	};

	$scope.onMetricLeave = function(metric) {
		if (metric.children) {
			return;
		}

		metric.isMouseOver = false;
	};

	$scope.onMetricClick = function(metric) {
		if (metric.children) {
			return;
		}

		$scope.selectedMetric = metric;
	};

})

.factory('mockData', function() {
	return {
		name: 'root',
		children: [
			{
				name: 'west_coast',
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
					},
					{
						name: 'nodejs3',
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
						name: 'nodejs4',
						children: [
							{
								name: 'cpu',
								metricValue: 0.2
							},
							{
								name: 'memory',
								metricValue: 0.1
							},
							{
								name: 'util',
								metricValue: 0.2
							},
							{
								name: '200',
								metricValue: 0.2
							},
							{
								name: '300',
								metricValue: 0.8
							}
						]
					},
					{
						name: 'seattle',
						children: [
							{
								name: 'rack0',
								children: [
									{
										name: 'servlet0',
										children: [
											{
												name: 'cpu',
												metricValue: 0.2
											},
											{
												name: 'memory',
												metricValue: 0.5
											}
										]
									},
									{
										name: 'servlet1',
										children: [
											{
												name: 'cpu',
												metricValue: 0.6
											},
											{
												name: 'memory',
												metricValue: 0.5
											}
										]
									}
								]
							},
							{
								name: 'rack1',
								children: [
									{
										name: 'servlet0',
										children: [
											{
												name: 'cpu',
												metricValue: 0.2
											},
											{
												name: 'memory',
												metricValue: 0.5
											}
										]
									}
								]
							}
						]
					}
				]
			},
			{
				name: 'east_coast',
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
					},
					{
						name: 'apache2',
						children: [
							{
								name: 'cpu',
								metricValue: 0.1
							},
							{
								name: 'memory',
								metricValue: 0.1
							}
						]
					},
					{
						name: 'apache3',
						children: [
							{
								name: 'cpu',
								metricValue: 0.1
							},
							{
								name: 'memory',
								metricValue: 0.2
							},
							{
								name: 'network',
								metricValue: 1.0
							},
							{
								name: '500',
								metricValue: 0.1
							}
						]
					},
					{
						name: 'apache4',
						children: [
							{
								name: 'cpu',
								metricValue: 0.4
							},
							{
								name: 'memory',
								metricValue: 0.9
							},
							{
								name: 'network',
								metricValue: 0.1
							},
							{
								name: '400',
								metricValue: 0.8
							},
							{
								name: '500',
								metricValue: 0.1
							}
						]
					},
					{
						name: 'new_york',
						children: [
							{
								name: 'api0',
								children: [
									{
										name: 'cpu',
										metricValue: 0.2
									},
									{
										name: 'memory',
										metricValue: 0.2
									},
									{
										name: 'network',
										metricValue: 0.8
									}
								]
							},
							{
								name: 'api1',
								children: [
									{
										name: 'cpu',
										metricValue: 0.1
									},
									{
										name: 'memory',
										metricValue: 0.1
									},
									{
										name: 'network',
										metricValue: 0.1
									}
								]
							},
							{
								name: 'api2',
								children: [
									{
										name: 'cpu',
										metricValue: 0.1
									},
									{
										name: 'memory',
										metricValue: 0.1
									},
									{
										name: 'network',
										metricValue: 0.1
									}
								]
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

		if (node.parent.name === 'root') {
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
.factory('calculateClass', function() {
	var quantize = d3.scale.quantize()
		.domain([0, 0.6, 1.0, 1.3, 1.6])
		.range(['healthy', 'well', 'sick', 'coma', 'dead']);
	return function calculateClass(value) {
		return quantize(value);
	};
})

.factory('initCalculateMetrics', function(getFullyQualifiedName, calculateClass) {
	return function initCalculateMetrics(data) {
		return function calculateMetrics(width, height, padding) {
			padding = parseInt(padding);
			var TEXT_SIZE = 10;
			var treemap = d3.layout.treemap()
				.size([width, height])
				.sticky(true)
				.value(function() { return 1.0; })
				.padding([TEXT_SIZE*2.0, padding, padding, padding]);
			var metrics = treemap.nodes(data);
			var metric;
			var color = d3.scale.linear()
				.domain([0.0, 0.7, 1.0])
				.range(['green', 'yellow', 'red']);
			var backgroundColor = d3.scale.linear()
				.domain([0, 3])
				.range(['black', 'grey']);
			

			for (var i=0; i<metrics.length; i++) {
				metric = metrics[i];
				if (!metric.children) {
					metric.class = calculateClass(metric.metricValue);
				} else {
					metric.fill = backgroundColor(metric.depth);
				}		
				metric.textX = 4.0;
				metric.textY = TEXT_SIZE*1.3;
				metric.fullyQualifiedName = getFullyQualifiedName(metric);
			}
			return metrics;
		};
	};
})

.factory('attachRealtimeData', function() {
	return function attachRealtimeData($scope, node, prefix) {
		if (node.children) {
			if (node.name === 'root') {
				return node.children.forEach(function(child) {
					attachRealtimeData($scope, child, '');
				});
			} else {
				return node.children.forEach(function(child) {
					attachRealtimeData($scope, child, prefix + node.name + '_');
				});
			}
		}

		var fullyQualifiedName = prefix + node.name;
		var socket = new WebSocket('ws://128.193.36.250:1081/1.0/event/get');
		
		socket.onopen = function() {
			var mostRecentValue;
			setInterval(function() {
				var now = new Date().getTime();
				socket.send(JSON.stringify({
					expression: fullyQualifiedName + '(value)',
					start: now - 1000,
					stop: now
				}));
			}, 2000);
			
			socket.onmessage = function(message) {
				var payload;
				payload = JSON.parse(message.data);
				if (message.data === 'null') { //end of transmission
					node.metricValue = mostRecentValue;
					$scope.$apply();
				} else {
					mostRecentValue = payload.data.value;
				}
			};
		};
	};
});

