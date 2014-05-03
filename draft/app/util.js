angular.module('cs519Assign3.util', [

])

.factory('reusableChart', function reusableChartFactory() {
	return function(my) {
		var width = 700;
		var height = 200;


		my.width = function(value) {
			if (!value) return width;
			width = value;
			return my;
		}

		my.height = function(value) {
			if (!value) return height;
			height = value;
			return my;
		}
	};
})

.directive('sliderWithLabel', function() {
	return {
		template: '{{sliderId.name}} <input type="range" ng-model="sliderId.value" min="1" max="1000"> is {{sliderId.value}} px.',
		restrict: 'E',
		scope : {
			sliderId: '='
		}
	}
});