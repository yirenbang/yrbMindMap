angular.module('starter').config(function($stateProvider) {
	
$stateProvider
  .state('index', {
    url: "/index",
    templateUrl: 'pages/index/index.html',
    controller: 'indexCtrl'
  });
//add router
})