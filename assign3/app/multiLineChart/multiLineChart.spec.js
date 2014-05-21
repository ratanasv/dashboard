describe('MultiLineChartCtrl', function() {
	beforeEach(module('cs519Assign3.multiLineChart'));

	it('should pass a controller instantiation test', inject(function($controller, $rootScope) {
		var $scope = $rootScope.$new();
		var ctrl = $controller('MultiLineChartCtrl', {$scope: $scope});
		expect(ctrl).toBeTruthy();
	}));
});