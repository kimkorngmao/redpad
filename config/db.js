const { Pool } = require('pg')

const dbConfig = {
    user: 'postgres',
    password: 'admin',
    host: 'localhost',
    port: '5432',
    database: 'redpad'
}

const pool = new Pool(dbConfig)

module.exports = pool