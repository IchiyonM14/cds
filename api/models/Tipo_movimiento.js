/**
* Tipo_movimiento.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
      id: { //Añadir override para no permitir ingresar id al crear -> posible con una policy ✔✔
        type: 'integer',
        autoIncrement: true,
        primaryKey: true,
        unique: true
      },
      nombre: {
        type: 'string',
        unique: true,
        required: true
      },
      valor:{
        type: 'integer',
        defaultsTo: 0
      },
      // Add a reference to Movimiento
      movimientos: {
          collection: 'movimiento',
          via: 'tipo_mov'
      }
  }
};

