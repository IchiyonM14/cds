codesa
.service("Notifications", ["$rootScope", function($rootScope){
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
    this.manage = function(entity, evt, arr, propname, propsToCopy, apply){
        //check verb
        switch (evt.verb) {
            case "created":
                arr.push(evt.data);
                apply();
                break;
            case "addedTo":
                io.socket.get("/"+entity+"/"+evt.id, function(data){
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i][propname] === evt.id){
                            arr[i] = data;
                            apply();
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
                        break;
                    }
                }
                apply();
                break;
            case "destroyed":
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i][propname] === evt.id){
                        arr.splice(i,1);
                        break;
                    }
                }
                apply();
                break;
            default:
                break;
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
}]);