const config  = require('../db-config/config')
const restify = require('restify')
const mysql = require('mysql')
const conn = config.db.get

// print users column names
conn.query('insert into cars (driver_id, model, gas_mileage, available_seats) values (\'1\', \'Ferrari\', \'8\', '\1\')', (err, rows, fields) => {
  console.log('insert successful')
})

// close mysql connection
conn.end()
