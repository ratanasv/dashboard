describe('ScatterPlotMatrixCtrl', function() {
	beforeEach(module('cs519Assign3.scatterPlotMatrix'));

	it('should pass an injection test', inject(function($controller, $rootScope) {
		var $scope = $rootScope.$new();
		var ctrl = $controller('ScatterPlotMatrixCtrl', {$scope: $scope});
		expect(ctrl).toBeTruthy();
	}));
});