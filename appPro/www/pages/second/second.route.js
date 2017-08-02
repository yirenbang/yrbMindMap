angular.module('starter').config(function($stateProvider) {
	
$stateProvider
  .state('tab.second', {
    url: "/second",
    views:{
      "tab-second": {
        templateUrl: 'pages/second/second.html',
        controller: 'secondCtrl'
      }
    }
  });
//add router
})