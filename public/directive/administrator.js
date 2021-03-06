angular.module("seriesApp")
    .directive("vistaSelected", function ($http, vista) {
        return {
            restrict: 'E',
            templateUrl: 'templates/vista.html',
            controller: function ($scope, $http) {

                $scope.optionselect = function (option) {
                    $scope.optionselected = option;
                    if (option == "demografia" || option == "genero" ) { $scope.th = "<th>Nombre</th>" }
                    if (option == "autor") { $scope.th = "<th>Nombre</th><th>Apellido</th>" }

                    $http.get("http://174.138.52.191:3000/getquery?option=" + option).then(
                        function (resp) {
                            vista.setvista(resp.data);
                            $scope.campos = vista.getvista();
                        }
                    );
                }
            }
        }
    })