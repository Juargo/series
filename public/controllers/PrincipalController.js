angular.module("seriesApp")
    .controller("PrincipalCtrl", function ($scope, $http, vista, $routeParams) {
        $scope.itemsByPage=5;
        $scope.params = $routeParams;
        if ($scope.params.option == "demografia"){ $scope.tmpl = "onecolumn.html"}
        // $http.get("http://174.138.52.191:3000/getquery?option=demografia").then(
        //     function (resp) {
        //         vista.setvista(resp.data);
        //         $scope.campos = vista.getvista();
        //         console.log($scope.campos);
        //     }
        // );

        $scope.campos=[
             {nombre:"Kodomo"},
             {nombre:"Shonen"},
             {nombre:"Seinen"},
             {nombre:"Josei"},
             {nombre:"Cyberpunk"},
        ]
    })