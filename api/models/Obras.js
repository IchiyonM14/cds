/**
* Obras.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	codigo:{
  		type: 'integer',
  		primaryKey: true,
  		unique: true,
    	required: true
  	},
  	nombre:{
  		type: 'string',
    	required: true
  	},
    libros: {
      collection: 'libros',
      via: 'codigo'
    }
  }
};

