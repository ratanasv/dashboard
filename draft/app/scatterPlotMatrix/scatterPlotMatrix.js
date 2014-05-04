angular.module('cs519Assign3.scatterPlotMatrix', [
	'cs519Assign3.util'
])

.config(function($stateProvider) {
	$stateProvider.state('scatterPlotMatrix', {
		url: '/scatterPlotMatrix',
		views: {
			'main': {
				controller: 'ScatterPlotMatrixCtrl',
				templateUrl: 'scatterPlotMatrix/scatterPlotMatrix.html'
			}
		}
	})
})

.controller('ScatterPlotMatrixCtrl', ['$scope', 'randomNDimArray', function($scope, randomNDimArray) {
	console.log(randomNDimArray(5, 3));
}]);
