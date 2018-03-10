const config  = require('../db-config/config')
const restify = require('restify')
const mysql = require('mysql')
const conn = config.db.get

// print users column names
conn.query('insert into cars (driver_id, manufacturer, model, gas_mileage, available_seats) values (\'1\', \'Ferrari\', \'2007 Enzo\', \'8\', \'1\')', (err, rows, fields) => {
  if (err) {
    throw err
  }

  console.log('insert successful')
})

// close mysql connection
conn.end()
