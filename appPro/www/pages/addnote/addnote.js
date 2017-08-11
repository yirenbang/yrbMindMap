angular.module('starter')
.controller('addnoteCtrl', ['$scope', 'cfg', function($scope, cfg) {
alert(cfg.test)
	
    $scope.newNote={};
    $scope.newNote.title='';
    $scope.isNew = 0;
    $scope.createNote = function(u) { 
        console.log(11111);
        $scope.pageBNotes.splice($scope.isNew + 1,0,{ 'title': u.title,'click':'','class':'','top':'','left':'','bgcolor':$scope.setedColor});
        $scope.pageBNotes.splice($scope.isNew + 2,0,{ 'title':'','click':'','class':'','top':'','left':''});
        $scope.modal.hide();
        $scope.pub();
    };
}])