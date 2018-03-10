const config = require('./db-config/config.js')
const restify = require('restify')
const mysql = require('mysql')
const conn = config.db.get

// routes
const userRouter = require('./routes/users.js')
const carsRouter = require('./routes/cars.js')
const drivesRouter = require('./routes/drives.js')
const companiesRouter = require('./routes/companies.js')
const routerArr = [ userRouter, carsRouter, drivesRouter, companiesRouter ]

// server init
const server = restify.createServer({
  name: config.name,
  version: config.version,
  url: config.hostname
})
server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())

// apply router routes
const len = routerArr.length
for (let i = 0; i < len; ++i) {
  routerArr[i].applyRoutes(server)
}

server.listen(config.port, () => {
  console.log(`${server.name} listening at ${server.url}`)
  console.log('API requests are ready to be accepted!')
})

server.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Carpool API!'} )
})
