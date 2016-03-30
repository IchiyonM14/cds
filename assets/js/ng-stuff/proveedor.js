codesa
.controller("ProveedorController", ['$scope', '$filter', 'ProveedorService', 'RealTime', 'Notifications', 
function ($scope, $filter, ProveedorService, RealTime, Notifications) {
    
    $scope.proveedores = [];
    
    $scope.ProveedorStuff = function () {
        ProveedorService.getAll(function(err, body, stat){
			if (err) return false;
			$scope.proveedores = body;
		});
    };
}])