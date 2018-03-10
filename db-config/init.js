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
      company int(11) NOT NULL,
      is_driver tinyint(1) NOT NULL,
      out_of_way int(11) NOT NULL,
      driver_id int(11) NOT NULL,
      karma int(11),
      address varchar(255) NOT NULL,
      leave_home time,
      arrive_home time,
      leave_work time NOT NULL,
      arrive_work time NOT NULL
    )`, (err, result) => {
    if (err) {
      throw err
    }

    console.log('successfuly created users table')
  })

  conn.query('ALTER TABLE users ADD INDEX driver_id (driver_id)', (err, result) => {
    if (err) {
      throw err
    }

    console.log('successfuly add index to users table')
  })

  // car data
  conn.query(`
    CREATE TABLE cars (
      id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
      driver_id int NOT NULL,
      manufacturer varchar(255),
      model varchar(255),
      gas_mileage int(11),
      available_seats int(11),
      FOREIGN KEY (driver_id) REFERENCES users(id)
    )`, (err, result) => {
    if (err) {
      throw err
    }

    console.log('successfuly created cars table')
  })

  // rides
  conn.query(`
    CREATE TABLE drives (
      id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
      driver_id int(11) NOT NULL,
      waypoints varchar(2000) NOT NULL,
      available tinyint(1) NOT NULL
    )`, (err, result) => {
    if (err) {
      throw err
    }

    console.log('successfuly created drives table')
  })

  conn.query('ALTER TABLE drives ADD INDEX driver_id (driver_id)', (err, result) => {
    if (err) {
      throw err
    }

    console.log('successfuly add index to users table')
  })

  // company
  conn.query(`
    CREATE TABLE companies (
      id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
      name varchar(255) NOT NULL,
      address varchar(255) NOT NULL
    )`, (err, result) => {
    if (err) {
      throw err
    }

    console.log('successfuly created companies table')
  })

  conn.end()
})
