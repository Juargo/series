angular.module("seriesApp")
.factory("vista",function(){
    vista={};
    return{
        getvista: function(){
            return vista;
        },
        setvista: function(a){
            for(s in a){
                console.log(s);
            }
            // vista=a;
        }
    }
})