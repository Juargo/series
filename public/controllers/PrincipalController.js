angular.module("seriesApp")
    .controller("PrincipalCtrl", function ($scope, $http, vista, $routeParams,$timeout) {
        $scope.itemsByPage=5;
        $scope.params = $routeParams;
        if ($scope.params.option == "demografia"||$scope.params.option=="genero"){ $scope.tmpl = "onecolumn.html"}
        if ($scope.params.option == "autores"){ $scope.tmpl = "creador.html"}
        // $timeout(function () {
        $http.get("http://174.138.52.191:3000/getquery?option="+$scope.params.option).then(
            function (resp) {
                vista.setvista(resp.data);
                $scope.campos = vista.getvista();
            }
        );
        // }, 1000);

        // // $scope.campos=[
        // //      {nombre:"Kodomo"},
        // //      {nombre:"Shonen"},
        // //      {nombre:"Seinen"},
        // //      {nombre:"Josei"},
        // //      {nombre:"Cyberpunk"},
        // // ]

    })