/// <reference path="../../../typings/angularjs/angular.d.ts" />
codesa
.factory("Sounds", [function(){
    var beep = new Audio("/sounds/tone-beep.wav");
    //cambiar a diferentes sonidos segun estado (Error, exito, etc)
    return {
        beep: beep
    };
}])
.service("Notifications", ["$rootScope", "Sounds", function($rootScope, Sounds){
    var title = "CODESA";
    var Notification = window.Notification || window.mozNotification || window.webkitNotification;
    
    if (!Notification.permission || Notification.permission === "default"){
        Notification.requestPermission(function(status) {  // status is "granted", if accepted by user
            var n = new Notification(title + " - Info", { 
                body: 'Notificaciones Activadas!',
                icon: '/images/info.png',
                vibrate: [200, 200],
                sound: "/sounds/tone-beep.wav"
            });
            n.onclick = function () {
                window.focus();
            };
            setTimeout(function(){
                n.close();
            }, 5000);
        });
    }
    
    this.notify = function(socket, body){
        //Socket -> True for Socket.io, false for $http
        var push;
        if (socket){
            //Socket solo emite casos de exito
            //(Example)SOCKET CREATE ->  Object {verb: "created", data: Object, id: 500}
            //(Example)SOCKET UPDATE ->  Object {verb: "updated", data: Object, id: 301, previous: Object}
            //(Example)SOCKET AGREGATE ->  Object {id: 500, verb: "addedTo", attribute: "libros", addedId: 7}
            //(Example)SOCKET DELETE ->  Object {verb: "destroyed", id: 301, previous: Object}
            push = {
                id: (new Date()).getTime().toString(),
                title: socket.entity,
                type: "success"
            };
            switch (socket.verb) {
                case "created":
                    push.body = "Registro N° "+socket.id+" creado correctamente.";
                    break;
                case "updated":
                    push.body = "Registro N° "+( socket.data[socket.identifier] || socket.id )+(socket.data[socket.identifier] && (socket.previous[socket.identifier] !== socket.data[socket.identifier]) && " -- Antes ("+socket.previous[socket.identifier]+") -- " || "") + " actualizado correctamente.";
                    break;
                case "addedTo":
                    push.body = "Se agregó elemento \""+socket.attribute+"\" ("+socket.addedId+") al registro N° "+socket.id+" correctamente.";
                    break;
                case "destroyed":
                    push.body = "Registro N° "+socket.id+" eliminado correctamente.";
                    break;
                default:
                    break;
            }
            toast(push);
        }else{
            //Always error
             push = {
                id: (new Date()).getTime().toString(),
                title: body.raw.table,
                body: body.raw.detail,
                type: "error"
            };
            toast(push);
        }
    }
    
    function toast (push){
        //Enviar a NotifyController
        Sounds.beep.play();
        $rootScope.$emit("push", push);
        if (document.hasFocus()) // si esta en la tab, no mostrar desktop notification
            return;
        var img = "", subt = "";
        switch (push.type) {
            case "info":
                img = "info.png";
                subt = "Info";
                break;
            case "success":
                img = "success.png";
                subt = "Exito";
                break;
            case "warning":
                img = "warning.png";
                subt = "Advertencia";
                break;
            case "error":
                img = "error.png";
                subt = "Error";
                break;
            default:
                img = "info.png";
                subt = "Info";
                break;
        }
        var n = new Notification(title + " - "+ push.title, { 
            body: push.body || "",
            icon: '/images/'+img,
            vibrate: [200, 200]
            // sound: "/sounds/tone-beep.wav"
        }); 
        n.onclick = function () {
            window.focus();
            n.close();
        };
        setTimeout(function(){
            n.close();
        }, push.time || 5000);
    }
}])
.service("RealTime", [function(){
    var self = this;
    this.susbscribe = function(entity, callback){
        io.socket.get("/"+entity, function(data){
            callback && callback(data);
        })
        return self;
    };
    this.on = function(entity, callback){
        io.socket.on(entity, function(event){
            callback && callback(event);
        })
        return self;
    };
    this.off = function(entity){
        io.socket.off(entity);
    };
    this.manage = function(entity, evt, arr, propname, propsToCopy, callback){
        //check verb
        switch (evt.verb) {
            case "created":
                arr.push(evt.data);
                callback && callback("new",arr[arr.length-1]);
                break;
            case "addedTo":
                io.socket.get("/"+entity+"/"+evt.id, function(data){
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i][propname] === evt.id){
                            arr[i] = data;
                            callback && callback("added", arr[i]);
                            break;
                        }
                    }
                })
                break;
            case "updated":
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i][propname] === evt.id){
                        for (var l = 0; l < propsToCopy.length; l++) {
                            evt.data[propsToCopy[l]] = evt.previous[propsToCopy[l]];
                        }
                        arr[i] = evt.data;
                        callback && callback("update", arr[i]);
                        break;
                    }
                }
                
                break;
            case "destroyed":
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i][propname] === evt.id){
                        var removed = arr.splice(i,1); //remove and store removed one
                        callback && callback("remove", removed);
                        break;
                    }
                }
                
                break;
            default:
                break;
        }
    }
}])
.factory('ProveedorService', ['$http', function ($http) {
    return {
        create: function(proveedor, callback){
			$http.post("/proveedor", proveedor)
			.success(function(body, stat){
				callback(null, body, stat);
			})
			.error(function(err, stat){
				callback(err, null, stat);
			})
		},
        getAll: function (callback) {
            $http.get("/proveedor")
			.success(function(body, stat){
				callback(null, body, stat);
			})
			.error(function(err, stat){
				callback(err, null, stat);
			})
        },
        update: function (proveedor, provId, callback) {
			$http.post("/proveedor/"+provId, proveedor)
			.success(function(body, stat){
				callback(null, body, stat);
			})
			.error(function(err, stat){
				callback(err, null, stat);
			})	
		},
		delete: function(provId, callback){
			$http.delete("/proveedor/"+provId)
			.success(function(body, stat){
				callback(null, body, stat);
			})
			.error(function(err, stat){
				callback(err, null, stat);
			})
		}
    }
}])
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
		},
        addLibroToObra: function(obraId, tipoId, callback){
            $http.post("/libros", {
                codigo: obraId,
                grupo: tipoId
            })
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
}])
.factory("TiposMovimiento", ["$http", function($http){
	return {
		getAll: function(callback){
			$http.get("/tipo_movimiento?populate=[]")
			.success(function(body, stat){
				callback(null, body, stat);
			})
			.error(function(err, stat){
				callback(err, null, stat);
			})
		}
	};
}])
.factory("CiclosService", ["$http", function($http){

	var getMonthName = (function (months){
		return function(monthNum){
			return months[monthNum];
		}
	})(["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"]);

	return {
		get: function(ciclo, data, callback){
			$http.get("/ciclo/" + ciclo, { params: data })
			.success(function(body, stat){
				callback(null, body, stat);
			})
			.error(function(err, stat){
				callback(err, null, stat);
			})
		},
		getActual: function(data, callback){
			var fecha = new Date();
			$http.get("/ciclo/" + getMonthName(fecha.getMonth())+fecha.getFullYear(), { params: data })
			.success(function(body, stat){
				callback(null, body, stat);
			})
			.error(function(err, stat){
				callback(err, null, stat);
			})
		},
		getAll: function(data, callback){
			$http.get("/ciclo", { params: data })
			.success(function(body, stat){
				callback(null, body, stat);
			})
			.error(function(err, stat){
				callback(err, null, stat);
			})
		}
	};
}])
.factory("MovimientosService", ["$http", function($http){
	return {
		create: function(data, callback){
			$http.post("/movimiento",data)
			.success(function(body, stat){
				callback(null, body, stat);
			})
			.error(function(err, stat){
				callback(err, null, stat);
			})
		}
	};
}]);