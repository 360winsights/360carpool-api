const config  = require('../db-config/config')
const restify = require('restify')
const mysql = require('mysql')
const conn = config.db.get

conn.query('insert into drives (driver_id, waypoints, available) values (\'2\', \'1301 Brock St S, Whitby, ON L1N 9K2\', \'1\')', (err, rows, fields) => {
  if (err) {
    throw err
  }

  console.log('insert successful')
})

// close mysql connection
conn.end()
