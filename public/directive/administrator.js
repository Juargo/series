angular.module("seriesApp")
.directive("vistaSelected", function ($http,vista){
    return{
        restrict: 'E',
        templateUrl: 'templates/vista.html',
        controller: function($scope,$http){

            $scope.optionselect = function(option){
                $scope.optionselected = option;
                $http.get("http://localhost:3000/getquery?option="+option).then(
                    function(resp){
                        vista.setvista(resp);
                        $scope.campos = vista.getvista();
                    }
                );
            }
        }
    }
})