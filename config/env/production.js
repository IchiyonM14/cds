/**
 * Production environment settings
 *
 * This file can include shared settings for a production environment,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */
var winston = require('winston');
var customLogger = new winston.Logger();

// A file based transport logging only errors formatted as json.
customLogger.add(winston.transports.File, {
  level: 'info',
  filename: 'codesa.log',
  json: true
});



module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the production        *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

  // models: {
  //   connection: 'someMysqlServer'
  // },

  /***************************************************************************
   * Set the port in the production environment to 80                        *
   ***************************************************************************/

  // port: 80,

  /***************************************************************************
   * Set the log level in production environment to "silent"                 *
   ***************************************************************************/

  log: {
     // level: 'info'
    custom: customLogger,
    level: 'silly',
    // Disable captain's log so it doesn't prefix or stringify our meta data.
    inspect: false
  }

};
