codesa
.controller('DistribController',['$scope', 'DistribuidorService',
function name($scope, DistribuidorService) {
	//CONTR. PARA DISTRB Y VEND.
	
	$scope.distribuidores = [];
	$scope.vendedores = [];

	$scope.DistribStuff = function(){ //datos requeridos en vista distrib
		DistribuidorService.getAll(function(err, body, stat){
			if (err) return false;
			$scope.distribuidores = body;
			console.log($scope.distribuidores);
		})
	};
	
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