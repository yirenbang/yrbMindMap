angular.module('starter').config(function($stateProvider) {
	
$stateProvider
  .state('addnote', {
    url: "/addnote/:btnId",
    templateUrl: 'pages/addnote/addnote.html',
    controller: 'addnoteCtrl'
  });
//add router
})