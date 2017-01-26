codesa
.controller('MovimientosController', ['$scope', "TiposMovimiento", "LibrosService", "DistribuidorService", "ProveedorService", "CiclosService",
function ($scope, TiposMovimiento, Libros, Distribuidor, Proveedor, Ciclo){

    $scope.movimiento = {};
    $scope.detalle = {};
    $scope.ciclo = undefined;
    $scope.tiposmovimientos = [];
    $scope.distribuidores = [];
    $scope.libros = [];
    
    $scope.addingDetalle = false;
    $scope.addAnother = true;
    $scope.editingDetalle = false;
    var detalleToEdit = {};

    Ciclo.getActual({ populate: "[]" }, function(err, ciclo, stat){
        if (err){
            if (stat === 404)
                return alert("No hay Ciclo actual activo");
            return alert("Error al traer el ciclo actual");
        }
        $scope.ciclo = ciclo;
    })

    TiposMovimiento.getAll(function(err, tipos){
        if (err)
            return alert("Error al traer los tipos de movimientos");
        $scope.tiposmovimientos = tipos;
    });

    Distribuidor.getAll(function(err, dists){
        if (err)
            return alert("Error al traer los distribuidores");
        $scope.distribuidores = dists;
    });

    Proveedor.getAll(function(err, provs){
        if (err)
            return alert("Error al traer los proveedores");
        $scope.proveedores = provs;
    });

    Libros.getAll(function(err, libros){
        if (err)
            return alert("Error al traer los libros");
        $scope.libros = libros;
    });

    $scope.addDetalle = function(){
        // validar repetidos
        if (!validateCleanDetalle())
            return alert("Libro repetido");
        !$scope.movimiento.detalle && ($scope.movimiento.detalle = []);
        $scope.movimiento.detalle.push($scope.detalle);
        if ($scope.addAnother)
            $scope.startDetalleAdd();
        else
            $scope.cancelDetalleAdd();
    };

    $scope.updateDetalle = function(){
        // validar repetidos
        if (!validateCleanDetalle(true))
            return alert("Libro repetido");
        $scope.movimiento.detalle[$scope.movimiento.detalle.indexOf(detalleToEdit)] = angular.copy($scope.detalle);
        $scope.cancelDetalleEdit();
    };

    function validateCleanDetalle(edit){
        if (edit){
            return !$scope.movimiento.detalle.filter(function(elem){ return elem !== detalleToEdit; })
            .some(function(elem){ return elem.libro.id === $scope.detalle.libro.id;})
        }
        if (!$scope.movimiento.detalle) // no hay ningun detalle
            return true;
        if ($scope.movimiento.detalle.some(function(elem, indx){ return elem.libro.id === $scope.detalle.libro.id;})) // buscar libro repetido
            return false;
        return true;
    }

    $scope.removeDetalle = function(elem){
        $scope.movimiento.detalle.splice($scope.movimiento.detalle.indexOf(elem), 1); 
    };

    $scope.tipoMovChange = function(){
        $scope.movimiento.distribuidor = undefined;
        $scope.movimiento.vendedor = undefined;
    };

    $scope.startDetalleAdd = function(){
        $scope.addingDetalle = true;
        $scope.detalle = {};
        setTimeout(function() {
            $("#dtLibro").focus();
        }, 50);
        
    };

    $scope.cancelDetalleAdd = function(){
        $scope.detalle = {};
        $scope.addingDetalle = false;
    };

    $scope.startDetalleEdit = function(detalle){
        $scope.editingDetalle = true;
        $scope.detalle = angular.copy(detalle);
        detalleToEdit = detalle;
        setTimeout(function() {
            $("#eddtLibro").focus();
        }, 50);
    };

    $scope.cancelDetalleEdit = function(){
        $scope.detalle = {};
        detalleToEdit = undefined;
        $scope.editingDetalle = false;
    };

}]);