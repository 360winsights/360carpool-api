const config = require('../db-config/config.js')
const conn = config.db.get
const server = require('../main.js').server
const Router = require('restify-router').Router
const router = new Router()

// fetch all cars
router.get('/cars', (req, res) => {
  conn.query('select * from cars', (error, results, fields) => {
    if (error) {
      throw error
    }

    res.json( { result: results } )
  })
})

module.exports = router
