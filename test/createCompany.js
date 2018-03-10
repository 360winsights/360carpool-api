const config  = require('../db-config/config')
const restify = require('restify')
const mysql = require('mysql')
const conn = config.db.get

conn.query('insert into companies (name, address) values (\'360insights\', \'300 Green Street, Whitby, Ontario, Canada L1N4Z4\')', (err, rows, fields) => {
  if (err) {
    throw err
  }

  console.log('insert successful')
})

// close mysql connection
conn.end()
