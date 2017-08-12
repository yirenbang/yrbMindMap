angular.module('starter')
.controller('addnoteCtrl', ['$scope','$stateParams','dataBase', '$state', function($scope,$stateParams, dataBase, $state) {
	//获取本地存储的笔记
    $scope.paNotes = dataBase.getData();
    $scope.pbNotes = $scope.paNotes[0].children;

    $scope.newNote={};
    $scope.newNote.title='';
    $scope.isNew = $stateParams.btnId;
    
    

    $scope.createNote = function(u) { 
        
        $scope.pbNotes.splice($scope.isNew + 1,0,{ 'title': u.title,'click':'','class':'','top':'','left':'','bgcolor':$scope.setedColor});
        $scope.pbNotes.splice($scope.isNew + 2,0,{ 'title':'','click':'','class':'','top':'','left':''});
        dataBase.setData(0,$scope.paNotes);
        $state.go('new',{isCache:false});
    };
}])