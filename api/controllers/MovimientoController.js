/**
 * MovimientoController
 *
 * @description :: Server-side logic for managing movimientoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	search: function(req, res){
        Movimiento.find()
        .populate("tipo_mov")
        .populate("detalle_mov")
        .exec(function(err, mov) {
            console.log("entrando e promise");
            if (err) {
                return res.negotiate(err);
            }
            res.json(mov);
            // return res.json(mov);
        });
    }
};

