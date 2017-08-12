angular.module('starter')
.factory('dataBase', ['$window', function($window) {
  var dataBase = {
    getData: function() {
        var str = localStorage.getItem('app-data');
        if(!str){
            return [
                {
                    'title':'',
                    'createTime':'',
                    'lastTime':'',
                    'color':'#f95959',
                    'children':[
                        {'title':'','click':'','class':'','top':'','left':'','bgcolor':'#f95959','children':[]},
                        {'title':'','click':'','class':'','top':'','left':''}
                    ]
                }
                
            ]
        }
        var notes = JSON.parse(str);
        return notes;
    },
    getRow: function(id) {
        return getData()[id];
    },
    get: function(id, key) {
        return getRow(id)[key];
    },
    setData: function(id, data) {
         var notes = JSON.stringify(data);   
         localStorage.setItem('app-data', notes);
    }

  }
  return dataBase;
  
}])