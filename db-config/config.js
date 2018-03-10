const mysql = require('mysql')
const vars = require('./vars.js')

module.exports = {
  name: 'Carpool-Rest-API',
  hostname: 'http://localhost',
  version: '0.0.1',
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || vars.port,
  db: {
    get : mysql.createConnection({
      host: vars.host,
      user: vars.user,
      password : vars.pwd,
      database : vars.dbName
    })
  }
}
