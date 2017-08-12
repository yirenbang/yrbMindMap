angular.module('starter').config(function($stateProvider) {
	
$stateProvider
  .state('new', {
    url: "/new/:noteId",
    templateUrl: 'pages/new/new.html',
    controller: 'newCtrl',
    cache:false,
    params:{
        isCache:true
    }
  });
//add router
})