angular.module("seriesApp")
.factory("vista",function(){
    vista=[];
    insertid=[];
    return{
        getvista: function(){
            return vista;
        },
        setvista: function(a){
            vista=a;
        },
        getinsertid: function(){
            return insertid;
        },
        setinsertid: function(a){
            insertid=a;
        }
    }
})