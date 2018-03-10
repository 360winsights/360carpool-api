const config = require('../db-config/config.js')
const conn = config.db.get
const server = require('../main.js').server
const Router = require('restify-router').Router
const router = new Router()

// get users riding with rider
router.get('/drives/getRiders/:driver_id', (req, res) => {
  const query = 'select drives.driver_id, users.driver_id from drives join users on drives.driver_id=users.driver_id where drives.driver_id = ?'
  conn.query(query, [req.params.driver_id], function (error, results, fields) {
    if (error) {
      throw error
    }

    res.json( { result: results })
  })
})

// tries to add user to driver's route
router.get('/drives/carpooling/joinRide/:driver_id/:rider_id/:which_way', (req, res) => {
  const gmc = require('../maps/mapsConfig.js')

  // get user address
  let rider_address
  conn.query(`select address from users where id = ${req.params.rider_id}`, (err, results, fields) => {
    if (err) {
      throw err
    }

    rider_address = results[0].address

    // get waypoint addresses
    let stops
    conn.query(`select drives.waypoints, users.address as driver_address, users.out_of_way as flex, companies.address as comp_address from drives inner join users on drives.driver_id=users.id inner join companies on users.company=companies.id where drives.driver_id = ${req.params.driver_id}`, (err, results, fields) => {
      if (err) {
        throw err
      }

      stops = results[0].waypoints
      const companyAddress = results[0].comp_address
      const driverAddress = results[0].driver_address
      const flex = results[0].flex // how many more metres driver is willing to go out of way

      if (stops == '') {
        stops = rider_address
      } else {
        stops = `${stops}|${rider_address}`
      }

      let org, dest
      if (req.params.which_way == 'home') {
        org = companyAddress
        dest = driverAddress
      } else {
        org = driverAddress
        dest = companyAddress
      }

      const params = {
        origin: org,
        destination: dest,
        waypoints: stops == '' ? null : stops,
        optimize: true
      }
      const origParams = {
        origin: org,
        destination: dest,
        waypoints: null,
        optimize: true
      }

      let regDist = 0
      let newDist = 0
      gmc.directions(params)
        .asPromise()
        .then((resp) => {
          const data = resp.json.routes[0].legs
          const len = data.length
          for (let i = 0; i < len; ++i) {
            newDist += data[i].distance.value
          }

          gmc.directions(origParams)
            .asPromise()
            .then((resp) => {
              const data = resp.json.routes[0].legs
              const len = data.length
              for (let i = 0; i < len; ++i) {
                regDist += data[i].distance.value
              }

              let canThey
              if (newDist - regDist > flex) {
                canThey = 'So, user will not be able to ride with this driver'
              } else {
                canThey = 'User can ride with this driver'
              }

              const msg = `Original distance to travel is ${regDist} m. New distance to travel with user riding is ${newDist} m. Driver is willing to go ${flex} m extra out of their way. ${canThey}`

              res.json( {message: msg })
            })
            .catch((err) => {
              throw err
            })
        })
        .catch((err) => {
          throw err
        })
    })
  })
})

// get array of available drivers and sort
router.get('/drives/carpooling/searchRides/:rider_id/:which_way', (req, res) => {
  const gmc = require('../maps/mapsConfig.js')

  let arr = []
  // get user address
  let rider_address
  conn.query(`select address from users where id = ${req.params.rider_id}`, (err, results, fields) => {
    if (err) {
      throw err
    }

    rider_address = results[0].address

    // get waypoint addresses
    let stops
    conn.query(`select drives.driver_id, drives.waypoints, users.address as driver_address, users.out_of_way as flex, companies.address as comp_address from drives inner join users on drives.driver_id=users.id inner join companies on users.company=companies.id`, (err, results, fields) => {
      if (err) {
        throw err
      }

      const len = results.length
      for (let i = 0; i < len; ++i) {
        stops = results[i].waypoints
        const origWaypoints = results[i].waypoints
        const companyAddress = results[i].comp_address
        const driverAddress = results[i].driver_address
        const flex = results[i].flex // how many more metres driver is willing to go out of way

        if (stops == '') {
          stops = rider_address
        } else {
          stops = `${stops}|${rider_address}`
        }

        let org, dest
        if (req.params.which_way == 'home') {
          org = companyAddress
          dest = driverAddress
        } else {
          org = driverAddress
          dest = companyAddress
        }

        const params = {
          origin: org,
          destination: dest,
          waypoints: stops == '' ? null : stops,
          optimize: true
        }
        const origParams = {
          origin: org,
          destination: dest,
          waypoints: origWaypoints == '' ? null : origWaypoints,
          optimize: true
        }

        let regDist = 0
        let newDist = 0
        gmc.directions(params)
          .asPromise()
          .then((resp) => {
            const data = resp.json.routes[0].legs
            const len = data.length
            for (let i = 0; i < len; ++i) {
              newDist += data[i].distance.value
            }

            gmc.directions(origParams)
              .asPromise()
              .then((resp) => {
                const data = resp.json.routes[0].legs
                const len = data.length
                for (let i = 0; i < len; ++i) {
                  regDist += data[i].distance.value
                }

                const extra = newDist - regDist
                const obj = {
                  driver_id: results[i].driver_id,
                  startingFrom: org,
                  waypoints: origWaypoints,
                  destination: dest,
                  myAddedDist: extra
                }

                arr.push(obj)
              })
              .catch((err) => {
                throw err
              })
          })
          .catch((err) => {
            throw err
          })
      }
    })
  })
  setTimeout(() => {
    const ascending = arr.sort((a, b) => Number(a.addedDist) - Number(b.addedDist))

    res.json( { message: ascending } )
  }, 3000)
})

module.exports = router
