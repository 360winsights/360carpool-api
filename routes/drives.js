const config = require('../db-config/config.js')
const conn = config.db.get
const server = require('../main.js').server
const Router = require('restify-router').Router
const router = new Router()

// get users riding with rider
router.get('/drives/getRiders/:driver_id', (req, res) => {
  conn.query(`
    select drives.driver_id, users.driver_id
    from drives
    join users on drives.driver_id=users.driver_id
    where drives.driver_id=${req.params.driver_id}
  `), (error, results, fields) => {
    res.end(JSON.stringify(results, null, 4))
  }
})

module.exports = router
