angular.module("seriesApp")
    .controller("PrinciapCtrl", function ($scope, $http, vista) {
        $http.get("http://174.138.52.191:3000/getquery?option=demografia").then(
            function (resp) {
                vista.setvista(resp.data);
                $scope.campos = vista.getvista();
            }
        );
    })