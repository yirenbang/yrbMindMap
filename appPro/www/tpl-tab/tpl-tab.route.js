angular.module('starter').config(function($stateProvider) {
	
$stateProvider
  .state('tab.tpl-tab', {
    url: "/tpl-tab",
    views:{
      "tab-tpl-tab": {
        templateUrl: 'pages/tpl-tab/tpl-tab.html',
        controller: 'tpl-tabCtrl'
      }
    }
  });
//add router
})