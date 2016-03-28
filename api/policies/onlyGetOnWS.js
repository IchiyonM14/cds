module.exports = function(req, res, next) {
    if (req.isSocket){
        if (req.method !== "GET"){
            sails.log.info("Forbiding no-get WS: "+req.path + " -> "+ req.body);
            return res.forbidden();
        }
    }
    next();
};