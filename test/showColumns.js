const config  = require('../db-config/config')
const restify = require('restify')
const mysql = require('mysql')
const conn = config.db.get

conn.query('select * from drives'), (error, results, fields) => {
  if (err) throw err
  console.log(JSON.stringify(results, null, 4))
}

// print users column names
conn.query('show columns from drives', (err, rows, fields) => {
  const len = rows.length
  for (let i = 0; i < rows.length; ++i) {
    console.log(rows[i].Field)
  }
})

conn.query('select * from drives'), (error, results, fields) => {
  if (err) throw err
  console.log(JSON.stringify(results, null, 4))
}

// close mysql connection
conn.end()
