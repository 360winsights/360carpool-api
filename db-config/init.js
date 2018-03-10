const mysql = require('mysql')
const vars = require('./vars.js')

const conn = mysql.createConnection({
  host: vars.host,
  user: vars.user,
  password: vars.pwd
})

conn.connect((err) => {
  if (err) {
    throw err
  }

  console.log('Connected!')

  // create db
  conn.query(`CREATE DATABASE ${vars.dbName}`, (err, result) => {
    if (err) {
      throw err
    }

    console.log('Database created')
  })

  conn.query(`use ${vars.dbName}`)

  // create user table
  conn.query(`
    CREATE TABLE users (
      id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
      name varchar(255) NOT NULL,
      company varchar(255) NOT NULL,
      is_driver tinyint(1) NOT NULL,
      karma int(11),
      street_address varchar(255) NOT NULL,
      postal_code varchar(255) NOT NULL,
      province varchar(255) NOT NULL,
      country varchar(255) NOT NULL,
      leave_home time,
      arrive_home time,
      leave_work time NOT NULL,
      arrive_work time NOT NULL
    )
  `)

  // car data
  conn.query(`
    CREATE TABLE cars (
      id int NOT NULL PRIMARY KEY,
      driver_id int NOT NULL,
      manufacturer varchar(255),
      model varchar(255),
      gas_mileage int(11),
      available_seats int(11),
      FOREIGN KEY (driver_id) REFERENCES users(id)
    )
  `)

  // cars
  conn.query(`
    CREATE TABLE cars (
      id int NOT NULL PRIMARY KEY,
      driver_id int NOT NULL,
      manufacturer varchar(255),
      model varchar(255),
      gas_mileage int(11),
      available_seats int(11),
      FOREIGN KEY (driver_id) REFERENCES users(id)
    )
  `)

  // cars
  conn.query(`
    CREATE TABLE cars (
      id int NOT NULL PRIMARY KEY,
      driver_id int NOT NULL,
      manufacturer varchar(255),
      model varchar(255),
      gas_mileage int(11),
      available_seats int(11),
      FOREIGN KEY (driver_id) REFERENCES users(id)
    )
  `)
})
