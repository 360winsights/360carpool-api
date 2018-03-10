const config  = require('../db-config/config')
const restify = require('restify')
const conn = config.db.get

conn
  .then((conn) => {
    const result = conn.query('insert into companies (name, address) values (\'360insights\', \'300 Green Street, Whitby, Ontario, Canada L1N4Z4\')')
    conn.end()
    return result
  })
  .then((result) => {
    console.log('insert successful')
  })
  .catch((err) => {
    console.log(err)
  })
