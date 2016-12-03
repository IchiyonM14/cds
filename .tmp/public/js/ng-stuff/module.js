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

codesa.directive('noSpecialChar', function() {
return {
  require: 'ngModel',
  restrict: 'A',
  link: function(scope, element, attrs, modelCtrl) {
    modelCtrl.$parsers.push(function(inputValue) {
      if (inputValue == null)
        return ''
      cleanInputValue = inputValue.replace(/[^\w\s]/gi, '');
      if (cleanInputValue != inputValue) {
        modelCtrl.$setViewValue(cleanInputValue);
        modelCtrl.$render();
      }
      return cleanInputValue;
    });
  }
} });