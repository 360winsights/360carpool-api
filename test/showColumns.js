const config  = require('../db-config/config')
const restify = require('restify')
const mysql   = require('mysql')
const conn    = config.db.get

// print users column names
conn.query('show columns from users', (err, rows, fields) => {
  const len = rows.length
  for (let i = 0; i < rows.length; ++i) {
    console.log(rows[i].Field)
  }
})

// close mysql connection
conn.end()
