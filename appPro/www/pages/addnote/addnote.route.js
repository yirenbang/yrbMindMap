angular.module('starter').config(function($stateProvider) {
	
$stateProvider
  .state('addnote', {
    url: "/addnote",
    templateUrl: 'pages/addnote/addnote.html',
    controller: 'addnoteCtrl',
    params:{'btnId':null,'noteId':null}
  });
//add router
})
