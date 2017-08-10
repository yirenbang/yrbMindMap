angular.module('starter').config(function($stateProvider,$urlRouterProvider) {
	
$stateProvider
  .state('home', {
    url: "/home",
    templateUrl: 'pages/home/home.html',
    controller: 'homeCtrl'
  });
//add router

$urlRouterProvider.otherwise('/home');

})