/**
* Movimiento.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
module.exports = {
    // EVITAR QUE SE ENVIE OBJETO EN CICLO Y MULTIPLES OBJETOS DE MOVIMIENTO (EJEMPLO: CONSIGNACION Y DEVOLUCION) ✔✔
    // FALTA BORRADO EN CASCADA PARA MOVIMIENTO Y VARIAS ENTIDADES MAS (EL BORRADO DE TODO DEBERIA DE SER LOGICO) 
    attributes: {
        id: { //Añadir override para no permitir ingresar id al crear -> posible con una policy ✔✔
            type: 'integer',
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        ciclo: {
            model: 'ciclo',
            required: true
        },
        detalle_mov: {
            collection: 'detalle_movimiento',
            via: 'mov_id'
        },
        tipo_mov: {
            model: 'tipo_movimiento',
            required: true
        },
        observaciones: {
            type: 'string'
        },


        //opcionales -> movimiento varia segun el tipo
        consignacion: {
            collection: 'consignacion',
            via: 'movimiento'
        },
        devolucion: {
            collection: 'devolucion',
            via: 'movimiento'
        },
        venta: {
            collection: 'venta',
            via: 'movimiento'
        },
        compra: {
            collection: 'compra',
            via: 'movimiento'
        },

        toJSON: function(){
            var obj = this.toObject();
            // Delete empty collections (from movement dismatch)
            obj.consignacion && !obj.consignacion.length && (delete obj.consignacion);
            obj.devolucion && !obj.devolucion.length && (delete obj.devolucion);
            obj.venta && !obj.venta.length && (delete obj.venta);
            obj.compra && !obj.compra.length && (delete obj.compra);
            return obj;
        }

    },
    afterCreate: function(movimiento, cb) {
        Movimiento.findOne({
            id: movimiento.id
        })
        .populate("tipo_mov")
        .populate("detalle_mov")
        .exec(function(err, mov) {
            if (err) {
                return res.negotiate(err);
            }
            console.log(mov);
            var librosId = [];
            for (var i = 0; i < mov.detalle_mov.length; i++) {
                librosId.push(mov.detalle_mov[i].libro);
            }
            Libros.find({
                id: librosId
            }).exec(function (err, libs) {
                if (err) {
                    return res.negotiate(err);
                }
                for (var i = 0; i < libs.length; i++) {
                    // libs[i];
                    for (var j = 0; j < mov.detalle_mov.length; j++) {
                        if ( mov.detalle_mov[j].libro == libs[i].id ){
                            libs[i].stock = libs[i].stock + ( mov.detalle_mov[j].cantidad * mov.tipo_mov.valor );
                            libs[i].save();
                            break;
                        }
                    }
                }
                cb();
            });
            // return res.json(mov);
        });
        console.log(movimiento);
        
    }
};
