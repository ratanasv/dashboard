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
});