codesa
	.controller('DistribController', ['$scope', '$filter', 'DistribuidorService', 'VendedorService', 'RealTime', 'Notifications',
		function name($scope, $filter, DistribuidorService, VendedorService, RealTime, Notifications) {
			//CONTR. PARA DISTRB Y VEND.
	
			$scope.distribuidores = [];
			$scope.vendedores = [];

			$scope.newDistribuidor = {};
			$scope.editDistribuidor = {};
			$scope.newVendedor = {};
			$scope.editVendedor = {};

			$scope.filter = {
				distribuidor: '',
				vendedor: ''
			};

			$scope.DistribStuff = function () { //datos requeridos en vista distrib
				DistribuidorService.getAll(function (err, body, stat) {
					if (err) return false;
					$scope.distribuidores = body;
					console.log($scope.distribuidores);
				})
                //Subscribe to Distribuidores
                RealTime
                .susbscribe("distribuidor")
                .on("distribuidor", function(ev){
                    console.log(ev);
                    RealTime.manage("distribuidor", ev, $scope.distribuidores, "id_distribuidor", ["vendedores","createdAt"]);
                    ev.entity = "Distribuidores";
                    ev.identifier = "id_distribuidor";
                    Notifications.notify(ev);
                    $scope.$apply();
                });
                //On Angular Contr quit -- unlink Realtime for Distribuidores
                $scope.$on("$destroy", function() {
                    RealTime.off("distribuidor");
                });
			};
			
			$scope.VendedorStuff = function () { //datos requeridos en vista distrib
				$scope.cargos = ['Vendedor', 'Supervisor', 'Promotor', 'Distribuidor']; //solo disponible para Vendedor
				VendedorService.getAll(function (err, body, stat) {
					if (err) return false;
					$scope.vendedores = body;
					console.log($scope.vendedores);
				})
                DistribuidorService.getAll(function (err, body, stat) {
					if (err) return false;
					$scope.distribuidores = body;
					console.log($scope.distribuidores);
				})
                //Subscribe to Vendedores
                RealTime
                .susbscribe("vendedor")
                .on("vendedor", function(ev){
                    console.log(ev);
                    RealTime.manage("vendedor", ev, $scope.vendedores, "id_vendedor", ["codigo", "distribuidor", "id_vendedor","createdAt"], 
                    function(event, vend){
                        if (event === "new"){
                            vend.distribuidor = $filter('filter')($scope.distribuidores, {id_distribuidor: vend.distribuidor})[0];
                        }
                    });
                    ev.entity = "Vendedores";
                    ev.identifier = "id_vendedor";
                    Notifications.notify(ev);
                    $scope.$apply();
                });
                //On Angular Contr quit -- unlink Realtime for Vendedores
                $scope.$on("$destroy", function() {
                    RealTime.off("vendedor");
                });
			};

			$scope.setNewDistribuidor = function () {
				$scope.newDistribuidor = {
					telefono: [],
					email: [],
					direccion: [],
					tmp: {}
				};
				$scope.addingDistrib = true;
			};

			$scope.setEditDistribuidor = function (distrib) {
				$scope.editingDistrib = true;
				$scope.editDistribuidor = {
					id_distribuidor: distrib.id_distribuidor,
					nombre: distrib.nombre,
					nid_distribuidor: '',
					nnombre: '',
					telefono: distrib.telefono || [],
					email: distrib.email || [],
					direccion: distrib.direccion || [],
					tmp: {}
				};
			};

			$scope.createDistribuidor = function () {
				delete $scope.newDistribuidor.tmp;
				DistribuidorService.create($scope.newDistribuidor, function (err, body, stat) {
					if (err) return Notifications.notify(false, err);
                    // return alert(err); //error al crear -> cambiar a otro tipo de feedback
					// updateCollection(1, body, $scope.distribuidores);  //feedback de exito falta
					$scope.cancelDistribuidor();
				});
			};

			$scope.updateDistribuidor = function () {
				DistribuidorService.update({
					id_distribuidor: $scope.editDistribuidor.nid_distribuidor,
					nombre: $scope.editDistribuidor.nnombre,
					telefono: $scope.editDistribuidor.telefono.length && $scope.editDistribuidor.telefono || null,
					email: $scope.editDistribuidor.email.length && $scope.editDistribuidor.email || null,
					direccion: $scope.editDistribuidor.direccion.length && $scope.editDistribuidor.direccion || null,
				}, $scope.editDistribuidor.id_distribuidor, function (err, body, stat) {
					if (err) return Notifications.notify(false, err);
                    // return alert(err); //error al actualizar -> cambiar a otro tipo de feedback
					/*********
						CASO : AL ACTUALIZAR Y CAMBIAR EL CODIGO, EL ALGORITMO NO FUNCIONARA
						ARREGLAR ASAP!
					********* */
					// updateCollection(2, body, $scope.distribuidores, "id_distribuidor");  //feedback de exito falta
					$scope.cancelDistribuidor();
				});
			};


			$scope.deleteDistribuidor = function (distrib) {
				confirm("¿Esta seguro de querer Borrar el Distribuidor " + distrib.id_distribuidor + " (" + distrib.nombre + ")? \n[CAMBIAR ESTO]") &&
				DistribuidorService.delete(distrib.id_distribuidor, function (err, body, stat) {
					if (err) return Notifications.notify(false, err); 
                    // return alert(err); //error al borrar -> cambiar a otro tipo de feedback
					// updateCollection(3, body, $scope.distribuidores, "id_distribuidor"); //feedback de exito falta
				})
			};

			$scope.cancelDistribuidor = function () {
				$scope.addingDistrib = false;
				$scope.editingDistrib = false;
			};
			
            $scope.showDistDetail = function(distribuidor){
                $scope.detailDistrib = distribuidor;
                $("#vendInDistModal").modal("show");
            }
            
            
			$scope.setNewVendedor = function () {
				$scope.newVendedor = {};
				$scope.addingVendedor = true;
			};
			
			$scope.createVendedor = function () {
				VendedorService.create($scope.newVendedor, function (err, body, stat) {
					if (err) return Notifications.notify(false, err); 
                    // return alert(err); //error al crear -> cambiar a otro tipo de feedback
					// updateCollection(1, body, $scope.vendedores);  //feedback de exito falta
					$scope.cancelVendedor();
				});
			};
			
			$scope.updateVendedor = function(){
				VendedorService.update({
					nombre: $scope.editVendedor.nnombre,
					cargo: $scope.editVendedor.ncargo,
				}, $scope.editVendedor.id_vendedor, function (err, body, stat) {
					if (err) return Notifications.notify(false, err); 
                    // return alert(err); //error al actualizar -> cambiar a otro tipo de feedback
					/*********
						CASO : AL ACTUALIZAR Y CAMBIAR EL CODIGO, EL ALGORITMO NO FUNCIONARA
						ARREGLAR ASAP!
					********* */
					// updateCollection(2, body, $scope.vendedores, "id_vendedor");  //feedback de exito falta
					$scope.cancelVendedor();
				});
			}
			
			$scope.setEditVendedor = function(vendedor){
				$scope.editingVendedor = true;
				$scope.editVendedor = {
					id_vendedor: vendedor.id_vendedor,
					nombre: vendedor.nombre,
					nnombre: '',
					distribuidor: vendedor.distribuidor,
					codigo: vendedor.codigo,
					cargo: vendedor.cargo,
					ncargo: ''
				};
			};
			
			$scope.deleteVendedor = function (vendedor) {
				confirm("¿Esta seguro de querer Borrar el Vendedor " + vendedor.id_vendedor + " (" + vendedor.nombre + ")? \n[CAMBIAR ESTO]") &&
				VendedorService.delete(vendedor.id_vendedor, function (err, body, stat) {
					if (err) return Notifications.notify(false, err); 
                    // return alert(err); //error al borrar -> cambiar a otro tipo de feedback
					// updateCollection(3, body, $scope.vendedores, "id_vendedor"); //feedback de exito falta
				})
			}
			
			$scope.cancelVendedor = function () {
				$scope.addingVendedor = false;
				$scope.editingVendedor = false;
			};


			$scope.addTel = function (obj) {
				if (obj.tmp && obj.tmp.phone && obj.telefono.indexOf(obj.tmp.phone) === -1) {
					obj.telefono.push(obj.tmp.phone);
					obj.tmp.phone = "";
				}
			};

			$scope.removeTel = function (tel, obj) {
				var ind = obj.telefono.indexOf(tel);
				if (ind !== -1) {
					ind = obj.telefono.splice(ind, 1);
				}
			}

			$scope.addEmail = function (obj) {
				if (obj.tmp && obj.tmp.mail && obj.email.indexOf(obj.tmp.mail) === -1) {
					obj.email.push(obj.tmp.mail);
					obj.tmp.mail = "";
				}
			}

			$scope.removeEmail = function (mail, obj) {
				var ind = obj.email.indexOf(mail);
				if (ind !== -1) {
					ind = obj.email.splice(ind, 1);
				}
			}

			$scope.addDirec = function (obj) {
				if (obj.tmp && obj.tmp.direc && obj.direccion.indexOf(obj.tmp.direc) === -1) {
					obj.direccion.push(obj.tmp.direc);
					obj.tmp.direc = "";
				}
			}

			$scope.removeDirec = function (address, obj) {
				var ind = obj.direccion.indexOf(address);
				if (ind !== -1) {
					ind = obj.direccion.splice(ind, 1);
				}
			}

			function updateCollection(opt, obj, collection, field) {
				//opt - 1-> es agregar 2 -> cambiar 3 -> borrar
		
				if (opt === 1) { //si es agregar
					//push a coll
					collection.push(obj);
				} else {
					// si no -> buscar index en coleccion
					var idx = -1;
					for (var i = 0; i < collection.length; i++) {
						if (obj[field] == collection[i][field]) {
							idx = i;
							break;
						}
					}
					if (idx !== -1) { //indice correcto
						if (opt === 2) { //cambiar
							collection[idx] = obj;
						} else {
							//si no -> es borrar
							collection.splice(idx, 1);
						}
					}
				}
			}

			$(document).on('keypress', '[data-triger-on-focus]', function (ev) {

				if (ev.which === 13) { //if enter key 13
					ev.preventDefault();
					//get the data args
					var args = $(this).data("triger-on-focus");
					args = args.split("->");

					// var tmpId = Math.random();
					// $(this).data("fid", tmpId);

					// var cmd = "$(\"[data-fid='" + tmpId + "']\")";
					var cmd = "$(this)";
					var fargsTmp = "";

					for (var i = 0; i < args.length; i++) {
						if (args[i].indexOf(":") !== -1)//has parameters
							args[i] = args[i].split(":"); //search func arguments
					}
					for (var i = 0; i < args.length; i++) {
						if (args[i] instanceof Array) { //func with params
							for (var j = 1; j < args[i].length; j++) { //start at 1 cause 0 is func
								fargsTmp += args[i][j] + ",";
							}
							fargsTmp = "'" + fargsTmp.substring(0, fargsTmp.length - 1) + "'"; //remove last ,
							cmd += "." + args[i][0] + "(" + fargsTmp + ")";
						} else { //regular params
							//cmd + funcname()
							cmd += "." + args[i] + "()";
						}
					}
					// console.log(fargsTmp);
					cmd += ".click()";
					// console.log(args);
					// console.log(cmd);
					var theElement = eval(cmd);
					// console.log(theElement);
				}
			})
		}])