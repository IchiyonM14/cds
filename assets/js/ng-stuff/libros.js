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
.filter('librosFormatter',function () {
	return function(input){
		var tmp = {}; var arr = [];
		for (var i	 = 0; i < input.length; i++) {
			tmp = {
				codigo: input[i].codigo.codigo,
				nombre: input[i].codigo.nombre,
				tipo: input[i].grupo.tipo,
				stock: input[i].stock,
				createdAt: input[i].createdAt,
			};
			arr.push(tmp);
		}
		return arr;
	}
})
.controller("LibrosController", ['$scope', '$filter', 'ObrasService', 'GruposService', 'LibrosService', 'RealTime', 'Notifications',
function($scope, $filter, ObrasService, GruposService, LibrosService, RealTime, Notifications){
    
	$scope.tipos = [];
	$scope.obras = [];
	$scope.libros = [];
	
	$scope.newObra = {};
	$scope.editObra = {};
	$scope.newGrupo = {};
	$scope.editGrupo = {};
    $scope.libroToObra = {};
	
	$scope.addingObra = false;
	$scope.editingObra = false;
	$scope.addingGrupo = false;
	$scope.editingGrupo = false;
	$scope.filter = {
		obras: '',
		libros: {},
		tipos: ''
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
        
        //Subscribe to Obras
        RealTime
        .susbscribe("obras")
        .on("obras", function(ev){
            console.log(ev);
            RealTime.manage("obras", ev, $scope.obras, "codigo", ["createdAt","libros"]);
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
			if (err)
                return Notifications.notify(false, err);
			// updateCollection(1, body, $scope.obras);  //feedback de exito falta
			$scope.cancelObras();
		});
	};
	
	$scope.updateObra = function(){
		ObrasService.update({
			codigo: $scope.editObra.ncodigo,
			nombre: $scope.editObra.nnombre
		}, $scope.editObra.codigo, function (err, body, stat) {
			if (err) 
                return Notifications.notify(false, err);
			// updateCollection(2, body, $scope.obras, "codigo");  //feedback de exito falta
			$scope.cancelObras();
		});
	}
	
	$scope.deleteObra = function(obra){
		confirm("¿Esta seguro de querer Borrar la Obra de codigo "+obra.codigo+"? \n[CAMBIAR ESTO]") &&
		ObrasService.delete(obra.codigo, function (err, body, stat) {
			if (err) 
                return Notifications.notify(false, err);
			// updateCollection(3, body, $scope.obras, "codigo"); //feedback de exito falta
		})
	};
	
	$scope.cancelObras = function () {
		$scope.addingObra = false;
		$scope.editingObra = false;
	};
    
    $scope.setLibroToObra = function(obra){
        $scope.addingLibroToObra = true;
        $scope.libroToObra = {
            codigo: obra.codigo,
            nombre: obra.nombre
        };
    };
    
    $scope.addLibroToObra = function(){
        console.log($scope.libroToObra);
        ObrasService.addLibroToObra($scope.libroToObra.codigo, $scope.libroToObra.grupo, function(err, body, stat){
            if (err) return alert(err); //error al borrar -> cambiar a otro tipo de feedback
            //feedback de exito falta
            $scope.cancelLibroToObra();
        })
    };
    
    $scope.cancelLibroToObra = function(){
        $scope.addingLibroToObra = false;
        $scope.libroToObra = {};
    };
	
	$scope.librosStuff = function () { //datos requeridos por vista libros
		LibrosService.getAll(function (err, body, stat) {
			if (err) return false;
			$scope.libros = $filter("librosFormatter")(body);
		});
	};
	
	$scope.gruposStuff = function (){ //datos requeridos por vista Grupos
		GruposService.getAll(function (err, body, stat) {
			if (err) return false;
			$scope.tipos = body;
		})
	};
	
	$scope.setNewGrupo = function () {
		$scope.newGrupo = {};
		$scope.addingGrupo = true;
	};
	
	$scope.setEditGrupo = function (grupo) {
		$scope.editingGrupo = true;
		$scope.editGrupo = {
			id: grupo.id,
			tipo: grupo.tipo,
			ntipo: ''
		};
	};
	
	$scope.createGrupo = function () {
		GruposService.create($scope.newGrupo, function (err, body, stat) {
			if (err) return alert(err); //error al crear -> cambiar a otro tipo de feedback
			updateCollection(1, body, $scope.tipos);  //feedback de exito falta
			$scope.cancelGrupos();
		});
	};
	
	$scope.updateGrupo = function(){
		GruposService.update({
			tipo: $scope.editGrupo.ntipo
		}, $scope.editGrupo.id, function (err, body, stat) {
			if (err) return alert(err); //error al actualizar -> cambiar a otro tipo de feedback
			/*********
				CASO : AL ACTUALIZAR Y CAMBIAR EL CODIGO, EL ALGORITMO NO FUNCIONARA
				ARREGLAR ASAP!
			********* */
			updateCollection(2, body, $scope.tipos, "id");  //feedback de exito falta
			$scope.cancelGrupos();
		});
	}
	
	$scope.deleteGrupo = function (grupo) {
		confirm("¿Esta seguro de querer Borrar el Grupo "+grupo.tipo+"? \n[CAMBIAR ESTO]") &&
		GruposService.delete(grupo.id, function (err, body, stat) {
			if (err) return alert(err); //error al borrar -> cambiar a otro tipo de feedback
			updateCollection(3, body, $scope.tipos, "id"); //feedback de exito falta
		})
	};
	
	$scope.cancelGrupos = function () {
		$scope.addingGrupo = false;
		$scope.editingGrupo = false;
	};
	
	$scope.preventNullFilterStock = function () {
		if (!$scope.filter.libros.stock){ //null, undefined, etc
			$scope.filter.libros.stock = "";
			console.log($scope.filter.libros.stock);
		}
	}
}]);