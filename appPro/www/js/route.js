angular.module('starter').config(function($stateProvider) {
	
$stateProvider
  .state('tab.new', {
    url: "/new",
    views:{
      "tab-new": {
        templateUrl: 'pages/new/new.html',
        controller: 'newCtrl'
      }
    }
  });
//add router
})