/**
* Vendedor.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	id_vendedor: {
  		type: "integer",
  		required: true,
  		unique: true,
  		primaryKey: true
  	},
  	distribuidor: {
  		model: "distribuidor",
  		required: true
  	},
  	nombre: {
  		type: "string",
  		required: true
  	},
  	cargo: {
  		type: "string",
  		enum: ['Vendedor', 'Supervisor', 'Promotor', 'Distribuidor']
  	},
  	codigo: {
  		type: "integer",
  		// defaultsTo: 0
      /* esto deberia unico y no requerido */
  	}
  }
};

