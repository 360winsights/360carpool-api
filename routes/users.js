const config = require('../db-config/config.js')
const conn = config.db.get
const server = require('../main.js').server
const Router = require('restify-router').Router
const router = new Router()

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
router.get('/fetchUserById', (req, res) => {
  if (req.query) {
    conn
      .then((conn) => {
        const result = conn.query(`select * from users where id=${req.query.id}`)
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

// toggle user driving status
router.get('/toggleDriverStatus', (req, res) => {
  if (req.query) {
    let newStatus, connection
    conn
      .then((conn) => {
        connection = conn
        const result = connection.query(`select is_driver from users where id=${req.query.id}`)
        return result
      })
      .then((result) => {
        if (result[0].is_driver == 1) {
          newStatus = 0
        } else {
          newStatus = 1
        }

        return connection.query(`update users set is_driver=${newStatus} where id='${req.query.id}'`)
      })
      .then((result) => {
        res.json( {'message': `user ${req.query.id} driving status updated`} )
      })
      .catch((err) => {
        console.log(err)
      })
  }
})

// adjust user karma
router.get('/updateKarma', (req, res) => {
  if (req.query) {
  let newStatus, connection, newKarma
  conn
    .then((conn) => {
      connection = conn
      const result = connection.query(`select karma from users where id=${req.query.id}`)
      return result
    })
    .then((result) => {
      newKarma = Number(result[0].karma) + Number(req.query.value)
      return connection.query(`update users set karma=${newKarma} where id='${req.query.id}'`)
    })
    .then((result) => {
      res.json( {'message': `user ${req.query.id} karma updated`} )
    })
    .catch((err) => {
      console.log(err)
    })
  }
})

// get top n karma users
router.get('/topKarma', (req, res) => {
  if (req.query) {
    conn
      .then((conn) => {
        return conn.query(`select name, karma from users order by karma desc limit ${req.query.max}`)
      })
      .then((result) => {
        res.json( { result: result } )
      })
      .catch((err) => {
        console.log(err)
      })
  }
})

module.exports = router
