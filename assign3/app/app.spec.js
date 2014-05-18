describe('AppCtrl', function() {

	beforeEach(module('cs519Assign3'));

	it('should pass an injection test', inject(function($controller, $rootScope) {
		var $scope = $rootScope.$new();
		var AppCtrl = $controller('AppCtrl', {$scope: $scope});
		expect(AppCtrl).toBeTruthy();
	}));
});