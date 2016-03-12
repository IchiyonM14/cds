/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {
	//para desactivar rest actions que vienen por default
	 _config: { 
        actions: true, 
        rest: true, 
        shortcuts: false 
    },
	login: function(req, res) {
        passport.authenticate('local', function(err, user, info) {
            if ((err) || (!user)) {
                req.session.flashes = req.session.flashes || [];
                req.session.flashes.push({
                    status: 'danger', 
                    message: info.message
                });
                return res.redirect('/');
            }
            
            req.logIn(user, function(err) {
                if (err) res.send(err);
                if (req.query.redirect){
                    return res.redirect(decodeURIComponent(req.query.redirect));
                }
                res.redirect('/app');
                // return res.send({
                //     message: info.message,
                //     user: user
                // });
            });

        })(req, res);
    },
    logout: function(req, res) {
        req.logout();
        res.redirect('/');
    }
};

