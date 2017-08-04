angular.module('starter').config(function($stateProvider) {
	
$stateProvider
  .state('new', {
    url: "/new",
    templateUrl: 'pages/new/new.html',
    controller: 'newCtrl'
  });
//add router
})