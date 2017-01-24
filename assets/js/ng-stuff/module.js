var codesa = angular.module("codesa", ['ngRoute', 'ngAnimate']);
codesa.config(function ($routeProvider, $locationProvider) {
	$routeProvider
	// route for the home page
		.when('/', {
			templateUrl: '/templates/index.html'
			// controller: 'mainController'
		})
		.when('/Obras', {
			templateUrl: '/templates/obras.html',
			controller: 'LibrosController'
		})
		.when('/Libros', {
			templateUrl: '/templates/libros.html',
			controller: 'LibrosController'
		})
		.when('/Grupos', {
			templateUrl: '/templates/grupos.html',
			controller: 'LibrosController'
		})
		.when('/Distribuidores', {
			templateUrl: '/templates/distribs.html',
			controller: 'DistribController'
		})
		.when('/Vendedores', {
			templateUrl: '/templates/vends.html',
			controller: 'DistribController'
		})
        .when('/Proveedores', {
			templateUrl: '/templates/proveedor.html',
			controller: 'ProveedorController'
		})
		.when('/Movimientos', {
			templateUrl: '/templates/movimientos.html',
			controller: 'MovimientosController'
		})
		;
        
        $locationProvider.html5Mode(true);
});
codesa.run([function(){

	// Fixed Edit/Create Box Esc Capture (for closing)
	$(document).on('keydown', function(ev){
		if (ev.keyCode == 27) {
			$(".on-corner-form:visible").find("button.btn-danger").click();
		}
	});

}]);