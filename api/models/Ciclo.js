/**
* Ciclo.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var getMonthName = (function (months){
    return function(monthNum){
        return months[monthNum];
    }
})(["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"]);

module.exports = {

  attributes: {
    id_ciclo: {
  		type: "string",
  		unique: true,
  		primaryKey: true
  	},
    descripcion: {
      type: "string",
      required: true
    }
  },
  beforeCreate: function (values, cb) { //para garantizar el esquema MESAÑO
    //override values.id_ciclo if exists (should be empty)
    var tmpDate = new Date();
    values.id_ciclo = getMonthName(tmpDate.getMonth())+tmpDate.getFullYear();

    Ciclo.findOne({ //search if already exists 
      id_ciclo: values.id_ciclo
    }).exec(function(err, cicl){
      if(err) return cb(err);
      if(cicl) return cb({
        detail: "Ya existe un ciclo actual ("+values.id_ciclo+")",
        table: "ciclo"
      });
      cb(null, values);
    })
    // Libros.findOne({
    //   codigo: values.codigo,
    //   grupo: values.grupo
    // }).exec(function(err, lib){
    //   if(err) return cb(err);
    //   if(lib) return cb({
    //     detail: "Ya existe la llave (codigo)=("+values.codigo+") (grupo)=("+values.grupo+")",
    //     table: "libros"
    //   });
    //   cb(null, values);
    // });
  }
};

