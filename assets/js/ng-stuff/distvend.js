codesa
.controller('DistribController',['$scope', 'DistribuidorService',
function name($scope, DistribuidorService) {
	//CONTR. PARA DISTRB Y VEND.
	
	$scope.distribuidores = [];
	$scope.vendedores = [];
	
	$scope.newDistribuidor = {};
	$scope.editDistribuidor = {};
	
	$scope.filter = {
		distribuidor: '',
	};

	$scope.DistribStuff = function(){ //datos requeridos en vista distrib
		DistribuidorService.getAll(function(err, body, stat){
			if (err) return false;
			$scope.distribuidores = body;
			console.log($scope.distribuidores);
		})
	};
	
	$scope.setNewDistribuidor = function () {
		$scope.newDistribuidor = {
			telefono: [],
			email: [],
			direccion: [],
			tmp: {}
		};
		$scope.addingDistrib = true;
	};
	
	$scope.createDistribuidor = function(){
		delete $scope.newDistribuidor.tmp;
		DistribuidorService.create($scope.newDistribuidor, function (err, body, stat) {
			if (err) return alert(err); //error al crear -> cambiar a otro tipo de feedback
			updateCollection(1, body, $scope.distribuidores);  //feedback de exito falta
			$scope.cancelDistribuidor();
		});
	};
	
	$scope.deleteDistribuidor = function(distrib){
		confirm("¿Esta seguro de querer Borrar el Distribuidor "+distrib.id_distribuidor+" ("+distrib.nombre+")? \n[CAMBIAR ESTO]") &&
		DistribuidorService.delete(distrib.id_distribuidor, function (err, body, stat) {
			if (err) return alert(err); //error al borrar -> cambiar a otro tipo de feedback
			updateCollection(3, body, $scope.distribuidores, "id_distribuidor"); //feedback de exito falta
		})
	};
	
	$scope.cancelDistribuidor = function () {
		$scope.addingDistrib = false;
		$scope.editingDistrib = false;
	};
	
	
	
	$scope.addTel = function(obj){
		if (obj.tmp && obj.tmp.phone){
			obj.telefono.push(obj.tmp.phone);
			obj.tmp.phone = "";
		}
	};
	
	$scope.removeTel = function (tel, obj) {
		var ind = obj.telefono.indexOf(tel);
		if ( ind !== -1 ){
			ind = obj.telefono.splice(ind, 1);
		}
	}
	
	$scope.addEmail = function(obj){
		if (obj.tmp && obj.tmp.mail){
			obj.email.push(obj.tmp.mail);
			obj.tmp.mail = "";
		}
	}
	
	$scope.removeEmail = function (mail, obj) {
		var ind = obj.email.indexOf(mail);
		if ( ind !== -1 ){
			ind = obj.email.splice(ind, 1);
		}
	}
	
	$scope.addDirec = function(obj){
		if (obj.tmp && obj.tmp.direc){
			obj.direccion.push(obj.tmp.direc);
			obj.tmp.direc = "";
		}
	}
	
	$scope.removeDirec = function (address, obj) {
		var ind = obj.direccion.indexOf(address);
		if ( ind !== -1 ){
			ind = obj.direccion.splice(ind, 1);
		}
	}
	
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
	
}])

// <div class="col-xs-12 visible-xs hidder" ng-hide="addingObra || editingObra"></div>
// 	<div class="col-xs-12 fixed-on-xs">
// 		<div class="row">
// 			<div class="col-sm-4 col-xs-8">
// 				<form>
// 					<div class="form-group">
// 						<label for="filterObras" class="sr-only">Filtro</label>
// 						<input ng-model="filter.obras" ng-if="!(addingObra || editingObra)" class="form-control" type="text" name="filterObras" id="filterObras" placeholder="Filtrar por aqui">
// 					</div>
// 				</form>
// 			</div>
// 			<div class="col-sm-6 col-sm-offset-2 col-xs-4 text-right">
// 				<button class="btn btn-primary" ng-click="setNewObra()" ng-if="!(addingObra || editingObra)">Nuevo <span class="glyphicon glyphicon-plus"></span></button>
// 				<button class="btn btn-danger hidden-xs" ng-if="addingObra || editingObra" ng-click="cancelObras()">Cancelar <span class="glyphicon glyphicon-remove"></span></button>
// 			</div>
// 		</div>
// 	</div>
// 	<div class="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4 on-corner-form" ng-show="addingObra"> <!-- template for new Obra-->
// 		<form ng-submit="createObra()">
// 			<legend>Nueva Obra</legend>
// 			<div class="form-group">
// 				<label for="codigoObra">C&oacute;digo de Obra</label>
// 				<input ng-model="newObra.codigo" class="form-control" type="text" name="codigoObra" id="codigoObra" placeholder="C&oacute;digo" ng-required="true">
// 			</div>
// 			<div class="form-group">
// 				<label for="nombreObra">Nombre de la Obra</label>
// 				<input ng-model="newObra.nombre" class="form-control" type="text" name="nombreObra" id="nombreObra" placeholder="Nombre" ng-required="true">
// 			</div>
// 			<div class="form-group text-center">
// 				<button type="submit" class="btn btn-default">Crear Nuevo</button>
// 				<button class="btn btn-danger visible-xs-inline" ng-if="addingObra || editingObra" ng-click="cancelObras()">Cancelar <span class="glyphicon glyphicon-remove"></span></button>
// 			</div>
// 		</form>
// 	</div>  <!--template for new Obra-->
// 	<div class="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4 on-corner-form" ng-show="editingObra"> <!-- template for Edit Obra-->
// 		<form ng-submit="updateObra()">
// 			<legend>Editar Obra</legend>
// 			<div class="form-group">
// 				<label for="editCodigoObra">C&oacute;digo de Obra</label>
// 				<input ng-model="editObra.ncodigo" class="form-control" type="text" name="editCodigoObra" id="editCodigoObra" placeholder="C&oacute;digo ({{editObra.codigo}})" ng-required="true">
// 			</div>
// 			<div class="form-group">
// 				<label for="editNombreObra">Nombre de la Obra</label>
// 				<input ng-model="editObra.nnombre" class="form-control" type="text" name="editNombreObra" id="editNombreObra" placeholder="Nombre ({{editObra.nombre}})" ng-required="true">
// 			</div>
// 			<div class="form-group text-center">
// 				<button type="submit" class="btn btn-default">Editar</button>
// 				<button class="btn btn-danger visible-xs-inline" ng-if="addingObra || editingObra" ng-click="cancelObras()">Cancelar <span class="glyphicon glyphicon-remove"></span></button>
// 			</div>
// 		</form>
// 	</div>  <!--template for Edit Obra-->