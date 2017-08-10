angular.module('starter')
.controller( 'homeCtrl',['$scope','$ionicActionSheet','$timeout' ,function($scope,$ionicActionSheet,$timeout){
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