angular.module("seriesApp")
.directive("vistaSelected", function ($http){
    return{
        restrict: 'E',
        templateUrl: 'templates/vista.html',
        controller: function($scope,$http){

            $scope.optionselect = function(option){
                $scope.optionselected = option;
            }
        }
    }
})