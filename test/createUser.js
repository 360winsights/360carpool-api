const config  = require('../db-config/config')
const restify = require('restify')
const mysql = require('mysql')
const conn = config.db.get

conn.query('insert into users (name, company, is_driver, out_of_way, driver_id, karma, address, leave_home, arrive_home, leave_work, arrive_work) values (\'Long drive\', \'1\', \'1\', \'40000\', \'1\', \'500\', \'127 Planks Ln, Uxbridge, ON L9P 1K5\', \'08:00:00\', \'18:00:00\', \'17:00:00\', \'09:00:00\')', (err, rows, fields) => {
  if (err) {
    throw err
  }

  console.log('insert successful')
})

// close mysql connection
conn.end()
