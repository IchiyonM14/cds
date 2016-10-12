/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#!/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.policies.html
 */

function noParmsWrapper(arr) {
  return function (req, res, next) {
    req.options.noParms = arr;
    next();
  }
};

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions (`true` allows public     *
  * access)                                                                  *
  *                                                                          *
  ***************************************************************************/
  'create': ['onlyGetOnWS'],
  'update': ['onlyGetOnWS'],
//   '*': ['onlyGetOnWS'], //restrict WS to only use GET Method
  ViewsController: {
    '*': 'isAuthenticated'
  },
  UserController: {
    // '*': 'isAuthenticated',
    'login': true
  },
  GruposController: { //ad admin stuff
    //'*': 'isAuthenticated', //later activate this
    '*': true,
    'create': [noParmsWrapper(['id']), 'noBodyParms'],
    'update': [noParmsWrapper(['id']), 'noBodyParms']
  },
  LibrosController: { //ad admin stuff
    //'*': 'isAuthenticated', //later activate this
    // '*': ['onlyGetOnWS'],
    'create': [noParmsWrapper(['id','stock']), 'noBodyParms'],
    'update': [noParmsWrapper(['id','stock']), 'noBodyParms']
  },

  /*  FALTA POLICIES PARA DISTRIBUIDOR VENDEDOR MOVIMEINTO ETC */
  CicloController: { //  ad admin stuff
    //  '*': 'isAuthenticated', //later activate this
    'create': [noParmsWrapper(['id_ciclo']), 'noBodyParms'],
    'update': [noParmsWrapper(['id_ciclo']), 'noBodyParms']
  },

  MovimientoController: {
    'create': [noParmsWrapper(['id']), 'noBodyParms'],
    'update': [noParmsWrapper(['id']), 'noBodyParms']
  },

  Tipo_movimientoController: {
    'create': [noParmsWrapper(['id']), 'noBodyParms'],
    'update': [noParmsWrapper(['id']), 'noBodyParms']
  },

  ProveedorController: {
    'create': [noParmsWrapper(['id']), 'noBodyParms'],
    'update': [noParmsWrapper(['id']), 'noBodyParms']
  },

  // Forbid every web action on movement type and movement detail
  ConsignacionController: { '*': false },
  DevolucionController: { '*': false },
  VentaController: { '*': false },
  CompraController: { '*': false },
  Prov_devolucionController: { '*': false },
  Detalle_movimientoController: { '*': false }
  /***************************************************************************
  *                                                                          *
  * Here's an example of mapping some policies to run before a controller    *
  * and its actions                                                          *
  *                                                                          *
  ***************************************************************************/
	// RabbitController: {

		// Apply the `false` policy as the default for all of RabbitController's actions
		// (`false` prevents all access, which ensures that nothing bad happens to our rabbits)
		// '*': false,

		// For the action `nurture`, apply the 'isRabbitMother' policy
		// (this overrides `false` above)
		// nurture	: 'isRabbitMother',

		// Apply the `isNiceToAnimals` AND `hasRabbitFood` policies
		// before letting any users feed our rabbits
		// feed : ['isNiceToAnimals', 'hasRabbitFood']
	// }
};
