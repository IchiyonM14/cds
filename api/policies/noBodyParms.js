module.exports = function(req, res, next) {
	sails.log.info("Forbiding Props:"+req.options.noParms);
	for (var i = 0, len = req.options.noParms.length; i < len; i++) {
		if ( req.body[req.options.noParms[i]] )
			return res.status(400).json({
	        	error: "E_VALIDATION",
				status: 400,
				summary: "Must not Send Property: '"+req.options.noParms[i]+"'"
	        });
	};
    return next();
};