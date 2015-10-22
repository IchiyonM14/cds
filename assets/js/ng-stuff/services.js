codesa
.factory('ObrasService',['$http', function($http){
	return {
		getAll: function(callback){
			$http.get("/obras")
			.success(function(body, stat){
				callback(null, body, stat);
			})
			.error(function(err, stat){
				callback(err, null, stat);
			})
		}
	}
}])
.factory('GruposService',['$http', function($http){
	return {
		getAll: function(callback){
			$http.get("/grupos")
			.success(function(body, stat){
				callback(null, body, stat);
			})
			.error(function(err, stat){
				callback(err, null, stat);
			})
		}
	}
}]);