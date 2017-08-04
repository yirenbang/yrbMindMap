angular.module('starter').config(function($stateProvider) {
	
$stateProvider
  .state('tab.secondtab', {
    url: "/secondtab",
    views:{
      "tab-secondtab": {
        templateUrl: 'pages/secondtab/secondtab.html',
        controller: 'secondtabCtrl'
      }
    }
  });
//add router
})