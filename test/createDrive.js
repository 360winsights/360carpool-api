const config  = require('../db-config/config')
const restify = require('restify')
const conn = config.db.get

conn
  .then((conn) => {
    const result = conn.query('insert into drives (driver_id, waypoints, available) values (\'1\', \'Eaton Center, Toronto, Ontario\', \'1\')')
    conn.end()
    return result
  })
  .then((result) => {
    console.log('insert successful')
  })
  .catch((err) => {
    console.log(err)
  })
