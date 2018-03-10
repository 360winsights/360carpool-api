const config = require('../db-config/config.js')
const conn = config.db.get
const server = require('../main.js').server
const Router = require('restify-router').Router
const router = new Router()
const gmc = require('../maps/mapsConfig.js')

router.get('/distanceToAndFrom/', (req, res) => {
  if (req.query) {
    let waypoints = ''
    const len = req.query.waypoints.length
    for (let i = 0; i < len; ++i) {
      if (i > 0) {
        waypoints = `${waypoints}|`
      }
      waypoints = `${waypoints}${req.query.waypoints[i]}`
    }

    params = {
      origin: req.query.origin,
      destination: req.query.dest,
      waypoints: waypoints == '' ? null : waypoints,
      optimize: true
    }

    let dist = 0
    return gmc.directions(params).asPromise()
    .then((resp) => {
      const data = resp.json.routes[0].legs
      const len = data.length

      for (let i = 0; i < len; ++i) {
        dist += data[i].distance.value
      }

      res.json( { result: dist } )
    })
    .catch((err) => {
      res.json( { result: err })
    })
  }
})

module.exports = router
