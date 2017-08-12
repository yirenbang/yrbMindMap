angular.module('starter')
.controller( 'homeCtrl',['$scope','dataBase','$ionicActionSheet','$timeout' ,function($scope,dataBase,$ionicActionSheet,$timeout){

    //获取本地存储的笔记
    $scope.paNotes = dataBase.getData();

    var date = new Date();
    $scope.ctime = date.getFullYear()+'/'+(date.getMonth() + 1)+'/'+date.getDate();
    $scope.ltime = date.getHours()+':'+date.getMinutes();
    


    $scope.show = function() {
        var hideSheet = $ionicActionSheet.show({
            buttons: [
                { text: '导入',className:"button icon-left ion-code-download" },
                { text: '设置',className:"button icon-left ion-gear-a" }
            ],
            // destructiveText: 'Delete',
            // titleText: 'Modify your album',
            // cancelText: 'Cancel',
            cancel: function() {
                   // add cancel code..
                },
            buttonClicked: function(index) {
            return true;
            }
        });

        // $timeout(function() {
        //     hideSheet();
        // }, 2000);

    };  
    }])