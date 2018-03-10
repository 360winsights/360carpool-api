const mysql = require('mysql')
const vars = require('../db-config/vars.js')

const conn = mysql.createConnection({
  host: vars.host,
  user: vars.user,
  password: vars.pwd
})

conn.connect((err) => {
  if (err) {
    throw err
  }

  console.log('Connected!')

  // create db
  conn.query(`DROP DATABASE ${vars.dbName}`, (err, result) => {
    if (err) {
      throw err
    }

    console.log('Database dropped')
  })

  conn.end()
})
