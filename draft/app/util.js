angular.module('cs519Assign3.util', [

])

.service('reusableChart', function() {
	return function(config) {

		var width = 700;
		var height = 200;

		function my() {

		}

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

		if (config.width) {
			my.width(config.width);
		}
		if (config.height) {
			my.height(config.height);
		}

		return my;
	};
});