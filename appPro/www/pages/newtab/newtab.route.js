angular.module('starter').config(function($stateProvider) {
	
$stateProvider
  .state('tab.newtab', {
    url: "/newtab",
    views:{
      "tab-newtab": {
        templateUrl: 'pages/newtab/newtab.html',
        controller: 'newtabCtrl'
      }
    }
  });
//add router
})