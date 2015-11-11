codesa
.factory('VendedorService', ['$http', function($http){
	return {
		create: function(vendedor, callback){
			$http.post("/vendedor", vendedor)
			.success(function(body, stat){
				callback(null, body, stat);
			})
			.error(function(err, stat){
				callback(err, null, stat);
			})
		},
		getAll: function(callback){
			$http.get("/vendedor")
			.success(function(body, stat){
				callback(null, body, stat);
			})
			.error(function(err, stat){
				callback(err, null, stat);
			})
		},
		update: function (vendedor, venId, callback) {
			$http.post("/vendedor/"+venId, vendedor)
			.success(function(body, stat){
				callback(null, body, stat);
			})
			.error(function(err, stat){
				callback(err, null, stat);
			})	
		},
		delete: function(vendId, callback){
			$http.delete("/vendedor/"+vendId)
			.success(function(body, stat){
				callback(null, body, stat);
			})
			.error(function(err, stat){
				callback(err, null, stat);
			})
		}
	}
}])
.factory('DistribuidorService', ['$http', function($http){
	return {
		create: function(distribuidor, callback){
			$http.post("/distribuidor", distribuidor)
			.success(function(body, stat){
				callback(null, body, stat);
			})
			.error(function(err, stat){
				callback(err, null, stat);
			})
		},
		getAll: function (callback) {
			$http.get("/distribuidor")
			.success(function(body, stat){
				callback(null, body, stat);
			})
			.error(function(err, stat){
				callback(err, null, stat);
			})
		},
		update: function (distribuidor, distId, callback) {
			$http.post("/distribuidor/"+distId, distribuidor)
			.success(function(body, stat){
				callback(null, body, stat);
			})
			.error(function(err, stat){
				callback(err, null, stat);
			})	
		},
		delete: function(distId, callback){
			$http.delete("/distribuidor/"+distId)
			.success(function(body, stat){
				callback(null, body, stat);
			})
			.error(function(err, stat){
				callback(err, null, stat);
			})
		}
	}
}])
.factory('ObrasService',['$http', function($http){
	return {
		create: function (obra, callback){
			$http.post("/obras", obra)
			.success(function(body, stat){
				callback(null, body, stat);
			})
			.error(function(err, stat){
				callback(err, null, stat);
			})
		},
		getAll: function(callback){
			$http.get("/obras")
			.success(function(body, stat){
				callback(null, body, stat);
			})
			.error(function(err, stat){
				callback(err, null, stat);
			})
		},
		update: function (obra, obraId, callback) {
			$http.post("/obras/"+obraId, obra)
			.success(function(body, stat){
				callback(null, body, stat);
			})
			.error(function(err, stat){
				callback(err, null, stat);
			})	
		},
		delete: function(obraId, callback){
			$http.delete("/obras/"+obraId)
			.success(function(body, stat){
				callback(null, body, stat);
			})
			.error(function(err, stat){
				callback(err, null, stat);
			})
		}
	}
}])
.factory('LibrosService', ['$http', function($http){
	return {
		getAll: function(callback){
			$http.get("/libros")
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
		create: function(grupo, callback){
			$http.post("/grupos",grupo)
			.success(function(body, stat){
				callback(null, body, stat);
			})
			.error(function(err, stat){
				callback(err, null, stat);
			})
		},
		getAll: function(callback){
			$http.get("/grupos")
			.success(function(body, stat){
				callback(null, body, stat);
			})
			.error(function(err, stat){
				callback(err, null, stat);
			})
		},
		update: function (grupo, grupoId, callback) {
			$http.post("/grupos/"+grupoId, grupo)
			.success(function(body, stat){
				callback(null, body, stat);
			})
			.error(function(err, stat){
				callback(err, null, stat);
			})	
		},
		delete: function(grupoId, callback){
			$http.delete("/grupos/"+grupoId)
			.success(function(body, stat){
				callback(null, body, stat);
			})
			.error(function(err, stat){
				callback(err, null, stat);
			})
		}
	}
}]);