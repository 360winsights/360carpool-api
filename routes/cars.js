const config = require('../db-config/config.js')
const conn = config.db.get
const server = require('../main.js').server
const Router = require('restify-router').Router
const router = new Router()

// fetch all cars
router.get('/cars', (req, res) => {
  conn
    .then((conn) => {
      params = {
        origin: org,
        destination: dest,
        waypoints: stops == '' ? null : stops,
        optimize: true
      }
    })
    .then((result) => {
      res.json( { result: result } )
    })
    .catch((err) => {
      console.log(err)
    })
})

module.exports = router
