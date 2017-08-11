angular.module('starter')
.controller('choseColorCtrl', ['$scope', function($scope) {
	
	$scope.colers=['#f95959','#a1afc9','#425066','#5c9291','#478384','#888e7e','#47585c','#494a41','#6b6f59','#6c848d','#5b7e91','#a69abd','#956f29','#9d896c','#393e4f','#203744','#9e9478','#594255','#a25768','#8f8667','#918754','#84b9cb','#98623c','#698aab','#c8c2be','#83ccd2','#b3ada0','#8c8861','#c53d43','#e95464','#95483f','#0094c8','#c5c56a','#783c1d','#765c47','#6f514c','#9e3d3f','#9ba88d','#769164','#808080','#88ada6','#a78e44','#725e82','#549688','#424c50','#7c4b00','#a88462','#425066','#21a675']

        $scope.oColorRow=document.getElementsByClassName('colorbox-raw')[0];

        $scope.aColorCol=document.getElementsByClassName('color-btn');

        $scope.setedColor='';
        $scope.setColor=function(bco){
            this.coval=bco;
            for(var i=0;i<$scope.aColorCol.length;i++){
                $scope.aColorCol[i].style.borderColor='white';
            }

            this.coval=bco;
            $scope.showColor=bco;
        }
        $scope.outputColor=function(setCol){
            $scope.setedColor=setCol;
            $scope.colorBoxModal.hide();
        }
}])