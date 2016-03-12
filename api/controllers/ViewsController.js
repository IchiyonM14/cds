/**
 * ViewsController
 *
 * @description :: Server-side logic for managing distribuidors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    app: function (req, res) {
        var path = req.path;
        if ( path === "/app/" || path === "/app" ){
            if (path === "/app/")
                return res.redirect("/app");
            return res.view('ngpage', {layout: 'nglayout'});
        }
        if ( path !== "/app" ){ //entonces tiene mas subrutas
            //validar que sean a un solo nivel mas
            if ( path.split("/").length === 3 ){ // ej: correcto->["","app","Grupos"] incorrecto->["","app","Grupos", "something"]
                var mod = path.split("/")[2];
                if ( RouteModules.modules.indexOf(mod) === -1){//si no esta el modulo
                    res.notFound(); //404
                } 
                else{
                    res.view('ngpage', {layout: 'nglayout'})
                }
                    
            }else{ //mas niveles
                res.notFound(); //404
            }
        }
    }
};
