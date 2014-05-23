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
	['$scope', 'sliderInitHelper', 'mockData', function($scope, sliderInitHelper, mockData) {
		var metric;
		var color = d3.scale.category20c();
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
				maxValue: 1200,
				value: 300
			},
			sizeSlider: {
				name: 'Size Slider',
				minValue: 0,
				maxValue: 100,
				value: 50
			}
		});

		var treemap = d3.layout.treemap()
    		.size([$scope.widthSlider.value, $scope.heightSlider.value])
   			.sticky(true)
    		.value(function(d) { return d.value; });

    	$scope.metrics = treemap.nodes(mockData);
    	alert($scope.metrics);
    	for (var i=0; i<$scope.metrics.length; i++) {
    		metric = $scope.metrics[i];
    		metric.style = {
    			left: metric.x + 'px',
    			top: metric.y + 'px',
    			width: metric.dx + 'px',
    			height: metric.dy + 'px',
    			position: 'absolute',
    			background: color(metric.name),
    			border: 'solid 2px white'
    		};
    	}

    	$scope.getBigStyle = function() {
    		return {
    			position: 'relative',
    			width: $scope.widthSlider.value,
    			height: $scope.heightSlider.value
    		};
    	};
	}]
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
});