/**
* Libros.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	id: { //Añadir override para no permitir ingresar id al crear -> posible con una policy
  		type: 'integer',
  		autoIncrement: true,
  		primaryKey: true,
  		unique: true
  	},
  	codigo: {
  		model: 'obras'
  	},
  	grupo: {
  		model: 'grupos'
  	},
  	stock: { //Añadir override para no permitir ingresar stock al crear -> posible con una policy
  		type: 'integer',
  		defaultsTo: 0
  	}
  }
};

