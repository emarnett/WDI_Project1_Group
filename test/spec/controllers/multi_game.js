'use strict';

describe('Controller: MultiGameCtrl', function () {

  // load the controller's module
  beforeEach(module('TickeyApp'));

  var MultiGameCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MultiGameCtrl = $controller('MultiGameCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
