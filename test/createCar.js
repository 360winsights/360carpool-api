const config  = require('../db-config/config')
const restify = require('restify')
const conn = config.db.get

conn
  .then((conn) => {
    const result = conn.query('insert into cars (driver_id, manufacturer, model, gas_mileage, available_seats) values (\'1\', \'Ferrari\', \'2007 Enzo\', \'8\', \'1\')')
    conn.end()
    return result
  })
  .then((result) => {
    console.log('insert successful')
  })
  .catch((err) => {
    console.log(err)
  })
