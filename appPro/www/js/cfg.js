angular.module('starter')
.factory('cfg', ['$window', function($window) {
  var cfg = {
    test: '11111'
  }
  return cfg
}])