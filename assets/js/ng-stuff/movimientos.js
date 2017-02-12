codesa
.controller('MovimientosController', ['$scope', "MovimientosService", "TiposMovimiento", "LibrosService", "DistribuidorService", "ProveedorService", "CiclosService", "RealTime", "Notifications",
function ($scope, Movimientos, TiposMovimiento, Libros, Distribuidor, Proveedor, Ciclo, RealTime, Notifications){

    $scope.movimiento = {};
    $scope.detalle = {};
    $scope.ciclo = undefined;
    $scope.fecha = new Date();
    $scope.tiposmovimientos = [];
    $scope.distribuidores = [];
    $scope.libros = [];
    $scope.onRequest = false;
    
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

    //Subscribe to Movimientos
    RealTime
    .susbscribe("movimiento")
    .on("movimiento", function(ev){
        ev.entity = "Movimientos";
        ev.identifier = "id";
        Notifications.notify(ev);
    });
    //On Angular Contr quit -- unlink Realtime for Movimientos
    $scope.$on("$destroy", function() {
        RealTime.off("movimiento");
    });

    $scope.addMovimiento = function(){
        Movimientos.create(getMovimientoPayload(), function(err, resp, stat){
            if (err)
                return alert("Error al tratar de crear movimiento");
            if (stat === 201) // Creado Exitsamente
                cleanForm();
        });
    };

    function getMovimientoPayload(){
        var tmp = {};
        tmp.ciclo = $scope.ciclo.id_ciclo;
        tmp.tipo_mov = $scope.movimiento.tipo.id;
        tmp.detalle_mov = $scope.movimiento.detalle.map(function(elem){return { libro: elem.libro.id, cantidad: elem.cantidad } });
        if (tmp.tipo_mov === 1 || tmp.tipo_mov === 2 || tmp.tipo_mov === 3){
            // consignacion, devolucion o venta
            var stmp = {
                distribuidor: $scope.movimiento.distribuidor.id_distribuidor,
                vendedor: $scope.movimiento.vendedor.id_vendedor
            };
            tmp.tipo_mov === 1 && (tmp.consignacion = stmp);
            tmp.tipo_mov === 2 && (tmp.devolucion = stmp);
            tmp.tipo_mov === 3 && (tmp.venta = stmp);
        }
        if (tmp.tipo_mov === 4 || tmp.tipo_mov === 5){
            // compra, devolucion_proveedor o venta
            var stmp = {
                proveedor: $scope.movimiento.proveedor.id
            };
            tmp.tipo_mov === 4 && (tmp.compra = stmp);
            tmp.tipo_mov === 5 && (tmp.devolucion_proveedor = stmp);
        }
        tmp.observaciones = $scope.movimiento.observaciones;
        return tmp;
    }

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

    $scope.disableMainForm = function(){
        if (!$scope.movimiento.tipo)
            return true;
        if (!$scope.movimiento.detalle || !$scope.movimiento.detalle.length)
            return true;
        return false;
    };

    function cleanForm(){
        $scope.movimiento = {};
        $("#inputTipoMovimiento").focus();
    }

}]);