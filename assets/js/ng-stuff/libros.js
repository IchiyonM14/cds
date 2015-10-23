codesa
.filter('grupoRelationer',function () {
	return function(input, groups){
		for (var i = 0; i < groups.length; i++) {
			if (input == groups[i].id){
				return groups[i].tipo;
			}
		}
		return "n/a";
	}
})
.controller("LibrosController", ['$scope', '$http', 'ObrasService', 'GruposService', 
function($scope, $http, ObrasService, GruposService){
	
	$scope.tipos = [];
	$scope.obras = [];
	$scope.newObra = {};
	
	$scope.addingObra = false;
	
	GruposService.getAll(function(err, body,  stat){
		if (err) return false;
		$scope.tipos = body;
		console.log($scope.tipos);
	});
	
	ObrasService.getAll(function(err, body,  stat){
		if (err) return false;
		$scope.obras = body;
		console.log($scope.obras);
	});
	
	$scope.setNewObra = function () {
		$scope.newObra = {};
		$scope.addingObra = true;
	};
	
	$scope.createObra = function () {
		ObrasService.create($scope.newObra, function (err, body, stat) {
			if (!err) $scope.cancelObras(); //si no hay error, limpiar
			//falta agregar feedback de exito y error 
		});
	};
	
	$scope.cancelObras = function () {
		$scope.addingObra = false;
		$scope.editingObra = false;
	};
	
	//Real Time Stuff
	io.socket.on("obras", function (msg) {
		console.log("Socket", msg);
		// Let's see what the server has to say...
//       switch(msg.verb) {
// 
//         case 'created':
//           $scope.obras.push(msg.data); // (add the new order to the DOM)
//           $scope.$apply();              // (re-render)
//           break;
// 
//         default: return; // ignore any unrecognized messages
//       }
	})
	
}]);