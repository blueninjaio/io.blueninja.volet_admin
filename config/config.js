/**
|--------------------------------------------------
| Configuration File
|--------------------------------------------------
*/
const fs = require('fs')

module.exports = {
  port             : process.env.PORT || 3000,
  
  // Database configuration
  db               : {
    host     : 'localhost',
    database : 'voletV2',
    user     : 'root',
    password : '',
    dialect  : 'mysql',
    logging  : false,
    port     : 3306,
    pool     : {
      max     : 5,
      min     : 0,
      acquire : 30000,
      idle    : 10000
    }
  },

  // JSONWebToken configuration
  private_key      : fs.readFileSync(__dirname + '/private.key'),
  token_expires_in : '24h'
};
