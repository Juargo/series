angular.module("seriesApp")
.factory("vista",function(){
    vista=[];
    return{
        getvista: function(){
            return vista;
        },
        setvista: function(a){
            vista=a;
        }
    }
})