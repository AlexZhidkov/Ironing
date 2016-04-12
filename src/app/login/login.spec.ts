
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

    it('should define signInWithProvider function', function() {
      expect(typeof $scope.signInWithProvider).toBe('function');
    });

  });
});