const config  = require('../db-config/config.js')
const conn    = config.db.get
const server = require('../main.js').server
const Router = require('restify-router').Router
const router = new Router()

// create user
router.get('/users/create/:name/:company/:is_driver/:street_address/:postal_code/:province/:country/', (req, res) => {
  conn.query(`insert into users (name, company, is_driver, karma, street_address, postal_code, province, country, leave_home, arrive_home, leave_work, arrive_work) values ('${req.params.name}', '${req.params.company}', '${req.params.is_driver}', '0', '${req.params.street_address}', '${req.params.postal_code}', '${req.params.province}', '${req.params.country}', '08:00:00', '18:00:00', '17:00:00', '09:00:00')`,
  (error, results, fields) => {
    if (error) {
      throw error
    }

    res.json( {'message': 'user inserted!'} )
  })
})
