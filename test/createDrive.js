const config  = require('../db-config/config')
const restify = require('restify')
const mysql = require('mysql')
const conn = config.db.get

conn.query('insert into drives (driver_id, waypoints, available) values (\'5\', \'4340 Front St, Goodwood, ON L0C 1A0\', \'1\')', (err, rows, fields) => {
  if (err) {
    throw err
  }

  console.log('insert successful')
})

// close mysql connection
conn.end()
