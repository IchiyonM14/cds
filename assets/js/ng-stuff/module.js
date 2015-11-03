var codesa = angular.module("codesa", ['ngRoute']);
codesa.config(function ($routeProvider, $locationProvider) {
	$routeProvider
	// route for the home page
		.when('/', {
			templateUrl: 'templates/index.html'
			// controller: 'mainController'
		})
		.when('/Obras', {
			templateUrl: 'templates/obras.html',
			controller: 'LibrosController'
		})
		.when('/Libros', {
			templateUrl: 'templates/libros.html',
			controller: 'LibrosController'
		})
		.when('/Grupos', {
			templateUrl: 'templates/grupos.html',
			controller: 'LibrosController'
		})
		.when('/Distribuidores', {
			templateUrl: 'templates/distribs.html',
			controller: 'DistribController'
		})
		.when('/Vendedores', {
			templateUrl: 'templates/vends.html',
			controller: 'DistribController'
		})
});