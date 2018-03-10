const config = require('../db-config/config.js')
const conn = config.db.get
const server = require('../main.js').server
const Router = require('restify-router').Router
const router = new Router()

// create user
router.get('/users/create/:name/:company/:is_driver/:street_address/:city/:postal_code/:province/:country/', (req, res) => {
  conn.query(`insert into users (name, company, is_driver, karma, street_address, city, postal_code, province, country, leave_home, arrive_home, leave_work, arrive_work) values ('${req.params.name}', '${req.params.company}', '${req.params.is_driver}', '0', '${req.params.street_address}', '${req.params.city}', '${req.params.postal_code}', '${req.params.province}', '${req.params.country}', '08:00:00', '18:00:00', '17:00:00', '09:00:00')`,
  (error, results, fields) => {
    if (error) {
      throw error
    }

    res.json( {'message': 'user inserted!'} )
  })
})

// fetch all users
router.get('/users', (req, res) => {
  conn.query('select * from users', (error, results, fields) => {
    if (error) {
      throw error
    }

    res.json( { result: results } )
  })
})

// fetch user by id
router.get('/users/:id', (req, res) => {
  conn.query(`select * from users where id=${req.params.id}`, (error, results, fields) => {
    if (error) {
      throw error
    }

    res.json( { result: results } )
  })
})

// toggle user driving status
router.get('/users/toggleDriverStatus/:id', (req, res) => {
  let newStatus
  // first get whether or not user is
  conn.query(`select is_driver from users where id=${req.params.id}`, (error, results, fields) => {
    if (error) {
      throw error
    }

    if (results[0].is_driver == 1) {
      newStatus = 0
    } else {
      newStatus = 1
    }

    conn.query(`update users set is_driver=${newStatus} where id='${req.params.id}'`, (error, results, fields) => {
      if (error) {
        throw error
      }

      res.json( {'message': `user ${req.params.id} driving status updated`} )
    })
  })
})

// adjust user karma
router.get('/users/updateKarma/:id/:value', (req, res) => {
  let newStatus
  // first get whether or not user is
  conn.query(`select karma from users where id=${req.params.id}`, (error, results, fields) => {
    if (error) {
      throw error
    }

    const newKarma = Number(results[0].karma) + Number(req.params.value)

    conn.query(`update users set karma=${newKarma} where id='${req.params.id}'`, (error, results, fields) => {
      if (error) {
        throw error
      }

      res.json( {'message': `user ${req.params.id} karma updated`} )
    })
  })
})

// get top n karma users
router.get('/users/topKarma/:max', (req, res) => {
  conn.query(`select name, karma from users order by karma desc limit ${req.params.max}`, (error, results, fields) => {
    if (error) {
      throw error
    }

    res.json( { result: results } )
  })
})

module.exports = router
