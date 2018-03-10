const config = require('../db-config/config.js')
const conn = config.db.get
const server = require('../main.js').server
const Router = require('restify-router').Router
const router = new Router()

// get users riding with rider
router.get('getRidersByDriverId', (req, res) => {
  if (req.query) {
    const query = `select drives.driver_id, users.name from drives join users on drives.driver_id=users.driver_id where drives.driver_id=${req.query.driver_id}`
    conn
    .then((conn) => {
      const result = conn.query(query)
      // do you end the connection here?
      return result
    })
    .then((result) => {
      res.json({ result })
    })
    .catch((err) => {
      console.log(err)
    })
  }
})

// get users riding with rider
router.get('/drives', (req, res) => {
  const query = 'select * from drives'
  conn
  .then((conn) => {
    const result = conn.query(query)
    return result
  })
  .then((result) => {
    res.json({ result })
  })
  .catch((err) => {
    console.log(err)
  })
})

// tries to add user to driver's route
router.get('/joinRide', (req, res) => {
  if (req.query) {
    const gmc = require('../maps/mapsConfig.js')

    // get user address
    let rider_address, connection, stops, params, origParams, flex
    let regDist = 0
    let newDist = 0
    conn
    .then((conn) => {
      connection = conn
      return connection.query(`select address from users where id = ${req.query.rider_id}`)
    })
    .then((result) => {
      rider_address = result[0].address

      return connection.query(`select drives.waypoints, users.address as driver_address, users.out_of_way as flex, companies.address as comp_address from drives inner join users on drives.driver_id=users.id inner join companies on users.company=companies.id where drives.driver_id = ${req.query.driver_id}`)
    })
    .then((result) => {
      // get waypoint addresses
      stops = result[0].waypoints
      const origWaypoints = result[0].waypoints
      const companyAddress = result[0].comp_address
      const driverAddress = result[0].driver_address
      flex = result[0].flex // how many more metres driver is willing to go out of way

      if (stops == '') {
        stops = rider_address
      } else {
        stops = `${stops}|${rider_address}`
      }

      let org, dest
      if (req.query.which_way == 'home') {
        org = companyAddress
        dest = driverAddress
      } else {
        org = driverAddress
        dest = companyAddress
      }

      params = {
        origin: org,
        destination: dest,
        waypoints: stops == '' ? null : stops,
        optimize: true
      }
      origParams = {
        origin: org,
        destination: dest,
        waypoints: origWaypoints == '' ? null : origWaypoints,
        optimize: true
      }

      return gmc.directions(params).asPromise()
    })
    .then((resp) => { // calculate new distance with user riding in car
      const data = resp.json.routes[0].legs
      const len = data.length
      for (let i = 0; i < len; ++i) {
        newDist += data[i].distance.value
      }

      return gmc.directions(origParams).asPromise()
    })
    .then((resp) => { // calculate original distance to drive without user
      const data = resp.json.routes[0].legs
      const len = data.length
      for (let i = 0; i < len; ++i) {
        regDist += data[i].distance.value
      }

      if (newDist - regDist > flex) {
        res.json({status: 'error', message: 'User can\'t ride with this driver' })
      } else {
        connection
        .query(`update drives set waypoints='${stops}' where driver_id = ${req.query.driver_id}`)
        .then((result) => {
          res.json({status: 'success', message: 'User can ride with this driver' })
        })
        .catch((err) => {
          console.log(err)
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }
})

// get array of available drivers and sort
router.get('searchRides', (req, res) => {
  if (req.query) {
    const gmc = require('../maps/mapsConfig.js')

    let arr = []
    // get user address
    let connection, rider_address, stops, flex, params, origParams
    conn
    .then((conn) => {
      connection = conn
      return connection.query(`select address from users where id = ${req.query.rider_id}`)
    })
    .then((result) => {
      rider_address = result[0].address
      return connection.query(`select drives.driver_id, drives.waypoints, users.address as driver_address, users.out_of_way as flex, companies.address as comp_address from drives inner join users on drives.driver_id=users.id inner join companies on users.company=companies.id`)
    })
    .then((result) => {
      const len = result.length
      const promises = result.map((item) => {
        stops = item.waypoints
        const origWaypoints = item.waypoints
        const companyAddress = item.comp_address
        const driverAddress = item.driver_address
        flex = item.flex // how many more metres driver is willing to go out of way

        if (stops == '') {
          stops = rider_address
        } else {
          stops = `${stops}|${rider_address}`
        }

        let org, dest
        if (req.query.which_way == 'home') {
          org = companyAddress
          dest = driverAddress
        } else {
          org = driverAddress
          dest = companyAddress
        }

        params = {
          origin: org,
          destination: dest,
          waypoints: stops == '' ? null : stops,
          optimize: true
        }
        origParams = {
          origin: org,
          destination: dest,
          waypoints: origWaypoints == '' ? null : origWaypoints,
          optimize: true
        }

        let regDist = 0
        let newDist = 0
        return gmc.directions(params).asPromise()
        .then((resp) => {
          const data = resp.json.routes[0].legs
          const len = data.length

          for (let i = 0; i < len; ++i) {
            newDist += data[i].distance.value
          }

          return gmc.directions(origParams).asPromise()
        })
        .then((resp) => {
          const data = resp.json.routes[0].legs
          const len = data.length
          for (let i = 0; i < len; ++i) {
            regDist += data[i].distance.value
          }

          const extra = newDist - regDist
          const obj = {
            driver_id: item.driver_id,
            startingFrom: org,
            waypoints: origWaypoints,
            destination: dest,
            myAddedDist: extra
          }

          arr.push(obj)
          return Promise.resolve()
        })
        .catch((err) => {
          console.log(err)
        })
      })

      // this Promise.all() and preceding logic assures the headers are not sent before
      //  arr is fully populated
      Promise.all(promises).then(() => {
        const ascending = arr.sort((a, b) => Number(a.addedDist) - Number(b.addedDist))
        res.json({ message: ascending })
      })
    })
  }
})

module.exports = router
