angular.module('starter').config(function($stateProvider) {
	
$stateProvider
  .state('tab.first', {
    url: "/first",
    views:{
      "tab-first": {
        templateUrl: '/pages/first/first.html',
        controller: 'firstCtrl'
      }
    }
  });
//add router
})