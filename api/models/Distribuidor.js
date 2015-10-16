/**
* Distribuidor.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	id_distribuidor: {
  		type: "integer",
  		unique: true,
  		required: true,
  		primaryKey: true
  	},
  	nombre: {
  		type: "string",
  		required: true
  	},
  	direccion: {
  		type: "array"
  	},
  	telefono: {
  		type: "array"
  	},
  	email: {
  		type: "array",
  		email: true
  	},
  	vendedores: {
  		collection: 'vendedor',
        via: 'distribuidor'
  	}
  }
};

