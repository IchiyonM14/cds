codesa
.filter('grupoRelationer',function () {
	return function(input, groups){
		console.log(input, groups);
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
			
}]);