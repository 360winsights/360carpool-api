const config = require('../db-config/config.js')
const conn = config.db.get
const server = require('../main.js').server
const Router = require('restify-router').Router
const router = new Router()

// fetch all companies
router.get('/company', (req, res) => {
  conn
    .then((conn) => {
      return conn.query('select * from companies')
    })
    .then((result) => {
      res.json( { result: result } )
    })
    .catch((err) => {
      console.log(err)
    })
})

// fetch company by id
router.get('/company/:id', (req, res) => {
  conn
    .then((conn) => {
      return conn.query(`select * from companies where id=${req.params.id}`)
    })
    .then((result) => {
      res.json( { result: result } )
    })
    .catch((err) => {
      console.log(err)
    })
})



module.exports = router
