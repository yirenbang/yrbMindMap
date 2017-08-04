angular.module('starter').config(function($stateProvider) {
	
$stateProvider
  .state('tpl', {
    url: "/tpl",
    templateUrl: 'pages/tpl/tpl.html',
    controller: 'tplCtrl'
  });
//add router
})