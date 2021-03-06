angular.module('cs519Assign3.util', [

])

.factory('reusableChart', function reusableChartFactory() {
	return function(my) {
		var width = 700;
		var height = 200;


		my.width = function(value) {
			if (!value) {
				return width;
			}
			width = value;
			return my;
		};

		my.height = function(value) {
			if (!value) {
				return height;
			}
			height = value;
			return my;
		};
	};
})

.factory('randomArray', function randomArrayFactory() {
	return function(length) {
		var result = [];
		for (var i=0; i<length; i++) {
			result.push(Math.random());
		}
		return result;
	};
})

.factory('randomNDimArray', function randomNDimArray() {
	return function(length, N) {
		var result = [];
		for (var i=0; i<length; i++) {
			result.push([]);
			for (var j=0; j<N; j++) {
				result[i].push(Math.random());
			}
		}
		return result;
	};
})

.directive('sliderWithLabel', function() {
	return {
		template: '{{sliderId.name}} <input type="range" min="{{sliderId.minValue}}" max="{{sliderId.maxValue}}" value="{{sliderId.value}}" ng-model="sliderId.value"/> is {{sliderId.value}} px.',
		restrict: 'E',
		scope : {
			sliderId: '='
		}
	};
})

.factory('sliderInitHelper', function() {
	return function sliderInitHelper($scope, sliders) {
		for (var key in sliders) {
			$scope[key] = sliders[key];
		}
	};
});