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

.controller('DashboardCtrl', ['$scope', 'sliderInitHelper', function($scope, sliderInitHelper) {
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

	$scope.servers = [];
	for (var i=0; i<10; i++) {
		$scope.servers.push({
			id: i
		});
	}

	$scope.serverPositionX = function(id) {
		return id*1.2*$scope.sizeSlider.value;
	};

	$scope.serverPositionY = function() {
		return 10;
	};
}]);