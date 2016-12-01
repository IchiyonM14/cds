/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)

  /*
    1 ->  Consignacion
    2 ->  Devolucion
    3 ->  Venta
    4 ->  Compra
    5 ->  DevolucionProveedor
  */
  Tipo_movimiento.findOrCreate([
      {id: 1},
      {id: 2},
      {id: 3},
      {id: 4},
      {id: 5},
    ],[
      {id: 1, nombre: "Consignacion", valor: -1},
      {id: 2, nombre: "Devolucion", valor: 1},
      {id: 3, nombre: "Venta", valor: 0},
      {id: 4, nombre: "Compra", valor: 1},
      {id: 5, nombre: "DevolucionProveedor", valor: -1},
    ], function(){
      sails.log.info("Tipos movimientos Seed Done");
    }
  );
  cb();
};
