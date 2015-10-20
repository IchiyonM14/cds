/**
* Libros.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
  	id: { //Añadir override para no permitir ingresar id al crear -> posible con una policy  ✔✔
  		type: 'integer',
  		autoIncrement: true,
  		primaryKey: true,
  		unique: true
  	},
  	codigo: { //evitar duplicados de estas dos llaves foraneas ✔✔
  		model: 'obras',
      required: true
  	},
  	grupo: { //evitar duplicados de estas dos llaves foraneas ✔✔
  		model: 'grupos',
      required: true
  	},
  	stock: { //Añadir override para no permitir ingresar stock al crear -> posible con una policy ✔✔
  		type: 'integer',
  		defaultsTo: 0
  	}
  },
  beforeCreate: function (values, cb) { //para garantizar no duplicados en codigo -- grupo
    Libros.findOne({
      codigo: values.codigo,
      grupo: values.grupo
    }).exec(function(err, lib){
      if(err) return cb(err);
      if(lib) return cb('Not unique');
      cb(null, values);
    });
  }
};

