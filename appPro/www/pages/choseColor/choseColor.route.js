angular.module('starter').config(function($stateProvider) {
	
$stateProvider
  .state('choseColor', {
    url: "/choseColor/:noteId",
    templateUrl: 'pages/choseColor/choseColor.html',
    controller: 'choseColorCtrl'
  });
//add router
})