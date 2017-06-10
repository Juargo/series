angular.module("seriesApp")
    .controller("PrincipalCtrl", function ($scope, $http, vista, $routeParams,$timeout) {
        $scope.itemsByPage=5;
        $scope.params = $routeParams;
        $scope.option = $scope.params.option;
        if ($scope.params.option == "demografia"||$scope.params.option=="genero"){ $scope.tmpl = "onecolumn.html"}
        if ($scope.params.option == "autores"){ $scope.tmpl = "creador.html"}
        // $timeout(function () {
        $http.get("http://174.138.52.191:3000/getquery?option="+$scope.params.option).then(
            function (resp) {
                vista.setvista(resp.data);
                $scope.campos = vista.getvista();
            }
        );
    })
    .controller("addCtrl",function($scope,$routeParams){
        $scope.params = $routeParams;
        $scope.option = $scope.params.option;
        if ($scope.params.option == "demografia"){ $scope.tmpl = "addDemografia.html"}
        if ($scope.params.option == "genero"){ $scope.tmpl = "addGenero.html"}
        if ($scope.params.option == "autores"){ $scope.tmpl = "addCreador.html"}
    })