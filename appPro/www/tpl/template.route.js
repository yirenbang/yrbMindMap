angular.module('starter').config(function($stateProvider) {
	
$stateProvider
  .state('tab.tpl', {
    url: "/tpl",
    views:{
      "tab-tpl": {
        templateUrl: 'pages/tpl/tpl.html',
        controller: 'tplCtrl'
      }
    }
  });
//add router
})