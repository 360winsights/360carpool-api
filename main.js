const config = require('./db-config/config.js')
const restify = require('restify')
const mysql = require('mysql')
const conn = config.db.get

// routes
const userRouter = require('./routes/users.js')

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
userRouter.applyRoutes(server)

server.listen(config.port, () => {
  console.log('%s listening at %s', server.name, server.url)
})

server.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Carpool API!'} )
})
