angular.module("seriesApp")
    .controller("PrincipalCtrl", function ($scope, $http, vista, $routeParams) {
        $scope.itemsByPage=5;
        $scope.params = $routeParams;
        if ($scope.params.option == "demografia"){ $scope.tmpl = "onecolumn.html"}
        $http.get("http://174.138.52.191:3000/getquery?option=demografia").then(
            function (resp) {
                console.log(resp.data);
                // vista.setvista(resp.data);
                // $scope.campos = vista.getvista();
                // console.log($scope.campos);
            }
        );

        $scope.myData = [
    {
        "firstName": "Cox",
        "lastName": "Carney",
        "company": "Enormo",
        "employed": true
    },
    {
        "firstName": "Lorraine",
        "lastName": "Wise",
        "company": "Comveyer",
        "employed": false
    },
    {
        "firstName": "Nancy",
        "lastName": "Waters",
        "company": "Fuelton",
        "employed": false
    }];

    vista.setvista($scope.myData);
    $scope.campos = vista.getvista();
    })