const config = require('../db-config/config.js')
const conn = config.db.get
const server = require('../main.js').server
const Router = require('restify-router').Router
const router = new Router()

// fetch all users
router.get('/company', (req, res) => {
  conn.query('select * from companies', (error, results, fields) => {
    if (error) {
      throw error
    }

    res.end(JSON.stringify(results, null, 4))
  })
})

// fetch user by id
router.get('/company/:id', (req, res) => {
  conn.query(`select * from companies where id=${req.params.id}`, (error, results, fields) => {
    if (error) {
      throw error
    }

    res.end(JSON.stringify(results, null, 4))
  })
})



module.exports = router
