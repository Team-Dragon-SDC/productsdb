const { Pool } = require('pg');
const pool = new Pool({
  user: 'amandawright',
  host: 'localhost',
  database: 'dragon',
  password: '',
  port: 5432,
})

module.exports = pool;
