codesa
.controller('MovimientosController', ['$scope', "TiposMovimiento",
function ($scope, TiposMovimiento){

    $scope.movimiento = {};
    $scope.tiposmovimientos = [];
    
    TiposMovimiento.getAll(function(err, tipos){
        if (err)
            return alert("Error al traer los tipos de movimientos");
        $scope.tiposmovimientos = tipos;
    })

}]);