var codesa = angular.module("codesa", ['ngRoute']);
codesa.config(function ($routeProvider) {
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