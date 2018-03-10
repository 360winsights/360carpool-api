const config = require('../db-config/config.js')
const conn = config.db.get
const server = require('../main.js').server
const Router = require('restify-router').Router
const router = new Router()

// create user
router.get('/users/create/:name/:company/:is_driver/:street_address/:city/:postal_code/:province/:country/', (req, res) => {
  conn
    .then((conn) => {
      const result = conn.query(`insert into users (name, company, is_driver, karma, street_address, city, postal_code, province, country, leave_home, arrive_home, leave_work, arrive_work) values ('${req.params.name}', '${req.params.company}', '${req.params.is_driver}', '0', '${req.params.street_address}', '${req.params.city}', '${req.params.postal_code}', '${req.params.province}', '${req.params.country}', '08:00:00', '18:00:00', '17:00:00', '09:00:00')`)
      return result
    })
    .then((result) => {
      res.json({ message: 'user inserted!' })
    })
    .catch((err) => {
      console.log(err)
    })
})

// fetch all users
router.get('/users', (req, res) => {
  conn
    .then((conn) => {
      const result = conn.query('select * from users')
      return result
    })
    .then((result) => {
      res.json({ result })
    })
    .catch((err) => {
      console.log(err)
    })
})

// fetch user by id
router.get('/users/:id', (req, res) => {
  conn
    .then((conn) => {
      const result = conn.query(`select * from users where id=${req.params.id}`)
      return result
    })
    .then((result) => {
      res.json({ result })
    })
    .catch((err) => {
      console.log(err)
    })
})

// toggle user driving status
router.get('/users/toggleDriverStatus/:id', (req, res) => {
  let newStatus, connection
  conn
    .then((conn) => {
      connection = conn
      const result = connection.query(`select is_driver from users where id=${req.params.id}`)
      return result
    })
    .then((result) => {
      if (result[0].is_driver == 1) {
        newStatus = 0
      } else {
        newStatus = 1
      }

      return connection.query(`update users set is_driver=${newStatus} where id='${req.params.id}'`)
    })
    .then((result) => {
      res.json( {'message': `user ${req.params.id} driving status updated`} )
    })
    .catch((err) => {
      console.log(err)
    })
})

// adjust user karma
router.get('/users/updateKarma/:id/:value', (req, res) => {
  let newStatus, connection, newKarma
  conn
    .then((conn) => {
      connection = conn
      const result = connection.query(`select karma from users where id=${req.params.id}`)
      return result
    })
    .then((result) => {
      newKarma = Number(result[0].karma) + Number(req.params.value)
      return connection.query(`update users set karma=${newKarma} where id='${req.params.id}'`)
    })
    .then((result) => {
      res.json( {'message': `user ${req.params.id} karma updated`} )
    })
    .catch((err) => {
      console.log(err)
    })
})

// get top n karma users
router.get('/users/topKarma/:max', (req, res) => {
  conn
    .then((conn) => {
      return conn.query(`select name, karma from users order by karma desc limit ${req.params.max}`)
    })
    .then((result) => {
      res.json( { result: result } )
    })
    .catch((err) => {
      console.log(err)
    })
})

module.exports = router
