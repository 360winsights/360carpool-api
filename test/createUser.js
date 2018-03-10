const config  = require('../db-config/config')
const restify = require('restify')
const mysql = require('mysql')
const conn = config.db.get

conn.query('insert into users (name, company, is_driver, driver_id, karma, street_address, city, postal_code, province, country, leave_home, arrive_home, leave_work, arrive_work) values (\'Dude Man\', \'1\', \'0\', \'1\', \'0\', \'1269 Concession 3\', \'Uxbridge\', \'L0C1A0\', \'Ontario\', \'Canada\', \'08:00:00\', \'18:00:00\', \'17:00:00\', \'09:00:00\')', (err, rows, fields) => {
  if (err) {
    throw err
  }

  console.log('insert successful')
})

// close mysql connection
conn.end()
