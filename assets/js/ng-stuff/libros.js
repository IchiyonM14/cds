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
.filter('stockcolor',function () {
	return function(input){
		if (input <= 0)
			return "danger";
		if (input <= 10)
			return "warning";
		return "success";
	}
})
.controller("LibrosController", ['$scope', '$http', 'ObrasService', 'GruposService', 'LibrosService', 
function($scope, $http, ObrasService, GruposService, LibrosService){
	
	$scope.tipos = [];
	$scope.obras = [];
	$scope.libros = [];
	
	$scope.newObra = {};
	$scope.editObra = {};
	
	$scope.addingObra = false;
	$scope.editingObra = false;
	$scope.filter = {
		obras: '',
		libros: ''
	};
	
	$scope.ObrasStuff = function(){ //Datos Requeridos por vista Obras
		GruposService.getAll(function(err, body,  stat){
			if (err) return false;
			$scope.tipos = body;
		});
		
		ObrasService.getAll(function(err, body,  stat){
			if (err) return false;
			$scope.obras = body;
		});
	};
	
	$scope.setNewObra = function () {
		$scope.newObra = {};
		$scope.addingObra = true;
	};
	
	$scope.setEditObra = function (obra) {
		$scope.editingObra = true;
		$scope.editObra = {
			codigo: obra.codigo,
			nombre: obra.nombre,
			ncodigo: '',
			nnombre: ''
		};
	}
	
	$scope.createObra = function () {
		ObrasService.create($scope.newObra, function (err, body, stat) {
			if (err) return alert(err); //error al crear -> cambiar a otro tipo de feedback
			updateCollection(1, body, $scope.obras);  //feedback de exito falta
			$scope.cancelObras();
		});
	};
	
	$scope.updateObra = function(){
		ObrasService.update({
			codigo: $scope.editObra.ncodigo,
			nombre: $scope.editObra.nnombre
		}, $scope.editObra.codigo, function (err, body, stat) {
			if (err) return alert(err); //error al actualizar -> cambiar a otro tipo de feedback
			/*********
				CASO : AL ACTUALIZAR Y CAMBIAR EL CODIGO, EL ALGORITMO NO FUNCIONARA
				ARREGLAR ASAP!
			********* */
			updateCollection(2, body, $scope.obras, "codigo");  //feedback de exito falta
			$scope.cancelObras();
		});
	}
	
	$scope.deleteObra = function(obra){
		confirm("¿Esta seguro de querer Borrar la Obra de codigo "+obra.codigo+"? \n[CAMBIAR ESTO]") &&
		ObrasService.delete(obra.codigo, function (err, body, stat) {
			if (err) return alert(err); //error al borrar -> cambiar a otro tipo de feedback
			updateCollection(3, body, $scope.obras, "codigo"); //feedback de exito falta
		})
	};
	
	$scope.cancelObras = function () {
		$scope.addingObra = false;
		$scope.editingObra = false;
	};
	
	function updateCollection(opt, obj, collection, field) {
		//opt - 1-> es agregar 2 -> cambiar 3 -> borrar
		
		if (opt === 1){ //si es agregar
			//push a coll
			collection.push(obj);
		}else{
			// si no -> buscar index en coleccion
			var idx = -1;
			for (var i = 0; i < collection.length; i++) {
				if (obj[field]  == collection[i][field]){
					idx = i;
					break;
				}
			}
			if (idx !== -1){ //indice correcto
				if (opt === 2){ //cambiar
					collection[idx] = obj;
				}else{
					//si no -> es borrar
					collection.splice(idx, 1);	
				}
			}
		}
	}
	
	$scope.librosStuff = function () { //datos requeridos por vista libros
		LibrosService.getAll(function (err, body, stat) {
			if (err) return false;
			$scope.libros = body;
		});
	};
	
}]);