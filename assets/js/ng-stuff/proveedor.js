codesa
.controller("ProveedorController", ['$scope', '$filter', 'ProveedorService', 'RealTime', 'Notifications', 
function ($scope, $filter, ProveedorService, RealTime, Notifications) {
    
    $scope.proveedores = [];
    
    $scope.newProveedor = {};
	$scope.editProveedor = {};
	
	$scope.addingProveedor = false;
	$scope.editingProveedor = false;
	$scope.filter = {
        proveedor: ''
    };
	
    
    $scope.ProveedorStuff = function () {
        ProveedorService.getAll(function(err, body, stat){
			if (err) return false;
			$scope.proveedores = body;
		});
    };
    
    $scope.setNewProveedor = function () {
		$scope.newProveedor = {};
		$scope.addingProveedor = true;
	};
	
	$scope.setEditProveedor = function (proveedor) {
		$scope.editingProveedor = true;
		$scope.editProveedor = {
			id: proveedor.id,
			nombre: proveedor.nombre,
			nnombre: ''
		};
	}
    
    $scope.createProveedor = function () {
		ProveedorService.create($scope.newProveedor, function (err, body, stat) {
			if (err)
                return Notifications.notify(false, err);
			// updateCollection(1, body, $scope.obras);  //feedback de exito falta
			$scope.cancelProveedor();
		});
	};
	
	$scope.updateProveedor = function(){
		ProveedorService.update({
			nombre: $scope.editProveedor.nnombre
		}, $scope.editProveedor.id, function (err, body, stat) {
			if (err) 
                return Notifications.notify(false, err);
			// updateCollection(2, body, $scope.obras, "codigo");  //feedback de exito falta
			$scope.cancelProveedor();
		});
	}
	
	$scope.deleteProveedor = function(proveedor){
		confirm("¿Esta seguro de querer Borrar el Proveedor de codigo "+proveedor.id+"? \n[CAMBIAR ESTO]") &&
		ProveedorService.delete(proveedor.id, function (err, body, stat) {
			if (err) 
                return Notifications.notify(false, err);
			// updateCollection(3, body, $scope.obras, "codigo"); //feedback de exito falta
		})
	};
	
	$scope.cancelProveedor = function () {
		$scope.addingProveedor = false;
		$scope.editingProveedor = false;
	};
    
}])