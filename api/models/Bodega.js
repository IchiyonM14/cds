/**
* Bodega.js
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
    nombre: {
      type: 'string',
  		unique: true
    },
    abrev: {
      type: 'string',
  		unique: true
    }
  },
  beforeCreate: function (values, cb) { //para autogenerar abrev si no viene
    if (values.abrev){
      return cb();
    }
    values.abrev = values.nombre.toUpperCase().substr(0,3);
    Bodega.query("SELECT * FROM bodega WHERE abrev LIKE '"+values.abrev+"%'", 
    function(err, result){
      if(err) return cb(err);
      console.log(values)
      if(result.rows.length)
        values.abrev += result.rows.length;
      console.log(result);
      console.log(values);
      cb(null, values);
    });
  }
};

