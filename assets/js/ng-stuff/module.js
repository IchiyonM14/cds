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
	// $locationProvider.html5Mode(true);
// 	// route for the about page
// 		.when('/about', {
// 			templateUrl: 'pages/about.html',
// 			controller: 'aboutController'
// 		})
// 
// 	// route for the contact page
// 		.when('/contact', {
// 			templateUrl: 'pages/contact.html',
// 			controller: 'contactController'
// 		});
});
codesa.directive('tooltip', function() {
   return function(scope, elem) {
	   setTimeout(function() {
		   elem.tooltip();
	   }, 500);
   }
})