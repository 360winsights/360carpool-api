const config  = require('../db-config/config')
const restify = require('restify')
const mysql   = require('mysql')
const conn    = config.db.get

// server init
const server = restify.createServer({
    name    : config.name,
    version : config.version,
    url     : config.hostname
})
server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())
server.listen(config.port, () => {
  console.log('%s listening at %s', server.name, server.url)
})
