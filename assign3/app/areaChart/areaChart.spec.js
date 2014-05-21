describe('AreaChartCtrl', function() {
	beforeEach(module('cs519Assign3.areaChart'));

	it('should pass a controller instantiation test', inject(function($controller, $rootScope) {
		var $scope = $rootScope.$new();
		var ctrl = $controller('AreaChartCtrl', {$scope: $scope});
		expect(ctrl).toBeTruthy();
	}));
});