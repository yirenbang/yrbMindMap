angular.module('starter')
.controller( 'newCtrl',['$scope','$state','$stateParams','dataBase','$ionicPopup','$ionicActionSheet','$timeout',function($scope,$state,$stateParams,dataBase,$ionicPopup,$ionicActionSheet,$timeout,$event){
    $scope.noteId=$stateParams.noteId;      
    //获取本地存储的笔记
    $scope.paNotes = dataBase.getData();
    $scope.pbNotes = $scope.paNotes[$scope.noteId].children;
 

    // 上拉菜单
    $scope.show = function() {
        var hideSheet = $ionicActionSheet.show({
            buttons: [
                { text: '主页',className:"button icon-left ion-home" },
                { text: '思维导图',className:"button icon-left ion-merge btnsi" },
                { text: '打印',className:"button icon-left ion-ios-printer" },
                { text: '分享',className:"button icon-left ion-share" }
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

    
    // 圆形定位函数
    $scope.degOrigin = 0;

    $scope.oRoBox=document.getElementById('rotatebox');
    $scope.oCirleLine=$scope.oRoBox.getElementsByTagName('div')[0];
    $scope.oTitleBtn=$scope.oCirleLine.getElementsByTagName('button')[0];
    $scope.r=120;
    $scope.cX=0;
    $scope.cY=0;

 
    //让子元素环形分布
    $scope.pub=function(){
        deg();
    }
    
    function deg(){
        if($scope.pbNotes.length>12){
            $scope.oCirleLine.style.top='75%';
            $scope.oCirleLine.style.left='100%';
            $scope.r=270;
            $scope.oCirleLine.style.width=$scope.r*2+'px';
            $scope.oCirleLine.style.height=$scope.r*2+'px';
            $scope.oCirleLine.style.marginLeft=-$scope.r+'px';
            $scope.oCirleLine.style.marginTop=-$scope.r+'px';
            $scope.oTitleBtn.style.marginLeft='-70px';
            
        }

        $scope.cX=$scope.oCirleLine.offsetLeft+$scope.r;
        $scope.cY=$scope.oCirleLine.offsetTop+$scope.r;

        for(var i=0;i<$scope.pbNotes.length;i++){
            if(i%2==0){
                $scope.pbNotes[i].class='btnbli';
            }else{
                $scope.pbNotes[i].title='+';
                $scope.pbNotes[i].click="modal.show(" + i +")";
                $scope.pbNotes[i].class='addli';
            }
          
            $scope.pbNotes[i].left=$scope.cX+ Math.sin(2*Math.PI/ 360*(360/$scope.pbNotes.length*i+$scope.degOrigin)) *$scope.r+'px';

            $scope.pbNotes[i].top=$scope.cY+ Math.cos(2*Math.PI/ 360*(360/$scope.pbNotes.length*i+$scope.degOrigin)) *$scope.r+'px';
        }        
    }

    deg();
     
    // 按钮切换函数
    
    // 按钮切换布尔值
    $scope.ifClick = false;

    $scope.myVar = false;
    $scope.toggle = function($event) {
    	$scope.ifClick = !$scope.ifClick;
        $scope.myVar = !$scope.myVar;
        $event.stopPropagation(); //阻止事件冒泡
        
    };
    //点击窗口其他区域时右上角按钮切换
    $scope.addboxhid=function(){
    	if($scope.myVar){
    		$scope.ifClick = !$scope.ifClick;
    	}
    	$scope.myVar=false;
    }

    
    //为运动函数添加全局变量
    var oX=0;
    var oY=0;
    var disX=0;
    var disY=0;
    var tarDeg=0;
    var timer=null;
    var jz=0;
    //定时器内的运动函数
    function tmove(){
        var speed=(tarDeg-$scope.degOrigin)/10;
        if(Math.round($scope.degOrigin)==Math.round(tarDeg) || Math.abs(speed)<2){
            clearInterval(timer);
        }else{
            $scope.degOrigin+=speed;    
        }
        $scope.pub();
        $scope.$apply();
    }
    //touchmove函数
    function mMove(event){
        if(jz==0){
           event.preventDefault(); 
        }
        var touchMove=event.changedTouches[0];
        var dX=touchMove.clientX-oX;
        var dY=touchMove.clientY-oY;
        if(oX<$scope.cX &&Math.abs(dX)<Math.abs(dY)){
            $scope.degOrigin+=dY * 2 /Math.abs(dY);
            
            
        }else if(oX>$scope.cX &&Math.abs(dX)<Math.abs(dY)){
            $scope.degOrigin-=dY * 2 /Math.abs(dY);
            
        }else if(oY<$scope.cY &&Math.abs(dX)>Math.abs(dY)){
            $scope.degOrigin-=dX * 2 /Math.abs(dX);
            
        }else if(oY>$scope.cY &&Math.abs(dX)>Math.abs(dY)){
            $scope.degOrigin+=dX * 2 /Math.abs(dX);
            
        }
        $scope.pub();
        $scope.$apply();
    }
    //拖动旋转
    var startTime=0;
    $scope.oRoBox.addEventListener("touchstart",function(event){
        if(jz==0){
           event.preventDefault(); 
        }
        clearInterval(timer);
        var touch=event.targetTouches[0];
        startTime=event.timeStamp;
        oX=touch.clientX;
        oY=touch.clientY;

        $scope.oRoBox.addEventListener("touchmove",mMove);

    })
    //拖动结束时判断是否继续运动
    $scope.oRoBox.addEventListener("touchend",function(event){
        clearInterval(timer);
        var touchEnd=event.changedTouches[0];
        var touchTime=event.timeStamp;
        disX=touchEnd.clientX-oX;
        disY=touchEnd.clientY-oY;
        if(touchTime-startTime<800){
           if(oX<$scope.cX &&Math.abs(disX)<Math.abs(disY)){
                tarDeg=$scope.degOrigin+disY;
                timer=setInterval(tmove,30);
                
            }else if(oX>$scope.cX &&Math.abs(disX)<Math.abs(disY)){
                tarDeg=$scope.degOrigin-disY;
                timer=setInterval(tmove,30);
            }else if(oY<$scope.cY &&Math.abs(disX)>Math.abs(disY)){
                tarDeg=$scope.degOrigin-disX;
                timer=setInterval(tmove,30);
            }else if(oY>$scope.cY &&Math.abs(disX)>Math.abs(disY)){
                tarDeg=$scope.degOrigin+disX;
                timer=setInterval(tmove,30);
            } 
        }

    })


    //给按钮添加点击事件
    $scope.addClick=function(cla,index){
        if(cla=="addli"){
            $state.go('addnote',{'btnId':index,'noteId':$scope.noteId});
            
        }
    }

    //长按删除或复制

    var oDelBtn=document.getElementById('delBtn');
    var oCopyBtn=document.getElementById('copyBtn');
    var delbX=oDelBtn.offsetLeft;
    var delbY=oDelBtn.offsetTop;
    var copybX=oCopyBtn.offsetLeft;
    var copybY=oCopyBtn.offsetTop;

    $scope.holdedVar=false;
    // $scope.holdToggle=function(){
    //     $scope.holdedVar=!$scope.holdedVar;
    // }
    $scope.bL='';
    $scope.bT='';
    $scope.holdBtnId=0;
    

    $scope.onHold = function (cas,bgcol,tit,bl,bt,id,e){
        //isDelOpen=true;
        $scope.bL=bl;
        $scope.bT=bt;
        $scope.holdBtnId=id;
        if(cas=='btnbli'){
            $scope.holdedVar=true;
            $scope.oRoBox.removeEventListener("touchmove",mMove);
            var oBtnHolded=document.getElementById('btnHolded');
            oBtnHolded.style.backgroundColor = bgcol;
            oBtnHolded.style.transform = 'scale(0.6,0.6)';
            oBtnHolded.style['-webkit-transform']='scale(0.6,0.6)';
            
            oBtnHolded.innerHTML = tit;
            var touchHold=e.gesture.touches[0];
            var tX=touchHold.clientX;
            var tY=touchHold.clientY;
            oBtnHolded.style.top=tY+'px';
            oBtnHolded.style.left=tX+'px';
            function btnHoldMove(event){

                var btnMove=event.changedTouches[0];
                var btnX=btnMove.clientX;
                var btnY=btnMove.clientY;
                oBtnHolded.style.top=btnY+'px';
                oBtnHolded.style.left=btnX+'px';
                if(Math.abs(oBtnHolded.offsetTop-delbY)<25 && Math.abs(oBtnHolded.offsetLeft-delbX)<25){
                    
                    oBtnHolded.style.transform='scale(0.3,0.3)';
                    oBtnHolded.style['-webkit-transform']='scale(0.3,0.3)'; 
                    
                    oBtnHolded.style.top = delbY + 21 +'px';
                    oBtnHolded.style.left = delbX + 21 +'px';

                }else if(Math.abs(oBtnHolded.offsetTop-copybY)<25 && Math.abs(oBtnHolded.offsetLeft-copybX)<25){
                    oBtnHolded.style.top= copybY + 21 +'px';
                    oBtnHolded.style.left= copybX + 21 +'px';
                }else{
                    
                    oBtnHolded.style.transform='scale(0.6,0.6)';
                    oBtnHolded.style['-webkit-transform']='scale(0.6,0.6)';
                }
                

            }
            document.addEventListener('touchmove',btnHoldMove);

            document.addEventListener('touchend',function(evevt){ 
                if(isDelOpen) return;
                if(Math.abs(oBtnHolded.offsetTop-delbY)<25 && Math.abs(oBtnHolded.offsetLeft-delbX)<25 ){
                    
                    oBtnHolded.style.transform='scale(0.3,0.3)';
                    oBtnHolded.style['-webkit-transform']='scale(0.3,0.3)';
                    
                    oBtnHolded.style.top = delbY + 21 +'px';
                    oBtnHolded.style.left = delbX + 21 +'px';
                                        
                    $scope.delConfirm();

                }else if(Math.abs(oBtnHolded.offsetTop-copybY)<25 && Math.abs(oBtnHolded.offsetLeft-copybX)<25){
                    oBtnHolded.style.top= copybY + 21 +'px';
                    oBtnHolded.style.left= copybX + 21 +'px';
                }else{
                    
                    oBtnHolded.style.transform='scale(0.6,0.6)';
                    oBtnHolded.style['-webkit-transform']='scale(0.6,0.6)';
                    oBtnHolded.style.top=$scope.bT;
                    oBtnHolded.style.left=$scope.bL;
                    $scope.holdedVar=false;
                    $scope.$apply();
                }      
                    
            })
        }
        
    }
    var isDelOpen=false;

    $scope.delConfirm=function(){
        console.log(11111)
        isDelOpen=true;
        $scope.delPopup=$ionicPopup.show({
            scope: $scope,
            cssClass:'team-popup',
            buttons:[
                {
                    text:'删除',
                    className:"button button-clear BtnMenu btnClose"     
                }
            ]
        }).then(function(res){
            $timeout(function() {
                isDelOpen=false;
            }, 200);

            
            $scope.holdedVar=false;
            $scope.pbNotes.splice($scope.holdBtnId,2);
            
            dataBase.setData(0,$scope.paNotes);
            $scope.pub();

        })
        // $setTimeout(function() {
        //     scope.delPopup.close();
        // }, 3000);
        

    }


        
}])