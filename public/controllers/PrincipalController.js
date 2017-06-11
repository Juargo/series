angular.module("seriesApp")
    .controller("PrincipalCtrl", function ($scope, $http, vista, $routeParams, $timeout) {
        $scope.itemsByPage = 5;
        $scope.params = $routeParams;
        $scope.option = $scope.params.option;
        if ($scope.params.option == "demografia" || $scope.params.option == "genero" || $scope.params.option == "emisora") { $scope.tmpl = "onecolumn.html" }
        if ($scope.params.option == "autores") { $scope.tmpl = "creador.html" }
        if ($scope.params.option == "serie") { $scope.tmpl = "serie.html" }
        // $timeout(function () {
        $http.get("http://174.138.52.191:3000/getquery?option=" + $scope.params.option).then(
            function (resp) {
                vista.setvista(resp.data);
                $scope.campos = vista.getvista();
            }
        );
    })
    .controller("addCtrl", function ($scope, $routeParams, $http, vista,$window) {
        $scope.params = $routeParams;
        $scope.option = $scope.params.option;

        if ($scope.params.option == "demografia") { $scope.tmpl = "addDemografia.html"; $scope.table = "demografia" }
        if ($scope.params.option == "genero") { $scope.tmpl = "addGenero.html"; $scope.table = "genero" }
        if ($scope.params.option == "autores") { $scope.tmpl = "addCreador.html"; $scope.table = "creador" }
        if ($scope.params.option == "emisora") { $scope.tmpl = "addEmisora.html"; $scope.table = "emisora" }
        if ($scope.params.option == "serie") {
            $scope.tmpl = "addSerie.html";
            $scope.table = "serie";
            $http.get("http://174.138.52.191:3000/getquery?option=autores").then(
                function (resp) {
                    vista.setvista(resp.data);
                    $scope.autores = vista.getvista();
                }
            );
            $http.get("http://174.138.52.191:3000/getquery?option=demografia").then(
                function (resp) {
                    vista.setvista(resp.data);
                    $scope.demografia = vista.getvista();
                }
            );
            $http.get("http://174.138.52.191:3000/getquery?option=genero").then(
                function (resp) {
                    vista.setvista(resp.data);
                    $scope.genero = vista.getvista();
                }
            );
            $http.get("http://174.138.52.191:3000/getquery?option=emisora").then(
                function (resp) {
                    vista.setvista(resp.data);
                    $scope.emisora = vista.getvista();
                }
            );
        }


        $scope.save = function (nombre, apellido,json) {
            if ($scope.option == "demografia" || $scope.option == "genero" || $scope.option == "emisora") {
                sql = "insert into " + $scope.table + "(nombre) values ('" + nombre + "')";
            }
            if ($scope.option == "autores") {
                sql = "insert into " + $scope.table + "(nombre, apellido) values ('" + nombre + "','" + apellido + "')";
            }
            console.log(foo);
            // dato={}
            // dato.sql = sql;
            // $http.post("http://174.138.52.191:3000/insert",dato).then(
            //     function(resp,err){
            //         vista.setinsertid(resp);
            //         $scope.insertid = vista.getinsertid();
            //     }
            // );
            $window.location.href = '/';
        }
    })