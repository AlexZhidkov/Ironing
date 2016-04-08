
describe('app.login', function() {
  beforeEach(function() {
    module('app');
    module('app.login');
  });

  describe('Login', function() {
    var loginCtrl, $scope;
    beforeEach(function() {
      inject(function($controller) {
        $scope = {};
        loginCtrl = $controller('Login', {$scope: $scope});
      });
    });

    it('should define login function', function() {
      expect(typeof $scope.login).toBe('function');
    });

  });
});