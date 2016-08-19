/**
 * Devolucion.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    movimiento:{
        model:'movimiento',
        unique: true
    },
    distribuidor: {
        model: "distribuidor",
        required: true
    },
    vendedor: { //Vendedor autorizado por distribuidora para devolver a bodega
        //Agregar before create para validar que el vendedor tenga permisos de bodega mediante prop. codigo
        model: "vendedor",
        required: true
    }
  }
};

