describe('DashboardCtrl', function() {
	beforeEach(module('cs519Assign3.dashboard'));

	it('should pass a controller instantiation test', inject(function($controller, $rootScope) {
		var $scope = $rootScope.$new();
		var ctrl = $controller('DashboardCtrl', {$scope: $scope});
		expect(ctrl).toBeTruthy();
	}));
});