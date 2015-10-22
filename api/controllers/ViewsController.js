/**
 * ViewsController
 *
 * @description :: Server-side logic for managing distribuidors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	app: function (req, res) {
		res.view('ngpage', {layout: 'nglayout'})
	}
};
