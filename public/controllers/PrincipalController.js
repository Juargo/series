angular.module("seriesApp")
    .controller("PrincipalCtrl", function ($scope, $http, vista, $routeParams,$timeout) {
        $scope.itemsByPage=5;
        $scope.params = $routeParams;
        $scope.option = $scope.params.option;
        if ($scope.params.option == "demografia"||$scope.params.option=="genero"|| $scope.params.option=="emisora"){ $scope.tmpl = "onecolumn.html"}
        if ($scope.params.option == "autores"){ $scope.tmpl = "creador.html"}
        if ($scope.params.option == "serie"){ $scope.tmpl = "serie.html"}
        // $timeout(function () {
        $http.get("http://174.138.52.191:3000/getquery?option="+$scope.params.option).then(
            function (resp) {
                vista.setvista(resp.data);
                $scope.campos = vista.getvista();
            }
        );
    })
    .controller("addCtrl",function($scope,$routeParams,$http){
        $scope.params = $routeParams;
        $scope.option = $scope.params.option;
        if ($scope.params.option == "demografia"){ $scope.tmpl = "addDemografia.html"; $scope.table="demografia"}
        if ($scope.params.option == "genero"){ $scope.tmpl = "addGenero.html";$scope.table="genero"}
        if ($scope.params.option == "autores"){ $scope.tmpl = "addCreador.html"; $scope.table="creador"}
        if ($scope.params.option == "emisora"){ $scope.tmpl = "addEmisora.html"; $scope.table="emisora"}
        if ($scope.params.option == "serie"){ 
            $scope.tmpl = "addSerie.html"; 
            $scope.table="serie";
            $http.get("http://174.138.52.191:3000/getquery?option=autores").then(
            function (resp) {
                vista.setvista(resp.data);
                $scope.autores = vista.getvista();
            }
        );
        }


        $scope.save = function(nombre, apellido){
            if($scope.option=="demografia"|| $scope.option=="genero"|| $scope.option=="emisora"){
                sql= "insert into " + $scope.table  +"(nombre) values ('" + nombre + "')";
            }
            if($scope.option=="autores"){
                sql= "insert into " + $scope.table  +"(nombre, apellido) values ('" + nombre + "','"+ apellido + "')";
            }
            $http.post("http://174.138.52.191:3000/insert?sql="+ sql);
            $window.location.href = '/';
        }
    })