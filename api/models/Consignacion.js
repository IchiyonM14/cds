/**
* Consignacion.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
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
        vendedor: { //Vendedor autorizado por distribuidora para retirar de bodega
            //Agregar before create para validar que el vendedor tenga permisos de bodigo mediante prop. codigo
            model: "vendedor",
            required: true
        },
    }
};

