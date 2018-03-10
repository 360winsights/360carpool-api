const config  = require('../db-config/config')
const restify = require('restify')
const conn = config.db.get

conn
  .then((conn) => {
    const result = conn.query('insert into users (name, company, is_driver, out_of_way, driver_id, karma, address, leave_home, arrive_home, leave_work, arrive_work) values (\'Manz Not Hot\', \'1\', \'1\', \'2000\', \'1\', \'-7\', \'Union Station, Toronto, Ontario\', \'08:00:00\', \'18:00:00\', \'17:00:00\', \'09:00:00\')')
    conn.end()
    return result
  })
  .then((result) => {
    console.log('insert successful')
  })
  .catch((err) => {
    console.log(err)
  })
